import type { Pokemon } from '../../types/pokemon';

export interface PokemonState {
  pokemon: Pokemon[];
  loading: boolean;
  error: string | null;
  selectedPokemon: Pokemon | null;
  searchTerm: string;
  filteredPokemon: Pokemon[];
  // Pagination state
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  // Favorites state
  favorites: number[]; // Array of Pokemon IDs
}

export interface RootState {
  pokemon: PokemonState;
}
