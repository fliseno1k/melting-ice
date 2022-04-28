import './TabsGroup.css';
import React, { useState } from 'react';

import Tab from './Tab';


const TabsGroup = ({ items, initial, onChange }) => {
    const [current, setCurrent] = useState(initial)

    const handleChange = (slug) => {
        console.log(slug);
        setCurrent(slug);
        onChange(slug);
    };

    return (
        <div className="tabs-group">
            {items.map((item, i) => (
                <Tab 
                    key={item.slug}
                    active={current === item.slug} 
                    onClick={() => handleChange(item.slug)}
                >{item.value}</Tab>
            ))}
        </div>
    );
};

export default TabsGroup;