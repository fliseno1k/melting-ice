import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useTransition, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Background from '../../components/Background/Background';

import s from './Login.module.scss';

import { ReactComponent as Asterisk } from '../../../static/icons/asterisk.svg';


const Login = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const { isAuthenticated, login, isLoading } = useAuth();
	const inputRef = useRef(null);
	const [keys, setKeys] = useState(['', '', '', '']);
	const [focused, setFocused] = useState(null);

	const inputHandler = (e) => {
		const values = e.target.value.split(''); 
		const newKeys = values.concat(['', '', '', ''].slice(values.length))
		const target = newKeys.findIndex(i => !i);
		const focused = target === -1 ? 3 : target;

		if (!!newKeys[newKeys.length - 1]) {
			setFocused(null);
			inputRef.current.blur();
		} else {
			setFocused(focused);
		}

		setKeys(newKeys);
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

	const composeClassName = (key, i) => [
		s.login__signinForm__keyChar,
		i === focused ? s.login__signinForm__keyChar_focused : ''
	].join(' ');

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/gallery", { replace: true });
        }
    }, [isAuthenticated, navigate]);


	return (
		<Container>
            <Background scale={1} />
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
                                    onChange={inputHandler}
                                    onFocusCapture={focusInHandler}
                                    onBlurCapture={focusOutHandler}
                                    className={s.signinForm__keyIndicator}
                                >
                                    {keys.map((key, i) => (
                                        <div key={i} className={composeClassName(key, i)}>
                                            {!!key && <Asterisk />}
                                        </div>
                                    ))}
                                    <input 
                                        ref={inputRef}
                                        id="password" 
                                        type="password" 
                                        maxLength="4"
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