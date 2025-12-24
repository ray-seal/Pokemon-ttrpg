'use client';

import { useState, useEffect } from 'react';
import { GameState, Pokemon } from '@/types/game';
import { createNewGame, loadGame, saveGame } from '@/lib/gameState';
import { generateWildPokemon } from '@/lib/gameLogic';
import { MOVES } from '@/lib/pokedex';
import StartScreen from '@/components/StartScreen';
import GameInterface from '@/components/GameInterface';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved game on mount
    const savedGame = loadGame();
    if (savedGame) {
      setGameState(savedGame);
    }
    setLoading(false);
  }, []);

  // Auto-save whenever game state changes
  useEffect(() => {
    if (gameState && gameState.gameStarted) {
      saveGame(gameState);
    }
  }, [gameState]);

  const handleStartNewGame = (playerName: string, starterChoice: 'bulbasaur' | 'charmander' | 'squirtle') => {
    let starterPokemon: Pokemon;
    
    switch (starterChoice) {
      case 'bulbasaur':
        starterPokemon = generateWildPokemon(1, 5);
        break;
      case 'charmander':
        starterPokemon = generateWildPokemon(4, 5);
        break;
      case 'squirtle':
        starterPokemon = generateWildPokemon(7, 5);
        break;
    }
    
    const newGame = createNewGame(playerName, starterPokemon);
    setGameState(newGame);
  };

  const handleContinueGame = () => {
    const savedGame = loadGame();
    if (savedGame) {
      setGameState(savedGame);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!gameState || !gameState.gameStarted) {
    const hasSave = loadGame() !== null;
    return (
      <StartScreen
        onStartNewGame={handleStartNewGame}
        onContinue={hasSave ? handleContinueGame : undefined}
      />
    );
  }

  return (
    <GameInterface
      gameState={gameState}
      setGameState={setGameState}
    />
  );
}
