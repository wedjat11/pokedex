import { useState, useEffect } from 'react';

const useFavorites = () => {
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

  const removeFromFavorites = (pokemonToRemove) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== pokemonToRemove.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return { favorites, addToFavorites, removeFromFavorites };
};

export default useFavorites;
