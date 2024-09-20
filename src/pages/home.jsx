import { useState, useEffect } from 'react';
import PokemonCard from '../components/pokemonCard';
import { fetchPokemons } from '../services/pokemonService';

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Cargar favoritos desde el localStorage 
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Función para cargar Pokémon
  const loadPokemon = async (pageToLoad, signal) => {
    setLoading(true);
    
    const detailedPokemons = await fetchPokemons(pageToLoad, signal);
    
    if (detailedPokemons.length === 0) {
      setHasMore(false);
    } else {
      setPokemonList(prevList => {
        // Evitar duplicados
        const newPokemonList = [...prevList, ...detailedPokemons];
        return Array.from(new Set(newPokemonList.map(pokemon => pokemon.id)))
          .map(id => newPokemonList.find(pokemon => pokemon.id === id));
      });
    }
    setLoading(false);
  };

  // Cargar Pokémon al montar el componente
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    loadPokemon(page, signal);

    return () => controller.abort(); // Cancelar la solicitud si el componente se desmonta
  }, [page]);

  // Infinite scroll
  useEffect(() => {
    if (hasMore) {
      loadPokemon(page);
    }
  }, [page, hasMore]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 &&
      !loading &&
      hasMore
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

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
