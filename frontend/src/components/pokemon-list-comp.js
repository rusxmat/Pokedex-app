import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonCard from './pokemon-card-comp';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PokemonList() {
    const [pokemonSizeList, setpokemonSizeList] = useState(0);
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonListPage, setPokemonListPage] = useState(0);

    useEffect(() => {
        fetchPokemonList();
    }, []);

    const fetchPokemonList = async () => {
        setPokemonListPage(pokemonListPage + 1);
        console.log(pokemonListPage)
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=' + (10*pokemonListPage));
            const data = await response.json();
            setpokemonSizeList(data.count);
            setPokemonList([...pokemonList, ...data.results]);
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={pokemonList.length}
                next={fetchPokemonList}
                hasMore={pokemonList.length < pokemonSizeList}
            >
                <Row xs={1} md={5}>
                    {pokemonList.map((pokemon, index) => (
                        <Col key={index}>
                            <PokemonCard pokemon={pokemon.url}/>
                        </Col>
                    ))}
                
            </Row>
            </InfiniteScroll>
        </div>
    );
}

export default PokemonList;
