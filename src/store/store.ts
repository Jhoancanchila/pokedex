// Re-export everything from the main store file for clean imports
export { store, type AppDispatch, type RootState } from './index';
export { useAppDispatch, useAppSelector } from './hooks';

// Export actions
export {
  setPokemon,
  setSearchTerm,
  clearSearch,
  setSelectedPokemon,
  selectNextPokemon,
  selectPreviousPokemon,
  setLoading,
  setError,
  resetPokemonState,
} from './slices/pokemonSlice';

// Export thunks
export {
  fetchPokemonList,
  fetchMorePokemon,
  fetchPokemonById,
  searchPokemonAsync,
  fetchPokemonByType,
  refreshPokemonData,
} from './thunks/pokemonThunks';

// Export selectors
export {
  selectPokemonState,
  selectAllPokemon,
  selectFilteredPokemon,
  selectSelectedPokemon,
  selectSearchTerm,
  selectPokemonLoading,
  selectPokemonError,
  selectPokemonById,
  selectSelectedPokemonIndex,
  selectCanNavigateNext,
  selectCanNavigatePrevious,
  selectPokemonStats,
  selectPokemonByType,
} from './selectors/pokemonSelectors';
