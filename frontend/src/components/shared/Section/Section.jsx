import './Section.css';
import React from 'react';


const Section = ({ children, fullScreen=true }) => (
    <section className={`section ${fullScreen ? 'section_full-screen' : ''}`}>
        {children}
    </section>
);

export default Section;