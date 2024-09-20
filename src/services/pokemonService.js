import { useState, useEffect } from 'react';
import PokemonCard from '../components/pokemonCard';

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

  // Agregar y eliminar favoritos
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

  // Cargar Pokémon
  const loadMorePokemon = async () => {
    setLoading(true); 

    const offset = (page - 1) * 20; 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await response.json();

    if (data.results.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    const detailedPokemonList = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const pokeDetails = await res.json();
        const types = pokeDetails.types.map(typeInfo => typeInfo.type.name);
        return {
          id: pokeDetails.id,
          name: pokeDetails.name,
          img: pokeDetails.sprites.front_default,
          types: types,
          stats: pokeDetails.stats,
        };
      })
    );

    setPokemonList(prevList => [...prevList, ...detailedPokemonList]);
    setLoading(false); 
  };

  useEffect(() => {
    
    loadMorePokemon();
  }, []); 

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
    return () => window.removeEventListener('scroll', handleScroll); // Limpiar evento de scroll al desmontar
  }, [loading, hasMore]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pokemonList.map((pokemon, index) => {
        const isFavorite = favorites.some(fav => fav.id === pokemon.id);
        return (
          <PokemonCard
            key={`${pokemon.id}-${index}`}
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
