import * as React from 'react';
import './filter.scss';

export const Filter = ({ onFilterChange, currentFilter }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const filterRef = React.useRef(null);

    const filterOptions = [
        { value: 'all', label: 'All Tasks' },
        { value: 'completed', label: 'Completed' },
        { value: 'incomplete', label: 'Incomplete' }
    ];

    const currentOption = filterOptions.find(option => option.value === currentFilter) || filterOptions[0];

    const handleSelect = (value) => {
        onFilterChange(value);
        setIsOpen(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="filter" ref={filterRef}>
            <button
                className="filter-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{currentOption.label}</span>
                <svg
                    className={`filter-arrow ${isOpen ? 'open' : ''}`}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                >
                    <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="filter-dropdown" role="listbox">
                    {filterOptions.map((option) => (
                        <button
                            key={option.value}
                            className={`filter-option ${option.value === currentFilter ? 'active' : ''}`}
                            onClick={() => handleSelect(option.value)}
                            role="option"
                            aria-selected={option.value === currentFilter}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}; 