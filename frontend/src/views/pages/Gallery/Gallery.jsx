import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { StoriesService } from '../../../services/stories.service';

import Deck from '../../components/Deck/Deck';
import { BaseCard } from '../../components/Card';
import Page from '../../components/Page/Page';
import Section from '../../components/Section/Section';
import RequireAuth from '../../hoc/RequireAuth';


const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const { data, isFetching, isError } = useQuery('story', () => StoriesService.getStories());

    useEffect(() => {
        const loading = isFetching || isError;
        setTimeout(() => setLoading(loading), loading ? 0 : 2000);            
    }, [isFetching, isError]);

    const cards = (data?.data?.stories || []).map((story, i) => (
        <BaseCard index={i} data={story} />
    ));

    return (
        <Page>
            <Section text="Что бы не случилось, помни, я люблю тебя!" shadow="01">
                <Deck isLoading={loading} cards={cards} />
            </Section>
        </Page>
    );
};

export default Gallery;