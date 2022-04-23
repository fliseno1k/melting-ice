import './TabsGroup.css';
import React, { useState } from 'react';

import Tab from './Tab';


const TabsGroup = ({ items, initial, onChange }) => {
    const [current, setCurrent] = useState(initial)

    const handleChange = (id) => {
        setCurrent(id);
        onChange(id);
    };

    return (
        <div className="tabs-group">
            {items.map((item, i) => (
                <Tab 
                    key={item.id}
                    active={current === item.id} 
                    onClick={() => handleChange(i)}
                >{item.value}</Tab>
            ))}
        </div>
    );
};

export default TabsGroup;