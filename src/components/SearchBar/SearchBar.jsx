import React, { useState, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, value, onChange, type = 'text', fullWidth = false }) => {

    return (
        <div className={`input-container`}>
            <input
                type={type}
                className={[`input ${fullWidth ? 'full-width' : ''}`, 'searchbar'].join(' ')}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchBar;
