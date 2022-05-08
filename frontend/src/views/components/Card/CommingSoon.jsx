import React from 'react';
import cn from 'classnames';

import s from './Card.module.scss';

import { ReactComponent as Puzzle } from '../../../static/icons/puzzle.svg';


const CommingSoon = ({ index }) => (
    <div data-index={index} className={cn(s.card, s.card_comingSoon)}>
        <div className={s.card__flexCenter}>
            <Puzzle />
            <span>В процессе создания...</span>
        </div>
    </div>
);

export default CommingSoon;