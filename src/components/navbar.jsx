import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-gradient-to-b from-white to-red-600 p-4 flex flex-col sm:flex-row justify-between items-center font-sans">
      <a
        href="https://pokeapi.co"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Pokémon Logo"
          className="w-24 mb-4 sm:mb-0"
        />
      </a>

      <div className="flex flex-col sm:flex-row text-center">
        <Link to="/" className="text-black mx-2 my-2 sm:my-0">Home</Link>
        <Link to="/favorites" className="text-black mx-2 my-2 sm:my-0">Favoritos</Link>
      </div>
    </nav>
  );
}

export default NavBar;
