import { useState, useEffect } from 'react'; 
import PokemonType from './pokemonType';
import PokemonStats from './pokemonStats';

const PokemonCard = ({ pokemon, addToFavorites, removeFromFavorites, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(pokemon.id);
    } else {
      addToFavorites(pokemon);
    }
    setFavorite(!favorite); 
  };

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

  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-sm mx-auto relative">
      <div className="text-gray-500 text-sm mb-2">#{String(pokemon.id).padStart(3, '0')}</div>
      <h2 className="text-2xl font-bold text-black mb-2">{pokemon.name}</h2>
      <div
        className={`absolute top-2 right-2 cursor-pointer text-2xl ${favorite ? 'text-yellow-400' : 'text-gray-400'}`}
        onClick={handleFavoriteClick}
      >
        ★
      </div>
      <PokemonType types={pokemon.types || []} typeColors={typeColors} />
      <img src={pokemon.img} alt={pokemon.name} className="w-32 h-32 object-contain mx-auto mb-4" />
      <PokemonStats stats={pokemon.stats} />
    </div>
  );
};

export default PokemonCard;
