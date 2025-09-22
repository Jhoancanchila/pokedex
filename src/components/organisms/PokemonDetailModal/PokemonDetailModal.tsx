import React, { useEffect } from 'react';
import StatBar from '../../atoms/StatBar';
import FavoriteButton from '../../atoms/FavoriteButton';
import type { PokemonDetailModalProps } from '../../../types/pokemon';
import './PokemonDetailModal.css';

interface ExtendedPokemonDetailModalProps extends PokemonDetailModalProps {
  isFavorite?: boolean;
  onToggleFavorite?: (pokemonId: number) => void;
}

const PokemonDetailModal: React.FC<ExtendedPokemonDetailModalProps> = ({ 
  pokemon, 
  isOpen, 
  onClose,
  onNext,
  onPrevious,
  canGoNext = false,
  canGoPrevious = false,
  isFavorite = false,
  onToggleFavorite
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (canGoPrevious && onPrevious) {
            onPrevious();
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (canGoNext && onNext) {
            onNext();
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrevious, canGoNext, canGoPrevious]);

  if (!isOpen || !pokemon) return null;

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

  const primaryType = pokemon.type[0];
  const backgroundColor = getTypeColor(primaryType);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (onPrevious && canGoPrevious) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (onNext && canGoNext) {
      onNext();
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === 'Enter' && handleBackdropClick(e as unknown as React.MouseEvent<HTMLDivElement>)}
      role="button"
      tabIndex={0}
      aria-label="Close modal"
    >
      <div className="pokemon-detail-modal">
        {/* Header */}
        <div 
          className="modal-header"
          style={{ backgroundColor }}
        >
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="pokemon-name-section">
            <h1 className="pokemon-name-header">{pokemon.name}</h1>
            {onToggleFavorite && (
              <FavoriteButton
                pokemonId={pokemon.id}
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
                size="large"
                className="pokemon-detail-favorite"
              />
            )}
          </div>
          <span className="pokemon-number-header">{pokemon.number}</span>
        </div>

        {/* Pokemon Image */}
        <div className="pokemon-image-section" style={{ backgroundColor }}>
          <div className="navigation-arrows">
            <button 
              className={`nav-arrow left ${!canGoPrevious ? 'disabled' : ''}`}
              onClick={handlePrevious}
              disabled={!canGoPrevious}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`nav-arrow right ${!canGoNext ? 'disabled' : ''}`}
              onClick={handleNext}
              disabled={!canGoNext}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <img 
            src={pokemon.image} 
            alt={pokemon.name}
            className="pokemon-detail-image"
          />
        </div>

        {/* Content */}
        <div className="modal-content">
          {/* Type badges */}
          <div className="pokemon-types-detail">
            {pokemon.type.map((type) => (
              <span 
                key={type} 
                className="pokemon-type-detail"
                style={{ backgroundColor: getTypeColor(type) }}
              >
                {type}
              </span>
            ))}
          </div>

          {/* About section */}
          <div className="about-section">
            <h2 className="section-title" style={{ color: backgroundColor }}>About</h2>
            
            <div className="pokemon-info-grid">
              <div className="info-item">
                <div className="info-icon">⚖️</div>
                <div className="info-details">
                  <span className="info-value">{pokemon.weight} kg</span>
                  <span className="info-label">Weight</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📏</div>
                <div className="info-details">
                  <span className="info-value">{pokemon.height} m</span>
                  <span className="info-label">Height</span>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-details">
                  <span className="info-value">{pokemon.abilities.join(', ')}</span>
                  <span className="info-label">Moves</span>
                </div>
              </div>
            </div>

            <p className="pokemon-description">{pokemon.description}</p>
          </div>

          {/* Base Stats */}
          <div className="stats-section">
            <h2 className="section-title" style={{ color: backgroundColor }}>Base Stats</h2>
            
            <div className="stats-grid">
              <StatBar label="HP" value={pokemon.stats.hp} color={backgroundColor} />
              <StatBar label="ATK" value={pokemon.stats.attack} color={backgroundColor} />
              <StatBar label="DEF" value={pokemon.stats.defense} color={backgroundColor} />
              <StatBar label="SATK" value={pokemon.stats.specialAttack} color={backgroundColor} />
              <StatBar label="SDEF" value={pokemon.stats.specialDefense} color={backgroundColor} />
              <StatBar label="SPD" value={pokemon.stats.speed} color={backgroundColor} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;
