import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import s from './Button.module.scss';


const Button = ({
    type="button",
    to=null, 
    asLink=false, 
    value, 
    icon, 
    attrs,
    size="short", 
    disabled, 
    onClick
}) => {

    const RoleTag = ({ children, ...props }) => asLink ? (
        <Link to={to} {...props}>
            {children}
        </Link>
    ) : (
        <button type={type} onClick={onClick} {...props}>
            {children}
        </button>
    );

    const className = cn(s.button, s[`button_size_${size}`]);

    return (
        <RoleTag className={className} disabled={disabled} {...attrs}>
            <div className={s.button__inner}>
                {value || icon}
            </div>
        </RoleTag>
    );
};

export default Button;