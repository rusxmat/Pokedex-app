import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./css/pokemon-content-section.css"
import PokemonStatsTab from './pokemon-stats-tab';
import "../../css/type_color.css";

function PokemonContent({pokemon}) {
  const [key, setKey] = useState('home');



  return (
    // <Container className='content-section'>
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        >
        <Tab eventKey="home" title="Stats">
            <PokemonStatsTab pokemon={pokemon}/>

        </Tab>
        <Tab eventKey="profile" title="Abilities">
            Tab content for Profile
        </Tab>
        </Tabs>
    // </Container>
  );
}

export default PokemonContent;