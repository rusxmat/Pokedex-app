import React from 'react';
import PokemonList from '../components/pokemon-listpage-comp/pokemon-list-comp';
import ListPageNavBar from '../components/pokemon-listpage-comp/listpage-navbar-comp';

function PokemonListPage() {

  return (
    <div >
        <ListPageNavBar />
        <PokemonList />
    </div>
  );
}

export default PokemonListPage;
