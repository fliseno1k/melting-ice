import React from 'react';

import s from './Footer.module.scss';

import Flowers from '../../../static/media/flowers.jpg';


const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.footer__content}>
                <span>Made with love for my wonder</span>
            </div>
            <img alt="flowers" src={Flowers} className={s.footer__background}></img>
        </footer>
    );
};

export default Footer;