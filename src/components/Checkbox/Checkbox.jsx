import React from 'react';
import './Checkbox.css';

const Checkbox = ({ checked, onChange, children }) => (
    <label className="checkbox-container">
        <input 
            type="checkbox" 
            checked={checked} 
            onChange={onChange} 
            className="checkbox-input" 
        />
        <span className="checkbox-custom"></span>
        <span className="checkbox-label main-text">{children}</span>
    </label>
);

export default Checkbox;
