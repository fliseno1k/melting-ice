import './Login.css';
import { useState, useRef, useEffect } from 'react';

import { ReactComponent as Asterisk } from '../icons/asterisk.svg';

const Login = () => {
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

	const composeClassName = (key, i) => [
		'signin-form__key-char',
		i === focused ? 'focused' : ''
	].join(' ');

	return (
		<>
			<div className="overlay flex-center">
				<form className="signin-form">
					<label>Ключевое слово:</label>
					<div className="signin-form__key-wrapper">
						<label 
							htmlFor="password" 
							onInput={inputHandler}
							onFocusCapture={focusInHandler}
							onBlurCapture={focusOutHandler}
							className="signin-form__key-indicator"
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
						<span className="signin-form__notation">*ты знаешь</span>                       
					</div>
					<button className="action-button button" type="button">Войти</button>
				</form>    
			</div>      
			<div className="entry-group">
				<button className="action-button button">Продолжить</button>
			</div>
		</>
	);
};

export default Login;