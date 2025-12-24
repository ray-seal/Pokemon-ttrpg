'use client';

import { Inventory } from '@/types/game';
import { SHOP_ITEMS } from '@/lib/locations';

interface PokeMartViewProps {
  coins: number;
  inventory: Inventory;
  onBuy: (itemKey: keyof Inventory, price: number) => boolean;
  onBack: () => void;
}

export default function PokeMartView({ coins, inventory, onBuy, onBack }: PokeMartViewProps) {
  const handleBuy = (itemKey: keyof Inventory, price: number, itemName: string) => {
    if (onBuy(itemKey, price)) {
      alert(`Purchased ${itemName}!`);
    } else {
      alert('Not enough coins!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="card mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">PokeMart</h2>
            <p className="text-gray-400">Your Coins: {coins} ₽</p>
          </div>
          <button onClick={onBack} className="btn-secondary">
            Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SHOP_ITEMS.map((item) => (
          <div key={item.key} className="card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <div className="text-2xl">
                {item.name.includes('Ball') && '⚾'}
                {item.name.includes('Potion') && '🧪'}
                {item.name.includes('Revive') && '💊'}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <div>
                <p className="text-lg font-bold text-pokemon-yellow">{item.price} ₽</p>
                <p className="text-xs text-gray-500">You have: {inventory[item.key]}</p>
              </div>
              <button
                onClick={() => handleBuy(item.key, item.price, item.name)}
                disabled={coins < item.price}
                className="btn-primary"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4">
        <h3 className="font-bold mb-2">Your Inventory</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div>Poke Ball: {inventory.pokeball}</div>
          <div>Great Ball: {inventory.greatball}</div>
          <div>Ultra Ball: {inventory.ultraball}</div>
          <div>Potion: {inventory.potion}</div>
          <div>Super Potion: {inventory.superPotion}</div>
          <div>Hyper Potion: {inventory.hyperPotion}</div>
          <div>Revive: {inventory.revive}</div>
        </div>
      </div>
    </div>
  );
}
