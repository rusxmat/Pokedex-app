import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import "./css/listpage-nav.css"
import { ReactComponent as PokemonLogo } from '../../assets/pokemon.svg'

function ListPageNavBar() {

    const handleHomeClick = () => {
        window.scrollTo(0, 0);
    }

    return(
        <Navbar className='color-nav' fixed="top">
            <Nav className='m-auto'>
                <Nav.Link onClick={handleHomeClick}>
                    <Navbar.Brand className='brand-nav'>
                        <PokemonLogo fill="white" className="brand-logo"/>
                        Pokedex
                    </Navbar.Brand>
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default ListPageNavBar