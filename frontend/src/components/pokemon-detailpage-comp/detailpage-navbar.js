import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import "./css/detailpage-nav.css"
import { ReactComponent as PokemonLogo } from '../../assets/pokemon.svg'
import {BiSolidLeftArrow, BiSolidRightArrow} from 'react-icons/bi'
import {useLocation, useNavigate} from "react-router-dom";

import {specialPokemonIdEnd, specialPokemonIdStart, pokemonIdNormalEnd} from '../../utilities/constants'

function DetailPageNavBar() {
    const navigate = useNavigate();
    const id = parseInt(useLocation().pathname.split("/")[2]);

    const handleHomeClick = () => {
        navigate(`/`);
    }

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

    return(
        <div className='detail-nav' fixed="top">
            {/* <Nav className={'m-auto'} > */}
                <div className="d-flex justify-content-between">
                    <div class="p-2 remove-padding">
                    {(id > 1)?
                    <div className='text-nav right-pad'>
                        <Nav.Link
                            onClick={(e) => {
                                handleMovePage(false);
                            }}
                        >
                            <BiSolidLeftArrow className="nav-icons" color='white'/>
                            Previous
                        </Nav.Link>
                        </div>: <div className='no-nav-button'></div>
                    }
                    </div>
                    <div class="p-2">
                        <Nav.Link onClick={handleHomeClick} >
                            <Navbar.Brand className='text-nav brand-nav'>
                                <PokemonLogo fill="white" className="brand-icon"/>
                                Pokedex
                            </Navbar.Brand>
                        </Nav.Link>
                    </div>
                    <div class="p-2 remove-padding">
                    {(id <= pokemonIdNormalEnd || (id < specialPokemonIdEnd && id >= specialPokemonIdStart))?
                        <div className='text-nav left-pad'>
                            <Nav.Link
                                onClick={(e) => {
                                    handleMovePage(true);
                                }}
                            >
                            Next
                            <BiSolidRightArrow className="nav-icons" color='white'/>
                        </Nav.Link>
                        </div>: <div className='no-nav-button'></div>
                    }
                    </div>
                </div>
            {/* </Nav> */}
        </div>
    )
}

export default DetailPageNavBar