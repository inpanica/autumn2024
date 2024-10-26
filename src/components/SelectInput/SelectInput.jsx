import React, { useState, useRef } from 'react';
import './SelectInput.css';

const SelectInput = ({ placeholder, value, onChange, options }) => {
    const [isFocused, setIsFocused] = useState(false);
    const selectRef = useRef(null);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className={`select-input-container ${isFocused || value ? 'focused' : ''}`}>
            <select
                ref={selectRef}
                className="select-input"
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <label className="select-input-label" onClick={handleFocus}>
                {placeholder}
            </label>
        </div>
    );
};

export default SelectInput;
