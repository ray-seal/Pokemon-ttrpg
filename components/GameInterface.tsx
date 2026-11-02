'use client';

import { useState, useEffect } from 'react';
import { GameState, Pokemon, Move } from '@/types/game';
import { getLocation, SHOP_ITEMS, RIVAL_TRAINERS } from '@/lib/locations';
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
  selectWeightedEncounter,
  rollAbilityCheck,
} from '@/lib/gameLogic';
import {
  addPokemonToTeam,
  markPokemonSeen,
  updateCoins,
  addBadge,
  useItem,
  addItem,
  getPokedexStats,
  swapPokemon,
} from '@/lib/gameState';
import { POKEDEX } from '@/lib/pokedex';
import PlayerInfo from './PlayerInfo';
import LocationView from './LocationView';
import BattleView from './BattleView';
import PokedexView from './PokedexView';
import PokeMartView from './PokeMartView';
import PCView from './PCView';
import TownMapView from './TownMapView';
import { getTravelOptions, getTravelOption } from '@/lib/kantoMap';

type GameView = 'map' | 'battle' | 'pokedex' | 'pokemart' | 'pokemoncenter' | 'pc' | 'townmap';

interface GameInterfaceProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

export default function GameInterface({ gameState, setGameState }: GameInterfaceProps) {
  const [currentView, setCurrentView] = useState<GameView>(gameState.currentBattle ? 'battle' : 'map');
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);

  // Migrate older saves without resetting existing story progress.
  useEffect(() => {
    const migrated = {
      ...gameState,
      storyFlags: {
        rivalBattleRoute1: false,
        oakParcelCollected: false,
        oakParcelDelivered: false,
        ...(gameState.storyFlags || {}),
      },
      player: { ...gameState.player, keyItems: gameState.player.keyItems || [], attributes: gameState.player.attributes || { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 } },
      npcFlags: gameState.npcFlags || {},
      trainerFlags: gameState.trainerFlags || {},
      gymBadges: gameState.gymBadges || [],
      worldKnowledge: gameState.worldKnowledge || {
        knownLocations: ['palletTown', 'route1', 'viridianCity', 'route22'],
        discoveredLocations: [gameState.player.location || 'palletTown'],
      },
    };
    if (
      !gameState.storyFlags || !gameState.npcFlags || !gameState.trainerFlags ||
      !gameState.gymBadges || !gameState.player.keyItems || !gameState.player.attributes || !gameState.worldKnowledge
    ) setGameState(migrated);
  }, []);


  const currentLocation = getLocation(gameState.player.location);
  const hasTownMap = gameState.player.keyItems?.includes('townMap') || false;
  const travelOptions = getTravelOptions(gameState).filter(option => !!getLocation(option.key));
  const gymBadgeOrder = ['Boulder Badge', 'Cascade Badge', 'Thunder Badge', 'Rainbow Badge', 'Soul Badge', 'Marsh Badge', 'Volcano Badge', 'Earth Badge'];
  const currentGymBadge = currentLocation?.gymLeader?.badge;
  const gymRequirement = currentGymBadge ? Math.max(0, gymBadgeOrder.indexOf(currentGymBadge)) : 0;
  const isViridianFinalGym = gameState.player.location === 'viridianCity';
  const viridianGymUnlocked = gameState.player.badges >= 7 && !!gameState.storyFlags?.rocketHideoutCleared;
  const canChallengeGym = !!currentLocation?.gymLeader &&
    (!!currentLocation.hasGym || (isViridianFinalGym && viridianGymUnlocked)) &&
    gameState.player.badges >= gymRequirement &&
    !gameState.gymBadges?.includes(currentGymBadge || '');

  const addDialogue = (text: string) => {
    setGameState({
      ...gameState,
      dialogueHistory: [...gameState.dialogueHistory, text],
    });
  };

  const handleExploreGrass = () => {
    if (!currentLocation?.wildPokemon?.length) {
      addDialogue('There are no wild Pokémon in this area.');
      return;
    }

    // The Route 1 rival encounter is a one-time story beat.
    if (gameState.player.location === 'route1' && !gameState.storyFlags?.rivalBattleRoute1) {
      const rival = RIVAL_TRAINERS.route1Rival;
      const playerStarterId = gameState.player.team[0]?.id;
      const rivalStarterId = playerStarterId === 1 ? 4 : playerStarterId === 4 ? 7 : 1;
      const rivalPokemon = generateWildPokemon(rivalStarterId, 5);
      const intro = rival.dialogue.intro.replace('{playerName}', gameState.player.name);
      const openingState = {
        ...gameState,
        player: markPokemonSeen(gameState.player, rivalPokemon.id),
        currentBattle: {
          opponent: [rivalPokemon],
          isGym: false,
          isWild: false,
          isRival: true,
          trainerName: rival.name,
          currentTurn: 0,
          activePlayerIndex: Math.max(0, gameState.player.team.findIndex(p => p.currentHp > 0)),
          activeOpponentIndex: 0,
          reward: rival.reward,
        },
        dialogueHistory: [...gameState.dialogueHistory, intro, 'Blue grins. “Come on then. Let’s see what your starter can do!”'],
      };
      setGameState(openingState);
      setBattleLog([intro, `${rival.name} sends out ${rivalPokemon.name}!`, 'Your first trainer battle begins.']);
      setCurrentView('battle');
      return;
    }

    const encounter = selectWeightedEncounter(currentLocation.wildPokemon, rollDice(100));
    if (!encounter) return;
    const level = encounter.minLevel + Math.floor(Math.random() * (encounter.maxLevel - encounter.minLevel + 1));
    const wildPokemon = generateWildPokemon(encounter.pokemonId, level);
    setGameState({
      ...gameState,
      player: markPokemonSeen(gameState.player, wildPokemon.id),
      currentBattle: {
        opponent: [wildPokemon],
        isGym: false,
        isWild: true,
        currentTurn: 0,
        activePlayerIndex: Math.max(0, gameState.player.team.findIndex(p => p.currentHp > 0)),
        activeOpponentIndex: 0,
      },
    });
    setBattleLog([`A wild ${wildPokemon.name} appeared! (Level ${wildPokemon.level})`, `${gameState.player.name} sends out ${gameState.player.team[0].name}!`]);
    setCurrentView('battle');
  };

  const handleGymChallenge = () => {
    if (!currentLocation?.gymLeader) {
      addDialogue('There is no Gym Leader here.');
      return;
    }
    const isViridianFinalGym = gameState.player.location === 'viridianCity';
    if (isViridianFinalGym && !viridianGymUnlocked) {
      addDialogue('The Viridian Gym is closed. Rumours say its leader will not appear until the other seven badges have been earned and Team Rocket has been dealt with.');
      return;
    }
    const badgeName = currentLocation.gymLeader.badge;
    const requiredBadges = Math.max(0, gymBadgeOrder.indexOf(badgeName));
    if (gameState.player.badges < requiredBadges) {
      addDialogue('The Gym Leader will not accept your challenge yet. Earn ' + gymBadgeOrder[requiredBadges - 1] + ' first.');
      return;
    }
    if (gameState.gymBadges?.includes(badgeName)) {
      addDialogue(`You already earned the ${badgeName}.`);
      return;
    }
    const leader = currentLocation.gymLeader;
    setGameState({
      ...gameState,
      player: leader.team.reduce((player, pokemon) => markPokemonSeen(player, pokemon.id), gameState.player),
      currentBattle: {
        opponent: leader.team.map(p => ({ ...p, moves: p.moves.map(m => ({ ...m })) })),
        isGym: true,
        isWild: false,
        trainerName: leader.name,
        currentTurn: 0,
        activePlayerIndex: Math.max(0, gameState.player.team.findIndex(p => p.currentHp > 0)),
        activeOpponentIndex: 0,
      },
      dialogueHistory: [...gameState.dialogueHistory, leader.dialogue.intro.replace('{playerName}', gameState.player.name)],
    });
    setBattleLog([`${leader.name} challenges you!`, `${leader.name} sends out ${leader.team[0].name}!`]);
    setCurrentView('battle');
  };

  const handleChallengeTrainer = (trainerId: string) => {
    const trainer = currentLocation?.trainers?.find(item => item.id === trainerId);
    if (!trainer || gameState.trainerFlags?.[trainerId]) return;
    setGameState({
      ...gameState,
      player: trainer.team.reduce((player, pokemon) => markPokemonSeen(player, pokemon.id), gameState.player),
      currentBattle: {
        opponent: trainer.team.map(p => ({ ...p, moves: p.moves.map(m => ({ ...m })) })),
        isGym: false,
        isWild: false,
        trainerName: trainer.name,
        trainerId: trainer.id,
        reward: trainer.reward,
        currentTurn: 0,
        activePlayerIndex: Math.max(0, gameState.player.team.findIndex(p => p.currentHp > 0)),
        activeOpponentIndex: 0,
      },
      dialogueHistory: [...gameState.dialogueHistory, trainer.intro],
    });
    setBattleLog([trainer.intro, `${trainer.name} sends out ${trainer.team[0].name}!`]);
    setCurrentView('battle');
  };

  const handleTalkToNpc = (npcId: string) => {
    const npc = currentLocation?.npcs?.find(item => item.id === npcId);
    if (!npc) return;
    if (npcId === 'viridian-clerk' && !gameState.storyFlags?.oakParcelCollected && !gameState.storyFlags?.oakParcelDelivered) { handleCollectParcel(); return; }
    if (npcId === 'oak-pallet' && gameState.storyFlags?.oakParcelCollected) { handleDeliverParcel(); return; }
    if (npcId === 'daisy-pallet' && gameState.storyFlags?.oakParcelDelivered && !hasTownMap) { handleTalkToDaisy(); return; }
    if (npc.requiredTrainerDefeated && !gameState.trainerFlags?.[npc.requiredTrainerDefeated]) {
      addDialogue(`${npc.name}: “You need to defeat the trainer guarding this area first.”`);
      return;
    }
    if (npc.rewardFlag && gameState.storyFlags?.[npc.rewardFlag]) {
      addDialogue(`${npc.name}: “${npc.repeatDialogue || 'You have already made your choice.'}”`);
      return;
    }
    if (npc.rewardKeyItem) {
      const rewardFlag = npc.rewardFlag || `npcReward-${npc.id}`;
      const keyItems = gameState.player.keyItems || [];
      setGameState({
        ...gameState,
        player: { ...gameState.player, keyItems: keyItems.includes(npc.rewardKeyItem) ? keyItems : [...keyItems, npc.rewardKeyItem] },
        storyFlags: { ...gameState.storyFlags, [rewardFlag]: true },
        npcFlags: { ...gameState.npcFlags, [npcId]: true },
        dialogueHistory: [
          ...gameState.dialogueHistory,
          `${npc.name}: “${npc.dialogue}”`,
          `${npc.rewardName || npc.rewardKeyItem} added to Key Items.`,
        ],
      });
      return;
    }
    const alreadySpoken = !!gameState.npcFlags?.[npcId];
    const check = !alreadySpoken && npc.checkAttribute
      ? rollAbilityCheck(gameState.player.attributes?.[npc.checkAttribute] ?? 10, npc.checkDifficulty || 10)
      : undefined;
    const line = alreadySpoken && npc.repeatDialogue
      ? npc.repeatDialogue
      : check
        ? (check.success ? npc.successDialogue || npc.dialogue : npc.failureDialogue || npc.dialogue)
        : npc.dialogue;
    const modifierText = check ? (check.modifier >= 0 ? '+' + check.modifier : String(check.modifier)) : '';
    const checkNote = check
      ? ` [D20 ${check.roll} ${modifierText} = ${check.total} vs DC ${check.difficulty}: ${check.success ? 'success' : 'failure'}]`
      : '';
    setGameState({
      ...gameState,
      npcFlags: { ...gameState.npcFlags, [npcId]: true },
      dialogueHistory: [...gameState.dialogueHistory, `${npc.name}: “${line}”${checkNote}`],
    });
  };

  const handleBattleAction = (action: 'fight' | 'catch' | 'run', move?: Move) => {
    const battle = gameState.currentBattle;
    if (!battle) return;
    const playerIndex = battle.activePlayerIndex ?? 0;
    const opponentIndex = battle.activeOpponentIndex ?? 0;
    const playerPokemon = gameState.player.team[playerIndex];
    const opponentPokemon = battle.opponent[opponentIndex];
    if (!playerPokemon || !opponentPokemon) return;

    if (action === 'run') {
      if (!battle.isWild) {
        setBattleLog([...battleLog, 'You cannot run from a Trainer battle!']);
        return;
      }
      setGameState({ ...gameState, currentBattle: undefined });
      setCurrentView('map');
      return;
    }

    if (action === 'catch') {
      if (!battle.isWild) {
        setBattleLog([...battleLog, 'You cannot catch another Trainer’s Pokémon!']);
        return;
      }
      if (gameState.player.inventory.pokeball <= 0) {
        setBattleLog([...battleLog, 'You are out of Poké Balls!']);
        return;
      }
      const catchRoll = rollDice(20);
      const caught = calculateCatchRate(opponentPokemon, 'pokeball', catchRoll);
      const playerAfterBall = useItem(gameState.player, 'pokeball');
      if (caught) {
        const caughtPlayer = addPokemonToTeam(playerAfterBall, { ...opponentPokemon, currentHp: opponentPokemon.currentHp });
        setGameState({ ...gameState, player: caughtPlayer, currentBattle: undefined, dialogueHistory: [...gameState.dialogueHistory, `Caught ${opponentPokemon.name}! It has joined your ${gameState.player.team.length >= 6 ? 'PC' : 'team'}.`] });
        setBattleLog([...battleLog, `You rolled ${catchRoll}. Gotcha! ${opponentPokemon.name} was caught!`]);
        setCurrentView('map');
      } else {
        setGameState({ ...gameState, player: playerAfterBall });
        setBattleLog([...battleLog, `You rolled ${catchRoll}. ${opponentPokemon.name} broke free!`]);
      }
      return;
    }

    if (action !== 'fight' || !move) return;
    if (move.pp <= 0) { setBattleLog([...battleLog, 'That move has no PP left!']); return; }
    const result = executeBattleTurn(playerPokemon, opponentPokemon, move);
    const playerHadTurn = result.playerFirst || playerPokemon.currentHp - result.opponentDamage > 0;
    const nextLog = [...battleLog, ...result.battleLog];
    const playerTeam = gameState.player.team.map((pokemon, index) => {
      if (index !== playerIndex) return pokemon;
      return {
        ...pokemon,
        currentHp: Math.max(0, pokemon.currentHp - result.opponentDamage),
        moves: pokemon.moves.map(item => item.name === move.name && playerHadTurn ? { ...item, pp: Math.max(0, item.pp - 1) } : item),
      };
    });
    const opponents = battle.opponent.map((pokemon, index) => index === opponentIndex
      ? { ...pokemon, currentHp: Math.max(0, pokemon.currentHp - result.playerDamage) }
      : pokemon);
    let updatedPlayer = { ...gameState.player, team: playerTeam };
    const defeatedOpponent = opponents[opponentIndex].currentHp <= 0;

    if (defeatedOpponent) {
      nextLog.push(`${opponentPokemon.name} fainted!`);
      const expGain = calculateExpGain(opponentPokemon, battle.isWild);
      let rewardedPokemon = { ...playerTeam[playerIndex], exp: playerTeam[playerIndex].exp + expGain };
      let levelUps = 0;
      while (checkLevelUp(rewardedPokemon) && levelUps < 10) {
        const oldName = rewardedPokemon.name;
        rewardedPokemon = levelUpPokemon(rewardedPokemon);
        levelUps += 1;
        nextLog.push(`${oldName} grew to level ${rewardedPokemon.level}!`);
        if (oldName !== rewardedPokemon.name) nextLog.push(`${oldName} evolved into ${rewardedPokemon.name}!`);
      }
      updatedPlayer.team = playerTeam.map((pokemon, index) => index === playerIndex ? rewardedPokemon : pokemon);
      nextLog.push(`${rewardedPokemon.name} gained ${expGain} EXP!`);

      const nextOpponentIndex = opponents.findIndex((pokemon, index) => index > opponentIndex && pokemon.currentHp > 0);
      if (nextOpponentIndex >= 0) {
        nextLog.push(`${battle.trainerName || 'Opponent'} sends out ${opponents[nextOpponentIndex].name}!`);
        setBattleLog(nextLog);
        setGameState({
          ...gameState,
          player: updatedPlayer,
          currentBattle: { ...battle, opponent: opponents, activeOpponentIndex: nextOpponentIndex, currentTurn: battle.currentTurn + 1, battleLog: nextLog },
        });
        return;
      }

      const reward = battle.isGym
        ? currentLocation?.gymLeader?.reward || 500
        : battle.isWild ? opponentPokemon.level * 50 : battle.reward || 0;
      updatedPlayer = updateCoins(updatedPlayer, reward);
      if (reward > 0) nextLog.push(`You earned ${reward} coins!`);
      let storyFlags = { rivalBattleRoute1: false, oakParcelCollected: false, oakParcelDelivered: false, ...(gameState.storyFlags || {}) };
      let trainerFlags = { ...(gameState.trainerFlags || {}) };
      let gymBadges = [...(gameState.gymBadges || [])];

      if (battle.isGym && currentLocation?.gymLeader && !gymBadges.includes(currentLocation.gymLeader.badge)) {
        gymBadges.push(currentLocation.gymLeader.badge);
        updatedPlayer = addBadge(updatedPlayer);
        nextLog.push(`You earned the ${currentLocation.gymLeader.badge}!`);
        nextLog.push(currentLocation.gymLeader.dialogue.win);
      }
      if (battle.isRival) {
        storyFlags.rivalBattleRoute1 = true;
        nextLog.push('Blue narrows his eyes. “Enjoy the win. I will not lose next time.”');
      }
      if (battle.trainerId) {
        trainerFlags[battle.trainerId] = true;
        const trainer = currentLocation?.trainers?.find(item => item.id === battle.trainerId);
        if (trainer) nextLog.push(trainer.victory);
      }
      setBattleLog(nextLog);
      setGameState({
        ...gameState,
        player: updatedPlayer,
        currentBattle: undefined,
        storyFlags,
        trainerFlags,
        gymBadges,
        dialogueHistory: [...gameState.dialogueHistory, ...nextLog.slice(-3)],
      });
      setCurrentView('map');
      return;
    }

    const activePlayer = playerTeam[playerIndex];
    if (activePlayer.currentHp <= 0) {
      nextLog.push(`${activePlayer.name} fainted!`);
      const nextPlayerIndex = playerTeam.findIndex((pokemon, index) => index !== playerIndex && pokemon.currentHp > 0);
      if (nextPlayerIndex >= 0) {
        nextLog.push(`${activePlayer.name} returns. Go, ${playerTeam[nextPlayerIndex].name}!`);
        setBattleLog(nextLog);
        setGameState({
          ...gameState,
          player: updatedPlayer,
          currentBattle: { ...battle, opponent: opponents, activePlayerIndex: nextPlayerIndex, currentTurn: battle.currentTurn + 1, battleLog: nextLog },
        });
        return;
      }

      const flags = { ...(gameState.storyFlags || {}) };
      if (battle.isRival) flags.rivalBattleRoute1 = true;
      const lostCoins = battle.isRival ? 0 : Math.floor(updatedPlayer.coins * 0.1);
      updatedPlayer = updateCoins(updatedPlayer, -lostCoins);
      updatedPlayer.team = updatedPlayer.team.map(fullyHealPokemon);
      if (battle.isRival) nextLog.push(RIVAL_TRAINERS.route1Rival.dialogue.lose);
      if (battle.isGym && currentLocation?.gymLeader) nextLog.push(currentLocation.gymLeader.dialogue.lose);
      nextLog.push(battle.isRival ? 'Blue wins this round. Your Pokémon are taken to the Pokémon Centre and healed.' : 'Your team has no Pokémon left able to battle. You black out and wake up at the Pokémon Centre.');
      if (lostCoins > 0) nextLog.push(`You dropped ${lostCoins} coins in the confusion.`);
      setBattleLog(nextLog);
      setGameState({ ...gameState, player: updatedPlayer, currentBattle: undefined, storyFlags: flags, dialogueHistory: [...gameState.dialogueHistory, nextLog[nextLog.length - 1]] });
      setCurrentView('map');
      return;
    }

    setBattleLog(nextLog);
    setGameState({
      ...gameState,
      player: updatedPlayer,
      currentBattle: { ...battle, opponent: opponents, currentTurn: battle.currentTurn + 1, battleLog: nextLog },
    });
  };

  const handlePokemonCenter = () => {
    if (!currentLocation?.hasPokemonCenter) {
      addDialogue('There is no Pokémon Centre in this location.');
      return;
    }
    const healedTeam = gameState.player.team.map(fullyHealPokemon);
    const healedPC = gameState.player.pc.map(fullyHealPokemon);
    setGameState({
      ...gameState,
      player: { ...gameState.player, team: healedTeam, pc: healedPC },
      dialogueHistory: [...gameState.dialogueHistory, 'Welcome to the Pokémon Centre, ' + gameState.player.name + '!', 'Your Pokémon have been restored to full health!'],
    });
  };

  const handleTravel = (destination: string) => {
    const option = getTravelOption(gameState, destination);
    if (!option || !option.allowed) {
      addDialogue(option?.reason || 'You cannot travel that way.');
      return;
    }
    const knowledge = gameState.worldKnowledge || { knownLocations: [], discoveredLocations: [] };
    const neighbors = getTravelOptions({ ...gameState, player: { ...gameState.player, location: destination } }).map(item => item.key);
    setGameState({
      ...gameState,
      player: { ...gameState.player, location: destination },
      worldKnowledge: {
        knownLocations: Array.from(new Set([...knowledge.knownLocations, destination, ...neighbors])),
        discoveredLocations: Array.from(new Set([...knowledge.discoveredLocations, destination])),
      },
      dialogueHistory: [...gameState.dialogueHistory, `You travel to ${getLocation(destination)?.name || destination}.`],
    });
  };

  const handleCollectParcel = () => {
    if (gameState.player.location !== 'viridianCity' || gameState.storyFlags?.oakParcelCollected || gameState.storyFlags?.oakParcelDelivered) return;
    setGameState({
      ...gameState,
      storyFlags: { ...gameState.storyFlags, oakParcelCollected: true },
      dialogueHistory: [...gameState.dialogueHistory, 'The Viridian City Poké Mart clerk hands you a parcel for Professor Oak. “Could you take this back to the lab in Pallet Town?”'],
    });
  };

  const handleDeliverParcel = () => {
    if (gameState.player.location !== 'palletTown' || !gameState.storyFlags?.oakParcelCollected || gameState.storyFlags?.oakParcelDelivered) return;
    setGameState({
      ...gameState,
      storyFlags: { ...gameState.storyFlags, oakParcelCollected: false, oakParcelDelivered: true },
      dialogueHistory: [...gameState.dialogueHistory, 'Professor Oak is delighted to get his parcel. He thanks you and mentions that Daisy, Blue’s sister, has something useful for a new trainer.'],
    });
  };

  const handleTalkToDaisy = () => {
    if (gameState.player.location !== 'palletTown' || !gameState.storyFlags?.oakParcelDelivered || hasTownMap) return;
    setGameState({
      ...gameState,
      player: { ...gameState.player, keyItems: [...(gameState.player.keyItems || []), 'townMap'] },
      dialogueHistory: [
        ...gameState.dialogueHistory,
        'Daisy smiles and hands you a Town Map. “You’ll want to know your way around Kanto. Keep it safe!”',
        'Town Map added to Key Items. The Map button is now available.',
      ],
    });
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
        playerPokemon={gameState.player.team[gameState.currentBattle.activePlayerIndex ?? 0]}
        opponentPokemon={gameState.currentBattle.opponent[gameState.currentBattle.activeOpponentIndex ?? 0]}
        battleLog={battleLog.length ? battleLog : gameState.currentBattle.battleLog || []}
        isWild={gameState.currentBattle.isWild}
        onAction={handleBattleAction}
      />
    );
  }

  if (currentView === 'townmap') {
    return <TownMapView gameState={gameState} onBack={() => setCurrentView('map')} />;
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
          if (gameState.player.team.length <= 1) { addDialogue('You need to keep at least one Pokémon in your party.'); return; }
          setGameState({ ...gameState, player: swapPokemon(gameState.player, teamIdx, pcIdx) });
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
        travelOptions={travelOptions}
        npcs={currentLocation?.npcs || []}
        trainers={currentLocation?.trainers || []}
        defeatedTrainers={Object.keys(gameState.trainerFlags || {}).filter(id => gameState.trainerFlags?.[id])}
        onTalkToNpc={handleTalkToNpc}
        onChallengeTrainer={handleChallengeTrainer}
        canChallengeGym={canChallengeGym}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {hasTownMap && <button onClick={() => setCurrentView('townmap')} className="btn-primary">🗺️ Town Map</button>}
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
