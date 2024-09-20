import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-blue-500 p-4 flex flex-col sm:flex-row justify-between items-center">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        alt="Pokémon Logo"
        className="w-24 mb-4 sm:mb-0"
      />
      <div className="flex flex-col sm:flex-row text-center">
        <Link to="/" className="text-white mx-2 my-2 sm:my-0">Home</Link>
        <Link to="/favorites" className="text-white mx-2 my-2 sm:my-0">Favoritos</Link>
        <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-white mx-2 my-2 sm:my-0">
          PokeAPI
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
