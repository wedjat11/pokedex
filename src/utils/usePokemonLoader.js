import { useState, useEffect, useCallback } from 'react';
import { fetchPokemons } from '../services/pokemonService';

const usePokemonLoader = (page) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPokemon = useCallback(async (pageToLoad, signal) => {
    setLoading(true);

    try {
      const detailedPokemons = await fetchPokemons(pageToLoad, signal);

      if (detailedPokemons.length === 0) {
        setHasMore(false);
      } else {
        setPokemonList(prevList => {
          const newPokemonList = [...prevList, ...detailedPokemons];
          // Evitar duplicados
          return Array.from(new Set(newPokemonList.map(pokemon => pokemon.id)))
            .map(id => newPokemonList.find(pokemon => pokemon.id === id));
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error loading Pokémon:', error);
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    loadPokemon(page, signal);

    return () => controller.abort();
  }, [page, loadPokemon]);

  return { pokemonList, loading, hasMore };
};

export default usePokemonLoader;
