'use client';

import { useState } from 'react';

interface StartScreenProps {
  onStartNewGame: (playerName: string, starter: 'bulbasaur' | 'charmander' | 'squirtle') => void;
  onContinue?: () => void;
}

export default function StartScreen({ onStartNewGame, onContinue }: StartScreenProps) {
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [selectedStarter, setSelectedStarter] = useState<'bulbasaur' | 'charmander' | 'squirtle' | null>(null);

  const handleStartGame = () => {
    if (playerName.trim() && selectedStarter) {
      onStartNewGame(playerName.trim(), selectedStarter);
    }
  };

  if (!showNameInput) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-red-900 to-gray-900">
        <h1 className="text-5xl md:text-7xl font-bold text-pokemon-yellow mb-8 text-center">
          POKEMON TTRPG
        </h1>
        <p className="text-2xl md:text-3xl mb-12 text-center">
          Red Adventure
        </p>
        
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={() => setShowNameInput(true)}
            className="btn-primary text-xl py-4"
          >
            New Game
          </button>
          
          {onContinue && (
            <button
              onClick={onContinue}
              className="btn-secondary text-xl py-4"
            >
              Continue
            </button>
          )}
        </div>
        
        <div className="mt-12 text-center text-gray-400 max-w-2xl">
          <p className="mb-2">A text-based Pokemon adventure with dice rolls</p>
          <p className="text-sm">Choose your starter, battle wild Pokemon, challenge gyms, and become the champion!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-red-900 to-gray-900">
      <div className="card max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome to the World of Pokemon!</h2>
        
        <div className="mb-6">
          <label className="block text-lg mb-2">What is your name?</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:border-pokemon-yellow focus:outline-none"
            maxLength={20}
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Choose Your Starter Pokemon:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedStarter('bulbasaur')}
              className={`pokemon-card p-6 ${selectedStarter === 'bulbasaur' ? 'border-pokemon-yellow border-2' : ''}`}
            >
              <div className="text-6xl mb-2 text-center">🌱</div>
              <h4 className="text-xl font-bold text-center mb-2">Bulbasaur</h4>
              <p className="text-sm text-gray-400 text-center">Grass/Poison Type</p>
              <p className="text-sm text-center mt-2">A balanced starter with healing moves</p>
            </button>
            
            <button
              onClick={() => setSelectedStarter('charmander')}
              className={`pokemon-card p-6 ${selectedStarter === 'charmander' ? 'border-pokemon-yellow border-2' : ''}`}
            >
              <div className="text-6xl mb-2 text-center">🔥</div>
              <h4 className="text-xl font-bold text-center mb-2">Charmander</h4>
              <p className="text-sm text-gray-400 text-center">Fire Type</p>
              <p className="text-sm text-center mt-2">High attack power and speed</p>
            </button>
            
            <button
              onClick={() => setSelectedStarter('squirtle')}
              className={`pokemon-card p-6 ${selectedStarter === 'squirtle' ? 'border-pokemon-yellow border-2' : ''}`}
            >
              <div className="text-6xl mb-2 text-center">💧</div>
              <h4 className="text-xl font-bold text-center mb-2">Squirtle</h4>
              <p className="text-sm text-gray-400 text-center">Water Type</p>
              <p className="text-sm text-center mt-2">High defense and special attacks</p>
            </button>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => setShowNameInput(false)}
            className="btn-secondary flex-1 py-3"
          >
            Back
          </button>
          <button
            onClick={handleStartGame}
            disabled={!playerName.trim() || !selectedStarter}
            className="btn-primary flex-1 py-3"
          >
            Start Adventure!
          </button>
        </div>
      </div>
    </div>
  );
}
