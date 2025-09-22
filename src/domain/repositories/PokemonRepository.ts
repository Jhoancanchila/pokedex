import type { Pokemon } from '../../types/pokemon';

// Pagination response type
export interface PaginatedPokemonResponse {
  pokemon: Pokemon[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Repository error classes
export class PokemonRepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PokemonRepositoryError';
  }
}

export class NetworkError extends PokemonRepositoryError {
  constructor(originalError: Error) {
    super(`Network error: ${originalError.message}`);
    this.name = 'NetworkError';
  }
}

export class DataParsingError extends PokemonRepositoryError {
  constructor(originalError: Error) {
    super(`Data parsing error: ${originalError.message}`);
    this.name = 'DataParsingError';
  }
}

export class PokemonNotFoundError extends PokemonRepositoryError {
  constructor(id: number) {
    super(`Pokemon with ID ${id} not found`);
    this.name = 'PokemonNotFoundError';
  }
}

// Repository interface (Domain layer)
export interface PokemonRepository {
  // Get Pokemon list with pagination
  getPokemonList(limit: number, offset: number): Promise<PaginatedPokemonResponse>;
  
  // Get single Pokemon by ID
  getPokemonById(id: number): Promise<Pokemon | null>;
  
  // Search Pokemon by name
  searchPokemon(name: string): Promise<Pokemon[]>;
  
  // Get Pokemon by type
  getPokemonByType(typeName: string): Promise<Pokemon[]>;
  
  // Get all available types
  getPokemonTypes(): Promise<string[]>;
  
  // Refresh/reload Pokemon data
  refreshPokemonData(): Promise<Pokemon[]>;
}
