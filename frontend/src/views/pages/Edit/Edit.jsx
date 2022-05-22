import React, { useState } from 'react';

import Button from '../../components/Button/Button';
import Page from '../../components/Page/Page';
import Section from '../../components/Section/Section';
import ComplimentForm from '../../components/Form/ComplimentForm';
import StoryForm from '../../components/Form/StoryForm';

import s from './Edit.module.scss';


const Edit = () => {
    const [activeForm, setActiveForm] = useState(false);

    return (
        <Page>
            <Section text="Что будем редактировать?" shadow="Edit me">
                <div className={s.edit__tabsGroup}>
                    <Button 
                        as="button"
                        size="large"
                        type="button"
                        value="Истории"
                        onClick={() => setActiveForm("story")}
                    />
                    <Button 
                        as="button"
                        size="large"
                        type="button"
                        value="Комплименты"
                        onClick={() => setActiveForm("compliment")}
                    />
                </div>
            </Section>
            {activeForm === "story" && <StoryForm />}
            {activeForm === "compliment" && <ComplimentForm />}
        </Page>
    );
};

export default Edit;