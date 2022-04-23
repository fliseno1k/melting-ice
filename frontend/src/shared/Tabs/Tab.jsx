import './Tab.css';
import React from 'react';


const Tab = ({ children, active }) => {
    return (
        <button className={`tab ${active ? 'active' : ''}`}>
            {children}
        </button>
    )
};

export default Tab;