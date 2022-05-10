import React, { useRef } from 'react';
import cn from 'classnames';
import { useMutation } from 'react-query';
import { StoriesService } from '../../../services/stories.service';
import queryClient from '../../../services/queryClient';

import { BottomSheet } from 'react-spring-bottom-sheet';
import Section from '../Section/Section';
import Button from '../Button/Button';

import s from './Sheet.module.scss';
import 'react-spring-bottom-sheet/dist/style.css';

import { ReactComponent as Heart } from '../../../static/icons/heart.svg';
import { ReactComponent as Eye } from '../../../static/icons/eye.svg';
import { ReactComponent as Love } from '../../../static/icons/love.svg';


const monthLocales = [
    "января",
    "февраля",
    "мерта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря"
];

const Sheet = ({ data }) => {
    const sheetRef = useRef(null);
    const like = useMutation(() => StoriesService.likeStory(data.id));

    const formatDate = () => {
        const date = new Date(data.date);
        return `${date.getDate()} ${monthLocales[date.getMonth()]} ${date.getFullYear().toString().slice(2)}`;
    };

    const liked = like.isSuccess;
    const loading = like.isLoading;
    const buttonProps = {
        value: loading ? <span className="loader"></span> : null, 
        icon: loading ? null : <Heart color={liked ? "red" : "inherit"} /> 
    };

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
                                <span>{formatDate()}</span>
                            </div>
                        </div>
                        <div className={s.sheet__like}>
                            <Button 
                                {...buttonProps}
                                size="short" 
                                onClick={!liked ? like.mutate : () => {}}
                            />
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