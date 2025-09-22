import React from 'react';
import SearchBar from '../../atoms/SearchBar';
import type { SearchBarProps } from '../../../types/pokemon';
import './SearchSection.css';

const SearchSection: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-section">
      <SearchBar 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchSection;
