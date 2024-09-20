import React from 'react';
import pika from '../images/pikallora.png';


function NoFavorites() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src={pika}
        alt="Pikachu llorando"
        className="w-48 h-48 mb-4"
      />
      <p className="text-xl text-gray-700">Sin favoritos todavía.</p>
    </div>
  );
}

export default NoFavorites;
