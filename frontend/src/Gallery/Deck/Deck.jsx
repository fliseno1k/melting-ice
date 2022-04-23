import './Deck.css';
import React, { useRef, useState } from 'react';
import { useSprings, animated, to as interpolate } from 'react-spring';
import { useDrag } from '@use-gesture/react';

import Card from '../Card/Card';

const cardsData = [...new Array(5).keys()]

const calculateX = (i) => Math.min(i, 2) * 10;
const calculateScale = (i) => 1 - Math.min(i, 2) * 0.05;
const calculateRotation = (i) => Math.min(i, 2) * 50;

const to = (i, length) => ({
    y: 0,
    x: calculateX(i),
    rot: calculateRotation(i),
    scale: calculateScale(i),
    zIndex: length - i,
    onRest: null
});

const from = (i, length) => ({
    x: 0,
    rot: 0,
    scale: 1,
    y: 0,
    zIndex: length - i
});

const trans = (x, y, r, s) => `
    translate3d(calc(-50% + ${x}px),${y}px,0)
    rotateZ(${r / 10}deg) 
    scale(${s})
`;

const Deck = () => {
    const [cards, setCards] = useState(cardsData);
    const offset = useRef(0);
    const [props, set] = useSprings(cards.length, (i) => ({
        ...to(i, cards.length),
        from: from(i, cards.length)
    }));


    const onSlideOut = () => {
        offset.current = (offset.current + 1) % cards.length

        set((i) => {
            const index = i - offset.current
            const targetIndex = index >= 0 ? index : cards.length + (0 + index)
            const r = to(targetIndex, cards.length)

            return { 
                ...r, 
                from: { zIndex: cards.length - targetIndex } 
            };
        });
    };

    const bind = useDrag(({ 
        down, 
        movement,
        args: [index], 
        delta: [xDelta], 
        direction: [xDir], 
    }) => {
        set((i) => {
            if (index !== i || i !== offset.current) return;

            const isGone = !down && Math.abs(movement[0]) > 100;
            const x = isGone ? xDir * 300 : down ? i * 4 + movement[0] : 0;
            const y = down ? i * 4 + movement[1] : i * 4;
            const rot = down ? movement[0] * 0.5 : 0;
            const scale = isGone ? 0.8 : down ? 1.1 : 1;

            return { 
                x, 
                y, 
                rot, 
                scale, 
                onRest: isGone ? onSlideOut : null 
            };
        });
    });

    return (
        <div className="deck">
            {props.map(({ x, y, rot, scale, zIndex }, i) => (
                <animated.div 
                    key={i}
                    {...bind(i)}
                    style={{
                        zIndex,
                        transform: interpolate([x, y, rot, scale], trans)
                    }}
                    className="card-wrapper"
                >
                    <Card  index={i} />
                </animated.div>
            ))}
        </div>
    );
};

export default Deck;