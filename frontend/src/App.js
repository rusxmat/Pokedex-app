import React from 'react';
import PokemonListPage from './pages/pokemon-list-page';
import { BrowserRouter, Route, Routes,  Navigate } from "react-router-dom";
import PokemonInfoPage from './pages/pokemon-info-page';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact={true} path='/' element={<PokemonListPage/>}/>
          <Route exact={true} path='/pokemon/:id' element={<PokemonInfoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
