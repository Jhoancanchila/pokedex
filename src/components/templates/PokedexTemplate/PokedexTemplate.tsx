import React from 'react';
import Header from '../../organisms/Header';
import PokemonList from '../../organisms/PokemonList';
import Pagination from '../../atoms/Pagination';
import type { Pokemon } from '../../../types/pokemon';
import './PokedexTemplate.css';

interface PokedexTemplateProps {
  pokemon: Pokemon[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onPokemonClick: (pokemon: Pokemon) => void;
  // Pagination props
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  loading: boolean;
  // Favorites props
  onToggleFavorite: (pokemonId: number) => void;
}

const PokedexTemplate: React.FC<PokedexTemplateProps> = ({
  pokemon,
  searchValue,
  onSearchChange,
  onPokemonClick,
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  loading,
  onToggleFavorite
}) => {
  // Solo mostrar paginación cuando no hay búsqueda activa
  const showPagination = !searchValue.trim();

  return (
    <div className="pokedex-template">
      <Header
        placeholder="Search"
        value={searchValue}
        onChange={onSearchChange}
      />
      <PokemonList 
        pokemon={pokemon} 
        onPokemonClick={onPokemonClick}
        onToggleFavorite={onToggleFavorite}
      />
      
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PokedexTemplate;
