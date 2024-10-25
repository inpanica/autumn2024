import React, { useState, useRef } from 'react';
import './Input.css';

const Input = ({ placeholder, value, onChange, type = 'text', fullWidth = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (value === '') {
            setIsFocused(false);
        }
    };

    const handleLabelClick = () => {
        inputRef.current.focus();
    };

    return (
        <div className={`input-container ${isFocused || value ? 'focused' : ''}`}>
            <input
                ref={inputRef}
                type={type}
                className={`input ${fullWidth ? 'full-width' : ''}`}
                placeholder=""
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <label className="input-label" onClick={handleLabelClick} >
                {placeholder}
            </label>
        </div>
    );
};

export default Input;
