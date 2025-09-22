import React from 'react';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  pokemonId: number;
  isFavorite: boolean;
  onToggleFavorite: (pokemonId: number) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  pokemonId,
  isFavorite,
  onToggleFavorite,
  size = 'medium',
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se active el click del card
    onToggleFavorite(pokemonId);
  };

  return (
    <button
      className={`favorite-button favorite-button--${size} ${className} ${
        isFavorite ? 'favorite-button--active' : ''
      }`}
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className="favorite-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          className="star-path"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;

