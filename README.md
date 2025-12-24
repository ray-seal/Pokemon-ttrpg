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
- **Local Storage**: Game automatically saves to browser localStorage
- **Continue Feature**: Pick up where you left off
- **PWA Support**: Install as a Progressive Web App for offline play

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