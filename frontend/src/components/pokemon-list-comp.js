import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonCard from './pokemon-card-comp';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

const PAGE_SIZE = 10;

function PokemonList() {
    const [pokemonSizeList, setpokemonSizeList] = useState(1000);
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonPageNo, setPokemonPageNo] = useState(0);
    const [selectedSort, setSelectedSort] = useState("ID: Ascending");
    const [searchPokemonQuery, setsearchPokemonQuery] = useState("");

    const sortTypes = new Map([
        ["ID: Ascending", ['id', 'asc']],
        ["ID: Descending", ['id', 'desc']],
        ["Name: Ascending", ['name', 'asc']],
        ["Name: Descending", ['name', 'desc']],
    ]);

    const sortTypeArray = [
        'ID: Ascending',
        'ID: Descending',
        'Name: Ascending',
        'Name: Descending'
    ]

    useEffect(() => {
        fetchPokemonList();
    }, [selectedSort, searchPokemonQuery]);

    const fetchPokemonList = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/pokemon?',{
                    params: {
                        sort: sortTypes.get(selectedSort)[0],
                        order: sortTypes.get(selectedSort)[1],
                        offset: PAGE_SIZE*pokemonPageNo,
                        limit: PAGE_SIZE,
                        searchquery: searchPokemonQuery
                    }
                }
            )
            await setPokemonList([...pokemonList , ...response.data]);
            setPokemonPageNo(pokemonPageNo + 1);
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };

    return (
        <div
            style={{
                margin: "0px 10% 0px"
            }}
        >

            <div>
                <Form>
                    <Form.Label>Search: </Form.Label>
                    <Form.Control 
                        placeholder='Search a Pokemon...'
                        onChange={(e) => {
                            setPokemonList([]);
                            setPokemonPageNo(0);
                            setsearchPokemonQuery(e.target.value)
                        }}
                    ></Form.Control>
                </Form>
            </div>

            <div>
                <Dropdown>
                    <Dropdown.Toggle>
                        {selectedSort}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {sortTypeArray.map((sortTypes) => (
                        <Dropdown.Item
                        onClick={(e) => {
                            setSelectedSort(sortTypes)
                            setPokemonList([])
                            setPokemonPageNo(0)
                        }}
                        >
                        {sortTypes}
                        </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {(pokemonList.length > 0)?
                <InfiniteScroll
                    dataLength={pokemonList.length}
                    next={fetchPokemonList}
                    hasMore={pokemonList.length < pokemonSizeList}
                    style={{
                        overflowX: "hidden"
                    }}
                >
                    <Row xs={1} md={5}
                        style={{
                            margin: '0px'
                        }}
                    >
                        {pokemonList.map((pokemon, index) => (
                            <Col key={index}
                                style={{
                                    margin: '0px',
                                    padding: '0.5%'
                                }}
                            >
                                <PokemonCard pokemon={pokemon.url}/>
                            </Col>
                        ))}
                    
                </Row>
                </InfiniteScroll>:
                <div>Loading...</div>}
       </div>
    );
}

export default PokemonList;
