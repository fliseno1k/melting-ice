import React from 'react';
import { useSpring, animated } from 'react-spring';

import Container from '../Container/Container';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import s from './Page.module.scss';

const Page = ({ children }) => {

    const styles = useSpring({ 
        from: { y: 30, opacity: 0 },
        to: { y: 0, opacity: 1 },
        config: {
            duration: 300
        }
    });

    return (
        <Container>
            <Header />
            <div className={s.page__body}>
                <animated.div style={styles}>
                    {children}
                </animated.div>
            </div>
            <Footer />
        </Container>
    );
};

export default Page;