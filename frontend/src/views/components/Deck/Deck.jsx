import React from 'react';

import { SwiperSlide, Swiper } from 'swiper/react';
import { CommingSoonCard, SkeletonCard } from '../Card';

import s from './Deck.module.scss';


const skeletonCards = [...new Array(5).keys()];

const Deck = ({ cards, isLoading }) => {
    return (
        <div className={s.deck}>
            <Swiper
                slidesPerView="auto"
                spaceBetween={20}
            >   
                {isLoading ? (
                    skeletonCards.map(card => (
                        <SwiperSlide key={card}>
                            <SkeletonCard />
                        </SwiperSlide>                    
                    )
                )) : (
                    <>
                        {cards.map((card, i) => (
                            <SwiperSlide key={i}>
                                {card}
                            </SwiperSlide>
                        ))}
                        <SwiperSlide key={cards.length}>
                            <CommingSoonCard index={cards.length} />
                        </SwiperSlide>
                    </>
                )}
            </Swiper>
        </div>
    );
};

export default Deck;