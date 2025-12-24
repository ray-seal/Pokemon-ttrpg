'use client';

import { Location } from '@/types/game';

interface LocationViewProps {
  location: Location | undefined;
  playerName: string;
  onExplore: () => void;
  onGymChallenge: () => void;
  onPokemonCenter: () => void;
  onPokeMart: () => void;
  onPC: () => void;
  onTravel: (destination: string) => void;
}

export default function LocationView({
  location,
  playerName,
  onExplore,
  onGymChallenge,
  onPokemonCenter,
  onPokeMart,
  onPC,
  onTravel,
}: LocationViewProps) {
  if (!location) {
    return <div className="card">Location not found</div>;
  }

  return (
    <div className="card">
      <h2 className="text-3xl font-bold mb-2">{location.name}</h2>
      <p className="text-gray-400 mb-4">{location.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {location.wildPokemon && location.wildPokemon.length > 0 && (
          <button onClick={onExplore} className="btn-success py-3">
            🌿 Explore Grass
          </button>
        )}
        
        {location.hasGym && (
          <button onClick={onGymChallenge} className="btn-primary py-3">
            🥋 Challenge Gym
          </button>
        )}
        
        {location.hasPokemonCenter && (
          <button onClick={onPokemonCenter} className="btn-secondary py-3">
            🏥 Pokemon Center
          </button>
        )}
        
        {location.hasPokemonCenter && (
          <button onClick={onPC} className="btn-secondary py-3">
            💻 PC
          </button>
        )}
        
        {location.hasPokeMart && (
          <button onClick={onPokeMart} className="btn-secondary py-3">
            🏪 PokeMart
          </button>
        )}
      </div>

      {location.connectedTo && location.connectedTo.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="font-bold mb-2">Travel to:</h3>
          <div className="flex flex-wrap gap-2">
            {location.connectedTo.map((dest) => (
              <button
                key={dest}
                onClick={() => onTravel(dest)}
                className="btn bg-gray-700 hover:bg-gray-600 text-sm"
              >
                {dest.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
