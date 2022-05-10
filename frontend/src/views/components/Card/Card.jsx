import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import s from './Card.module.scss';


const BaseCard = ({ data, index }) => (
    <div data-index={index} className={s.card}>
        <div className={s.card__asset}>
            <img alt="Girl" src={data.imageUrl} />
        </div>
        <div className={s.card__content}>
            <h2 className={s.card__title}>{data.title}</h2>
            <span className={s.card__text}>
                {data.content}
            </span>
        </div>
        <div className={s.card__actions}>
            <Link to={`/story/${data.id}`} className={cn(s.card__button, s.card__button_large, "button")}>
                <span className={s.card__button__inner}>Читать...</span>
            </Link>
        </div>
    </div>
);

export default BaseCard;