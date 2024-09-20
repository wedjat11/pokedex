import { Pokemon } from '../models/pokemonModel';
export const fetchPokemons = async (page, signal) => {
  const offset = (page - 1) * 20;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`, { signal });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        try {
          const res = await fetch(pokemon.url, { signal });
          
          if (!res.ok) {
            throw new Error(`Error fetching details for ${pokemon.name}: ${res.status}`);
          }

          const pokeDetails = await res.json();
          const types = pokeDetails.types.map(typeInfo => typeInfo.type.name);

          return new Pokemon(
            pokeDetails.id,
            pokeDetails.name,
            pokeDetails.sprites.front_shiny || pokeDetails.sprites.front_default,
            types,
            pokeDetails.stats
          );
        } catch (error) {
          console.error(`Failed to fetch details for ${pokemon.name}:`, error);
          return null; 
        }
      })
    );
    return detailedPokemons.filter(pokemon => pokemon !== null);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request aborted');
    } else {
      console.error('Failed to fetch Pokémon list:', error);
    }
    return []; 
  }
};
