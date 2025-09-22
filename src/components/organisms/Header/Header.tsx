import React from 'react';
import Logo from '../../atoms/Logo';
import SearchSection from '../../molecules/SearchSection';
import type { SearchBarProps } from '../../../types/pokemon';
import './Header.css';

type HeaderProps = SearchBarProps

const Header: React.FC<HeaderProps> = ({ placeholder, value, onChange }) => {
  return (
    <header className="header">
      <div className="header-top">
        <Logo />
      </div>
      <SearchSection 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </header>
  );
};

export default Header;
