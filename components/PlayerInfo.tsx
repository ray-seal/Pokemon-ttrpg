'use client';

import { Player } from '@/types/game';
import { getPokedexStats } from '@/lib/gameState';

interface PlayerInfoProps {
  player: Player;
}

export default function PlayerInfo({ player }: PlayerInfoProps) {
  const pokedexStats = getPokedexStats(player.pokedex);
  
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-2">{player.name}</h2>
          <div className="text-sm text-gray-400">
            <p>Coins: {player.coins} ₽</p>
            <p>Badges: {player.badges}/8</p>
            <p>Pokedex: {pokedexStats.caught}/{pokedexStats.total} caught</p>
          </div>
        </div>
        
        <div className="text-right">
          <h3 className="font-bold mb-2">Team</h3>
          <div className="flex gap-2">
            {player.team.map((pokemon, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-2xl">
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
                <p className="text-xs mt-1">Lv.{pokemon.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-700">
        <h3 className="font-bold mb-2 text-sm">Trainer Attributes</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
          {Object.entries(player.attributes || { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 }).map(([name, score]) => (
            <div key={name} className="rounded bg-gray-800 p-2 text-center">
              <span className="block capitalize text-gray-400">{name}</span>
              <span className="font-bold">{score}</span>
              <span className="block text-gray-500">{Math.floor((score - 10) / 2) >= 0 ? '+' : ''}{Math.floor((score - 10) / 2)}</span>
            </div>
          ))}
        </div>
      </div>

      {player.keyItems.length > 0 && (
        <div className="mt-3 text-xs text-yellow-300">
          Key Items: {player.keyItems.map(item => item === 'townMap' ? 'Town Map' : item === 'helixFossil' ? 'Helix Fossil' : item === 'domeFossil' ? 'Dome Fossil' : item).join(', ')}
        </div>
      )}

      {/* Inventory quick view */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <h3 className="font-bold mb-2 text-sm">Quick Inventory</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>Poke Balls: {player.inventory.pokeball}</div>
          <div>Great Balls: {player.inventory.greatball}</div>
          <div>Potions: {player.inventory.potion}</div>
        </div>
      </div>
    </div>
  );
}
