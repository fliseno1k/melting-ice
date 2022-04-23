import './Section.css';
import React from 'react';


const Section = ({ children }) => (
    <section class="section">
        {children}
    </section>
);

export default Section;