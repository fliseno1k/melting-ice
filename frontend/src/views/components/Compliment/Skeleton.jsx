import React from 'react';
import cn from 'classnames';

import s from './Compliment.module.scss';


 const Skeleton = () => (
        <div className={s.compliment}>
            <div className={s.compliment__icon}>
                <div className={cn(s.compliment__icon__skeleton, "skeleton")}></div>
            </div>
            <div className={s.compliment__pseudoContainer}>
            </div>
            <div className={s.compliment__container}>
                <div className={cn(s.compliment__text__skeleton, s.compliment__text_large, "skeleton")}></div>
                <div className={cn(s.compliment__text__skeleton, s.compliment__text_short, "skeleton")}></div>
                <div className={cn(s.compliment__text__skeleton, s.compliment__text_medium, "skeleton")}></div>
            </div>
        </div>
    );

export default Skeleton;