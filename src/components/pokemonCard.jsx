import { useState } from 'react';

function PokemonCard({ pokemon, addToFavorites }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    addToFavorites(pokemon);
  };

  const statsColors = {
    hp: 'bg-green-300',
    attack: 'bg-red-400',
    defense: 'bg-yellow-400',
    speed: 'bg-orange-400',
    'special-attack': 'bg-blue-400',
    'special-defense': 'bg-purple-400',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm mx-auto">
      <div className="text-gray-500 text-sm mb-2">#{String(pokemon.id).padStart(3, '0')}</div>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">{pokemon.name}</h2>

      <div className="flex space-x-2 mb-4">
      {Array.isArray(pokemon.tipo) && pokemon.tipo.map((type) => (
        <span
        key={type}
        className={`px-3 py-1 rounded-full text-white ${pokemon.typeColors[pokemon.tipo.indexOf(type)]} font-semibold`}
      
        >
        {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        ))}
      </div>

      <img
        src={pokemon.img}
        alt={pokemon.name}
        className="w-32 h-32 object-contain mx-auto mb-4"
      />

      <div className="mb-4">
  {Array.isArray(pokemon.stats) && pokemon.stats.slice(0, 4).map((stat) => {
    const statPercentage = (stat.base_stat / 255) * 100; 
    return (
      <div key={stat.stat.name} className="flex items-center mb-1">
        <span className="w-20 text-gray-700 capitalize">{stat.stat.name}</span>
        <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
          <div
            className={`h-2 rounded-full ${statsColors[stat.stat.name]}`}
            style={{ width: `${statPercentage}%` }} 
          ></div>
        </div>
        <span className="text-gray-700">{stat.base_stat}</span>
      </div>
    );
  })}
</div>
      <button
        onClick={handleFavoriteClick}
        className={`mt-4 px-4 py-2 w-full text-white rounded-lg ${
          isFavorite ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
      </button>
    </div>
  );
}

export default PokemonCard;
