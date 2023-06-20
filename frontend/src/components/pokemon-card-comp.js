import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate } from "react-router-dom";

function PokemonCard({pokemon}) {    
    const navigate = useNavigate();
    const [pokemonDetails, setPokemonDetails] = useState();

    function getDisplayName(pokemonName){
        const pokemonDisplayName = pokemonName.replace(/-/g, " ");
        const pokemonDisplayNameSplit = pokemonDisplayName.split(" ");

        for(var i = 0; i<pokemonDisplayNameSplit.length; i++){
            pokemonDisplayNameSplit[i] = pokemonDisplayNameSplit[i].charAt(0).toUpperCase() + pokemonDisplayNameSplit[i].slice(1);
        }

        return pokemonDisplayNameSplit.join(" ");
    }

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
            style={{
                // width: "100%"
                // outlineColor: "white",
                // margin: "0px"
                // background: '-webkit-linear-gradient(80deg, #ffffff  50%, rgba(0,0,0,0) 30%), -webkit-linear-gradient(30deg, #63e89e 60%, #ff7ee3 60%)',
                // background: '-o-linear-gradient(70deg, #fff810  30%, rgba(0,0,0,0) 30%), -o-linear-gradient(30deg, #63e89e 60%, #ff7ee3 60%)',
                // background: '-moz-linear-gradient(70deg, #fff810  30%, rgba(0,0,0,0) 30%), -moz-linear-gradient(30deg, #63e89e 60%, #ff7ee3 60%)',
                // background: 'linear-gradient(70deg, #fff810  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, #63e89e 60%, #ff7ee3 60%)',
            }}

            onClick={handleCardClick}
        >
            <img
                // style={{
                //     position: "absolute",
                //     // top: "10px",
                //     maxHeight: "100%",
                //     maxWidth: "100%",
                //     zIndex: "1"
                // }} 
                src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (pokemonDetails.id < 10? "00": pokemonDetails.id < 100? "0": "") + pokemonDetails.id + ".png"}
            />

            <div>{"#" + (pokemonDetails.id < 10? "00": pokemonDetails.id < 100? "0": "") + pokemonDetails.id}</div>
            <div>{getDisplayName(pokemonDetails.name)}</div>
            <Row>
                {pokemonDetails.types.map((types, index) => (
                    <Col>
                        <div key={index}>{types.type.name}</div>
                    </Col>
                ))}  
            </Row> 
        </Card>): <></>
    );
}

export default PokemonCard;
