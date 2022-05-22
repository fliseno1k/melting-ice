import React from 'react';

import s from './Textarea.module.scss';


const Textarea = ({ label, register }) => {
    return (
        <div className={s.textarea}>
            <label className={s.textarea__label}>{label}</label>
            <div className={s.textarea__wrapper}>
                <textarea {...register} className={s.textarea__target}></textarea>
            </div>
        </div>
    );
};

export default Textarea;