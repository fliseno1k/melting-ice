import React from 'react';

import s from './Input.module.scss';


const Input = ({ label, register }) => {
    return (
        <div className={s.input}>
            <label className={s.input__label}>{label}</label>
            <div className={s.input__wrapper}>
                <input {...register} className={s.input__target}></input>
            </div>
        </div>
    );
};

export default Input;