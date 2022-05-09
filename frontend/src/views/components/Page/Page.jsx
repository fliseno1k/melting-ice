import React from 'react';

import Container from '../Container/Container';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import s from './Page.module.scss';

const Page = ({ children }) => {
    return (
        <Container>
            <Header />
            <div className={s.page__body}>
                {children}
            </div>
            <Footer />
        </Container>
    );
};

export default Page;