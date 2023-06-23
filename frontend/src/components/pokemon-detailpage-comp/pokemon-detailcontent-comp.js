import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./css/pokemon-content-section.css"
import PokemonStatsTab from './pokemon-stats-tab';
import "../../css/type_color.css";
import PokemonAbilityCard from './pokemon-abilitiycard-comp';
import Container from 'react-bootstrap/esm/Container';
import PokemonMoveCard from './pokemon-movecard-comp';

function PokemonContent({pokemon}) {
  const [key, setKey] = useState('about');

  return (
        <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 content-group-tab"
        >
        <Tab eventKey="about" title="About" tabClassName='content-group-tab'>
            <PokemonStatsTab pokemon={pokemon}/>
        </Tab>
        <Tab eventKey="ability" title="Abilities" tabClassName='content-group-tab'>
            <Container>
                {pokemon.abilities.map((abilityObj, index) => (
                    <div key={index}>
                        <PokemonAbilityCard ability={abilityObj.ability} pokemonType={pokemon.types[0].type.name}/>
                    </div>
                ))}  
            </Container>
        </Tab>
        <Tab eventKey="move" title="Moves" tabClassName='content-group-tab'>
            <Container>
                {pokemon.moves.map((moveObj, index) => (
                    <div key={index}>
                        <PokemonMoveCard move={moveObj.move}/>
                    </div>
                ))}  
            </Container>
        </Tab>
        </Tabs>
  );
}

export default PokemonContent;