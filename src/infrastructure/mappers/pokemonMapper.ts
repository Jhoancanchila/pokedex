/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Pokemon } from '../../types/pokemon';
import type { 
  PokemonApiResponse, 
  PokemonSpeciesResponse,
  ProcessedPokemonData 
} from '../types/api';

// Mapeo de nombres de stats de la API REST a nuestro dominio
const statNameMap: { [key: string]: keyof Pokemon['stats'] } = {
  'hp': 'hp',
  'attack': 'attack',
  'defense': 'defense',
  'special-attack': 'specialAttack',
  'special-defense': 'specialDefense',
  'speed': 'speed'
};

// Helper para limpiar texto de descripción
const cleanDescription = (text: string): string => {
  return text
    .replace(/\f/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Helper para formatear número de Pokémon
const formatPokemonNumber = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

// Helper para obtener URL de imagen de Pokémon
const getPokemonImageUrl = (sprites: PokemonApiResponse['sprites'], id: number): string => {
  
  // Prioridad 1: Official artwork
  if (sprites.other?.['official-artwork']?.front_default) {
    return sprites.other['official-artwork'].front_default;
  }
  
  // Prioridad 2: Home artwork
  if (sprites.other?.['home']?.front_default) {
    return sprites.other['home'].front_default;
  }
  
  // Prioridad 3: Sprite frontal por defecto
  if (sprites.front_default) {
    return sprites.front_default;
  }
  
  // Fallback: URL construida manualmente
  const fallbackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return fallbackUrl;
};

// Helper para obtener descripción en inglés
const getEnglishDescription = (species?: PokemonSpeciesResponse): string => {
  if (!species?.flavor_text_entries) {
    return 'No description available.';
  }

  // Buscar descripción en inglés
  const englishEntry = species.flavor_text_entries.find(
    entry => entry.language.name === 'en'
  );

  return englishEntry 
    ? cleanDescription(englishEntry.flavor_text)
    : 'No description available.';
};

// Mapear respuesta de API REST a Pokémon de dominio
export const mapApiResponseToPokemon = (data: ProcessedPokemonData): Pokemon => {
  const { basic, species } = data;

  // Extraer tipos
  const types = basic.types.map(typeData => typeData.type.name);

  // Extraer habilidades (solo las no ocultas por defecto)
  const abilities = basic.abilities
    .filter(abilityData => !abilityData.is_hidden)
    .map(abilityData => abilityData.ability.name);

  // Extraer y mapear stats
  const statsData = basic.stats.reduce((acc, statData) => {
    const statName = statData.stat.name;
    const mappedStatName = statNameMap[statName];
    
    if (mappedStatName) {
      acc[mappedStatName] = statData.base_stat;
    }
    
    return acc;
  }, {} as Pokemon['stats']);

  // Asegurar que todas las stats estén presentes con valores por defecto
  const stats: Pokemon['stats'] = {
    hp: statsData.hp || 0,
    attack: statsData.attack || 0,
    defense: statsData.defense || 0,
    specialAttack: statsData.specialAttack || 0,
    specialDefense: statsData.specialDefense || 0,
    speed: statsData.speed || 0,
  };

  const pokemon: Pokemon = {
    id: basic.id,
    name: basic.name,
    image: getPokemonImageUrl(basic.sprites, basic.id),
    type: types,
    number: formatPokemonNumber(basic.id),
    weight: basic.weight / 10, // Convertir hectogramos a kg
    height: basic.height / 10, // Convertir decímetros a metros
    abilities: abilities,
    description: getEnglishDescription(species),
    stats: stats,
  };

  return pokemon;
};

// Mapear array de respuestas de API REST a array de Pokémon
export const mapApiResponseArrayToPokemonArray = (
  dataArray: ProcessedPokemonData[]
): Pokemon[] => {
  return dataArray.map(mapApiResponseToPokemon);
};

// Helper para validar respuesta de API REST
export const isValidPokemonApiResponse = (data: any): data is PokemonApiResponse => {
  return (
    data &&
    typeof data.id === 'number' &&
    typeof data.name === 'string' &&
    Array.isArray(data.types) &&
    Array.isArray(data.stats) &&
    data.sprites &&
    typeof data.sprites === 'object'
  );
};

// Helper para extraer ID de Pokémon desde URL
export const extractPokemonIdFromUrl = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 0;
};

// Helper para validar respuesta de especies
export const isValidPokemonSpeciesResponse = (data: any): data is PokemonSpeciesResponse => {
  return (
    data &&
    typeof data.id === 'number' &&
    typeof data.name === 'string' &&
    Array.isArray(data.flavor_text_entries)
  );
};
