import * as React from 'react';
import './search.scss';

export const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
        </div>
    );
}; 