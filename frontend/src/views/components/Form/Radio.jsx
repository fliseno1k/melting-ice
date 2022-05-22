import React from 'react';

import s from './Radio.module.scss';


const Radio = ({ label, options, name, register }) => {
    return (
        <div className={s.radio__group}>
            <span className={s.radio__label}>
                { label }
            </span>
            <div className={s.radio__target}>
                {options.map(option => (
                    <label key={option.slug} htmlFor={`${name}-${option.slug}`} className={s.radio__option}>
                        <input 
                            type="radio" 
                            name={name}
                            id={`${name}-${option.slug}`}
                            value={option.slug}
                            className={s.radio__input}
                            {...register(name)}
                        ></input>
                        <span className={s.radio__value}>{option.value}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Radio;