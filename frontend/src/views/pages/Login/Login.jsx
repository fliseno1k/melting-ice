import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useTransition, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';

import s from './Login.module.scss';

import { ReactComponent as Asterisk } from '../../../static/icons/asterisk.svg';


const Login = () => {
    const [isOpen, setOpen] = useState(false);
	const [focused, setFocused] = useState(null);
	const [keys, setKeys] = useState(['', '', '', '']);

    const inputRef = useRef(null);

    const navigate = useNavigate();
    const { isAuthenticated, login, isLoading } = useAuth();


	const inputHandler = (e) => {
        const value = e.target.value;

        const values = [...Array.from(value), ...new Array(4 - value.length).fill('')];
        const focused = value.length < 4;

		if (!focused) {
			inputRef.current.blur();
        }

        setFocused(focused);
		setKeys(values);
	};

	const focusInHandler = () => {
        if (isLoading) return;
		const target = keys.findIndex(i => !i);
		const focused = target === -1 ? 3 : target;

		setFocused(focused);
	};

	const focusOutHandler = () => {
		setFocused(false);
	};

    const outsideClickHandler = (e) => {
        if (!isLoading && e.target.className === s.login__overlay) {
            setOpen(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(keys.join(''));
    };

    const overlayProps = useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

	const composeClassName = (_, i) => [
		s.login__signinForm__keyChar,
		i === focused ? s.login__signinForm__keyChar_focused : ''
	].join(' ');


    useEffect(() => {
        if (!isOpen) {
            setKeys(['', '', '', '']);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/gallery", { replace: true });
        }
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
                                    onInput={inputHandler}
                                    onFocusCapture={focusInHandler}
                                    onBlurCapture={focusOutHandler}
                                    className={s.signinForm__keyIndicator}
                                >
                                    {keys.map((key, i) => (
                                        <div key={i} data-index={i} className={composeClassName(key, i)}>
                                            {!!key && <Asterisk />}
                                        </div>
                                    ))}
                                    <input 
                                        ref={inputRef}
                                        id="password" 
                                        type="password" 
                                        maxLength="4"
                                        value={keys.join('')}
                                        onInput={inputHandler}
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