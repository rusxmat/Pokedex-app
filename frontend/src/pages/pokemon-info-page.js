import {useLocation, useNavigate} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import {specialPokemonIdEnd, specialPokemonIdStart, pokemonIdNormalEnd} from '../utilities/constants.js'

function PokemonInfoPage() {
    const navigate = useNavigate();
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

    const handleMovePage = (moveNext) => {
        navigate(`/pokemon/` + 
            (moveNext? 
                (id !== pokemonIdNormalEnd) ?
                    id+1 
                : specialPokemonIdStart
            : 
                (id !== specialPokemonIdStart) ?
                   id-1
                : pokemonIdNormalEnd
            )
        );
    }

    return (
        pokemon ? 
        <div >
            <Card>
                {pokemon.name}
            </Card>

            {(id > 1)?
                <Button onClick={(e) => {
                    handleMovePage(false);
                    }}>
                    Previous
                </Button>:<></>
            }

            {(id <= pokemonIdNormalEnd || (id < specialPokemonIdEnd && id >= specialPokemonIdStart))?
                <Button onClick={(e) => {
                    handleMovePage(true);
                    }}>
                    Next
                </Button>:<></>
            }       

        </div> : <></>
    );
}

export default PokemonInfoPage;
