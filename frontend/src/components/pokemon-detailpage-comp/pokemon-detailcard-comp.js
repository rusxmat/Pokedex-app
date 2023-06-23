import Card from 'react-bootstrap/Card';
import { buildColor, getDisplayName } from '../../utilities/utils';
import "./css/pokemon-detailcard.css"

function PokemonDetailCard({pokemon}) {

    return (
        <Card 
            style={{ background: ('linear-gradient(10deg, #ffffff  50%, rgba(0,0,0,0) 30%), linear-gradient(10deg, ' + buildColor(pokemon.types[0].type.name, false) + ' 60%, ' + buildColor(pokemon.types[0].type.name, true) + '60%)'), }}
            className='card-container-detailcard '
        >
            <img 
                src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + (pokemon.id < 10? "00": pokemon.id < 100? "0": "") + pokemon.id + ".png"}
                alt = {"Image of " + pokemon.name}
            />
            <div className='id-detail-detailcard '>{"#" + (pokemon.id < 10? "00": pokemon.id < 100? "0": "") + pokemon.id}</div>
            <div className='name-detail-detailcard '>{getDisplayName(pokemon.name)}</div>
            <div className="d-flex">
                {pokemon.types.map((typeObj, index) => (
                    <div key={index} className={'p-2 type-card-detailcard  ' + typeObj.type.name + '-color'}
                    >
                        {(typeObj.type.name).toUpperCase()}
                    </div>
                ))}  
            </div> 
        </Card>
    );
}

export default PokemonDetailCard;
