import { GameState } from '@/types/game';
export interface KantoMapNode {
  key: string;
  name: string;
  region: string;
  connections: string[];
  gate?: { type: 'badges' | 'keyItem'; amount?: number; item?: string; message: string };
}

// Complete geographical skeleton of the Kanto journey. Some destinations are
// deliberately marked as future content until their location scenes are built.
export const KANTO_MAP: KantoMapNode[] = [
  { key: 'palletTown', name: 'Pallet Town', region: 'South-west Kanto', connections: ['route1', 'route21'] },
  { key: 'route1', name: 'Route 1', region: 'South-west Kanto', connections: ['palletTown', 'viridianCity'] },
  { key: 'viridianCity', name: 'Viridian City', region: 'South-west Kanto', connections: ['route1', 'route2', 'route22'] },
  { key: 'route22', name: 'Route 22', region: 'South-west Kanto', connections: ['viridianCity', 'route23'] },
  { key: 'route2', name: 'Route 2', region: 'West Kanto', connections: ['viridianCity', 'viridianForest', 'diglettsCave'] },
  { key: 'viridianForest', name: 'Viridian Forest', region: 'West Kanto', connections: ['route2', 'pewterCity'] },
  { key: 'pewterCity', name: 'Pewter City', region: 'West Kanto', connections: ['viridianForest', 'route3'] },
  { key: 'route3', name: 'Route 3', region: 'North-west Kanto', connections: ['pewterCity', 'mtMoon'] },
  { key: 'mtMoon', name: 'Mt. Moon', region: 'North-west Kanto', connections: ['route3', 'route4'] },
  { key: 'route4', name: 'Route 4', region: 'North Kanto', connections: ['mtMoon', 'ceruleanCity'] },
  { key: 'ceruleanCity', name: 'Cerulean City', region: 'North Kanto', connections: ['route4', 'route24', 'route5', 'route9', 'ceruleanCave'] },
  { key: 'route24', name: 'Route 24', region: 'North Kanto', connections: ['ceruleanCity', 'route25'] },
  { key: 'route25', name: 'Route 25', region: 'North Kanto', connections: ['route24', 'billsHouse'] },
  { key: 'billsHouse', name: "Bill's House", region: 'North Kanto', connections: ['route25'] },
  { key: 'ceruleanCave', name: 'Cerulean Cave', region: 'North Kanto', connections: ['ceruleanCity'] },
  { key: 'route5', name: 'Route 5', region: 'Central Kanto', connections: ['ceruleanCity', 'undergroundPathNorth', 'saffronCity'] },
  { key: 'undergroundPathNorth', name: 'Underground Path (North)', region: 'Central Kanto', connections: ['route5', 'route6'] },
  { key: 'route6', name: 'Route 6', region: 'Central Kanto', connections: ['undergroundPathNorth', 'vermilionCity', 'saffronCity'] },
  { key: 'vermilionCity', name: 'Vermilion City', region: 'Central Kanto', connections: ['route6', 'route11', 'ssAnne'] },
  { key: 'ssAnne', name: 'S.S. Anne', region: 'Central Kanto', connections: ['vermilionCity'] },
  { key: 'route11', name: 'Route 11', region: 'East Kanto', connections: ['vermilionCity', 'diglettsCave'] },
  { key: 'diglettsCave', name: "Diglett's Cave", region: 'East Kanto', connections: ['route11', 'route2'] },
  { key: 'route9', name: 'Route 9', region: 'North-east Kanto', connections: ['ceruleanCity', 'route10'] },
  { key: 'route10', name: 'Route 10', region: 'North-east Kanto', connections: ['route9', 'rockTunnel', 'powerPlant'] },
  { key: 'rockTunnel', name: 'Rock Tunnel', region: 'North-east Kanto', connections: ['route10', 'lavenderTown'] },
  { key: 'powerPlant', name: 'Power Plant', region: 'North-east Kanto', connections: ['route10'] },
  { key: 'lavenderTown', name: 'Lavender Town', region: 'East Kanto', connections: ['rockTunnel', 'route8', 'route12', 'pokemonTower'] },
  { key: 'pokemonTower', name: 'Pokémon Tower', region: 'East Kanto', connections: ['lavenderTown'] },
  { key: 'route12', name: 'Route 12', region: 'East Kanto', connections: ['lavenderTown', 'route13'], gate: { type: 'keyItem', item: 'pokeFlute', message: 'A sleeping Pokémon blocks the path. You will need the Poké Flute.' } },
  { key: 'route13', name: 'Route 13', region: 'South-east Kanto', connections: ['route12', 'route14'] },
  { key: 'route14', name: 'Route 14', region: 'South-east Kanto', connections: ['route13', 'route15'] },
  { key: 'route15', name: 'Route 15', region: 'South-east Kanto', connections: ['route14', 'fuchsiaCity'] },
  { key: 'fuchsiaCity', name: 'Fuchsia City', region: 'South Kanto', connections: ['route15', 'route18', 'route19', 'safariZone'] },
  { key: 'safariZone', name: 'Safari Zone', region: 'South Kanto', connections: ['fuchsiaCity'] },
  { key: 'route18', name: 'Route 18', region: 'South Kanto', connections: ['fuchsiaCity', 'route17'] },
  { key: 'route17', name: 'Route 17', region: 'South Kanto', connections: ['route18', 'route16'] },
  { key: 'route16', name: 'Route 16', region: 'West Kanto', connections: ['route17', 'celadonCity'], gate: { type: 'keyItem', item: 'pokeFlute', message: 'A sleeping Pokémon blocks the cycling road. You need the Poké Flute.' } },
  { key: 'celadonCity', name: 'Celadon City', region: 'Central Kanto', connections: ['route16', 'route7', 'rocketHideout'] },
  { key: 'rocketHideout', name: 'Rocket Hideout', region: 'Central Kanto', connections: ['celadonCity'] },
  { key: 'route7', name: 'Route 7', region: 'Central Kanto', connections: ['celadonCity', 'saffronCity'] },
  { key: 'route8', name: 'Route 8', region: 'Central Kanto', connections: ['saffronCity', 'lavenderTown'] },
  { key: 'saffronCity', name: 'Saffron City', region: 'Central Kanto', connections: ['route7', 'route8', 'route5', 'route6', 'silphCo'], gate: { type: 'keyItem', item: 'tea', message: 'The guards are thirsty and refuse entry. Find something suitable to give them.' } },
  { key: 'silphCo', name: 'Silph Co.', region: 'Central Kanto', connections: ['saffronCity'] },
  { key: 'route19', name: 'Route 19', region: 'South Kanto', connections: ['fuchsiaCity', 'route20'], gate: { type: 'keyItem', item: 'surf', message: 'The sea route is impassable without Surf.' } },
  { key: 'route20', name: 'Route 20', region: 'South Kanto', connections: ['route19', 'seafoamIslands', 'cinnabarIsland'], gate: { type: 'keyItem', item: 'surf', message: 'You need Surf to cross the water.' } },
  { key: 'seafoamIslands', name: 'Seafoam Islands', region: 'South Kanto', connections: ['route20'], gate: { type: 'keyItem', item: 'surf', message: 'You need Surf to reach the islands.' } },
  { key: 'cinnabarIsland', name: 'Cinnabar Island', region: 'South Kanto', connections: ['route20', 'route21', 'pokemonMansion', 'pokemonLab'], gate: { type: 'keyItem', item: 'surf', message: 'You need Surf to reach Cinnabar Island.' } },
  { key: 'pokemonLab', name: 'Pokémon Lab', region: 'South Kanto', connections: ['cinnabarIsland'] },
  { key: 'pokemonMansion', name: 'Pokémon Mansion', region: 'South Kanto', connections: ['cinnabarIsland'] },
  { key: 'route21', name: 'Route 21', region: 'South Kanto', connections: ['cinnabarIsland', 'palletTown'], gate: { type: 'keyItem', item: 'surf', message: 'You need Surf to cross the water.' } },
  { key: 'route23', name: 'Route 23', region: 'North Kanto', connections: ['route22', 'victoryRoad'], gate: { type: 'badges', amount: 8, message: 'The guards require all eight Kanto Gym Badges.' } },
  { key: 'victoryRoad', name: 'Victory Road', region: 'North Kanto', connections: ['route23', 'indigoPlateau'], gate: { type: 'badges', amount: 8, message: 'The Victory Road guards require all eight badges.' } },
  { key: 'indigoPlateau', name: 'Indigo Plateau', region: 'North Kanto', connections: ['victoryRoad'], gate: { type: 'badges', amount: 8, message: 'The Pokémon League is reserved for trainers with all eight badges.' } },
];

export interface TravelOption {
  key: string;
  name: string;
  allowed: boolean;
  reason?: string;
}

function gateReason(state: GameState, node: KantoMapNode): string | undefined {
  if (!node.gate) return undefined;
  if (node.gate.type === 'badges' && state.player.badges < (node.gate.amount || 0)) return node.gate.message;
  if (node.gate.type === 'keyItem' && !state.player.keyItems?.includes(node.gate.item || '')) return node.gate.message;
  return undefined;
}

export function getTravelOptions(state: GameState): TravelOption[] {
  const current = KANTO_MAP.find(node => node.key === state.player.location);
  if (!current) return [];
  const options: TravelOption[] = [];
  for (const key of current.connections) {
    const destination = KANTO_MAP.find(node => node.key === key);
    if (!destination) continue;
    const reason = gateReason(state, destination);
    options.push({ key, name: destination.name, allowed: !reason, reason });
  }
  return options;
}

export function getTravelOption(state: GameState, destination: string): TravelOption | undefined {
  return getTravelOptions(state).find(option => option.key === destination);
}

export function getMapStatus(state: GameState, node: KantoMapNode): 'current' | 'visited' | 'known' | 'unmapped' | 'blocked' {
  if (node.key === state.player.location) return 'current';
  if (state.worldKnowledge?.discoveredLocations.includes(node.key)) return 'visited';
  if (state.worldKnowledge?.knownLocations.includes(node.key)) return 'known';
  if (getTravelOptions(state).some(option => option.key === node.key && !option.allowed)) return 'blocked';
  return 'unmapped';
}
