import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimeInput.css'; // Создайте свой файл стилей

const DateTimeInput = ({ placeholder, value, onChange, fullWidth }) => {
    const [startDate, setStartDate] = useState(value ? new Date(value) : null);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleChange = (date) => {
        setStartDate(date);
        onChange(date);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!startDate) {
            setIsFocused(false);
        }
    };

    const handleLabelClick = () => {
        inputRef.current.focus();
    };

    return (
        <div className={`input-container ${isFocused || startDate ? 'focused' : ''}`}>
            <DatePicker
                ref={inputRef}
                selected={startDate}
                onChange={handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm"
                value={value}
                placeholderText=""
                className={`input ${fullWidth ? 'full-width' : ''}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <label className="input-label" onClick={handleLabelClick}>
                {placeholder}
            </label>
        </div>
    );
};

export default DateTimeInput;
