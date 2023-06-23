import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/esm/Container';
import "./css/pokemon-content-section.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getPercentage, getDisplayName } from '../../utilities/utils';
import { statTotalValue } from '../../utilities/constants';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function PokemonStatsTab({pokemon}) {

  return (
    <Container>
        <Container>
            <div>
                weight: 
                {pokemon.weight}
            </div>
            <div>
                base experience:
                {(pokemon.base_experience) ? pokemon.base_experience : "Not available"}
            </div>
            <div>
                height:
                {pokemon.height}
            </div>
        </Container>

        <hr/>
        <Container>
            <div className='wthn-tab-section-title'>
                Base Stats
            </div>
            <Container className='basestats-container'>
                {pokemon.stats.map((statObj, index) => (
                    <div key={index}>
                        <div className="progress-bar-instance">
                            <Row>
                                <Col sm={3}>
                                    {getDisplayName(statObj.stat.name)}
                                </Col>
                                <Col sm={9}>
                                <ProgressBar
                                        className='progress-bar-custom'
                                        variant={'custom-progress'}
                                        now={getPercentage(statObj.base_stat, statTotalValue)} label={`${statObj.base_stat}`} 
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                ))} 
            </Container>
        </Container>
    </Container>
  );
}

export default PokemonStatsTab;