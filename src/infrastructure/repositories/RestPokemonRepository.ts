/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Pokemon } from '../../types/pokemon';
import type { PokemonRepository, PaginatedPokemonResponse } from '../../domain/repositories/PokemonRepository';
import { 
  NetworkError, 
  DataParsingError, 
  PokemonNotFoundError 
} from '../../domain/repositories/PokemonRepository';
import { httpClient } from '../http/client';
import { buildApiUrl } from '../types/api';
import type {
  PokemonApiResponse,
  PokemonSpeciesResponse,
  PokemonListResponse,
  PokemonTypeResponse,
  TypeListResponse,
  ProcessedPokemonData
} from '../types/api';
import {
  mapApiResponseToPokemon,
  mapApiResponseArrayToPokemonArray,
  isValidPokemonApiResponse,
  isValidPokemonSpeciesResponse,
  extractPokemonIdFromUrl
} from '../mappers/pokemonMapper';

export class RestPokemonRepository implements PokemonRepository {
  // Configuración para procesamiento por lotes
  private readonly BATCH_SIZE = 8; // Procesar 8 Pokémon simultáneamente (optimizado)
  private readonly BATCH_DELAY = 50; // 50ms entre lotes para evitar rate limiting
  
  async getPokemonList(limit: number, offset: number): Promise<PaginatedPokemonResponse> {
    try {
      
      // Obtener lista de Pokémon
      const listResponse = await httpClient.get<PokemonListResponse>(
        buildApiUrl.pokemonList(limit, offset)
      );

      const sortedListResponse = listResponse.results.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));

      // Procesar Pokémon en lotes para optimizar las peticiones
      const pokemon = await this.fetchPokemonInBatches(sortedListResponse);

      // Calculate pagination info
      const totalItems = listResponse.count;
      const currentPage = Math.floor(offset / limit) + 1;
      const hasNextPage = !!listResponse.next;
      const hasPreviousPage = !!listResponse.previous;

      return {
        pokemon,
        totalItems,
        currentPage,
        itemsPerPage: limit,
        hasNextPage,
        hasPreviousPage
      };
    } catch (error: any) {
      if (error.message?.includes('Network request failed')) {
        throw new NetworkError(error);
      }
      throw new DataParsingError(error);
    }
  }

  async getPokemonById(id: number): Promise<Pokemon | null> {
    try {
      
      const pokemonData = await this.fetchPokemonWithSpecies(id);
      
      if (!pokemonData) {
        throw new PokemonNotFoundError(id);
      }

      const pokemon = mapApiResponseToPokemon(pokemonData);
      return pokemon;
    } catch (error: any) {
      
      if (error instanceof PokemonNotFoundError) {
        throw error;
      }
      if (error.message?.includes('Network request failed')) {
        throw new NetworkError(error);
      }
      throw new DataParsingError(error);
    }
  }

  async searchPokemon(name: string): Promise<Pokemon[]> {
    try {
      const searchTerm = name.toLowerCase().trim();
      
      if (!searchTerm) return [];

      // Estrategia 1: Intentar búsqueda por nombre exacto en API
      try {
        const pokemonResponse = await httpClient.get<PokemonApiResponse>(
          buildApiUrl.pokemon(0).replace('/0', `/${searchTerm}`)
        );
        
        if (isValidPokemonApiResponse(pokemonResponse)) {
          const speciesResponse = await this.fetchPokemonSpecies(pokemonResponse.id);
          const pokemonData: ProcessedPokemonData = {
            basic: pokemonResponse,
            species: speciesResponse
          };          
          return [mapApiResponseToPokemon(pokemonData)];
        }
      } catch {
        // Si no hay coincidencia exacta, intentar por ID si es numérico
        const pokemonId = parseInt(searchTerm, 10);
        if (!isNaN(pokemonId) && pokemonId > 0) {
          const pokemon = await this.getPokemonById(pokemonId);
          return pokemon ? [pokemon] : [];
        }
        
        // Si no es ID numérico, hacer búsqueda parcial en la lista local cargada
        // Para una búsqueda más completa, deberíamos tener la lista cargada en el repositorio
        // Por ahora, retornamos lista vacía para búsquedas parciales que no coinciden exactamente
        return [];
      }

      return [];
    } catch (error: any) {
      if (error.message?.includes('Network request failed')) {
        throw new NetworkError(error);
      }
      throw new DataParsingError(error);
    }
  }

  async getPokemonByType(typeName: string): Promise<Pokemon[]> {
    try {
      
      const typeResponse = await httpClient.get<PokemonTypeResponse>(
        buildApiUrl.type(typeName.toLowerCase())
      );


      // Limitar a los primeros 20 Pokémon del tipo para rendimiento
      const pokemonRefs = typeResponse.pokemon.slice(0, 20);
      
      const pokemonPromises = pokemonRefs.map(async (pokemonRef) => {
        const pokemonId = extractPokemonIdFromUrl(pokemonRef.pokemon.url);
        if (pokemonId === 0) return null;
        
        return this.fetchPokemonWithSpecies(pokemonId);
      });

      const pokemonDataArray = await Promise.all(pokemonPromises);
      const validPokemonData = pokemonDataArray.filter((data): data is ProcessedPokemonData => data !== null);

      return mapApiResponseArrayToPokemonArray(validPokemonData);
    } catch (error: any) {
      if (error.message?.includes('Network request failed')) {
        throw new NetworkError(error);
      }
      throw new DataParsingError(error);
    }
  }

  async getPokemonTypes(): Promise<string[]> {
    try {
      
      const typesResponse = await httpClient.get<TypeListResponse>(
        buildApiUrl.typeList()
      );

      const types = typesResponse.results.map(type => type.name);
      return types;
    } catch (error: any) {
      if (error.message?.includes('Network request failed')) {
        throw new NetworkError(error);
      }
      throw new DataParsingError(error);
    }
  }

  async refreshPokemonData(): Promise<Pokemon[]> {
    try {
      // Para REST API, simplemente obtenemos datos frescos
      return this.getPokemonList(20, 0);
    } catch (error: any) {
      if (error.message?.includes('Network request failed')) {
        throw new NetworkError(error);
      }
      throw new DataParsingError(error);
    }
  }

  // Métodos auxiliares privados

  private async fetchPokemonWithSpecies(id: number): Promise<ProcessedPokemonData | null> {
    try {
      
      const [basicResponse, speciesResponse] = await Promise.all([
        httpClient.get<PokemonApiResponse>(buildApiUrl.pokemon(id)),
        this.fetchPokemonSpecies(id)
      ]);

      if (!isValidPokemonApiResponse(basicResponse)) {
        return null;
      }

      return {
        basic: basicResponse,
        species: speciesResponse
      };
    } catch (error) {
      return null;
    }
  }

  private async fetchPokemonSpecies(id: number): Promise<PokemonSpeciesResponse | undefined> {
    try {
      const speciesResponse = await httpClient.get<PokemonSpeciesResponse>(
        buildApiUrl.species(id)
      );

      return isValidPokemonSpeciesResponse(speciesResponse) ? speciesResponse : undefined;
    } catch (error) {
      return undefined;
    }
  }

  // Método para procesar Pokémon en lotes optimizados
  private async fetchPokemonInBatches(pokemonRefs: Array<{ name: string; url: string }>): Promise<Pokemon[]> {
    const results: Pokemon[] = [];
    const totalBatches = Math.ceil(pokemonRefs.length / this.BATCH_SIZE);
    
    
    // Dividir la lista en lotes
    for (let i = 0; i < pokemonRefs.length; i += this.BATCH_SIZE) {
      const batch = pokemonRefs.slice(i, i + this.BATCH_SIZE);
      const batchNumber = Math.floor(i / this.BATCH_SIZE) + 1;
      
      
      // Procesar cada lote en paralelo
      const batchPromises = batch.map(async (pokemonRef) => {
        try {
          const pokemonId = extractPokemonIdFromUrl(pokemonRef.url);
          if (pokemonId === 0) return null;
          
          const pokemonData = await this.fetchPokemonWithSpecies(pokemonId);
          if (!pokemonData) return null;
          
          return mapApiResponseToPokemon(pokemonData);
        } catch (error) {
          return null;
        }
      });

      // Esperar a que termine el lote actual
      const batchResults = await Promise.all(batchPromises);
      
      // Agregar resultados válidos
      const validResults = batchResults.filter((pokemon): pokemon is Pokemon => pokemon !== null);
      results.push(...validResults);
      
      
      // Agregar delay entre lotes para evitar rate limiting (excepto en el último lote)
      if (i + this.BATCH_SIZE < pokemonRefs.length) {
        await this.delay(this.BATCH_DELAY);
      }
    }
    
    return results;
  }

  // Método helper para delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Exportar instancia singleton
export const pokemonRepository = new RestPokemonRepository();