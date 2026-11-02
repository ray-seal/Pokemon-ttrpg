'use client';

import { Location } from '@/types/game';

interface TravelOption {
  key: string;
  name: string;
  allowed: boolean;
  reason?: string;
}

interface LocationViewProps {
  location: Location | undefined;
  playerName: string;
  onExplore: () => void;
  onGymChallenge: () => void;
  onPokemonCenter: () => void;
  onPokeMart: () => void;
  onPC: () => void;
  onTravel: (destination: string) => void;
  travelOptions: TravelOption[];
  showCollectParcel: boolean;
  showDeliverParcel: boolean;
  showTalkToDaisy: boolean;
  onCollectParcel: () => void;
  onDeliverParcel: () => void;
  onTalkToDaisy: () => void;
}

export default function LocationView({
  location, onExplore, onGymChallenge, onPokemonCenter, onPokeMart, onPC,
  onTravel, travelOptions, showCollectParcel, showDeliverParcel, showTalkToDaisy,
  onCollectParcel, onDeliverParcel, onTalkToDaisy,
}: LocationViewProps) {
  if (!location) return <div className="card">Location not found</div>;

  return (
    <div className="card">
      <h2 className="text-3xl font-bold mb-2">{location.name}</h2>
      <p className="text-gray-400 mb-4">{location.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {location.wildPokemon && location.wildPokemon.length > 0 && (
          <button onClick={onExplore} className="btn-success py-3">🌿 Explore Grass</button>
        )}
        {location.hasGym && <button onClick={onGymChallenge} className="btn-primary py-3">🥋 Challenge Gym</button>}
        {location.hasPokemonCenter && <button onClick={onPokemonCenter} className="btn-secondary py-3">🏥 Pokémon Center</button>}
        {location.hasPokemonCenter && <button onClick={onPC} className="btn-secondary py-3">💻 PC</button>}
        {location.hasPokeMart && <button onClick={onPokeMart} className="btn-secondary py-3">🏪 Poké Mart</button>}
      </div>

      {(showCollectParcel || showDeliverParcel || showTalkToDaisy) && (
        <div className="mt-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4">
          <h3 className="font-bold mb-2">📜 A little business to take care of</h3>
          {showCollectParcel && <button onClick={onCollectParcel} className="btn-primary py-2">Collect Oak&apos;s Parcel</button>}
          {showDeliverParcel && <button onClick={onDeliverParcel} className="btn-primary py-2">Deliver the parcel to Professor Oak</button>}
          {showTalkToDaisy && <button onClick={onTalkToDaisy} className="btn-primary py-2">Speak to Daisy at the rival&apos;s house</button>}
        </div>
      )}

      {travelOptions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="font-bold mb-2">Nearby routes</h3>
          <div className="flex flex-wrap gap-2">
            {travelOptions.map(option => (
              <button key={option.key} disabled={!option.allowed} title={option.reason} onClick={() => onTravel(option.key)} className="btn bg-gray-700 hover:bg-gray-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                {option.name} {option.allowed ? '→' : '🔒'}
              </button>
            ))}
          </div>
          {travelOptions.some(option => !option.allowed) && <p className="text-xs text-amber-300 mt-2">Some routes are blocked by story events or key items. Check your Town Map for details once you have it.</p>}
        </div>
      )}
    </div>
  );
}
