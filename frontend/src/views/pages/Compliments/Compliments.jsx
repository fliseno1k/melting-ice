import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { ComplimentsService } from '../../../services/compliments.service';
import { AuthContext } from '../../../context/AuthProvider';

import { Navigate } from 'react-router-dom';
import { BaseCompliment, SkeletonCompliment } from '../../components/Compliment';
import Button from '../../components/Button/Button';
import Page from '../../components/Page/Page';
import Section from '../../components/Section/Section';

import s from './Compliments.module.scss';


const Compliments = () => {
    const { isAuhthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const { 
        data, 
        isFetching,
        refetch 
    } = useQuery('compliment', () => ComplimentsService.getCompliment());

    const getOneMore = () => {
        refetch();
    };

    useEffect(() => {
        setTimeout(() => setLoading(isFetching), isFetching ? 0 : 2000);            
    }, [isFetching]);

    return isAuhthenticated ? (
        <Page>
            <Section text="Глоточки хорошего настроения" shadow="02">
                <div className={s.compliments}>
                    <div className={s.compliments__content}>
                        {loading ? <SkeletonCompliment /> : <BaseCompliment compliment={data.data.compliment} />}
                    </div>
                    <div className={s.compliments__action}>
                        <Button 
                            size="large"
                            onClick={getOneMore}
                            value={loading ? <span className="loader"></span> : <span>Ещё</span>}
                        />
                    </div>
                </div>
            </Section>
        </Page>
    ) : (
        <Navigate to="/" />
    );
};

export default Compliments;