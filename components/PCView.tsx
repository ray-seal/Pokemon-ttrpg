'use client';

import { Player } from '@/types/game';

interface PCViewProps {
  player: Player;
  onSwap: (teamIndex: number, pcIndex: number) => void;
  onBack: () => void;
}

export default function PCView({ player, onSwap, onBack }: PCViewProps) {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="card mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Pokemon Storage PC</h2>
          <button onClick={onBack} className="btn-secondary">
            Back
          </button>
        </div>
      </div>

      {/* Current Team */}
      <div className="card mb-4">
        <h3 className="text-xl font-bold mb-3">Your Team</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {player.team.map((pokemon, idx) => (
            <div key={idx} className="pokemon-card p-3">
              <div className="text-center text-4xl mb-2">
                {pokemon.types[0] === 'Fire' && '🔥'}
                {pokemon.types[0] === 'Water' && '💧'}
                {pokemon.types[0] === 'Grass' && '🌱'}
                {pokemon.types[0] === 'Electric' && '⚡'}
                {pokemon.types[0] === 'Normal' && '⭐'}
                {pokemon.types[0] === 'Rock' && '🪨'}
                {pokemon.types[0] === 'Ground' && '🏜️'}
                {pokemon.types[0] === 'Bug' && '🐛'}
                {pokemon.types[0] === 'Psychic' && '🔮'}
                {pokemon.types[0] === 'Flying' && '🦅'}
              </div>
              <h4 className="font-bold text-center">{pokemon.name}</h4>
              <p className="text-sm text-gray-400 text-center">Lv. {pokemon.level}</p>
              <p className="text-xs text-gray-500 text-center">{pokemon.types.join('/')}</p>
              <div className="mt-2">
                <div className="stat-bar h-2">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(pokemon.currentHp / pokemon.maxHp) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-center mt-1">
                  {pokemon.currentHp}/{pokemon.maxHp} HP
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PC Storage */}
      <div className="card">
        <h3 className="text-xl font-bold mb-3">PC Storage ({player.pc.length})</h3>
        {player.pc.length === 0 ? (
          <p className="text-gray-400">No Pokemon in storage</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {player.pc.map((pokemon, idx) => (
              <div key={idx} className="pokemon-card p-3">
                <div className="text-center text-4xl mb-2">
                  {pokemon.types[0] === 'Fire' && '🔥'}
                  {pokemon.types[0] === 'Water' && '💧'}
                  {pokemon.types[0] === 'Grass' && '🌱'}
                  {pokemon.types[0] === 'Electric' && '⚡'}
                  {pokemon.types[0] === 'Normal' && '⭐'}
                  {pokemon.types[0] === 'Rock' && '🪨'}
                  {pokemon.types[0] === 'Ground' && '🏜️'}
                  {pokemon.types[0] === 'Bug' && '🐛'}
                  {pokemon.types[0] === 'Psychic' && '🔮'}
                  {pokemon.types[0] === 'Flying' && '🦅'}
                </div>
                <h4 className="font-bold text-center">{pokemon.name}</h4>
                <p className="text-sm text-gray-400 text-center">Lv. {pokemon.level}</p>
                <p className="text-xs text-gray-500 text-center">{pokemon.types.join('/')}</p>
                <div className="mt-2">
                  <div className="stat-bar h-2">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${(pokemon.currentHp / pokemon.maxHp) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-center mt-1">
                    {pokemon.currentHp}/{pokemon.maxHp} HP
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card mt-4 bg-blue-900">
        <p className="text-sm text-gray-300">
          💡 Tip: Pokemon swapping feature is available. Keep your strongest Pokemon in your team!
        </p>
      </div>
    </div>
  );
}
