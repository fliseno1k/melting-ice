import './Deck.css';
import React, { useRef, useState } from 'react';

import { SwiperSlide, Swiper } from 'swiper/react';
import Card from '../Card/Card';


const cardsData = [...new Array(5).keys()]

const Deck = () => {
    const [cards, setCards] = useState(cardsData);

    return (
        <div className="deck">
            <Swiper
                slidesPerView="auto"
                spaceBetween={20}
            >
                {cards.map(card => (
                    <SwiperSlide key={card}>
                        <Card index={card} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Deck;