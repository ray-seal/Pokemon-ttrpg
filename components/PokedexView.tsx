'use client';

import { PokedexStatus } from '@/types/game';
import { POKEDEX } from '@/lib/pokedex';

interface PokedexViewProps {
  pokedex: PokedexStatus;
  onBack: () => void;
}

export default function PokedexView({ pokedex, onBack }: PokedexViewProps) {
  const allPokemonIds = Object.keys(POKEDEX).map(id => parseInt(id)).sort((a, b) => a - b);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="card mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Pokedex</h2>
          <button onClick={onBack} className="btn-secondary">
            Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPokemonIds.map((id) => {
          const pokemon = POKEDEX[id];
          const status = pokedex[id];
          const isSeen = status?.seen || false;
          const isCaught = status?.caught || false;

          return (
            <div
              key={id}
              className={`card ${!isSeen ? 'opacity-40' : ''} ${isCaught ? 'border-pokemon-yellow' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="text-4xl">
                  {!isSeen ? '❓' : (
                    <>
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
                      {pokemon.types[0] === 'Poison' && '☠️'}
                      {pokemon.types[0] === 'Dragon' && '🐉'}
                      {pokemon.types[0] === 'Ice' && '❄️'}
                      {pokemon.types[0] === 'Fighting' && '🥊'}
                      {pokemon.types[0] === 'Ghost' && '👻'}
                    </>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">
                      #{id.toString().padStart(3, '0')} {isSeen ? pokemon.name : '???'}
                    </h3>
                    {isCaught && <span className="text-pokemon-yellow">★</span>}
                  </div>
                  {isSeen && (
                    <>
                      <p className="text-sm text-gray-400">{pokemon.types.join(' / ')}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>HP: {pokemon.baseStats.hp} | ATK: {pokemon.baseStats.attack}</p>
                        <p>DEF: {pokemon.baseStats.defense} | SPD: {pokemon.baseStats.speed}</p>
                      </div>
                      {pokemon.locations && pokemon.locations.length > 0 && (
                        <p className="text-xs text-gray-500 mt-2">
                          Location: {pokemon.locations[0]}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
