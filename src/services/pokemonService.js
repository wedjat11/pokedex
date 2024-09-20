// src/services/pokemonService.js
import { Pokemon } from '../models/pokemonModel';

export const fetchPokemons = async (page) => {
  const offset = (page - 1) * 20;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
  const data = await response.json();

  return Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const pokeDetails = await res.json();
      const types = pokeDetails.types.map(typeInfo => typeInfo.type.name);
      console.log(types);
      return new Pokemon(
        pokeDetails.id,
        pokeDetails.name,
        pokeDetails.sprites.front_shiny || pokeDetails.sprites.front_default,
        types,
        pokeDetails.stats
      );
      
    })
  );
};
