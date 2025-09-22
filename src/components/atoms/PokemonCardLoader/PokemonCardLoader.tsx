import React from 'react';
import './PokemonCardLoader.css';

const PokemonCardLoader: React.FC = () => {
  return (
    <div className="pokemon-card-loader">
      <div className="pokemon-number-loader skeleton"></div>
      <div className="pokemon-image-container-loader">
        <div className="pokemon-image-loader skeleton"></div>
      </div>
      <div className="pokemon-name-loader skeleton"></div>
      <div className="pokemon-types-loader">
        <div className="pokemon-type-loader skeleton"></div>
        <div className="pokemon-type-loader skeleton"></div>
      </div>
    </div>
  );
};

export default PokemonCardLoader;

