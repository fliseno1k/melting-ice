import './Gallery.css';

import TabsGroup from '../shared/Tabs/TabsGroup';
import Deck from './Deck/Deck';
import Card from './Card/Card';
import Section from '../shared/Section/Section';


const Gallery = () => {
    const tabs = [
        { id: 1, value: "Истории" },
        { id: 2, value: "Комплименты" }
    ];

    return (
        <div className="gallery">
            <Section>
                <TabsGroup
                    items={tabs}
                    initial={tabs[0].id}
                    onChange={(i) => console.log(i)} 
                />
                <Deck>
                    <Card />
                </Deck>
            </Section>
        </div>
    );
};

export default Gallery;