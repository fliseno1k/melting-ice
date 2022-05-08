import React from 'react';

import s from './Section.module.scss';


const Section = ({ children, text, shadow }) => (
    <section className={s.section}>
        {text && (
            <div className={s.section__description}>
                {shadow && (
                    <span className={s.section__shadow}>{shadow}</span>
                )}
                <p className={s.section__text}>{text}</p>
            </div>
        )}
        <div className={s.section__content}>
            {children}
        </div>
    </section>
);

export default Section;