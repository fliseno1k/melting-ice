import React from 'react';
import './Button.css';


const Button = ({ value, onClick, icon, size="short", disabled }) => {
    const composedClassName = [
        "styled-button",
        `styled-button_${size}`
    ].join(' ');

    return (
        <button 
            className={composedClassName} 
            onClick={onClick}
            disabled={disabled}
        >
            <div className="styled-button__inner">
                {value || icon}
            </div>
        </button>
    );
};

export default Button;