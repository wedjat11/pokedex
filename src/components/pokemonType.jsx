const PokemonType = ({ types = [], typeColors = {} }) => {
    return (
      <div className="flex space-x-2 mb-4">
        {types.map((type) => (
          <span
            key={type}
            className={`px-2 py-0.5 rounded-full text-white ${typeColors[type] || 'bg-gray-500'} font-semibold text-sm`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
    );
  };
  
  export default PokemonType;
  