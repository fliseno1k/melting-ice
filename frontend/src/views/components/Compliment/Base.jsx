import React from 'react';

import s from './Compliment.module.scss';


import { ReactComponent as Heart } from '../../../static/icons/compliment_heart.svg';
import { ReactComponent as Power } from '../../../static/icons/compliment_power.svg';
import { ReactComponent as Star } from '../../../static/icons/compliment_star.svg';

const iconsFactory = {
    "love": <Heart />,
    "motivation": <Power />,
    "wishes": <Star />
};

const Base = ({ compliment }) => {
    return (
        <div className={s.compliment}>
            <div className={s.compliment__icon}>
                {iconsFactory[compliment.tag] || iconsFactory.wishes}
            </div>
            <div className={s.compliment__pseudoContainer}></div>
            <div className={s.compliment__container}>
                <p>{compliment.text}</p>
            </div>
        </div>
    );
};

export default Base;