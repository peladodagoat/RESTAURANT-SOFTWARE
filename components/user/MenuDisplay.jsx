'use client';

import { useState } from 'react';
import MenuItemCard from './MenuItemCard';

const CATEGORIES = ['STARTERS', 'MAINS', 'DESSERTS', 'DRINKS'];
const LABELS = { STARTERS: 'Starters', MAINS: 'Mains', DESSERTS: 'Desserts', DRINKS: 'Drinks' };

export default function MenuDisplay({ items, cart, onAdd, onRemove }) {
  const [active, setActive] = useState('STARTERS');

  const filtered = items.filter((i) => i.category === active);

  const getQty = (id) => cart.filter((c) => c.menuItemId === id).reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="pt-4">
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              active === cat
                ? 'bg-brand-600 text-white shadow'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-400'
            }`}
          >
            {LABELS[cat]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={getQty(item.id)}
            onAdd={() => onAdd(item)}
            onRemove={() => onRemove(item.id, '')}
          />
        ))}
      </div>
    </div>
  );
}
