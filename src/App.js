import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Favorites from './pages/favorites';

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const addToFavorites = (pokemon) => {
    const updatedFavorites = [...favorites, pokemon];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (pokemonId) => {
    const updatedFavorites = favorites.filter(pokemon => pokemon.id !== pokemonId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home addToFavorites={addToFavorites} favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
