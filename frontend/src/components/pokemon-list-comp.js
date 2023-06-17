import React, { useEffect, useRef, useState } from 'react';
import PokemonCard from './pokemon-card-comp';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        fetchPokemonList();
    }, []);

    const fetchPokemonList = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
            const data = await response.json();

            setPokemonList(data.results);
            
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };

    return (
        <div>
            <Row xs={1} md={5}>
            {pokemonList.map((pokemon, index) => (
                <Col key={index}>
                    <PokemonCard pokemon={pokemon.url}/>
                </Col>
            ))}
            </Row>
        </div>
    );
}

export default PokemonList;
