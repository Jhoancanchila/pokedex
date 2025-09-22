import React,{ Suspense, lazy } from 'react';
const PokemonCard = lazy(() => import('../../atoms/PokemonCard'));
import type { PokemonGridProps } from '../../../types/pokemon';
import { useAppSelector } from '../../../store/hooks';
import './PokemonGrid.css';
import PokemonCardLoader from '../../atoms/PokemonCardLoader';

interface ExtendedPokemonGridProps extends PokemonGridProps {
  onToggleFavorite: (pokemonId: number) => void;
}

const PokemonGrid: React.FC<ExtendedPokemonGridProps> = ({ 
  pokemon, 
  onPokemonClick, 
  onToggleFavorite 
}) => {
  const favorites = useAppSelector(state => state.pokemon.favorites);
  
  return (
    <div className="pokemon-grid">
      {pokemon.map((poke) => {
        const isFavorite = favorites.includes(poke.id);
        
        return (
          <Suspense key={poke.id} fallback={<PokemonCardLoader />}>
            <PokemonCard 
              pokemon={poke} 
              onClick={onPokemonClick}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          </Suspense>
        );
      })}
    </div>
  );
};

export default PokemonGrid;
