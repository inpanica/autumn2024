import React from 'react';
import './Button.css'

const Button = ({ onClick, children, type = 'button', disabled = false, fullWidth = false, colored = false, style}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${fullWidth ? 'full-width-btn' : ''} ${colored ? 'colored-btn' : ''}`}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;