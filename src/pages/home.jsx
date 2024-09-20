import { useEffect, useState } from 'react';
import PokemonCard from '../components/pokemonCard';

function Home({ addToFavorites }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const typeColors = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    ice: 'bg-cyan-500',
    fighting: 'bg-orange-500',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-sky-500',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-stone-500',
    ghost: 'bg-indigo-500',
    dragon: 'bg-violet-500',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  useEffect(() => {
    const loadPokemons = async () => {
      setLoading(true);

      const offset = (page - 1) * 20;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const data = await response.json();

      if (!data.results.length) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const detailedPokemonList = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const pokeDetails = await res.json();
          const types = pokeDetails.types.map(typeInfo => typeInfo.type.name);
          console.log("Tipos de Pokémon:", types); 
          return {
            id: pokeDetails.id,
            name: pokeDetails.name,
            img: pokeDetails.sprites.front_shiny || pokeDetails.sprites.front_default,
            tipo: types,
            typeColors: types.map(type => typeColors[type] || 'bg-gray-500'),
            stats: pokeDetails.stats,
          };
        })
      );

      setPokemonList((prevList) => [...prevList, ...detailedPokemonList]);

      setLoading(false);
    };

    if (hasMore) {
      loadPokemons();
    }
  }, [page, hasMore]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {pokemonList.map((pokemon, index) => (
      <PokemonCard key={`${pokemon.id}-${index}`} pokemon={pokemon} addToFavorites={addToFavorites} />
    ))}
  
    {loading && <p>Cargando más Pokémon...</p>}
    {!hasMore && <p>No hay más Pokémon para mostrar.</p>}
  </div>
  );
}

export default Home;
