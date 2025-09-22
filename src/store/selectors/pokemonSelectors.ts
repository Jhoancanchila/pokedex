import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import type { Pokemon } from '../../types/pokemon';

// Base selectors
export const selectPokemonState = (state: RootState) => state.pokemon;

export const selectAllPokemon = (state: RootState) => state.pokemon.pokemon;

export const selectFilteredPokemon = (state: RootState) => state.pokemon.filteredPokemon;

export const selectSelectedPokemon = (state: RootState) => state.pokemon.selectedPokemon;

export const selectSearchTerm = (state: RootState) => state.pokemon.searchTerm;

export const selectPokemonLoading = (state: RootState) => state.pokemon.loading;

export const selectPokemonError = (state: RootState) => state.pokemon.error;

// Memoized selectors for complex computations
export const selectPokemonById = createSelector(
  [selectAllPokemon, (_: RootState, id: number) => id],
  (pokemon: Pokemon[], id: number) => pokemon.find((p: Pokemon) => p.id === id)
);

export const selectSelectedPokemonIndex = createSelector(
  [selectFilteredPokemon, selectSelectedPokemon],
  (filteredPokemon: Pokemon[], selectedPokemon: Pokemon | null) => {
    if (!selectedPokemon) return -1;
    return filteredPokemon.findIndex((p: Pokemon) => p.id === selectedPokemon.id);
  }
);

export const selectCanNavigateNext = createSelector(
  [selectFilteredPokemon, selectSelectedPokemonIndex],
  (filteredPokemon: Pokemon[], selectedIndex: number) => {
    return selectedIndex >= 0 && selectedIndex < filteredPokemon.length - 1;
  }
);

export const selectCanNavigatePrevious = createSelector(
  [selectSelectedPokemonIndex],
  (selectedIndex: number) => {
    return selectedIndex > 0;
  }
);

export const selectPokemonStats = createSelector(
  [selectAllPokemon],
  (pokemon: Pokemon[]) => ({
    total: pokemon.length,
    types: [...new Set(pokemon.flatMap((p: Pokemon) => p.type))].sort(),
  })
);

export const selectPokemonByType = createSelector(
  [selectAllPokemon, (_: RootState, type: string) => type],
  (pokemon: Pokemon[], type: string) => pokemon.filter((p: Pokemon) => p.type.includes(type))
);

// Pagination selectors
export const selectCurrentPage = (state: RootState) => state.pokemon.currentPage;
export const selectItemsPerPage = (state: RootState) => state.pokemon.itemsPerPage;
export const selectTotalItems = (state: RootState) => state.pokemon.totalItems;
export const selectHasNextPage = (state: RootState) => state.pokemon.hasNextPage;
export const selectHasPreviousPage = (state: RootState) => state.pokemon.hasPreviousPage;

export const selectTotalPages = createSelector(
  [selectTotalItems, selectItemsPerPage],
  (totalItems: number, itemsPerPage: number) => Math.ceil(totalItems / itemsPerPage)
);

// Favorites selectors
export const selectFavorites = (state: RootState) => state.pokemon.favorites;
export const selectIsFavorite = (state: RootState, pokemonId: number) => 
  state.pokemon.favorites.includes(pokemonId);
export const selectFavoritePokemon = createSelector(
  [selectAllPokemon, selectFavorites],
  (pokemon: Pokemon[], favorites: number[]) => pokemon.filter((p: Pokemon) => favorites.includes(p.id))
);
export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites: number[]) => favorites.length
);
