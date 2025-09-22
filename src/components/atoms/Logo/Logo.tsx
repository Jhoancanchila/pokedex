import React from 'react';
import './Logo.css';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <div className="pokeball-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeMiterlimit="2" strokeWidth="4"><path d="M44 24H30c0-3.31-2.69-6-6-6s-6 2.69-6 6H4C4 12.95 12.95 4 24 4s20 8.95 20 20Z"/><path strokeLinecap="round" d="M18 24H4c0 11.05 8.95 20 20 20s20-8.95 20-20H30"/><path d="M24 30a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/></g></svg>
      </div>
      <span className="logo-text">Pokédex</span>
    </div>
  );
};

export default Logo;
