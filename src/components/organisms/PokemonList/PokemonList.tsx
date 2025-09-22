import React from 'react';
import PokemonGrid from '../../molecules/PokemonGrid';
import type { PokemonGridProps } from '../../../types/pokemon';
import './PokemonList.css';

interface ExtendedPokemonListProps extends PokemonGridProps {
  onToggleFavorite: (pokemonId: number) => void;
}

const PokemonList: React.FC<ExtendedPokemonListProps> = ({ 
  pokemon, 
  onPokemonClick, 
  onToggleFavorite 
}) => {
  return (
    <main className="pokemon-list">
      <PokemonGrid 
        pokemon={pokemon} 
        onPokemonClick={onPokemonClick}
        onToggleFavorite={onToggleFavorite}
      />
    </main>
  );
};

export default PokemonList;
