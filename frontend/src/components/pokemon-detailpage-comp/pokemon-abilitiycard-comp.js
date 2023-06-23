import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import { getDisplayName } from '../../utilities/utils';
import "./css/ability-card.css"
import "../../css/type_color.css";

function PokemonAbilityCard({ability, pokemonType}) {
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
        <Card className='ability-card-container'>
            <Card.Title className='ability-title'>
                <div className={pokemonType+"-color-color"}>
                    {getDisplayName(abilityDetails.name)}
                </div>
            </Card.Title>
                {abilityDetails.effect_entries.map((entry, i) => {
                    if(entry.language.name == "en"){
                        return <div key={i}>
                            <div className='ability-effect'>   
                                <span className='effect-label'>{"Effect: "}</span>
                                <span>{entry.effect}</span>
                            </div>
                            <div>
                                <span className='effect-label'>{"Short Effect: "}</span>
                                <span>{entry.short_effect}</span>
                            </div>
                        </div>
                    }
                })}
        </Card>: <></>
    );
}

export default PokemonAbilityCard;
