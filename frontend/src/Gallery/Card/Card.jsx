import './Card.css';

import { ReactComponent as Heart } from '../../static/icons/heart.svg';

import cardImage from '../../static/media/card.jpg';


const Card = ({ index }) => {
    return (
        <div data-index={index} className="card">

            <div className="card__asset">
                <img alt="Girl" src={cardImage} />
            </div>
            <div className="card__content">
                <span className="card__text">
                    Знаешь, если бы все было иначе, если бы мы не встретились или же просто не обратили друг на друга никакого внимания
                </span>
            </div>
            <div className="card__actions">
                <button className="card__button card__button_short button">
                    <span className="card__button__inner">
                        <Heart />
                    </span>
                </button>
                <button className="card__button card__button_large button">
                    <span className="card__button__inner">Перейти</span>
                </button>
            </div>
        </div>
    );
};

export default Card;