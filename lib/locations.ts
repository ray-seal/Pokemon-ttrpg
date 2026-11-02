import { Location, ShopItem, GymLeader } from '@/types/game';
import { MOVES } from './pokedex';

// PokeMart items
export const SHOP_ITEMS: ShopItem[] = [
  { name: 'Poke Ball', price: 200, description: 'A device for catching wild Pokemon', key: 'pokeball' },
  { name: 'Great Ball', price: 600, description: 'A good ball with a higher catch rate', key: 'greatball' },
  { name: 'Ultra Ball', price: 1200, description: 'An ultra-high performance ball', key: 'ultraball' },
  { name: 'Potion', price: 300, description: 'Restores 20 HP', key: 'potion' },
  { name: 'Super Potion', price: 700, description: 'Restores 50 HP', key: 'superPotion' },
  { name: 'Hyper Potion', price: 1200, description: 'Restores 200 HP', key: 'hyperPotion' },
  { name: 'Revive', price: 1500, description: 'Revives a fainted Pokemon', key: 'revive' },
];

// Rival Trainers
export const RIVAL_TRAINERS: { [key: string]: GymLeader } = {
  route1Rival: {
    name: 'Blue',
    badge: 'Tutorial Complete',
    reward: 500,
    dialogue: {
      intro: `{playerName}! I'm Blue, Professor Oak's grandson! I'm going to become the world's greatest Pokemon Master! Let me show you how battles work!`,
      win: 'What?! I lost? Grrr... I need to train harder. Next time, I\'ll beat you for sure!',
      lose: 'See? That\'s how it\'s done! You need to train more!',
    },
    team: [
      {
        id: 4,
        name: 'Charmander',
        types: ['Fire'],
        baseStats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
        level: 5,
        exp: 0,
        maxHp: 20,
        currentHp: 20,
        moves: [MOVES.scratch, MOVES.ember],
      },
    ],
  },
};

// Gym Leaders (8 gyms from Pokemon Red)
export const GYM_LEADERS: { [key: string]: GymLeader } = {
  brock: {
    name: 'Brock',
    badge: 'Boulder Badge',
    reward: 1500,
    dialogue: {
      intro: "I'm Brock! I'm Pewter's Gym Leader! My rock-hard willpower is evident even in my Pokemon!",
      win: 'I took you for granted, and so I lost. As proof of your victory, I confer on you the Boulder Badge!',
      lose: 'The best trainers know how to bring out their Pokemon\'s best!',
    },
    team: [
      {
        id: 74,
        name: 'Geodude',
        types: ['Rock', 'Ground'],
        baseStats: { hp: 40, attack: 80, defense: 100, specialAttack: 30, specialDefense: 30, speed: 20 },
        level: 12,
        exp: 0,
        maxHp: 45,
        currentHp: 45,
        moves: [MOVES.tackle, MOVES.rockThrow],
      },
      {
        id: 95,
        name: 'Onix',
        types: ['Rock', 'Ground'],
        baseStats: { hp: 35, attack: 45, defense: 160, specialAttack: 30, specialDefense: 45, speed: 70 },
        level: 14,
        exp: 0,
        maxHp: 42,
        currentHp: 42,
        moves: [MOVES.tackle, MOVES.rockThrow],
      },
    ],
  },
  misty: {
    name: 'Misty',
    badge: 'Cascade Badge',
    reward: 2100,
    dialogue: {
      intro: 'Hi, you\'re a new face! I\'m Misty, the Cerulean Gym Leader!',
      win: 'Wow! You\'re too much! All right! You can have the Cascade Badge!',
      lose: 'Was I too strong for you? Come back when you\'re ready!',
    },
    team: [
      {
        id: 54,
        name: 'Psyduck',
        types: ['Water'],
        baseStats: { hp: 50, attack: 52, defense: 48, specialAttack: 65, specialDefense: 50, speed: 55 },
        level: 18,
        exp: 0,
        maxHp: 62,
        currentHp: 62,
        moves: [MOVES.scratch, MOVES.waterGun, MOVES.confusion],
      },
      {
        id: 7,
        name: 'Squirtle',
        types: ['Water'],
        baseStats: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 },
        level: 21,
        exp: 0,
        maxHp: 68,
        currentHp: 68,
        moves: [MOVES.tackle, MOVES.waterGun, MOVES.bubble],
      },
    ],
  },
  surge: {
    name: 'Lt. Surge',
    badge: 'Thunder Badge',
    reward: 2400,
    dialogue: {
      intro: 'Hey kid! What do you say? Want to battle the toughest in the gym?',
      win: 'Whoa! You\'re the real deal, kid! Here, take the Thunder Badge!',
      lose: 'A little electricity never hurt anyone! Hahaha!',
    },
    team: [
      {
        id: 25,
        name: 'Pikachu',
        types: ['Electric'],
        baseStats: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 },
        level: 24,
        exp: 0,
        maxHp: 70,
        currentHp: 70,
        moves: [MOVES.thunderShock, MOVES.quickAttack, MOVES.thunderbolt],
      },
    ],
  },
  erika: {
    name: 'Erika',
    badge: 'Rainbow Badge',
    reward: 2800,
    dialogue: {
      intro: 'Hello... Oh, you are a challenger? My name is Erika. I am the Celadon Gym Leader.',
      win: 'Oh! I concede defeat... You are remarkably strong... I must confer you the Rainbow Badge.',
      lose: 'It seems I was stronger than you thought.',
    },
    team: [
      {
        id: 1,
        name: 'Bulbasaur',
        types: ['Grass', 'Poison'],
        baseStats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
        level: 29,
        exp: 0,
        maxHp: 85,
        currentHp: 85,
        moves: [MOVES.vineWhip, MOVES.razorLeaf],
      },
    ],
  },
  koga: {
    name: 'Koga',
    badge: 'Soul Badge',
    reward: 3200,
    dialogue: {
      intro: 'Fwahahaha! I am Koga, the master of poison Pokemon!',
      win: 'Humph! You have proven your worth! Here! Take the Soul Badge!',
      lose: 'You are not prepared for my toxic techniques!',
    },
    team: [
      {
        id: 15,
        name: 'Beedrill',
        types: ['Bug', 'Poison'],
        baseStats: { hp: 65, attack: 90, defense: 40, specialAttack: 45, specialDefense: 80, speed: 75 },
        level: 37,
        exp: 0,
        maxHp: 115,
        currentHp: 115,
        moves: [MOVES.poisonSting, MOVES.quickAttack],
      },
    ],
  },
  sabrina: {
    name: 'Sabrina',
    badge: 'Marsh Badge',
    reward: 3600,
    dialogue: {
      intro: 'I had a vision of your arrival. I have had psychic powers since I was a child.',
      win: 'Your power... It far exceeds what I foresaw... Maybe it isn\'t possible to fully predict the future after all.',
      lose: 'I knew this would be the outcome.',
    },
    team: [
      {
        id: 12,
        name: 'Butterfree',
        types: ['Bug', 'Flying'],
        baseStats: { hp: 60, attack: 45, defense: 50, specialAttack: 90, specialDefense: 80, speed: 70 },
        level: 43,
        exp: 0,
        maxHp: 135,
        currentHp: 135,
        moves: [MOVES.confusion, MOVES.psychic],
      },
    ],
  },
  blaine: {
    name: 'Blaine',
    badge: 'Volcano Badge',
    reward: 4000,
    dialogue: {
      intro: 'Hah! I am Blaine! I am the Leader of Cinnabar Gym! My fiery Pokemon will incinerate all challengers!',
      win: 'I have burned out! You have earned the Volcano Badge!',
      lose: 'Fire always wins! Hahaha!',
    },
    team: [
      {
        id: 6,
        name: 'Charizard',
        types: ['Fire', 'Flying'],
        baseStats: { hp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100 },
        level: 47,
        exp: 0,
        maxHp: 165,
        currentHp: 165,
        moves: [MOVES.ember, MOVES.flamethrower],
      },
    ],
  },
  giovanni: {
    name: 'Giovanni',
    badge: 'Earth Badge',
    reward: 5000,
    dialogue: {
      intro: 'So! I must say, I am impressed you got here!',
      win: 'Ha! That was a truly intense fight. You have won! As proof, here is the Earth Badge!',
      lose: 'Team Rocket will always be on top!',
    },
    team: [
      {
        id: 51,
        name: 'Dugtrio',
        types: ['Ground'],
        baseStats: { hp: 35, attack: 100, defense: 50, specialAttack: 50, specialDefense: 70, speed: 120 },
        level: 50,
        exp: 0,
        maxHp: 145,
        currentHp: 145,
        moves: [MOVES.scratch, MOVES.earthquake],
      },
      {
        id: 76,
        name: 'Golem',
        types: ['Rock', 'Ground'],
        baseStats: { hp: 80, attack: 120, defense: 130, specialAttack: 55, specialDefense: 65, speed: 45 },
        level: 53,
        exp: 0,
        maxHp: 195,
        currentHp: 195,
        moves: [MOVES.rockThrow, MOVES.earthquake],
      },
    ],
  },
};

// Game locations matching Pokemon Red
export const LOCATIONS: { [key: string]: Location } = {
  palletTown: {
    name: 'Pallet Town',
    description: 'A quiet town. The smell of the sea is refreshing.',
    hasPokemonCenter: true,
    connectedTo: ['route1'],
    npcs: [
      { id: 'oak-pallet', name: 'Professor Oak', role: 'Pokémon Professor', dialogue: 'The world is full of Pokémon waiting to be discovered. Look after your starter and remember that a good trainer learns by observing.', repeatDialogue: 'Keep your eyes open out there. Kanto is full of surprises.' },
      { id: 'daisy-pallet', name: 'Daisy', role: 'Blue’s sister', dialogue: 'Blue is always talking about becoming the greatest trainer. Try not to let his big head put you off. Come back after you have helped Grandpa with his parcel.', repeatDialogue: 'Bring Grandpa his parcel and I might have something useful for you.' },
    ],
  },
  route1: {
    name: 'Route 1',
    description: 'A path that winds and bends through grassy fields.',
    wildPokemon: [
      { pokemonId: 16, minLevel: 2, maxLevel: 5, rarity: 60 },
      { pokemonId: 19, minLevel: 2, maxLevel: 4, rarity: 40 },
    ],
    connectedTo: ['palletTown', 'viridianCity'],
  },
  viridianCity: {
    name: 'Viridian City',
    description: 'A beautiful city surrounded by green trees.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: false,
    gymLeader: GYM_LEADERS.giovanni,
    connectedTo: ['route1', 'route2', 'route22'],
    npcs: [
      { id: 'viridian-old-man', name: 'Old Man', role: 'Local resident', dialogue: 'The road north leads through Viridian Forest to Pewter City. Watch your step in the tall grass. Wild Pokémon can be unpredictable.', repeatDialogue: 'Remember, the Pokémon Centre can restore your team.', checkAttribute: 'wisdom', checkDifficulty: 10, successDialogue: 'The old man leans closer. “There is a quiet path west of town. Trainers sometimes use Route 22 to prepare before heading north.”', failureDialogue: 'The old man launches into a rambling story about the good old days. You cannot quite follow his directions.' },
      { id: 'viridian-clerk', name: 'Poké Mart Clerk', role: 'Shop assistant', dialogue: 'Welcome! We have supplies for trainers. There is also a parcel here for Professor Oak. Could you take it back to Pallet Town?', repeatDialogue: 'Professor Oak is waiting for that parcel. Best get it back to him.' },
    ],
  },
  route2: {
    name: 'Route 2',
    description: 'A route with a small path that winds down through the forest.',
    wildPokemon: [
      { pokemonId: 16, minLevel: 3, maxLevel: 5, rarity: 60 },
      { pokemonId: 19, minLevel: 3, maxLevel: 5, rarity: 40 },
    ],
    connectedTo: ['viridianCity', 'viridianForest'],
    npcs: [
      { id: 'route2-hiker', name: 'Young Hiker', role: 'Trainer in training', dialogue: 'I heard there are tiny Pokémon hiding in the forest. I am working up the courage to go in. Bug Pokémon can be surprisingly tough!', repeatDialogue: 'Still building up the courage. Maybe tomorrow.', checkAttribute: 'intelligence', checkDifficulty: 11, successDialogue: 'You spot a flash of yellow fur in the forest canopy. “Pikachu?” the hiker whispers. “They are rare, but they do live in there.”', failureDialogue: 'The hiker points vaguely at the trees. You cannot work out what he is trying to describe.' },
    ],
    trainers: [
      { id: 'route2-lass-molly', name: 'Lass Molly', reward: 180, intro: 'Lass Molly: My Pokémon are small, but they are full of spirit!', victory: 'Lass Molly: You have got a good team. I need to train harder.', team: [{ id: 16, name: 'Pidgey', types: ['Normal', 'Flying'], baseStats: { hp: 40, attack: 45, defense: 40, specialAttack: 35, specialDefense: 35, speed: 56 }, level: 5, exp: 0, maxHp: 20, currentHp: 20, moves: [MOVES.tackle, MOVES.gust] }] },
    ],
  },
  viridianForest: {
    name: 'Viridian Forest',
    description: 'A dense forest filled with Bug Pokemon.',
    wildPokemon: [
      { pokemonId: 10, minLevel: 3, maxLevel: 5, rarity: 45 },
      { pokemonId: 13, minLevel: 3, maxLevel: 5, rarity: 45 },
      { pokemonId: 25, minLevel: 3, maxLevel: 5, rarity: 10 },
    ],
    connectedTo: ['route2', 'pewterCity'],
    npcs: [
      { id: 'forest-bug-catcher', name: 'Bug Catcher', role: 'Young trainer', dialogue: 'Viridian Forest is crawling with Bug Pokémon. Caterpie and Weedle are common, but keep an eye out for Pikachu too!', repeatDialogue: 'A good Bug Catcher knows every rustle in the leaves.' },
    ],
    trainers: [
      { id: 'forest-bug-catcher-sam', name: 'Bug Catcher Sam', reward: 220, intro: 'Bug Catcher Sam: My bugs are ready! Let’s battle!', victory: 'Bug Catcher Sam: You squashed me fair and square. I will train them up!', team: [{ id: 10, name: 'Caterpie', types: ['Bug'], baseStats: { hp: 45, attack: 30, defense: 35, specialAttack: 20, specialDefense: 20, speed: 45 }, level: 5, exp: 0, maxHp: 20, currentHp: 20, moves: [MOVES.tackle] }, { id: 13, name: 'Weedle', types: ['Bug', 'Poison'], baseStats: { hp: 40, attack: 35, defense: 30, specialAttack: 20, specialDefense: 20, speed: 50 }, level: 5, exp: 0, maxHp: 19, currentHp: 19, moves: [MOVES.poisonSting] }] },
    ],
  },
  pewterCity: {
    name: 'Pewter City',
    description: 'A quiet city nestled between rugged mountains.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: true,
    gymLeader: GYM_LEADERS.brock,
    connectedTo: ['viridianForest', 'route3'],
    npcs: [
      { id: 'pewter-guide', name: 'Museum Volunteer', role: 'Local guide', dialogue: 'Pewter City is proud of its museum. Brock, our Gym Leader, specialises in Rock Pokémon. Water and Grass moves are useful against them.', repeatDialogue: 'The museum is to the north. Brock’s Gym is ready when you are.', checkAttribute: 'charisma', checkDifficulty: 12, successDialogue: 'The volunteer warms to you and shares a useful tip: Brock’s Rock Pokémon are vulnerable to Water and Grass attacks. Onix is especially tough physically.', failureDialogue: 'The volunteer gives you a polite nod but seems too busy to offer more than directions to the museum.' },
      { id: 'pewter-child', name: 'Young Trainer', role: 'Local child', dialogue: 'I want to be strong like Brock one day! Have you visited the Pokémon Centre? It is always worth healing before a Gym challenge.', repeatDialogue: 'I am going to be a Gym Leader one day!' },
    ],
  },
  route3: {
    name: 'Route 3',
    description: 'A route with many trainers heading to Mt. Moon.',
    wildPokemon: [
      { pokemonId: 16, minLevel: 6, maxLevel: 8, rarity: 40 },
      { pokemonId: 19, minLevel: 6, maxLevel: 8, rarity: 30 },
    ],
    connectedTo: ['pewterCity', 'mtMoon'],
  },
  mtMoon: {
    name: 'Mt. Moon',
    description: 'A massive mountain cave filled with wild Pokemon.',
    wildPokemon: [
      { pokemonId: 74, minLevel: 8, maxLevel: 10, rarity: 60 },
      { pokemonId: 19, minLevel: 8, maxLevel: 10, rarity: 40 },
    ],
    connectedTo: ['route3', 'route4'],
  },
  route4: {
    name: 'Route 4',
    description: 'A downhill path that leads to Cerulean City.',
    wildPokemon: [
      { pokemonId: 19, minLevel: 6, maxLevel: 12, rarity: 50 },
      { pokemonId: 54, minLevel: 8, maxLevel: 12, rarity: 50 },
    ],
    connectedTo: ['mtMoon', 'ceruleanCity'],
  },
  ceruleanCity: {
    name: 'Cerulean City',
    description: 'A beautiful blue city by the water.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: true,
    gymLeader: GYM_LEADERS.misty,
    connectedTo: ['route4', 'route24', 'route5'],
  },
  route24: {
    name: 'Route 24',
    description: 'A path with a bridge over a flowing river.',
    wildPokemon: [
      { pokemonId: 10, minLevel: 7, maxLevel: 12, rarity: 30 },
      { pokemonId: 13, minLevel: 7, maxLevel: 12, rarity: 30 },
      { pokemonId: 16, minLevel: 8, maxLevel: 12, rarity: 40 },
    ],
    connectedTo: ['ceruleanCity', 'route25'],
  },
  route25: {
    name: 'Route 25',
    description: 'A quiet path leading to a secluded cape.',
    wildPokemon: [
      { pokemonId: 10, minLevel: 8, maxLevel: 14, rarity: 30 },
      { pokemonId: 13, minLevel: 8, maxLevel: 14, rarity: 30 },
      { pokemonId: 16, minLevel: 9, maxLevel: 14, rarity: 40 },
    ],
    connectedTo: ['route24'],
  },
  route5: {
    name: 'Route 5',
    description: 'A path that leads south from Cerulean City.',
    wildPokemon: [
      { pokemonId: 16, minLevel: 13, maxLevel: 16, rarity: 50 },
      { pokemonId: 54, minLevel: 10, maxLevel: 16, rarity: 50 },
    ],
    connectedTo: ['ceruleanCity', 'vermilionCity'],
  },
  vermilionCity: {
    name: 'Vermilion City',
    description: 'The port city that opens to the sea.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: true,
    gymLeader: GYM_LEADERS.surge,
    connectedTo: ['route5', 'route11'],
  },
  route11: {
    name: 'Route 11',
    description: 'An east-west path connecting two cities.',
    wildPokemon: [
      { pokemonId: 19, minLevel: 14, maxLevel: 17, rarity: 40 },
      { pokemonId: 54, minLevel: 12, maxLevel: 17, rarity: 30 },
      { pokemonId: 25, minLevel: 13, maxLevel: 17, rarity: 30 },
    ],
    connectedTo: ['vermilionCity', 'diglettsCave'],
  },
  diglettsCave: {
    name: 'Diglett\'s Cave',
    description: 'A cave dug by Diglett and Dugtrio.',
    wildPokemon: [
      { pokemonId: 50, minLevel: 15, maxLevel: 22, rarity: 70 },
      { pokemonId: 51, minLevel: 29, maxLevel: 31, rarity: 30 },
    ],
    connectedTo: ['route11', 'route2'],
  },
  celadonCity: {
    name: 'Celadon City',
    description: 'The city of rainbow dreams.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: true,
    gymLeader: GYM_LEADERS.erika,
    connectedTo: ['route7'],
  },
  route7: {
    name: 'Route 7',
    description: 'A path connecting Celadon and Saffron.',
    wildPokemon: [
      { pokemonId: 16, minLevel: 17, maxLevel: 22, rarity: 40 },
      { pokemonId: 19, minLevel: 17, maxLevel: 22, rarity: 30 },
      { pokemonId: 25, minLevel: 18, maxLevel: 22, rarity: 30 },
    ],
    connectedTo: ['celadonCity', 'saffronCity'],
  },
  saffronCity: {
    name: 'Saffron City',
    description: 'A sprawling metropolis in the heart of Kanto.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: true,
    gymLeader: GYM_LEADERS.sabrina,
    connectedTo: ['route7', 'route8'],
  },
  route8: {
    name: 'Route 8',
    description: 'An east-west path with many trainers.',
    wildPokemon: [
      { pokemonId: 16, minLevel: 18, maxLevel: 20, rarity: 30 },
      { pokemonId: 19, minLevel: 18, maxLevel: 20, rarity: 30 },
      { pokemonId: 54, minLevel: 15, maxLevel: 20, rarity: 40 },
    ],
    connectedTo: ['saffronCity', 'lavenderTown'],
  },
  lavenderTown: {
    name: 'Lavender Town',
    description: 'A town known for its eerie Pokemon Tower.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    connectedTo: ['route8'],
  },
  route22: {
    name: 'Route 22',
    description: 'A short path west of Viridian City.',
    wildPokemon: [
      { pokemonId: 19, minLevel: 3, maxLevel: 5, rarity: 50 },
      { pokemonId: 54, minLevel: 2, maxLevel: 5, rarity: 50 },
    ],
    connectedTo: ['viridianCity'],
  },
  cinnabarIsland: {
    name: 'Cinnabar Island',
    description: 'A volcanic island with a Pokemon Lab.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: true,
    gymLeader: GYM_LEADERS.blaine,
    connectedTo: [],
  },
  fuchsiaCity: {
    name: 'Fuchsia City',
    description: 'A city surrounded by nature.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: true,
    gymLeader: GYM_LEADERS.koga,
    connectedTo: [],
  },
};

// Helper function to get location data
export function getLocation(locationKey: string): Location | undefined {
  return LOCATIONS[locationKey];
}

// Helper to get all location keys
export function getAllLocationKeys(): string[] {
  return Object.keys(LOCATIONS);
}
