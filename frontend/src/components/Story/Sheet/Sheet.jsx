import React, { useRef } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import Button from '../../shared/Button/Button';
import Section from '../../shared/Section/Section';
import './Sheet.css';
import 'react-spring-bottom-sheet/dist/style.css';

import { ReactComponent as Heart } from '../../../static/icons/heart.svg';
import { ReactComponent as Eye } from '../../../static/icons/eye.svg';
import { ReactComponent as Love } from '../../../static/icons/love.svg';


const Sheet = () => {
    const sheetRef = useRef(null);

    return (
        <BottomSheet 
            ref={sheetRef}
            open={true}
            blocking={false}
            defaultSnap={({ maxHeight }) => maxHeight / 4}
            snapPoints={({ maxHeight }) => [
                maxHeight / 4,
                maxHeight / 2,
                maxHeight / 1.5,
                maxHeight
            ]}
            header={(
                <div className="sheet__header">
                    <Section>
                        <div className="sheet__title">
                            <h2>Lorem ipsum!</h2>
                        </div>
                        <div className="sheet__meta">
                            <div className="sheet__meta__single sheet__meta__single_left">
                                <Heart />
                                <span>22</span>
                            </div>
                            <div className="sheet__meta__single sheet__meta__single_left">
                                <Eye />
                                <span>122</span>
                            </div>
                            <div className="sheet__meta__single sheet__meta__single_right">
                                <span>12 февраля 2012</span>
                            </div>
                        </div>
                        <div className="sheet__like">
                            <Button icon={<Heart />} size="short" />
                        </div>
                    </Section>
                </div>
            )}
        >
            <div className="sheet__background">
                <Love />
            </div>
            <div className="sheet__content">
                <Section>
                    <div className="sheet__description">
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit accusamus reprehenderit qui deleniti consequuntur optio explicabo fugit sunt omnis ducimus at, laborum veritatis vero doloremque nam quae non eligendi distinctio!</span>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit accusamus reprehenderit qui deleniti consequuntur optio explicabo fugit sunt omnis ducimus at, laborum veritatis vero doloremque nam quae non eligendi distinctio!</span>
                    </div>
                </Section>
            </div>
        </BottomSheet>        
    );
};

export default Sheet;