const PokemonStats = ({ stats }) => {
    const statsColors = {
      hp: 'bg-green-300',
      attack: 'bg-red-400',
      defense: 'bg-yellow-400',
      speed: 'bg-orange-400',
      'special-attack': 'bg-blue-400',
      'special-defense': 'bg-purple-400',
    };
  
    const statAbbreviations = {
      hp: 'HP',
      attack: 'Atk',
      defense: 'Def',
      speed: 'Speed',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
    };
  
    return (
      <div className="mb-4">
        {stats.slice(0, 4).map((stat) => {
          const statPercentage = (stat.base_stat / 255) * 100;
          return (
            <div key={stat.stat.name} className="flex items-center mb-1">
              <span className="w-20 text-gray-700 capitalize">
                {statAbbreviations[stat.stat.name] || stat.stat.name}
              </span>
              <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                <div className={`h-2 rounded-full ${statsColors[stat.stat.name]}`} style={{ width: `${statPercentage}%` }}></div>
              </div>
              <span className="w-10 text-right">{stat.base_stat}</span>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default PokemonStats;
  