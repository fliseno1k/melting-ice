import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ComplimentsService } from '../../../services/compliments.service';

import Section from '../Section/Section';
import Form from './Form';
import Radio from './Radio';
import Row from './Row';
import Textarea from './Textarea';


const complimentTags = [
    { value: "Любовь", slug: "love" },
    { value: "Мотивация", slug: "motivation" },
    { value: "Пожелания", slug: "wishes" }
];

const ComplimentForm = () => {
    const { 
        reset,
        register,
        handleSubmit
    } = useForm();

    const addCompliment = useMutation(ComplimentsService.addCompliment, {
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
        <Section text="Создать комплимент" shadow="Compl">
            <Form submit={handleSubmit(submit)} reset={reset}>
                <Row>
                    <Radio 
                        label="Тег комплимента" 
                        options={complimentTags}
                        name={"tag"}
                        register={register}
                    />
                </Row>
                <Row>
                    <Textarea 
                        label="Комплимент" 
                        register={register("text", { required: true, minLength: 10 })}
                    />
                </Row>
            </Form>
        </Section>
    )
};

export default ComplimentForm;