import { Location, ShopItem, GymLeader } from '@/types/game';
import { MOVES } from './pokedex';
import { generateWildPokemon } from './gameLogic';

const trainerPokemon = (id: number, level: number) => generateWildPokemon(id, level);

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
      trainerPokemon(120, 18),
      trainerPokemon(121, 21),
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
    description: 'A long mountain road north of Pewter. Trainers line the path, and the entrance to Mt. Moon waits at the far end.',
    wildPokemon: [
      { pokemonId: 16, minLevel: 6, maxLevel: 8, rarity: 35 },
      { pokemonId: 19, minLevel: 6, maxLevel: 8, rarity: 30 },
      { pokemonId: 21, minLevel: 7, maxLevel: 9, rarity: 20 },
      { pokemonId: 29, minLevel: 7, maxLevel: 9, rarity: 15 },
    ],
    connectedTo: ['pewterCity', 'mtMoon'],
    npcs: [
      { id: 'route3-camper', name: 'Camper', role: 'Young trainer', dialogue: 'Mt. Moon is just up ahead. I heard strange lights have been seen inside the cave at night.', repeatDialogue: 'Keep your eyes open in Mt. Moon. Team Rocket have been seen around there.' },
    ],
    trainers: [
      { id: 'route3-bug-catcher-rick', name: 'Bug Catcher Rick', reward: 180, intro: 'Bug Catcher Rick: My Pokémon are itching for a battle!', victory: 'Bug Catcher Rick: You have got the better of my bugs. I will keep training!', team: [trainerPokemon(13, 9), trainerPokemon(14, 9)] },
      { id: 'route3-lass-janice', name: 'Lass Janice', reward: 180, intro: 'Lass Janice: I just caught these Pokémon. Want to see them?', victory: 'Lass Janice: You are stronger than you look!', team: [trainerPokemon(16, 9), trainerPokemon(29, 9)] },
      { id: 'route3-youngster-ben', name: 'Youngster Ben', reward: 200, intro: 'Youngster Ben: I have been looking for a challenger!', victory: 'Youngster Ben: I need to rethink my strategy.', team: [trainerPokemon(19, 10), trainerPokemon(21, 10)] },
      { id: 'route3-hiker-marcos', name: 'Hiker Marcos', reward: 240, intro: 'Hiker Marcos: These mountains make Pokémon tough!', victory: 'Hiker Marcos: You have earned that victory.', team: [trainerPokemon(74, 10), trainerPokemon(74, 10)] },
    ],
  },
  mtMoon: {
    name: 'Mt. Moon',
    description: 'A vast, twisting cave beneath the mountains. Zubat flutter overhead, Geodude stir in the rubble, and rumours of strange stones have drawn unwanted visitors.',
    wildPokemon: [
      { pokemonId: 41, minLevel: 7, maxLevel: 10, rarity: 40 },
      { pokemonId: 74, minLevel: 8, maxLevel: 10, rarity: 30 },
      { pokemonId: 46, minLevel: 8, maxLevel: 10, rarity: 18 },
      { pokemonId: 35, minLevel: 8, maxLevel: 10, rarity: 7 },
      { pokemonId: 95, minLevel: 10, maxLevel: 12, rarity: 5 },
    ],
    connectedTo: ['route3', 'route4'],
    npcs: [
      { id: 'mtmoon-hiker', name: 'Lost Hiker', role: 'Cave explorer', dialogue: 'I took a wrong turn and ended up here. The cave has more than one level, and the tunnels all look the same after a while.', repeatDialogue: 'I am going to stick close to the main path this time.' },
      { id: 'mtmoon-researcher', name: 'Fossil Researcher', role: 'Pokémon fossil expert', dialogue: 'These fossils are incredibly rare. A group of thieves tried to take them, but I managed to recover two specimens. Defeat the Super Nerd guarding the chamber, then you may choose one.', repeatDialogue: 'Choose carefully. You may take only one fossil.', requiredTrainerDefeated: 'mtmoon-supernerd-miguel' },
      { id: 'mtmoon-helix-fossil', name: 'Helix Fossil', role: 'Ancient Pokémon fossil', dialogue: 'The researcher carefully hands you the Helix Fossil.', repeatDialogue: 'The Helix Fossil is safely in your Key Items.', rewardKeyItem: 'helixFossil', rewardName: 'Helix Fossil', rewardFlag: 'mtMoonFossilChosen', requiredTrainerDefeated: 'mtmoon-supernerd-miguel' },
      { id: 'mtmoon-dome-fossil', name: 'Dome Fossil', role: 'Ancient Pokémon fossil', dialogue: 'The researcher carefully hands you the Dome Fossil.', repeatDialogue: 'The Dome Fossil is safely in your Key Items.', rewardKeyItem: 'domeFossil', rewardName: 'Dome Fossil', rewardFlag: 'mtMoonFossilChosen', requiredTrainerDefeated: 'mtmoon-supernerd-miguel' },
    ],
    trainers: [
      { id: 'mtmoon-rocket-grunt-a', name: 'Team Rocket Grunt', reward: 360, intro: 'Rocket Grunt: We are here for the fossils. Stay out of our way!', victory: 'Rocket Grunt: This is not over. Team Rocket always gets what it wants.', team: [trainerPokemon(19, 10), trainerPokemon(41, 10)] },
      { id: 'mtmoon-rocket-grunt-b', name: 'Team Rocket Grunt', reward: 380, intro: 'Rocket Grunt: You again? Nobody gets between Team Rocket and its prize!', victory: 'Rocket Grunt: The boss will hear about this!', team: [trainerPokemon(23, 11), trainerPokemon(41, 11)] },
      { id: 'mtmoon-supernerd-miguel', name: 'Super Nerd Miguel', reward: 420, intro: 'Super Nerd Miguel: These fossils belong in the hands of science, not thieves!', victory: 'Super Nerd Miguel: The cave is safe for now. The researcher can help you with the fossils.', team: [trainerPokemon(88, 12), trainerPokemon(100, 12)] },
    ],
  },
  route4: {
    name: 'Route 4',
    description: 'A rocky downhill route beyond Mt. Moon. The air is brighter here, and Cerulean City lies just ahead.',
    wildPokemon: [
      { pokemonId: 19, minLevel: 8, maxLevel: 12, rarity: 30 },
      { pokemonId: 21, minLevel: 8, maxLevel: 12, rarity: 25 },
      { pokemonId: 27, minLevel: 8, maxLevel: 12, rarity: 25 },
      { pokemonId: 56, minLevel: 9, maxLevel: 12, rarity: 20 },
    ],
    connectedTo: ['mtMoon', 'ceruleanCity'],
    npcs: [
      { id: 'route4-traveller', name: 'Travelling Trainer', role: 'Passing through', dialogue: 'You made it through Mt. Moon! Cerulean is a good place to rest. I would not rush into the Gym without healing first.', repeatDialogue: 'Cerulean City is just down the path. Misty is no pushover.' },
    ],
  },
  ceruleanCity: {
    name: 'Cerulean City',
    description: 'A bright city of waterways and bridges. Trainers come here to test themselves against the Cerulean Gym and its water-loving leader.',
    hasPokemonCenter: true,
    hasPokeMart: true,
    hasGym: true,
    gymLeader: GYM_LEADERS.misty,
    connectedTo: ['route4', 'route24', 'route5', 'route9', 'ceruleanCave'],
    npcs: [
      { id: 'cerulean-officer', name: 'Officer Jenny', role: 'Police officer', dialogue: 'There have been reports of suspicious characters around the city. Keep your belongings close and report anything unusual.', repeatDialogue: 'Stay alert. Not everyone in this city is here for a Gym challenge.' },
      { id: 'cerulean-swimmer', name: 'Swimmer', role: 'Local trainer', dialogue: 'Misty is brilliant with Water Pokémon. Electric and Grass moves can give you an advantage, but do not underestimate her Starmie.', repeatDialogue: 'Misty trains hard. Make sure your team is ready.' },
      { id: 'cerulean-boy', name: 'Young Boy', role: 'Local resident', dialogue: 'The Nugget Bridge north of town is full of trainers. They say there is a prize for beating everyone!', repeatDialogue: 'The bridge is north of town. Five trainers, one after another!' },
    ],
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
