import React from 'react';

import s from './Row.module.scss';


const Row = ({ children }) => {
    return (
        <div className={s.row}>
            { children } 
        </div>
    );
};

export default Row;