import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import "./css/pokemon-card.css";
import "../../css/type_color.css";

import { useNavigate } from "react-router-dom";
import { buildColor, getDisplayName } from '../../utilities/utils';

function PokemonCard({pokemon}) {    
    const navigate = useNavigate();
    const [pokemonDetails, setPokemonDetails] = useState();

    useEffect(() => {
        fetchPokemonDetails();
    }, []);

    const fetchPokemonDetails = async () => {
        try {
            const response = await fetch(pokemon);
            const data = await response.json();
            setPokemonDetails(data);
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };

    const handleCardClick = () => {
        navigate(`/pokemon/${pokemonDetails.id}`);
    }

    return (
        pokemonDetails ?
        (<Card 
            style={{ background: ('linear-gradient(10deg, #ffffff  50%, rgba(0,0,0,0) 30%), linear-gradient(10deg, ' + buildColor(pokemonDetails.types[0].type.name, false) + ' 60%, ' + buildColor(pokemonDetails.types[0].type.name, true) + '60%)'), }}
            className='card-container'
            onClick={handleCardClick}
        >
            <img 
                id="card-img"
                src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (pokemonDetails.id < 10? "00": pokemonDetails.id < 100? "0": "") + pokemonDetails.id + ".png"}
                alt = {"Image of " + pokemonDetails.name}
            />
            <div className='id-detail'>{"#" + (pokemonDetails.id < 10? "00": pokemonDetails.id < 100? "0": "") + pokemonDetails.id}</div>
            <div className='name-detail'>{getDisplayName(pokemonDetails.name)}</div>
            <div className="d-flex">
                {pokemonDetails.types.map((typeObj, index) => (
                    <div key={index} className={'p-2 type-card ' + typeObj.type.name + '-color'}
                    >
                        {(typeObj.type.name).toUpperCase()}
                    </div>
                ))}  
            </div> 
        </Card>): <></>
    );
}

export default PokemonCard;
