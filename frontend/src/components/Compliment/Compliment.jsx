import './Compliment.css';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ComplimentsService } from '../../services/compliments.service';

import Section from '../shared/Section/Section';
import Button from '../shared/Button/Button';


const Compliment = () => {
    const [loading, setLoading] = useState(true);
    const { 
        data, 
        isLoading, 
        isFetching,
        refetch 
    } = useQuery('compliment', () => ComplimentsService.getCompliment());

    const getOneMore = () => {
        refetch();
    };

    useEffect(() => {
        setTimeout(() => setLoading(isFetching), isFetching ? 0 : 1000);            
    }, [isFetching]);

    const SkeletonCard = () => (
        <div className="compliment__card">
            <div className="compliment__card__icon">
                <div className="compliment__card__icon__skeleton skeleton"></div>
            </div>
            <div className="compliment__card__pseudo-container">
            </div>
            <div className="compliment__card__container">
                <div className="compliment__card__text__skeleton compliment__card__text_large skeleton"></div>
                <div className="compliment__card__text__skeleton compliment__card__text_short skeleton"></div>
                <div className="compliment__card__text__skeleton compliment__card__text_medium skeleton"></div>
            </div>
        </div>
    );

    const OriginalCard = ({ text }) => (
        <div className="compliment__card">
            <div className="compliment__card__icon"></div>
            <div className="compliment__card__pseudo-container"></div>
            <div className="compliment__card__container">
                <p>{text}</p>
            </div>
        </div>
    );

    return (
        <Section>
            <div className="compliment">
                {loading ? (
                    <SkeletonCard />
                ) : (
                    <OriginalCard text={data.data.compliment.text} />
                )}
                <div className="compliment__action">
                    <Button 
                        size="large" 
                        onClick={getOneMore}
                        value={loading ? <span className="loader"></span> : "Хочу еще"}
                        disabled={loading}
                    />
                </div>
            </div>
        </Section>
    );
};

export default Compliment;