import { Pokemon, BattleResult, Move, PokemonType } from '@/types/game';
import { POKEDEX } from './pokedex';

// Dice rolling
export function rollDice(sides: number = 20): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollMultipleDice(count: number, sides: number = 6): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += rollDice(sides);
  }
  return total;
}

// Type effectiveness (simplified)
const TYPE_EFFECTIVENESS: { [key: string]: { [key: string]: number } } = {
  Fire: { Grass: 2, Water: 0.5, Fire: 0.5, Ice: 2 },
  Water: { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2 },
  Grass: { Water: 2, Ground: 2, Rock: 2, Fire: 0.5, Grass: 0.5, Flying: 0.5 },
  Electric: { Water: 2, Flying: 2, Electric: 0.5, Grass: 0.5, Ground: 0 },
  Ground: { Fire: 2, Electric: 2, Poison: 2, Rock: 2, Flying: 0, Grass: 0.5 },
  Rock: { Fire: 2, Ice: 2, Flying: 2, Bug: 2, Fighting: 0.5, Ground: 0.5 },
  Flying: { Grass: 2, Fighting: 2, Bug: 2, Electric: 0.5, Rock: 0.5 },
  Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5 },
  Bug: { Grass: 2, Psychic: 2, Fire: 0.5, Fighting: 0.5, Flying: 0.5 },
  Poison: { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5 },
  Normal: {},
  Fighting: { Normal: 2, Ice: 2, Rock: 2, Flying: 0.5, Psychic: 0.5, Bug: 0.5 },
  Ice: { Grass: 2, Ground: 2, Flying: 2, Dragon: 2, Fire: 0.5, Water: 0.5, Ice: 0.5 },
  Ghost: { Psychic: 2, Ghost: 2, Normal: 0 },
  Dragon: { Dragon: 2 },
};

export function getTypeEffectiveness(moveType: PokemonType, defenderTypes: PokemonType[]): number {
  let effectiveness = 1;
  for (const defenderType of defenderTypes) {
    const matchup = TYPE_EFFECTIVENESS[moveType]?.[defenderType];
    if (matchup !== undefined) {
      effectiveness *= matchup;
    }
  }
  return effectiveness;
}

// Calculate damage
export function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  roll: number
): number {
  const level = attacker.level;
  
  // Simple damage calculation - use attack and defense stats
  const attack = attacker.baseStats.attack + attacker.baseStats.specialAttack;
  const defense = defender.baseStats.defense + defender.baseStats.specialDefense;
  
  // Base damage calculation
  const baseDamage = ((2 * level / 5 + 2) * move.power * attack / defense / 50 + 2);
  
  // Type effectiveness
  const effectiveness = getTypeEffectiveness(move.type, defender.types);
  
  // STAB (Same Type Attack Bonus)
  const stab = attacker.types.includes(move.type) ? 1.5 : 1;
  
  // Dice roll modifier (1-20)
  const rollModifier = roll / 10; // 0.1 to 2.0
  
  const totalDamage = Math.floor(baseDamage * effectiveness * stab * rollModifier);
  
  return Math.max(1, totalDamage);
}

// Check if move hits
export function moveHits(move: Move, roll: number): boolean {
  // Roll must be within accuracy percentage
  const accuracyThreshold = move.accuracy;
  const rollPercentage = (roll / 20) * 100;
  return rollPercentage <= accuracyThreshold;
}

// Calculate catch rate
export function calculateCatchRate(
  pokemon: Pokemon,
  ballType: 'pokeball' | 'greatball' | 'ultraball',
  roll: number
): boolean {
  const hpPercentage = pokemon.currentHp / pokemon.maxHp;
  
  // Ball modifiers
  const ballModifiers = {
    pokeball: 1,
    greatball: 1.5,
    ultraball: 2,
  };
  
  const ballMod = ballModifiers[ballType];
  
  // Base catch rate (simplified) - lower HP = easier to catch
  const baseCatchRate = 45; // Base rate for most Pokemon
  const hpModifier = (1 - hpPercentage * 0.5); // 0.5 to 1.0 based on HP
  const catchRate = baseCatchRate * ballMod * hpModifier;
  
  // Scale to d20: need to roll >= (21 - scaled catch rate)
  // catchRate range: 22.5 to 90, scale to 1-20
  const scaledRate = Math.min(19, Math.max(1, Math.floor(catchRate / 5)));
  const threshold = 21 - scaledRate;
  
  return roll >= threshold;
}

// Experience and leveling
export function calculateExpGain(defeatedPokemon: Pokemon, isWild: boolean): number {
  const baseExp = defeatedPokemon.level * 50;
  return isWild ? baseExp : Math.floor(baseExp * 1.5);
}

export function getExpForLevel(level: number): number {
  // Medium Fast growth rate (like most starters)
  return Math.floor(Math.pow(level, 3));
}

export function checkLevelUp(pokemon: Pokemon): boolean {
  const expNeeded = getExpForLevel(pokemon.level + 1);
  return pokemon.exp >= expNeeded;
}

export function levelUpPokemon(pokemon: Pokemon): Pokemon {
  const newLevel = pokemon.level + 1;
  
  // Stat increases (simple formula)
  const hpIncrease = Math.floor(pokemon.baseStats.hp * 0.1) + 1;
  const newMaxHp = pokemon.maxHp + hpIncrease;
  
  // Learn new moves at certain levels
  const pokedexEntry = POKEDEX[pokemon.id];
  const newMoves = pokedexEntry?.learnableMoves
    .filter(lm => lm.level === newLevel)
    .map(lm => lm.move) || [];
  
  const updatedMoves = [...pokemon.moves];
  for (const newMove of newMoves) {
    if (updatedMoves.length < 4) {
      updatedMoves.push(newMove);
    } else {
      // Replace oldest move
      updatedMoves.shift();
      updatedMoves.push(newMove);
    }
  }
  
  // Check for evolution
  let evolvedPokemon = { ...pokemon };
  if (pokedexEntry?.evolutionLevel === newLevel && pokedexEntry.evolutionTarget) {
    const evolutionId = Object.values(POKEDEX).find(
      p => p.name === pokedexEntry.evolutionTarget
    )?.id;
    
    if (evolutionId) {
      const evolutionData = POKEDEX[evolutionId];
      if (evolutionData) {
        evolvedPokemon = {
          ...pokemon,
          id: evolutionData.id,
          name: evolutionData.name,
          types: evolutionData.types,
          baseStats: evolutionData.baseStats,
        };
      }
    }
  }
  
  return {
    ...evolvedPokemon,
    level: newLevel,
    maxHp: newMaxHp,
    currentHp: Math.min(pokemon.currentHp + hpIncrease, newMaxHp),
    moves: updatedMoves,
  };
}

// Create a wild Pokemon
export function generateWildPokemon(pokemonId: number, level: number): Pokemon {
  const pokedexEntry = POKEDEX[pokemonId];
  if (!pokedexEntry) {
    throw new Error(`Pokemon with ID ${pokemonId} not found`);
  }
  
  // Calculate HP based on level
  const maxHp = Math.floor(pokedexEntry.baseStats.hp + (level * 2));
  
  // Get moves for this level
  const availableMoves = pokedexEntry.learnableMoves
    .filter(lm => lm.level <= level)
    .sort((a, b) => b.level - a.level)
    .slice(0, 4)
    .map(lm => ({ ...lm.move }));
  
  // Ensure at least one move
  const moves = availableMoves.length > 0 ? availableMoves : [{ ...pokedexEntry.learnableMoves[0].move }];
  
  return {
    id: pokedexEntry.id,
    name: pokedexEntry.name,
    types: pokedexEntry.types,
    baseStats: { ...pokedexEntry.baseStats },
    level,
    exp: 0,
    maxHp,
    currentHp: maxHp,
    moves,
  };
}

// Heal Pokemon
export function healPokemon(pokemon: Pokemon, amount: number): Pokemon {
  return {
    ...pokemon,
    currentHp: Math.min(pokemon.currentHp + amount, pokemon.maxHp),
  };
}

export function fullyHealPokemon(pokemon: Pokemon): Pokemon {
  return {
    ...pokemon,
    currentHp: pokemon.maxHp,
    moves: pokemon.moves.map(m => ({ ...m, pp: m.maxPp })),
  };
}

// Battle AI - choose move
export function chooseAIMove(pokemon: Pokemon): Move {
  const availableMoves = pokemon.moves.filter(m => m.pp > 0);
  if (availableMoves.length === 0) {
    // Struggle if no PP
    return { name: 'Struggle', type: 'Normal', power: 50, accuracy: 100, pp: 1, maxPp: 1 };
  }
  
  // Simple AI: choose highest power move
  return availableMoves.reduce((best, current) => 
    current.power > best.power ? current : best
  );
}

// Execute battle turn
export function executeBattleTurn(
  playerPokemon: Pokemon,
  opponentPokemon: Pokemon,
  playerMove: Move
): {
  playerDamage: number;
  opponentDamage: number;
  playerFirst: boolean;
  playerHit: boolean;
  opponentHit: boolean;
  battleLog: string[];
} {
  const battleLog: string[] = [];
  
  // Determine turn order (speed stat)
  const playerFirst = playerPokemon.baseStats.speed >= opponentPokemon.baseStats.speed;
  
  // Roll dice for both attacks
  const playerRoll = rollDice(20);
  const opponentRoll = rollDice(20);
  
  const playerHit = moveHits(playerMove, playerRoll);
  const opponentMove = chooseAIMove(opponentPokemon);
  const opponentHit = moveHits(opponentMove, opponentRoll);
  
  let playerDamage = 0;
  let opponentDamage = 0;
  
  if (playerFirst) {
    if (playerHit) {
      playerDamage = calculateDamage(playerPokemon, opponentPokemon, playerMove, playerRoll);
      battleLog.push(`${playerPokemon.name} used ${playerMove.name}! (Rolled ${playerRoll})`);
      battleLog.push(`Dealt ${playerDamage} damage!`);
    } else {
      battleLog.push(`${playerPokemon.name} used ${playerMove.name} but missed! (Rolled ${playerRoll})`);
    }
    
    if (opponentPokemon.currentHp - playerDamage > 0) {
      if (opponentHit) {
        opponentDamage = calculateDamage(opponentPokemon, playerPokemon, opponentMove, opponentRoll);
        battleLog.push(`${opponentPokemon.name} used ${opponentMove.name}! (Rolled ${opponentRoll})`);
        battleLog.push(`Dealt ${opponentDamage} damage!`);
      } else {
        battleLog.push(`${opponentPokemon.name} used ${opponentMove.name} but missed! (Rolled ${opponentRoll})`);
      }
    }
  } else {
    if (opponentHit) {
      opponentDamage = calculateDamage(opponentPokemon, playerPokemon, opponentMove, opponentRoll);
      battleLog.push(`${opponentPokemon.name} used ${opponentMove.name}! (Rolled ${opponentRoll})`);
      battleLog.push(`Dealt ${opponentDamage} damage!`);
    } else {
      battleLog.push(`${opponentPokemon.name} used ${opponentMove.name} but missed! (Rolled ${opponentRoll})`);
    }
    
    if (playerPokemon.currentHp - opponentDamage > 0) {
      if (playerHit) {
        playerDamage = calculateDamage(playerPokemon, opponentPokemon, playerMove, playerRoll);
        battleLog.push(`${playerPokemon.name} used ${playerMove.name}! (Rolled ${playerRoll})`);
        battleLog.push(`Dealt ${playerDamage} damage!`);
      } else {
        battleLog.push(`${playerPokemon.name} used ${playerMove.name} but missed! (Rolled ${playerRoll})`);
      }
    }
  }
  
  return {
    playerDamage,
    opponentDamage,
    playerFirst,
    playerHit,
    opponentHit,
    battleLog,
  };
}
