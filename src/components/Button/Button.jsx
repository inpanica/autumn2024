import React from 'react';
import './Button.css'

const Button = ({ onClick, children, type = 'button', disabled = false, fullWidth = false, colored = false, style, ...props}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={[`btn ${fullWidth ? 'full-width-btn' : ''} ${colored ? 'colored-btn' : ''}`, props.className].join(' ')}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;