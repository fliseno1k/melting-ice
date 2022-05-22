import React from 'react';

import Button from '../Button/Button';
import Row from './Row';

import s from './Form.module.scss';
import { ReactComponent as ResetIcon } from '../../../static/icons/refresh.svg';

const Form = ({ 
    children, 
    disabled, 
    submit, 
    reset 
}) => {
    return (
        <div className={s.form__wrapper}>
            <form onSubmit={submit} className={s.form__content}>
                { children }
                <Row>
                    <div className={s.form__submit}>
                        <Button 
                            as="button"
                            type="submit"
                            value="Сохранить"
                            size="large"
                            onClick={() => {}}
                            disabled={disabled}
                        />
                        <Button 
                            as="button"
                            type="submit"
                            icon={<ResetIcon fill="transparent" />}
                            size="short"
                            onClick={reset}
                            disabled={disabled}
                        />
                    </div>
                </Row>
            </form>
        </div>
    )
};

export default Form;