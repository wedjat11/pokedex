import { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-red-600 p-4 flex justify-between items-center font-sans relative">

      <Link to="/" className="flex-shrink-0">
        <img
          src="/pokemonLogo.svg" 
          alt="Pokémon Logo"
          className="w-24"
        />
      </Link>

      {/* hamburguesa */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none text-3xl">
          {isOpen ? '✖️' : '☰'}
        </button>
      </div>

      {/* Menú movil*/}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-red-600 shadow-md flex flex-col text-center sm:hidden z-50">
          <Link to="/favorites" className="text-white mx-2 my-2" onClick={toggleMenu}>Favoritos</Link>
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <img
              src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
              alt="PokeAPI Logo"
              className="w-24 mx-auto my-2" 
            />
          </a>
        </div>
      )}

      {/* Menú (desktop) */}
      <div className="hidden sm:flex flex-col sm:flex-row text-center ml-auto items-center space-x-4">
        <Link to="/favorites" className="text-white mx-2 my-2 sm:my-0 text-lg">Favoritos</Link>
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            alt="PokeAPI Logo"
            className="w-24"
          />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
