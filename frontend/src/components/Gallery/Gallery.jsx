import './Gallery.css';

import TabsGroup from '../shared/Tabs/TabsGroup';
import Deck from './Deck/Deck';
import Card from './Card/Card';
import Section from '../shared/Section/Section';


const Gallery = () => {
    return (
        <div className="gallery">
            <Section>
                <Deck></Deck>
            </Section>
        </div>
    );
};

export default Gallery;