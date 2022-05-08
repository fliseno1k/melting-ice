import React, { useState, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { StoriesService } from '../../../services/stories.service';
import { AuthContext } from '../../../context/AuthProvider';

import { Navigate } from 'react-router-dom';
import Deck from '../../components/Deck/Deck';
import { BaseCard } from '../../components/Card';
import Page from '../../components/Page/Page';
import Section from '../../components/Section/Section';

import s from './Gallery.module.scss';


const Gallery = () => {
    const { isAuhthenticated } = useContext(AuthContext);
    const { data, isFetching } = useQuery('story', () => StoriesService.getStories());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(isFetching), isFetching ? 0 : 2000);            
    }, [isFetching]);

    const cards = (data?.data?.stories || []).map((story, i) => (
        <BaseCard index={i} data={story} />
    ));

    return isAuhthenticated ? (
        <Page>
            <Section text="Что бы не случилось, помни, я люблю тебя!" shadow="01">
                <Deck isLoading={loading} cards={cards} />
            </Section>
        </Page>
    ) : (
        <Navigate to="/" />
    );
};

export default Gallery;