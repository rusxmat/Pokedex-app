import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import { getDisplayName } from '../../utilities/utils';
import "./css/ability-card.css"
import "../../css/type_color.css";

function PokemonMoveCard({move}) {
    const [moveDetails, setMoveDetails] = useState();

    useEffect(() => {
        fetchMoveDetails();
    }, [moveDetails]);

    const fetchMoveDetails = async () => {
        try {
            const response = await fetch(move.url);
            const data = await response.json();
            setMoveDetails(data);
        } catch (error) {
            console.error('Failed to fetch data:', error.message);
        }
    };

    return (
        moveDetails?
        <Card className='ability-card-container'>
            <Card.Title className='ability-title'>
                <div className='d-flex flex-row'>
                    <div className={moveDetails.type.name+"-color-color move-name"}>
                        {getDisplayName(moveDetails.name)}
                    </div>
                    <div className={'type-card ' + moveDetails.type.name + '-color move-type-card'}>
                        {(moveDetails.type.name).toUpperCase()}
                    </div>
                </div>
            </Card.Title>
                {moveDetails.effect_entries.map((entry, i) => {
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

export default PokemonMoveCard;
