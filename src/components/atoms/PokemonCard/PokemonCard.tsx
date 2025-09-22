import React from 'react';
import type { PokemonCardProps } from '../../../types/pokemon';
import FavoriteButton from '../FavoriteButton';
import './PokemonCard.css';

interface ExtendedPokemonCardProps extends PokemonCardProps {
  isFavorite?: boolean;
  onToggleFavorite?: (pokemonId: number) => void;
}

const PokemonCard: React.FC<ExtendedPokemonCardProps> = ({ 
  pokemon, 
  onClick, 
  isFavorite = false, 
  onToggleFavorite 
}) => {
  const getTypeColor = (type: string): string => {
    const typeColors: { [key: string]: string } = {
      grass: '#78C850',
      fire: '#F08030',
      water: '#6890F0',
      bug: '#A8B820',
      normal: '#A8A878',
      electric: '#F8D030',
      ghost: '#705898',
      poison: '#A040A0',
      psychic: '#F85888',
      fighting: '#C03028',
      steel: '#B8B8D0',
      flying: '#A890F0'
    };
    return typeColors[type] || '#68A090';
  };

  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  return (
      <div 
        className="pokemon-card" 
        onClick={handleClick}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${pokemon.name}`}
      >
        <div className="pokemon-number">{pokemon.number}</div>
        
        {/* Botón de favoritos */}
        {onToggleFavorite && (
          <FavoriteButton
            pokemonId={pokemon.id}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            size="small"
            className="pokemon-card-favorite"
          />
        )}
        
        <div className="pokemon-image-container">
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className="pokemon-image"
            loading="lazy"
          />
        </div>
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.type.map((type) => (
            <span 
              key={type} 
              className="pokemon-type"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
  );
};

export default PokemonCard;
