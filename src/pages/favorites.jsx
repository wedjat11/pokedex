import NoFavorites from '../components/noFav';
import useFavorites from '../utils/useFavorites';

function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Favoritos</h1>
      {favorites.length === 0 ? (
        <NoFavorites />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((pokemon) => (
            <div key={pokemon.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold">{pokemon.name}</h2>
              <img src={pokemon.img} alt={pokemon.name} className="mx-auto my-2" />
              <button
                onClick={() => removeFromFavorites(pokemon)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Eliminar de Favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
