import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../types';

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
  (pokemon, id) => pokemon.find(p => p.id === id)
);

export const selectSelectedPokemonIndex = createSelector(
  [selectFilteredPokemon, selectSelectedPokemon],
  (filteredPokemon, selectedPokemon) => {
    if (!selectedPokemon) return -1;
    return filteredPokemon.findIndex(p => p.id === selectedPokemon.id);
  }
);

export const selectCanNavigateNext = createSelector(
  [selectFilteredPokemon, selectSelectedPokemonIndex],
  (filteredPokemon, selectedIndex) => {
    return selectedIndex >= 0 && selectedIndex < filteredPokemon.length - 1;
  }
);

export const selectCanNavigatePrevious = createSelector(
  [selectSelectedPokemonIndex],
  (selectedIndex) => {
    return selectedIndex > 0;
  }
);

export const selectPokemonStats = createSelector(
  [selectAllPokemon],
  (pokemon) => ({
    total: pokemon.length,
    types: [...new Set(pokemon.flatMap(p => p.type))].sort(),
  })
);

export const selectPokemonByType = createSelector(
  [selectAllPokemon, (_: RootState, type: string) => type],
  (pokemon, type) => pokemon.filter(p => p.type.includes(type))
);

// Pagination selectors
export const selectCurrentPage = (state: RootState) => state.pokemon.currentPage;
export const selectItemsPerPage = (state: RootState) => state.pokemon.itemsPerPage;
export const selectTotalItems = (state: RootState) => state.pokemon.totalItems;
export const selectHasNextPage = (state: RootState) => state.pokemon.hasNextPage;
export const selectHasPreviousPage = (state: RootState) => state.pokemon.hasPreviousPage;

export const selectTotalPages = createSelector(
  [selectTotalItems, selectItemsPerPage],
  (totalItems, itemsPerPage) => Math.ceil(totalItems / itemsPerPage)
);

// Favorites selectors
export const selectFavorites = (state: RootState) => state.pokemon.favorites;
export const selectIsFavorite = (state: RootState, pokemonId: number) => 
  state.pokemon.favorites.includes(pokemonId);
export const selectFavoritePokemon = createSelector(
  [selectAllPokemon, selectFavorites],
  (pokemon, favorites) => pokemon.filter(p => favorites.includes(p.id))
);
export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);
