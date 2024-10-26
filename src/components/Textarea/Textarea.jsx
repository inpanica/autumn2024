import React, { useState, useRef, useEffect } from 'react';
import './Textarea.css';

const TextArea = ({ placeholder, value, onChange, fullWidth = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    const textAreaRef = useRef(null);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (value === '') {
            setIsFocused(false);
        }
    };

    const handleLabelClick = () => {
        textAreaRef.current.focus();
    };

    const handleChange = (e) => {
        onChange(e);
    };

    const adjustHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [value]); // Запускаем adjustHeight при изменении value

    return (
        <div className={`input-container ${isFocused || value ? 'focused' : ''}`}>
            <textarea
                ref={textAreaRef}
                className={`input ${fullWidth ? 'full-width' : ''}`}
                placeholder=""
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ resize: 'none', overflow: 'hidden' }} // Запрет на изменение размера и скрытие скролла
            />
            <label className="input-label" onClick={handleLabelClick}>
                {placeholder}
            </label>
        </div>
    );
};

export default TextArea;
