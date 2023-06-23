import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import "./css/pokemon-content-section.css"
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getPercentage, getDisplayName } from '../../utilities/utils';
import { statTotalValue } from '../../utilities/constants';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Carousel from 'react-bootstrap/Carousel';

function PokemonStatsTab({pokemon}) {
    const [pokemonSpecies, setPokemonSpecies] = useState()

    useEffect(() => {
        fetchPokemonSpeciesDetail();
    }, [pokemonSpecies]);

    const fetchPokemonSpeciesDetail = async () => {
        try {
            const response = await fetch(pokemon.species.url);
            const data = await response.json();
            setPokemonSpecies(data);
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };

  return (
    <Container>

        <Container className='details-section-tab-container'>
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

        {pokemonSpecies? <div>
            <Container className='details-section-tab-container'>
                <div className='wthn-tab-section-title'>
                    Species Description
                </div>
                <Container className='carousel-desc-section'>
                    <Carousel interval={null}>
                        {pokemonSpecies.flavor_text_entries.map((descObj, i) => {
                            if(descObj.language.name == "en"){
                                return <Carousel.Item key={i} className='carousell-desc-item'>
                                    <div>
                                        <div className='desc-version'>
                                            {"Version: " + getDisplayName(descObj.version.name)}
                                        </div>
                                        <div>
                                            {descObj.flavor_text}
                                        </div>
                                    </div>
                                </Carousel.Item>
                            }
                        })}
                    </Carousel>
                </Container>
            </Container>

            <Container className='details-section-tab-container'>
                <div className='wthn-tab-section-title'>
                    Hidden Stats
                </div>
                <Container className='hidden-stats-section'>
                    <Row>
                        <Col>
                            {pokemonSpecies.genera.map((genusObj, i) => {
                                if(genusObj.language.name == "en"){
                                    return <div key={i}>
                                        <span>{"Category: "}</span>
                                        <span className='hidden-type-value'>{genusObj.genus}</span>
                                    </div>
                                }
                            })}
                            <div>
                                <span>{"Weight:  "}</span>
                                <span className='hidden-type-value'>{pokemon.weight}</span>
                            </div>
                            <div>
                                <span>{"Height: "}</span>
                                <span className='hidden-type-value'>{pokemon.height}</span>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <span>{"Base Experience: "}</span>
                                <span className='hidden-type-value'>{(pokemon.base_experience) ? pokemon.base_experience : "Not available"}</span>
                            </div>
                            <div>
                                <span>{"Base Happiness: "}</span>
                                <span className='hidden-type-value'>{pokemonSpecies.base_happiness}</span>
                            </div>
                            <div>
                                <span>{"Capture Rate: "}</span>
                                <span className='hidden-type-value'>{pokemonSpecies.capture_rate}</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>: <div>Loading..</div>}

        <Container className='details-section-tab-container'>
            <div className='wthn-tab-section-title'>
                Weakness
            </div>
            <Container className='weakness-section'>
                <Row xs="auto">
                {pokemon.weakness.map((type, index) => (
                    <Col key={index} >
                        <div className={'type-card ' + type.name + '-color'}
                            style={{marginBottom: "5px"}}
                        >
                            {(type.name).toUpperCase()}
                        </div>
                    </Col>
                ))}
                </Row>
            </Container>
        </Container>

    </Container>
  );
}

export default PokemonStatsTab;