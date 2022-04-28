import React, { useState } from 'react';
import Scene from './Scene/Scene';
import Sheet from './Sheet/Sheet';
import Button from '../shared/Button/Button';
import Section from '../shared/Section/Section';
import './Story.css';

import { ReactComponent as ArrowLeft } from '../../static/icons/arrow_left.svg';


const Story = () => {
    return (
        <div className="story">
            <Scene />
            <Sheet/>
            <div className="story__controls story__controls_top">
                <Section>
                    <Button 
                        size="short" 
                        icon={<ArrowLeft />}
                        onClick={() => {}} 
                    />
                </Section>
            </div>
        </div>
    );
};

export default Story;
