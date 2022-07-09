import React, { useRef } from 'react';
import cn from 'classnames';
import { useMutation } from 'react-query';
import { StoriesService } from '../../../services/stories.service';

import { BottomSheet } from 'react-spring-bottom-sheet';
import Section from '../Section/Section';
import Container from '../Container/Container';

import s from './Sheet.module.scss';
import 'react-spring-bottom-sheet/dist/style.css';

import { ReactComponent as Love } from '../../../static/icons/love.svg';
import { ReactComponent as Mail } from '../../../static/icons/mail.svg';

const Sheet = ({ data }) => {
    const sheetRef = useRef(null);

    return (
        <BottomSheet 
            ref={sheetRef}
            open={!!data}
            blocking={false}
            defaultSnap={({ maxHeight }) => maxHeight / 3}
            snapPoints={({ maxHeight }) => [
                maxHeight / 4,
                maxHeight / 3,
                maxHeight / 2,
                maxHeight / 1.5,
                maxHeight
            ]}
            header={(
                <div className={s.sheet__header}>
                    <Section>
                        <div className={s.sheet__wrapper}>
                            <div className={s.sheet__icon}>
                                <Mail />
                            </div>
                            <div className={s.sheet__title}>
                                <h2>{data.title}</h2>
                            </div>
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