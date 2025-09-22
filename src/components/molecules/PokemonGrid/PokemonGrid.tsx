import React,{ Suspense, lazy } from 'react';
const PokemonCard = lazy(() => import('../../atoms/PokemonCard'));
import type { PokemonGridProps } from '../../../types/pokemon';
import { useAppSelector } from '../../../store/hooks';
import { selectIsFavorite } from '../../../store/selectors/pokemonSelectors';
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
  return (
    <div className="pokemon-grid">
      {pokemon.map((poke) => {
        const isFavorite = useAppSelector(state => selectIsFavorite(state, poke.id));
        
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
