import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import s from './Card.module.scss';


const BaseCard = ({ data, index }) => (
    <div data-index={index} className={s.card}>
        <Link to={`/story/${data.id}`} className={s.card__linkOverlay}></Link>
        <div className={s.card__asset}>
            <img alt="Girl" src={data.imageUrl} />
        </div>
        <div className={s.card__content}>
            <h2 className={s.card__title}>{data.title}</h2>
            <span className={s.card__text}>
                {data.content}
            </span>
        </div>
    </div>
);

export default BaseCard;