import React, { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';

import s from './Login.module.scss';

import { ReactComponent as Asterisk } from '../../../static/icons/asterisk.svg';


const Login = () => {
    const { isAuthenticated, login, isLoading } = useContext(AuthContext);
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
		const target = keys.findIndex(i => !i);
		const focused = target === -1 ? 3 : target;

		setFocused(focused);
	};

	const focusOutHandler = () => {
		setFocused(false);
	};

    const handleSubmit = (e) => {
        e.preventDefault();
        login(keys.join(''));
    };

	const composeClassName = (key, i) => [
		s.login__signinForm__keyChar,
		i === focused ? s.login__signinForm__keyChar_focused : ''
	].join(' ');

	return (
		<Container>
            <div className={s.login}>
                <div className={s.login__overlay}>
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
                                    <div key={i} className={composeClassName(key, i)}>
                                        {!!key && <Asterisk />}
                                    </div>
                                ))}
                                <input 
                                    ref={inputRef}
                                    id="password" 
                                    type="password" 
                                    maxLength="4"
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
                </div>      
                <div className={s.login__entry}>
                    <Button 
                        value="Продолжить" 
                        size="large" 
                        onClick={() => {}} 
                    />
                </div>
            </div>
		</Container>
	);
};

export default Login;