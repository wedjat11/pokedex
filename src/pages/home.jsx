import { useState, useEffect } from 'react';
import PokemonCard from '../components/pokemonCard';
import useInfiniteScroll from '../utils/useInfiniteScroll';
import usePokemonLoader from '../utils/usePokemonLoader';

const Home = () => {
  const [favorites, setFavorites] = useState([]);

  // Hook para manejar la paginación y carga de Pokémon
  const [page, setPage] = useState(1);
  const { pokemonList, loading, hasMore } = usePokemonLoader(page);

  // Hook para el scroll infinito
  useInfiniteScroll(() => setPage(prevPage => prevPage + 1), loading, hasMore);

  // Cargar favoritos desde el localStorage 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Funciones para manejar favoritos
  const addToFavorites = (pokemon) => {
    const updatedFavorites = [...favorites, pokemon];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (pokemonId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== pokemonId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pokemonList.map((pokemon) => {
        const isFavorite = favorites.some(fav => fav.id === pokemon.id);
        return (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorite={isFavorite} 
          />
        );
      })}
      {loading && <p>Cargando más Pokémon...</p>}
      {!hasMore && <p>No hay más Pokémon para mostrar.</p>}
    </div>
  );
};

export default Home;
