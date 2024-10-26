import React, { useState, useRef, useEffect } from 'react';
import './NumberInput.css';

const NumberInput = ({ placeholder, value, onChange, fullWidth = false, ...props}) => {
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

    const handleChange = (e) => {
        const { value } = e.target;
        // Обработка ввода только чисел
        if (!isNaN(value) && value !== '') {
            onChange(e);
        } else if (value === '') {
            onChange(e);
        }
    };

    return (
        <div className={`input-container ${isFocused || value ? 'focused' : ''}`}>
            <input
                ref={inputRef}
                type="number"
                className={`input ${fullWidth ? 'full-width' : ''}`}
                placeholder=""
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ resize: 'none' }} // Запрет на изменение размера (для инпутов это не актуально, но можно оставить для унификации)
                min={props.min}
            />
            <label className="input-label" onClick={handleLabelClick}>
                {placeholder}
            </label>
        </div>
    );
};

export default NumberInput;
