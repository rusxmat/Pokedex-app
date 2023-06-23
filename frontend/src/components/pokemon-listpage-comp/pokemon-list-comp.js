import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonCard from './pokemon-card-comp';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import "./css/listpage-filter-dropdown.css"
import Button from 'react-bootstrap/esm/Button';
import {totalPokemon} from '../../utilities/constants.js'

const PAGE_SIZE = 10;

function PokemonList() {
    const [pokemonSizeList, setpokemonSizeList] = useState(totalPokemon);
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
                margin: "100px 10% 100px"
            }}
        >
                <Row className="d-flex align-items-center filter-dropdown-section">
                    <Col class="mr-auto p-2">
                        <Form>
                            <Container className="d-flex align-items-center">
                                <Form.Label className='filter-label'>Filter:</Form.Label>
                                <Form.Control 
                                    placeholder='Search a Pokemon...'
                                    onChange={(e) => {
                                        setPokemonList([]);
                                        setPokemonPageNo(0);
                                        setsearchPokemonQuery(e.target.value)
                                    }}
                                    className='filter-input'
                                ></Form.Control>
                            </Container>
                        </Form>
                    </Col>
                    <Col class="p-2">
                        <Container className="d-flex align-items-center">
                            <Container style={{textAlign: 'right'}} >  Sort by: </Container>
                            <Dropdown>
                                <Dropdown.Toggle className='dropdown-comp'>
                                    {selectedSort}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                {sortTypeArray.map((sortTypes) => (
                                    <Dropdown.Item
                                    onClick={(e) => {
                                        if(selectedSort !== sortTypes){
                                            setSelectedSort(sortTypes)
                                            setPokemonList([])
                                            setPokemonPageNo(0)
                                        }
                                    }}
                                    >
                                    {sortTypes}
                                    </Dropdown.Item>
                                ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                    </Col>
                </Row>

            {
                (pokemonList.length > 0)?
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
                    <div className="d-flex justify-content-center none-found-msg" >No Pokemon found</div>
            }
            {(pokemonList.length < pokemonSizeList) ?
                    <Container className="d-flex justify-content-center" >
                        <Button 
                            onClick={fetchPokemonList}
                            className='load-more-button'
                        >Click This or Scroll to Load More</Button>
                    </Container>
            : <></>}
       </div>
    );
}

export default PokemonList;
