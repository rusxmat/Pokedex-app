import {useLocation} from "react-router-dom";
import Col from "react-bootstrap/esm/Col.js";
import Row from "react-bootstrap/esm/Row.js";
import axios from "axios";
import { useEffect, useState } from "react";
import DetailPageNavBar from "../components/pokemon-detailpage-comp/detailpage-navbar.js";
import PokemonDetailCard from "../components/pokemon-detailpage-comp/pokemon-detailcard-comp.js";
import PokemonContent from "../components/pokemon-detailpage-comp/pokemon-detailcontent-comp.js";

function PokemonInfoPage() {
    const id = parseInt(useLocation().pathname.split("/")[2]);
    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        fetchPokemon();
    }, [id])

    const fetchPokemon = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/pokemon-details?',{
                    params: {
                        id: id,
                    }
                }
            )        
            await setPokemon(response.data);
            
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };


    return (<div>
        <DetailPageNavBar/>
            <div style={{margin: "40px 10% 100px"}}>
                {pokemon ? 
                    <Row>
                        <Col sm={4}
                            style={{marginBottom: "20px"}}
                        >
                            <PokemonDetailCard pokemon={pokemon}/> 
                        </Col>
                        <Col sm={8}>
                            <PokemonContent pokemon={pokemon}/>
                        </Col>
                    </Row>
                : <></>}
            </div>
        </div>
    );
}

export default PokemonInfoPage;
