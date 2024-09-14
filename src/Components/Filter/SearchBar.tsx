import React from 'react';
import './Filter.css';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
    };

    return (
        <div className="filter search-filter">
            <h3>Search</h3>
            <input
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={handleChange}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
