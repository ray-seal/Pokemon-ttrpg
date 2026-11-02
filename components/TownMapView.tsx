'use client';

import { GameState } from '@/types/game';
import { KANTO_MAP, getMapStatus } from '@/lib/kantoMap';
import { LOCATIONS } from '@/lib/locations';

interface TownMapViewProps {
  gameState: GameState;
  onBack: () => void;
}

const statusText = {
  current: 'You are here',
  visited: 'Visited',
  known: 'Known',
  blocked: 'Route blocked',
  unmapped: 'Not yet discovered',
};

export default function TownMapView({ gameState, onBack }: TownMapViewProps) {
  const groups = Array.from(new Set(KANTO_MAP.map(node => node.region)));
  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-sm text-yellow-300">Key Item</p>
            <h1 className="text-3xl font-bold">🗺️ Kanto Town Map</h1>
          </div>
          <button onClick={onBack} className="btn-secondary">Back to adventure</button>
        </div>
        <p className="text-gray-300 mb-2">Your map records the wider region. Places you have visited, heard about, or cannot reach yet are marked separately.</p>
        <p className="text-xs text-gray-500 mb-5">Some locations are charted for future chapters and are not playable yet.</p>
        <div className="flex flex-wrap gap-2 mb-5 text-xs">
          <span className="rounded bg-green-900 px-2 py-1">● You are here</span>
          <span className="rounded bg-blue-900 px-2 py-1">● Visited</span>
          <span className="rounded bg-gray-700 px-2 py-1">● Known</span>
          <span className="rounded bg-amber-900 px-2 py-1">● Route blocked</span>
          <span className="rounded bg-gray-800 px-2 py-1">● Not yet discovered</span>
        </div>
        {groups.map(region => (
          <section key={region} className="card mb-4">
            <h2 className="text-xl font-bold mb-3">{region}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {KANTO_MAP.filter(node => node.region === region).map(node => {
                const status = getMapStatus(gameState, node);
                const colour = status === 'current' ? 'border-green-400 bg-green-950/40' :
                  status === 'visited' ? 'border-blue-500 bg-blue-950/30' :
                  status === 'blocked' ? 'border-amber-500/50 bg-amber-950/20' : 'border-gray-700 bg-gray-800/60';
                return (
                  <div key={node.key} className={`rounded border p-3 ${colour}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{node.name}</span>
                      <span className="text-xs text-gray-300">{statusText[status]}</span>
                    </div>
                    {!LOCATIONS[node.key] && <p className="text-xs text-purple-300 mt-1">Mapped for a future chapter</p>}
                    {node.gate && status !== 'current' && (
                      <p className="text-xs text-gray-400 mt-1">{node.gate.message}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <button onClick={onBack} className="btn-secondary w-full mt-2">Close map</button>
      </div>
    </main>
  );
}
