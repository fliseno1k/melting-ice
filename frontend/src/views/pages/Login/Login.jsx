import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useTransition, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';

import s from './Login.module.scss';

import { ReactComponent as Asterisk } from '../../../static/icons/asterisk.svg';


const Login = () => {
    const [focused, setFocused] = useState(-1);
    const [isOpen, setOpen] = useState(false);
	const [keys, setKeys] = useState('');
    const inputRef = useRef(null);

    const navigate = useNavigate();
    const { isAuthenticated, login, isLoading } = useAuth();

	const inputHandler = (e) => {
        const value = e.target.value;
        const focused = value.length;        

        if (focused >= 3) {
            inputRef.current.blur();
        }

		setKeys(value);
        setFocused(focused);
    };

	const focusInHandler = () => {
        if (isLoading) return;
        setFocused(focused + 1);
	};

	const focusOutHandler = () => {
        setFocused(focused - 1);
    };

    const outsideClickHandler = (e) => {
        if (!isLoading && e.target.className === s.login__overlay) setOpen(false);
        setFocused(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(keys);
    };

    const overlayProps = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

	const composeClassName = (i) => [
		s.login__signinForm__keyChar,
		i === focused && s.login__signinForm__keyChar_focused
	].join(' ');

    useEffect(() => {
        if (!isOpen) setKeys('');
    }, [isOpen]);

    useEffect(() => {
        if (isAuthenticated) navigate("/gallery", { replace: true });
    }, [isAuthenticated, navigate]);

	return (
		<Container>
            <div className={s.login}>
                {overlayProps((props, item) => item ? (
                    <animated.div 
                        onClick={outsideClickHandler}
                        className={s.login__overlay}
                        style={props}
                    >
                        <form onSubmit={handleSubmit} className={s.login__signinForm}>
                            <label>Ключевое слово:</label>
                            <div className={s.login__signinForm__keyWrapper}>
                                <label 
                                    htmlFor="password" 
                                    onFocusCapture={focusInHandler}
                                    onBlurCapture={focusOutHandler}
                                    className={s.signinForm__keyIndicator}
                                >
                                    {[...new Array(4).keys()].map((i) => (
                                        <div key={i} data-index={i} className={composeClassName(i)}>
                                            {focused === i && <Asterisk />}
                                        </div>
                                    ))}
                                    <input 
                                        ref={inputRef}
                                        id="password" 
                                        type="password" 
                                        maxLength="4"
                                        value={keys}
                                        onChange={inputHandler}
                                        disabled={isLoading}
                                    ></input>
                                </label> 
                                <span className={s.login__signinForm__notation}>*ты знаешь</span>                       
                            </div>
                            <Button 
                                type="submit"
                                value={isLoading ? <span className="loader"></span> : "Войти"} 
                                size="large" 
                                onClick={() => {}} 
                                disabled={isLoading}
                            />
                        </form>
                    </animated.div>
                ) : null)}
                <div className={s.login__entry}>
                    <Button 
                        value="Продолжить" 
                        size="large" 
                        onClick={() => setOpen(true)} 
                    />
                </div>
            </div>
		</Container>
	);
};

export default Login;