'use client';

import { useState } from 'react';
import { GameState, Pokemon, Move } from '@/types/game';
import { getLocation, SHOP_ITEMS } from '@/lib/locations';
import {
  executeBattleTurn,
  generateWildPokemon,
  calculateExpGain,
  checkLevelUp,
  levelUpPokemon,
  fullyHealPokemon,
  healPokemon,
  rollDice,
  calculateCatchRate,
} from '@/lib/gameLogic';
import {
  addPokemonToTeam,
  markPokemonSeen,
  updateCoins,
  addBadge,
  useItem,
  addItem,
  getPokedexStats,
} from '@/lib/gameState';
import { POKEDEX } from '@/lib/pokedex';
import PlayerInfo from './PlayerInfo';
import LocationView from './LocationView';
import BattleView from './BattleView';
import PokedexView from './PokedexView';
import PokeMartView from './PokeMartView';
import PCView from './PCView';

type GameView = 'map' | 'battle' | 'pokedex' | 'pokemart' | 'pokemoncenter' | 'pc';

interface GameInterfaceProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

export default function GameInterface({ gameState, setGameState }: GameInterfaceProps) {
  const [currentView, setCurrentView] = useState<GameView>('map');
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);

  const currentLocation = getLocation(gameState.player.location);

  const addDialogue = (text: string) => {
    setGameState({
      ...gameState,
      dialogueHistory: [...gameState.dialogueHistory, text],
    });
  };

  const handleExploreGrass = () => {
    if (!currentLocation?.wildPokemon || currentLocation.wildPokemon.length === 0) {
      addDialogue('There are no wild Pokemon in this area.');
      return;
    }

    const roll = rollDice(100);
    
    // Find the first encounter that matches the roll
    let encounter = currentLocation.wildPokemon.find(
      (enc) => roll <= enc.rarity
    );
    
    // Fallback to most common Pokemon (highest rarity) if none match
    if (!encounter) {
      encounter = currentLocation.wildPokemon.reduce((prev, current) => 
        (current.rarity > prev.rarity) ? current : prev
      );
    }

    const level = encounter.minLevel + Math.floor(Math.random() * (encounter.maxLevel - encounter.minLevel + 1));
    const wildPokemon = generateWildPokemon(encounter.pokemonId, level);

    // Mark as seen in Pokedex
    setGameState({
      ...gameState,
      player: markPokemonSeen(gameState.player, wildPokemon.id),
      currentBattle: {
        opponent: [wildPokemon],
        isGym: false,
        isWild: true,
        currentTurn: 0,
      },
    });

    setBattleLog([
      `A wild ${wildPokemon.name} appeared! (Level ${wildPokemon.level})`,
      `${gameState.player.name} sent out ${gameState.player.team[0].name}!`,
    ]);
    setCurrentView('battle');
  };

  const handleGymChallenge = () => {
    if (!currentLocation?.hasGym || !currentLocation.gymLeader) {
      addDialogue('There is no gym in this location.');
      return;
    }

    const gymLeader = currentLocation.gymLeader;
    
    // Check if already beaten (simplified - could track individually)
    addDialogue(gymLeader.dialogue.intro.replace('{playerName}', gameState.player.name));

    setGameState({
      ...gameState,
      currentBattle: {
        opponent: gymLeader.team.map(p => ({ ...p })),
        isGym: true,
        isWild: false,
        currentTurn: 0,
      },
    });

    setBattleLog([
      `${gymLeader.name} challenges you!`,
      `${gameState.player.name} sent out ${gameState.player.team[0].name}!`,
      `${gymLeader.name} sent out ${gymLeader.team[0].name}!`,
    ]);
    setCurrentView('battle');
  };

  const handleBattleAction = (action: 'fight' | 'catch' | 'run', move?: Move) => {
    if (!gameState.currentBattle) return;

    const playerPokemon = gameState.player.team[0];
    const opponentPokemon = gameState.currentBattle.opponent[0];

    if (action === 'run') {
      if (gameState.currentBattle.isWild) {
        setBattleLog([...battleLog, `${gameState.player.name} ran away safely!`]);
        setGameState({ ...gameState, currentBattle: undefined });
        setCurrentView('map');
      } else {
        setBattleLog([...battleLog, 'You can\'t run from a Trainer battle!']);
      }
      return;
    }

    if (action === 'catch') {
      if (!gameState.currentBattle.isWild) {
        setBattleLog([...battleLog, 'You can\'t catch another Trainer\'s Pokemon!']);
        return;
      }

      if (gameState.player.inventory.pokeball <= 0) {
        setBattleLog([...battleLog, 'You don\'t have any Poke Balls!']);
        return;
      }

      const catchRoll = rollDice(20);
      const caught = calculateCatchRate(opponentPokemon, 'pokeball', catchRoll);

      const updatedPlayer = useItem(gameState.player, 'pokeball');
      
      if (caught) {
        const updatedPlayerWithPokemon = addPokemonToTeam(updatedPlayer, opponentPokemon);
        const location = gameState.player.team.length >= 6 ? 'PC' : 'team';
        
        setBattleLog([
          ...battleLog,
          `${gameState.player.name} used a Poke Ball! (Rolled ${catchRoll})`,
          `Gotcha! ${opponentPokemon.name} was caught!`,
          `${opponentPokemon.name} was sent to your ${location}.`,
        ]);

        setGameState({
          ...gameState,
          player: updatedPlayerWithPokemon,
          currentBattle: undefined,
        });
        setCurrentView('map');
      } else {
        setBattleLog([
          ...battleLog,
          `${gameState.player.name} used a Poke Ball! (Rolled ${catchRoll})`,
          'Oh no! The Pokemon broke free!',
        ]);
        setGameState({
          ...gameState,
          player: updatedPlayer,
        });
      }
      return;
    }

    if (action === 'fight' && move) {
      const battleResult = executeBattleTurn(playerPokemon, opponentPokemon, move);
      
      const newBattleLog = [...battleLog, ...battleResult.battleLog];

      // Update HP
      const updatedPlayerPokemon = {
        ...playerPokemon,
        currentHp: Math.max(0, playerPokemon.currentHp - battleResult.opponentDamage),
      };

      const updatedOpponentPokemon = {
        ...opponentPokemon,
        currentHp: Math.max(0, opponentPokemon.currentHp - battleResult.playerDamage),
      };

      // Check if battle is over
      if (updatedOpponentPokemon.currentHp <= 0) {
        const expGained = calculateExpGain(opponentPokemon, gameState.currentBattle.isWild);
        const updatedPlayerPokemonWithExp = {
          ...updatedPlayerPokemon,
          exp: updatedPlayerPokemon.exp + expGained,
        };

        newBattleLog.push(`${opponentPokemon.name} fainted!`);
        newBattleLog.push(`${playerPokemon.name} gained ${expGained} EXP!`);

        let finalPlayerPokemon = updatedPlayerPokemonWithExp;
        if (checkLevelUp(updatedPlayerPokemonWithExp)) {
          finalPlayerPokemon = levelUpPokemon(updatedPlayerPokemonWithExp);
          newBattleLog.push(`${playerPokemon.name} grew to level ${finalPlayerPokemon.level}!`);
          
          if (finalPlayerPokemon.name !== playerPokemon.name) {
            newBattleLog.push(`${playerPokemon.name} evolved into ${finalPlayerPokemon.name}!`);
          }
        }

        const coinsGained = gameState.currentBattle.isGym ? currentLocation?.gymLeader?.reward || 500 : opponentPokemon.level * 50;
        const updatedPlayer = updateCoins(gameState.player, coinsGained);
        
        newBattleLog.push(`You earned ${coinsGained} coins!`);

        // Update team
        const updatedTeam = [finalPlayerPokemon, ...gameState.player.team.slice(1)];

        // Check if gym battle and award badge
        let finalPlayer = { ...updatedPlayer, team: updatedTeam };
        if (gameState.currentBattle.isGym && currentLocation?.gymLeader) {
          finalPlayer = addBadge(finalPlayer);
          newBattleLog.push(`You earned the ${currentLocation.gymLeader.badge}!`);
          newBattleLog.push(currentLocation.gymLeader.dialogue.win.replace('{playerName}', gameState.player.name));
        }

        setBattleLog(newBattleLog);
        setGameState({
          ...gameState,
          player: finalPlayer,
          currentBattle: undefined,
        });

        setTimeout(() => {
          setCurrentView('map');
        }, 2000);
        return;
      }

      if (updatedPlayerPokemon.currentHp <= 0) {
        newBattleLog.push(`${playerPokemon.name} fainted!`);
        
        const coinsLost = Math.floor(gameState.player.coins * 0.1);
        const updatedPlayer = updateCoins(gameState.player, -coinsLost);
        
        newBattleLog.push(`You lost ${coinsLost} coins!`);
        newBattleLog.push('You blacked out and returned to the Pokemon Center...');

        // Heal all Pokemon
        const healedTeam = updatedPlayer.team.map(fullyHealPokemon);

        setBattleLog(newBattleLog);
        setGameState({
          ...gameState,
          player: { ...updatedPlayer, team: healedTeam },
          currentBattle: undefined,
        });

        setTimeout(() => {
          setCurrentView('map');
        }, 2000);
        return;
      }

      // Battle continues
      const updatedOpponentTeam = [updatedOpponentPokemon, ...gameState.currentBattle.opponent.slice(1)];
      const updatedPlayerTeam = [updatedPlayerPokemon, ...gameState.player.team.slice(1)];

      setBattleLog(newBattleLog);
      setGameState({
        ...gameState,
        player: { ...gameState.player, team: updatedPlayerTeam },
        currentBattle: {
          ...gameState.currentBattle,
          opponent: updatedOpponentTeam,
          currentTurn: gameState.currentBattle.currentTurn + 1,
        },
      });
    }
  };

  const handlePokemonCenter = () => {
    if (!currentLocation?.hasPokemonCenter) {
      addDialogue('There is no Pokemon Center in this location.');
      return;
    }

    const healedTeam = gameState.player.team.map(fullyHealPokemon);
    const healedPC = gameState.player.pc.map(fullyHealPokemon);

    addDialogue(`Welcome to the Pokemon Center, ${gameState.player.name}!`);
    addDialogue('We\'ve restored your Pokemon to full health!');

    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        team: healedTeam,
        pc: healedPC,
      },
    });
  };

  const handleTravel = (destination: string) => {
    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        location: destination,
      },
    });
    addDialogue(`Traveled to ${getLocation(destination)?.name}`);
  };

  const handleBuyItem = (itemKey: keyof typeof gameState.player.inventory, price: number) => {
    if (gameState.player.coins < price) {
      addDialogue('You don\'t have enough coins!');
      return false;
    }

    const updatedPlayer = addItem(updateCoins(gameState.player, -price), itemKey);
    setGameState({
      ...gameState,
      player: updatedPlayer,
    });
    
    return true;
  };

  if (currentView === 'battle' && gameState.currentBattle) {
    return (
      <BattleView
        playerPokemon={gameState.player.team[0]}
        opponentPokemon={gameState.currentBattle.opponent[0]}
        battleLog={battleLog}
        isWild={gameState.currentBattle.isWild}
        onAction={handleBattleAction}
      />
    );
  }

  if (currentView === 'pokedex') {
    return (
      <PokedexView
        pokedex={gameState.player.pokedex}
        onBack={() => setCurrentView('map')}
      />
    );
  }

  if (currentView === 'pokemart') {
    return (
      <PokeMartView
        coins={gameState.player.coins}
        inventory={gameState.player.inventory}
        onBuy={handleBuyItem}
        onBack={() => setCurrentView('map')}
      />
    );
  }

  if (currentView === 'pc') {
    return (
      <PCView
        player={gameState.player}
        onSwap={(teamIdx, pcIdx) => {
          // Swap Pokemon logic would go here
          addDialogue('Pokemon swapped!');
        }}
        onBack={() => setCurrentView('map')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <PlayerInfo player={gameState.player} />
      
      <LocationView
        location={currentLocation}
        playerName={gameState.player.name}
        onExplore={handleExploreGrass}
        onGymChallenge={handleGymChallenge}
        onPokemonCenter={handlePokemonCenter}
        onPokeMart={() => setCurrentView('pokemart')}
        onPC={() => setCurrentView('pc')}
        onTravel={handleTravel}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setCurrentView('pokedex')} className="btn-secondary">
          Pokedex
        </button>
      </div>

      {/* Dialogue history */}
      <div className="mt-4 card max-h-48 overflow-y-auto">
        <h3 className="font-bold mb-2">Recent Events:</h3>
        {gameState.dialogueHistory.slice(-10).map((msg, idx) => (
          <p key={idx} className="text-sm text-gray-300 mb-1">
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}
