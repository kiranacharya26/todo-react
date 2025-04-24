import * as React from 'react';
import { Search } from '../search';
import './app-controls.scss';

export const AppControls = ({ onSearch }) => {
    return (
        <div className="app-controls">
            <Search onSearch={onSearch} />
        </div>
    );
}; 