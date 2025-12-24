'use client';

import { Pokemon, Move } from '@/types/game';

interface BattleViewProps {
  playerPokemon: Pokemon;
  opponentPokemon: Pokemon;
  battleLog: string[];
  isWild: boolean;
  onAction: (action: 'fight' | 'catch' | 'run', move?: Move) => void;
}

export default function BattleView({
  playerPokemon,
  opponentPokemon,
  battleLog,
  isWild,
  onAction,
}: BattleViewProps) {
  const getHPBarColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-900 p-4 flex flex-col">
      {/* Opponent Pokemon */}
      <div className="card mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">{opponentPokemon.name}</h3>
            <p className="text-sm text-gray-400">Lv. {opponentPokemon.level}</p>
            <p className="text-xs text-gray-500">{opponentPokemon.types.join('/')}</p>
          </div>
          <div className="text-6xl">
            {opponentPokemon.types[0] === 'Fire' && '🔥'}
            {opponentPokemon.types[0] === 'Water' && '💧'}
            {opponentPokemon.types[0] === 'Grass' && '🌱'}
            {opponentPokemon.types[0] === 'Electric' && '⚡'}
            {opponentPokemon.types[0] === 'Normal' && '⭐'}
            {opponentPokemon.types[0] === 'Rock' && '🪨'}
            {opponentPokemon.types[0] === 'Ground' && '🏜️'}
            {opponentPokemon.types[0] === 'Bug' && '🐛'}
            {opponentPokemon.types[0] === 'Psychic' && '🔮'}
            {opponentPokemon.types[0] === 'Flying' && '🦅'}
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span>HP</span>
            <span>{opponentPokemon.currentHp} / {opponentPokemon.maxHp}</span>
          </div>
          <div className="stat-bar">
            <div
              className={`h-full transition-all duration-300 ${getHPBarColor(opponentPokemon.currentHp, opponentPokemon.maxHp)}`}
              style={{ width: `${(opponentPokemon.currentHp / opponentPokemon.maxHp) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Player Pokemon */}
      <div className="card mb-4">
        <div className="flex justify-between items-center">
          <div className="text-6xl">
            {playerPokemon.types[0] === 'Fire' && '🔥'}
            {playerPokemon.types[0] === 'Water' && '💧'}
            {playerPokemon.types[0] === 'Grass' && '🌱'}
            {playerPokemon.types[0] === 'Electric' && '⚡'}
            {playerPokemon.types[0] === 'Normal' && '⭐'}
            {playerPokemon.types[0] === 'Rock' && '🪨'}
            {playerPokemon.types[0] === 'Ground' && '🏜️'}
            {playerPokemon.types[0] === 'Bug' && '🐛'}
            {playerPokemon.types[0] === 'Psychic' && '🔮'}
            {playerPokemon.types[0] === 'Flying' && '🦅'}
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-bold">{playerPokemon.name}</h3>
            <p className="text-sm text-gray-400">Lv. {playerPokemon.level}</p>
            <p className="text-xs text-gray-500">{playerPokemon.types.join('/')}</p>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span>HP</span>
            <span>{playerPokemon.currentHp} / {playerPokemon.maxHp}</span>
          </div>
          <div className="stat-bar">
            <div
              className={`h-full transition-all duration-300 ${getHPBarColor(playerPokemon.currentHp, playerPokemon.maxHp)}`}
              style={{ width: `${(playerPokemon.currentHp / playerPokemon.maxHp) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Battle Log */}
      <div className="card mb-4 flex-1 overflow-y-auto max-h-48">
        <h3 className="font-bold mb-2">Battle Log:</h3>
        {battleLog.map((log, idx) => (
          <p key={idx} className="text-sm text-gray-300 mb-1">
            {log}
          </p>
        ))}
      </div>

      {/* Actions */}
      <div className="card">
        <h3 className="font-bold mb-3">Choose Action:</h3>
        
        {/* Moves */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {playerPokemon.moves.map((move, idx) => (
            <button
              key={idx}
              onClick={() => onAction('fight', move)}
              className="btn-primary p-3 text-left"
              disabled={move.pp <= 0}
            >
              <div className="font-bold">{move.name}</div>
              <div className="text-xs text-gray-300">
                {move.type} | Power: {move.power} | PP: {move.pp}/{move.maxPp}
              </div>
            </button>
          ))}
        </div>

        {/* Other actions */}
        <div className="grid grid-cols-2 gap-2">
          {isWild && (
            <button
              onClick={() => onAction('catch')}
              className="btn-success"
            >
              🎯 Catch
            </button>
          )}
          <button
            onClick={() => onAction('run')}
            className="btn-secondary"
          >
            🏃 Run
          </button>
        </div>
      </div>
    </div>
  );
}
