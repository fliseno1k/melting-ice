import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { StoriesService } from '../../../services/stories.service';

import Section from '../Section/Section';
import Form from './Form';
import Input from './Input';
import Row from './Row';
import Textarea from './Textarea';

const StoryForm = () => {
    const { 
        reset,
        register,
        handleSubmit
    } = useForm();

    const addCompliment = useMutation(StoriesService.addStory, {
        onSuccess: (data) => {
            reset();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const submit = (data) => {
        addCompliment.mutateAsync(data);
    };

    return (
        <Section text="Создать историю" shadow="Compl">
            <Form submit={handleSubmit(submit)} reset={reset}>
                <Row>
                    <Input 
                        label="Название истории"
                        register={register("title", { required: true })}
                    />
                </Row>
                <Row>
                    <Input 
                        label="URL для скачивания модели"
                        register={register("url", { required: true })}
                    />
                </Row>
                <Row>
                    <Textarea 
                        label="История" 
                        register={register("content", { required: true, minLength: 40 })}
                    />
                </Row>
            </Form>
        </Section>
    )
};

export default StoryForm;