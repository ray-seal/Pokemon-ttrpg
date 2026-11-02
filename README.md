# Pokemon TTRPG - Red Adventure

A text-based Pokemon tabletop RPG adventure game based on Pokemon Red, featuring dice rolls, turn-based battles, and the classic Kanto region adventure.

## Features

### Core Gameplay
- **Character Naming**: Create your own trainer with a custom name used throughout the game
- **Starter Pokemon**: Choose between Bulbasaur, Charmander, or Squirtle to begin your journey
- **Turn-Based Battles**: Dice-roll based combat system with moves, damage calculation, and type effectiveness
- **Wild Encounters**: Explore grassy areas to find wild Pokemon
- **Catching System**: Use Poke Balls with dice-based catch rates
- **Leveling & Evolution**: Pokemon gain experience, level up, learn new moves, and evolve
- **Team Management**: Build a team of up to 6 Pokemon with PC storage for extras

### Playable Opening Chapter
- **Pallet Town to Cerulean City**: begin with your chosen starter, meet Blue on Route 1, visit Viridian City, complete Oak's Parcel errand, earn the Town Map from Daisy, cross Route 3, explore Mt. Moon, and emerge on Route 4.
- **NPC conversations**: talk to named residents for local knowledge, hints, and story progression. Some conversations use D20 ability checks. Defeat the fossil chamber guard, then choose either the Helix Fossil or Dome Fossil. The choice is one-time and saved.
- **Trainer attributes**: Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma, each with a D20 modifier.
- **Trainer battles**: challenge trainers on Route 2, Viridian Forest, Route 3, and inside Mt. Moon. Team Rocket grunts and Super Nerd Miguel guard the cave's fossil chamber. Their teams, rewards, and defeated state persist in your save.
- **Multi-Pokémon battles**: trainer and Gym teams fight one Pokémon at a time. Your next healthy Pokémon automatically enters when one faints.
- **Gym progression**: badges are awarded only after the Gym Leader's entire team is defeated. Viridian Gym is reserved for the late-game story.
- **Weighted encounters**: rarity values act as relative weights, so less common Pokémon can actually appear.
- **Persistent world state**: story flags, NPC conversations, trainer victories, map discoveries, key items, attributes, party, PC, and an in-progress battle are saved locally.

### Game World
- **Kanto Region**: Travel through iconic locations from Pokemon Red including:
  - Pallet Town, Viridian City, Pewter City, Cerulean City, and more
  - Routes with wild Pokemon encounters
  - Mt. Moon, Viridian Forest, Diglett's Cave
- **8 Gym Leaders**: Challenge Brock, Misty, Lt. Surge, Erika, Koga, Sabrina, Blaine, and Giovanni
- **Badge Collection**: Earn badges by defeating gym leaders

### Pokemon System
- **Complete Kanto Pokedex**: All 151 original Pokemon available
- **Original Catch Locations**: Pokemon appear in their authentic Red/Blue locations
- **Pokedex Tracking**: Track seen and caught Pokemon
- **Type System**: Fire, Water, Grass, Electric, and more with type effectiveness

### Items & Economy
- **PokeMart**: Purchase items with earned coins:
  - Poke Balls, Great Balls, Ultra Balls
  - Potions, Super Potions, Hyper Potions
  - Revives
- **Coin System**: Earn coins from victories, lose coins when defeated
- **Pokemon Centers**: Heal your team for free at Pokemon Centers

### Save System
- **Local Storage**: Game automatically saves the complete game state to browser localStorage (same browser/device)
- **Continue Feature**: Pick up where you left off
- **Independent PWA**: This repository is its own standalone installable app, with its own manifest, app icon, registered service worker, and offline app-shell caching

## Current Playable Story

The current playable chapter runs from Pallet Town through Viridian Forest and Pewter City, then continues along Route 3, through Mt. Moon, and out to Cerulean City. Route 3 and Mt. Moon include location-specific wild encounters, persistent trainer battles, NPC conversations, Team Rocket encounters, and a one-time Helix Fossil or Dome Fossil choice. Misty's Gym is available in Cerulean after earning the Boulder Badge.

The wider Kanto map is a geographical framework. Locations beyond the current playable chapter are not yet fully populated with scenes, NPCs, trainers, quests, or encounters.

## Standalone PWA

Pokemon TTRPG is an independent application in this repository. It does not share a codebase, deployment, or save store with the other CardBuddy or companion-app projects. It can be deployed to its own Vercel project/domain and installed separately on mobile or desktop. Saves currently remain in the browser's local storage on that device; there is no account or cross-device sync.

The service worker caches the app shell and same-origin Next.js static assets for offline use after the app has been loaded online. A first successful online visit is required before offline use can work reliably.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ray-seal/Pokemon-ttrpg.git
cd Pokemon-ttrpg
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default Next.js settings

The app will be available as a PWA that can be installed on desktop and mobile devices.

### Other Platforms

The project uses Next.js and can be deployed to any platform that supports it:
- Netlify
- Railway
- Heroku
- Self-hosted with Node.js

## How to Play

1. **Start Your Adventure**: Enter your trainer name and choose your starter Pokemon
2. **Explore**: Navigate between locations using the travel buttons
3. **Battle Wild Pokemon**: Click "Explore Grass" to encounter wild Pokemon
4. **Catch Pokemon**: Use Poke Balls during wild battles (dice roll determines success)
5. **Challenge Gyms**: Face gym leaders to earn badges
6. **Manage Your Team**: Visit Pokemon Centers to heal and use PCs to manage your team
7. **Shop**: Buy items at PokeMarts with your earned coins
8. **Track Progress**: View your Pokedex to see all Pokemon you've encountered

### Battle System

Battles use a d20 dice roll system:
- Each turn, select a move for your Pokemon
- A dice roll determines hit accuracy and damage
- Type effectiveness applies (Fire > Grass, Water > Fire, etc.)
- Win battles to earn experience and coins
- Pokemon level up and can evolve

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage
- **PWA**: Progressive Web App with offline support
- **Deployment**: Vercel-ready

## Project Structure

```
pokemon-ttrpg/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main game page
├── components/            # React components
│   ├── StartScreen.tsx    # Game start screen
│   ├── GameInterface.tsx  # Main game interface
│   ├── BattleView.tsx     # Battle screen
│   ├── PokedexView.tsx    # Pokedex screen
│   ├── PokeMartView.tsx   # Shop screen
│   └── ...                # Other UI components
├── lib/                   # Game logic
│   ├── gameLogic.ts       # Battle mechanics, dice rolls
│   ├── gameState.ts       # State management
│   ├── pokedex.ts         # Pokemon data (151 Pokemon)
│   └── locations.ts       # Game locations and gym leaders
├── types/                 # TypeScript type definitions
│   └── game.ts           # Game interfaces
└── public/               # Static assets
    └── manifest.json     # PWA manifest
```

## Game Data

- **Pokemon**: 151 Kanto Pokemon with stats, types, moves, and locations
- **Locations**: 20+ locations from Pokemon Red
- **Gym Leaders**: All 8 gym leaders with their teams
- **Items**: 7 types of purchasable items
- **Moves**: Multiple moves with different types and power levels

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

ISC

## Acknowledgments

- Inspired by Pokemon Red/Blue
- Built for fans of Pokemon and tabletop RPGs
- Uses emoji icons for Pokemon type representation