import React from 'react';
import cn from 'classnames';

import { Link, useLocation } from 'react-router-dom';

import s  from './Header.module.scss';

import { ReactComponent as LeftChevron } from '../../../static/icons/chevron_left.svg';
import { ReactComponent as RightChevron } from '../../../static/icons/chevron_right.svg';


const routes = [
    { path: '/gallery', value: 'Сообщения' },
    { path: '/compliments', value: 'Комплименты' }
];

const Header = () => {
    const { pathname } = useLocation();

    return (
        <header className={s.header}>
            <div className={s.header__container}>
                <div className={s.header__navigation__wrapper}>
                    <nav className={s.header__navigation}>
                        {/* <button className={cn(s.header__navigation__control, s.header__navigation__control_left)}>
                            <LeftChevron />
                        </button> */}
                        <div className={s.header__navigation__container}>
                            {routes.map(route => (
                                <Link key={route.path} to={route.path} className={cn(s.header__navigation__item, route.path === pathname && s.header__navigation__item_active)}>
                                    <span>{route.value}</span>
                                </Link>
                            ))}
                        </div>
                        {/* <button className={cn(s.header__navigation__control, s.header__navigation__control_right)}>
                            <RightChevron />
                        </button> */}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;