import React, { useEffect } from 'react';
import cn from 'classnames';
import { useQuery, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { StoriesService } from '../../../services/stories.service';

import Container from '../../components/Container/Container';
import Scene from '../../components/Scene/Scene';
import Sheet from '../../components/Sheet/Sheet';
import Button from '../../components/Button/Button';

import s from './Story.module.scss';

import { ReactComponent as ArrowLeft } from '../../../static/icons/arrow_left.svg';
import RequireAuth from '../../hoc/RequireAuth';


const Story = () => {
    const { storyId } = useParams();
    const { data, isFetching } = useQuery('story', () => StoriesService.getStoryById(storyId));
    const view = useMutation(() => StoriesService.viewStory(storyId));

    useEffect(() => {
        view.mutate();
    }, []);

    return (
        <Container>
            <div className={s.story}>
                {isFetching ? null : (
                    <>
                        <Scene modelUrl={data?.data?.story.modelUrl} />
                        <Sheet data={data?.data?.story} />                
                    </>
                )}
                <div className={cn(s.story__controls, s.story__controls_top)}>
                    <Button
                        asLink={true}
                        to="/gallery"
                        size="short" 
                        icon={<ArrowLeft />}
                    />
                </div>
            </div>
        </Container>
    );
};

export default Story;