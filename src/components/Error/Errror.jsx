import React from 'react';
import './Error.css'

const Error = ({children}) => {
    return (
        <p className="main-text error-text">
            {children}
        </p>
    );
};

export default Error;
