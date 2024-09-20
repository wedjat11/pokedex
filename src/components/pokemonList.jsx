import React from 'react';
import PokemonCard from './pokemonCard';

const PokemonList = ({ pokemons, addToFavorites, removeFromFavorites, favorites }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {pokemons.map((pokemon, index) => {
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
    </div>
  );
};

export default PokemonList;
