import { GameState, Player, Pokemon, PokedexStatus } from '@/types/game';
import { generateWildPokemon } from './gameLogic';

const STORAGE_KEY = 'pokemon-ttrpg-save';

// Initialize new game state
export function createNewGame(playerName: string, starterPokemon: Pokemon): GameState {
  const initialPokedex: PokedexStatus = {};
  
  // Mark starter as caught
  initialPokedex[starterPokemon.id] = { caught: true, seen: true };
  
  const player: Player = {
    name: playerName,
    team: [starterPokemon],
    pc: [],
    coins: 3000, // Starting money
    badges: 0,
    location: 'palletTown',
    inventory: {
      pokeball: 5,
      greatball: 0,
      ultraball: 0,
      potion: 3,
      superPotion: 0,
      hyperPotion: 0,
      revive: 0,
    },
    pokedex: initialPokedex,
  };
  
  return {
    player,
    gameStarted: true,
    dialogueHistory: [
      `Welcome to the world of Pokemon, ${playerName}!`,
      'Your adventure begins in Pallet Town...',
    ],
    storyFlags: {
      rivalBattleRoute1: false,
    },
  };
}

// Load game from localStorage
export function loadGame(): GameState | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return null;
    
    const gameState: GameState = JSON.parse(savedData);
    return gameState;
  } catch (error) {
    console.error('Error loading game:', error);
    return null;
  }
}

// Save game to localStorage
export function saveGame(gameState: GameState): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    return true;
  } catch (error) {
    console.error('Error saving game:', error);
    return false;
  }
}

// Delete save
export function deleteSave(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting save:', error);
    return false;
  }
}

// Add Pokemon to team or PC
export function addPokemonToTeam(player: Player, pokemon: Pokemon): Player {
  const updatedPokedex = { ...player.pokedex };
  updatedPokedex[pokemon.id] = { caught: true, seen: true };
  
  if (player.team.length < 6) {
    return {
      ...player,
      team: [...player.team, pokemon],
      pokedex: updatedPokedex,
    };
  } else {
    return {
      ...player,
      pc: [...player.pc, pokemon],
      pokedex: updatedPokedex,
    };
  }
}

// Mark Pokemon as seen in Pokedex
export function markPokemonSeen(player: Player, pokemonId: number): Player {
  const updatedPokedex = { ...player.pokedex };
  if (!updatedPokedex[pokemonId]) {
    updatedPokedex[pokemonId] = { caught: false, seen: true };
  } else {
    updatedPokedex[pokemonId] = { ...updatedPokedex[pokemonId], seen: true };
  }
  
  return {
    ...player,
    pokedex: updatedPokedex,
  };
}

// Swap Pokemon between team and PC
export function swapPokemon(
  player: Player,
  teamIndex: number,
  pcIndex: number
): Player {
  const newTeam = [...player.team];
  const newPc = [...player.pc];
  
  const temp = newTeam[teamIndex];
  newTeam[teamIndex] = newPc[pcIndex];
  newPc[pcIndex] = temp;
  
  return {
    ...player,
    team: newTeam,
    pc: newPc,
  };
}

// Update player coins
export function updateCoins(player: Player, amount: number): Player {
  return {
    ...player,
    coins: Math.max(0, player.coins + amount),
  };
}

// Update player badges
export function addBadge(player: Player): Player {
  return {
    ...player,
    badges: player.badges + 1,
  };
}

// Use item from inventory
export function useItem(
  player: Player,
  itemKey: keyof Player['inventory'],
  amount: number = 1
): Player {
  const currentAmount = player.inventory[itemKey];
  if (currentAmount < amount) {
    return player; // Not enough items
  }
  
  return {
    ...player,
    inventory: {
      ...player.inventory,
      [itemKey]: currentAmount - amount,
    },
  };
}

// Add item to inventory
export function addItem(
  player: Player,
  itemKey: keyof Player['inventory'],
  amount: number = 1
): Player {
  return {
    ...player,
    inventory: {
      ...player.inventory,
      [itemKey]: player.inventory[itemKey] + amount,
    },
  };
}

// Get Pokedex completion stats
export function getPokedexStats(pokedex: PokedexStatus): {
  caught: number;
  seen: number;
  total: number;
} {
  const entries = Object.values(pokedex);
  const caught = entries.filter(e => e.caught).length;
  const seen = entries.filter(e => e.seen).length;
  const total = 151; // Total Kanto Pokemon
  
  return { caught, seen, total };
}
