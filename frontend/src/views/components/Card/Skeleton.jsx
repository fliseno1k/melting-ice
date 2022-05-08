import React from 'react';
import cn from 'classnames';

import s from './Card.module.scss';


const SkeletonCard = ({ index }) => {
    return (
        <div data-index={index} className={cn(s.card, s.card_skeleton)}>
            <div className={cn(s.card__asset, "skeleton")}></div>
            <div className={s.card__content}>
                <span className={s.card__text}>
                    <span className={cn(s.card__text_skeleton, s.card__text_large, "skeleton")}></span>
                    <span className={cn(s.card__text_skeleton, s.card__text_short, "skeleton")}></span>
                    <span className={cn(s.card__text_skeleton, s.card__text_medium, "skeleton")}></span>
                </span>
            </div>
            <div className={s.card__actions}>
            </div>
        </div>
    );
};

export default SkeletonCard;