import React, { useEffect, useState } from 'react';
import PokemonList from '../components/pokemon-list-comp';

function PokemonListPage() {

  return (
    <div>
        <h1>Pokémon List</h1>
        <PokemonList />
    </div>
  );
}

export default PokemonListPage;
