import { useState, useEffect } from 'react';

function PokemonCard({ pokemon, addToFavorites, removeFromFavorites, isFavorite }) {
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

  const statsColors = {
    hp: 'bg-green-300',
    attack: 'bg-red-400',
    defense: 'bg-yellow-400',
    speed: 'bg-orange-400',
    'special-attack': 'bg-blue-400',
    'special-defense': 'bg-purple-400',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-full max-w-sm mx-auto relative">
      {/* ID y Nombre */}
      <div className="text-gray-500 text-sm mb-2">#{String(pokemon.id).padStart(3, '0')}</div>
      <h2 className="text-2xl font-bold text-black mb-2 ">{pokemon.name}</h2>

      {/* Estrella de Favoritos */}
      <div
        className={`absolute top-2 right-2 cursor-pointer text-2xl ${favorite ? 'text-yellow-400' : 'text-gray-400'}`}
        onClick={handleFavoriteClick}
      >
        ★
      </div>

      {/* Tipos de Pokémon */}
      <div className="flex space-x-2 mb-4">
        {Array.isArray(pokemon.tipo) &&
          pokemon.tipo.map((type) => (
            <span
              key={type}
              className={`px-2 py-0.5 rounded-full text-white ${pokemon.typeColors[pokemon.tipo.indexOf(type)]} font-semibold text-sm`} // Ajustes aquí
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
      </div>

      {/* Imagen del Pokémon */}
      <img src={pokemon.img} alt={pokemon.name} className="w-32 h-32 object-contain mx-auto mb-4" />

      {/* Estadísticas */}
      <div className="mb-4">
        {Array.isArray(pokemon.stats) &&
          pokemon.stats.slice(0, 4).map((stat) => {
            const statPercentage = (stat.base_stat / 255) * 100;
            return (
              <div key={stat.stat.name} className="flex items-center mb-1">
                <span className="w-20 text-gray-700 capitalize">{stat.stat.name}</span>
                <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                  <div className={`h-2 rounded-full ${statsColors[stat.stat.name]}`} style={{ width: `${statPercentage}%` }}></div>
                </div>
                <span className="w-10 text-right">{stat.base_stat}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCard;
