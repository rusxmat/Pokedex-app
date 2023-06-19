import React, { useEffect, useState } from 'react';
import PokemonList from '../components/pokemon-list-comp';
import './pokemon-list-page.css';

function PokemonListPage() {

  return (
    <div 
    style={{
      overflowX: 'none'
  }}
    >
        <div>navbar</div>
        <div>navbar</div>
        <div>navbar</div>
        <div>navbar</div>
        <div>navbar</div>
        <div>navbar</div>
        <PokemonList />
    </div>
  );
}

export default PokemonListPage;
