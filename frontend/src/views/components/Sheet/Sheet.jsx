import React, { useRef } from 'react';
import cn from 'classnames';

import { BottomSheet } from 'react-spring-bottom-sheet';
import Section from '../Section/Section';
import Button from '../Button/Button';

import s from './Sheet.module.scss';
import 'react-spring-bottom-sheet/dist/style.css';

import { ReactComponent as Heart } from '../../../static/icons/heart.svg';
import { ReactComponent as Eye } from '../../../static/icons/eye.svg';
import { ReactComponent as Love } from '../../../static/icons/love.svg';


const Sheet = ({ data }) => {
    const sheetRef = useRef(null);

    return (
        <BottomSheet 
            ref={sheetRef}
            open={!!data}
            blocking={false}
            defaultSnap={({ maxHeight }) => maxHeight / 4}
            snapPoints={({ maxHeight }) => [
                maxHeight / 4,
                maxHeight / 2,
                maxHeight / 1.5,
                maxHeight
            ]}
            header={(
                <div className={s.sheet__header}>
                    <Section>
                        <div className={s.sheet__title}>
                            <h2>{data.title}</h2>
                        </div>
                        <div className={s.sheet__meta}>
                            <div className={cn(s.sheet__meta__single, s.sheet__meta__single_left)}>
                                <Heart />
                                <span>{data.likes}</span>
                            </div>
                            <div className={cn(s.sheet__meta__single, s.sheet__meta__single_left)}>
                                <Eye />
                                <span>{data.views}</span>
                            </div>
                            <div className={cn(s.sheet__meta__single, s.sheet__meta__single_right)}>
                                <span>12 февраля 2012</span>
                            </div>
                        </div>
                        <div className={s.sheet__like}>
                            <Button icon={<Heart />} size="short" />
                        </div>
                    </Section>
                </div>
            )}
        >
            <div className={s.sheet__background}>
                <Love />
            </div>
            <div className={s.sheet__content}>
                <Section>
                    <div className={s.sheet__description}>
                        <p>{data.content}</p>
                    </div>                    
                </Section>
            </div>
        </BottomSheet>        
    );
};

export default Sheet;