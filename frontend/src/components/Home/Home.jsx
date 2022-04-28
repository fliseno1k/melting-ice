import './Home.css';
import React, { useState } from 'react';
import TabsGroup from '../shared/Tabs/TabsGroup';
import Gallery from '../Gallery/Gallery';
import Section from '../shared/Section/Section';
import Compliment from '../Compliment/Compliment';


const tabs = [
    { value: 'Истоии', slug: 'story' },
    { value: 'Комплимент', slug: 'compliment' },
];

const Home = () => {
    const [tab, setTab] = useState(tabs[0].slug);

    const handleScreenChange = (slug) => {
        setTab(slug);
    };

    return (
        <div className="home">
            <Section>
                <TabsGroup
                    items={tabs}
                    initial={tab}
                    onChange={handleScreenChange} 
                />
            </Section>
            {tab === 'story' && <Gallery />}
            {tab === 'compliment' && <Compliment />}
        </div>
    );
};

export default Home;