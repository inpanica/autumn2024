import React from 'react';
import './Card.css';

const Card = ({ children, maxWidth, className }) => {
    return (
        <div className={["card", className].join(' ')} style={{ maxWidth: maxWidth || '100%'}}>
            {children}
        </div>
    );
};

export default Card;
