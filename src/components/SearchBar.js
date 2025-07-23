import React from 'react';
import '../components/styles/SearchBar.css';

export default function SearchBar({ query, setQuery, placeholder = "Search posts..." }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}
