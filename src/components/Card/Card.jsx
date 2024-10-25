import React from 'react';
import './Card.css';

const Card = ({ children, maxWidth }) => {
    return (
        <div className="card" style={{ maxWidth: maxWidth || '100%'}}>
            {children}
        </div>
    );
};

export default Card;
