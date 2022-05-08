import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import s from './Card.module.scss';

import { ReactComponent as Heart } from '../../../static/icons/heart.svg';


const BaseCard = ({ data, index }) => (
    <div data-index={index} className={s.card}>
        <div className={s.card__asset}>
            <img alt="Girl" src={data.imageUrl} />
        </div>
        <div className={s.card__content}>
            <span className={s.card__text}>
                {data.content}
            </span>
        </div>
        <div className={s.card__actions}>
            <button className={cn(s.card__button, s.card__button_short, "button")}>
                <span className={s.card__button__inner}>
                    <Heart />
                </span>
            </button>
            <Link to={`/story/${data.id}`} className={cn(s.card__button, s.card__button_large, "button")}>
                <span className={s.card__button__inner}>Перейти</span>
            </Link>
        </div>
    </div>
);

export default BaseCard;