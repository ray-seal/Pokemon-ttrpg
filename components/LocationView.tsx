'use client';

import { Location, NPC, TrainerEncounter } from '@/types/game';

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
  npcs: NPC[];
  trainers: TrainerEncounter[];
  defeatedTrainers: string[];
  onTalkToNpc: (npcId: string) => void;
  onChallengeTrainer: (trainerId: string) => void;
  canChallengeGym: boolean;
}

export default function LocationView({
  location, onExplore, onGymChallenge, onPokemonCenter, onPokeMart, onPC, onTravel, travelOptions,
  npcs, trainers, defeatedTrainers, onTalkToNpc, onChallengeTrainer, canChallengeGym,
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
        {canChallengeGym && <button onClick={onGymChallenge} className="btn-primary py-3">🥋 Challenge Gym</button>}
        {location.hasPokemonCenter && <button onClick={onPokemonCenter} className="btn-secondary py-3">🏥 Pokémon Center</button>}
        {location.hasPokemonCenter && <button onClick={onPC} className="btn-secondary py-3">💻 PC</button>}
        {location.hasPokeMart && <button onClick={onPokeMart} className="btn-secondary py-3">🏪 Poké Mart</button>}
      </div>

      {npcs.length > 0 && (
        <section className="mt-4 rounded-lg border border-blue-500/30 bg-blue-950/20 p-4">
          <h3 className="font-bold mb-3">People nearby</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {npcs.map(npc => (
              <button key={npc.id} onClick={() => onTalkToNpc(npc.id)} className="rounded-lg bg-gray-800 p-3 text-left hover:bg-gray-700">
                <span className="block font-semibold">💬 {npc.name}</span>
                <span className="block text-xs text-gray-400">{npc.role}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {trainers.length > 0 && (
        <section className="mt-4 rounded-lg border border-orange-500/30 bg-orange-950/20 p-4">
          <h3 className="font-bold mb-3">Trainers in the area</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {trainers.map(trainer => {
              const defeated = defeatedTrainers.includes(trainer.id);
              return (
                <div key={trainer.id} className="rounded-lg bg-gray-800 p-3 flex items-center justify-between gap-2">
                  <div><span className="block font-semibold">{trainer.name}</span><span className="text-xs text-gray-400">{trainer.team.length} Pokémon · {defeated ? 'Defeated' : 'Ready to battle'}</span></div>
                  <button disabled={defeated} onClick={() => onChallengeTrainer(trainer.id)} className="btn-primary text-sm disabled:opacity-40">{defeated ? 'Won' : 'Battle'}</button>
                </div>
              );
            })}
          </div>
        </section>
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
