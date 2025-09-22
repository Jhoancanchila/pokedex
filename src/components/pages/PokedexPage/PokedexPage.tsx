import React, { useEffect } from 'react';
import PokedexTemplate from '../../templates/PokedexTemplate';
import PokemonDetailModal from '../../organisms/PokemonDetailModal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { 
  setSearchTerm, 
  setSelectedPokemon, 
  selectNextPokemon, 
  selectPreviousPokemon,
  clearSearch,
  toggleFavorite
} from '../../../store/slices/pokemonSlice';
import {
  fetchPokemonList,
  searchPokemonAsync,
  goToNextPage,
  goToPreviousPage
} from '../../../store/thunks/pokemonThunks';
import {
  selectFilteredPokemon,
  selectSelectedPokemon,
  selectSearchTerm,
  selectCanNavigateNext,
  selectCanNavigatePrevious,
  selectPokemonError,
  selectCurrentPage,
  selectTotalPages,
  selectHasNextPage,
  selectHasPreviousPage,
  selectIsFavorite,
  selectFavorites
} from '../../../store/selectors/pokemonSelectors';
import type { Pokemon } from '../../../types/pokemon';
import './PokedexPage.css';

const PokedexPage: React.FC = () => {
  const dispatch = useAppDispatch();
  console.log(useAppSelector(selectFavorites))
  // Redux selectors
  const filteredPokemon = useAppSelector(selectFilteredPokemon);
  const selectedPokemon = useAppSelector(selectSelectedPokemon);
  const searchValue = useAppSelector(selectSearchTerm);
  const canGoNext = useAppSelector(selectCanNavigateNext);
  const canGoPrevious = useAppSelector(selectCanNavigatePrevious);
  const error = useAppSelector(selectPokemonError);
  
  // Pagination selectors
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const hasNextPage = useAppSelector(selectHasNextPage);
  const hasPreviousPage = useAppSelector(selectHasPreviousPage);
  const loading = useAppSelector((state) => state.pokemon.loading);
  
  // Modal state
  const isModalOpen = !!selectedPokemon;

  // Fetch initial Pokemon data on component mount
  useEffect(() => {
    dispatch(fetchPokemonList({ limit: 20, offset: 0 }));
  }, [dispatch]);

  // Event handlers
  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
    
    if (value.trim()) {
      // Use API search for real-time search
      dispatch(searchPokemonAsync(value));
    } else {
      // Clear search and show all Pokemon
      dispatch(clearSearch());
    }
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    dispatch(setSelectedPokemon(pokemon));
  };

  const handleCloseModal = () => {
    dispatch(setSelectedPokemon(null));
  };

  const handleNext = () => {
    dispatch(selectNextPokemon());
  };

  const handlePrevious = () => {
    dispatch(selectPreviousPokemon());
  };

  // Pagination handlers
  const handleNextPage = () => {
    dispatch(goToNextPage());
  };

  const handlePreviousPage = () => {
    dispatch(goToPreviousPage());
  };

  // Favorites handlers
  const handleToggleFavorite = (pokemonId: number) => {
    dispatch(toggleFavorite(pokemonId));
  };
  const isSelectedPokemonFavorite = useAppSelector(state => 
    selectedPokemon ? selectIsFavorite(state, selectedPokemon.id) : false
  );
  // Show error message if there's an error
  if (error) {
    return (
      <div className="pokedex-page">
        <div className="error-container">
          <h2>Error loading Pokemon data</h2>
          <p>{error}</p>
          <button 
            onClick={() => dispatch(fetchPokemonList({ limit: 20, offset: 0 }))}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pokedex-page">
      <PokedexTemplate
        pokemon={filteredPokemon}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onPokemonClick={handlePokemonClick}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        loading={loading}
        onToggleFavorite={handleToggleFavorite}
      />
      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
        isFavorite={isSelectedPokemonFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default PokedexPage;
