import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./css/pokemon-content-section.css"
import PokemonStatsTab from './pokemon-stats-tab';
import "../../css/type_color.css";
import PokemonAbilityCard from './pokemon-abilitiycard-comp';

function PokemonContent({pokemon}) {
  const [key, setKey] = useState('about');



  return (
    // <Container className='content-section'>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
        <Tab eventKey="about" title="About">
            <PokemonStatsTab pokemon={pokemon}/>
        </Tab>
        <Tab eventKey="ability" title="Abilities">
            {pokemon.abilities.map((abilityObj, index) => (
                <div key={index}>
                    <PokemonAbilityCard ability={abilityObj.ability}/>
                </div>
            ))}  
        </Tab>
        </Tabs>
    // </Container>
  );
}

export default PokemonContent;