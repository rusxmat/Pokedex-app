import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

function PokemonCard({pokemon}) {    

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

    return (
        pokemonDetails ?
        (<Card>
            <img src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (pokemonDetails.id < 10? "00": pokemonDetails.id < 100? "0": "") + pokemonDetails.id + ".png"}/>
            <div style={{backgroundColor: "red"}}>
                <div>{pokemonDetails.id}</div>
                <div>{pokemonDetails.name}</div> 
                <div>
                    {pokemonDetails.types.map((types, index) => (
                        <div key={index}>{types.type.name}</div>
                    ))}
                </div>
            </div>
        </Card>): <></>
    );
}

export default PokemonCard;
