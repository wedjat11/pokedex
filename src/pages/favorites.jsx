import { useEffect, useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (pokemonToRemove) => {
    const newFavorites = favorites.filter((pokemon) => pokemon.id !== pokemonToRemove.id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {favorites.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        favorites.map((pokemon) => (
          <div key={pokemon.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-bold">{pokemon.name}</h2>
            <img src={pokemon.img} alt={pokemon.name} className="mx-auto my-2" />
            <button
              onClick={() => removeFromFavorites(pokemon)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Eliminar de Favoritos
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
