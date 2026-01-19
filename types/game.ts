// Core game types
export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  baseStats: Stats;
  currentStats?: Stats;
  level: number;
  exp: number;
  maxHp: number;
  currentHp: number;
  moves: Move[];
  isShiny?: boolean;
}

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface Move {
  name: string;
  type: PokemonType;
  power: number;
  accuracy: number;
  pp: number;
  maxPp: number;
}

export type PokemonType = 
  | 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice' 
  | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' 
  | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';

export interface PokedexEntry {
  id: number;
  name: string;
  types: PokemonType[];
  baseStats: Stats;
  learnableMoves: LearnableMove[];
  locations: string[];
  evolutionLevel?: number;
  evolutionTarget?: string;
}

export interface LearnableMove {
  level: number;
  move: Move;
}

export interface Player {
  name: string;
  team: Pokemon[];
  pc: Pokemon[];
  coins: number;
  badges: number;
  location: string;
  inventory: Inventory;
  pokedex: PokedexStatus;
}

export interface Inventory {
  pokeball: number;
  greatball: number;
  ultraball: number;
  potion: number;
  superPotion: number;
  hyperPotion: number;
  revive: number;
}

export interface PokedexStatus {
  [pokemonId: number]: {
    caught: boolean;
    seen: boolean;
  };
}

export interface ShopItem {
  name: string;
  price: number;
  description: string;
  key: keyof Inventory;
}

export interface Location {
  name: string;
  description: string;
  wildPokemon?: WildEncounter[];
  hasGym?: boolean;
  gymLeader?: GymLeader;
  hasPokemonCenter?: boolean;
  hasPokeMart?: boolean;
  connectedTo: string[];
}

export interface WildEncounter {
  pokemonId: number;
  minLevel: number;
  maxLevel: number;
  rarity: number; // 1-100, lower = rarer
}

export interface GymLeader {
  name: string;
  badge: string;
  team: Pokemon[];
  reward: number;
  dialogue: {
    intro: string;
    win: string;
    lose: string;
  };
}

export interface BattleResult {
  won: boolean;
  expGained: number;
  coinsGained: number;
  leveledUp?: boolean;
  newLevel?: number;
}

export interface GameState {
  player: Player;
  currentBattle?: {
    opponent: Pokemon[];
    isGym: boolean;
    isWild: boolean;
    isRival?: boolean;
    trainerName?: string;
    currentTurn: number;
  };
  gameStarted: boolean;
  dialogueHistory: string[];
  storyFlags?: {
    rivalBattleRoute1?: boolean;
    [key: string]: boolean | undefined;
  };
}
