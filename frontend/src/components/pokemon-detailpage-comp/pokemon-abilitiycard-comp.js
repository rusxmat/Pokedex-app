import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import { buildColor, getDisplayName } from '../../utilities/utils';
import "./css/pokemon-detailcard.css"

function PokemonAbilityCard({ability}) {
    const [abilityDetails, setAbilityDetails] = useState();

    useEffect(() => {
        fetchAbilityDetails();
    }, [abilityDetails]);

    const fetchAbilityDetails = async () => {
        try {
            const response = await fetch(ability.url);
            const data = await response.json();
            setAbilityDetails(data);
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };

    return (
        abilityDetails?
        <Card >
            {abilityDetails.name}
        </Card>: <></>
    );
}

export default PokemonAbilityCard;
