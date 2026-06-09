'use client';

import { useState } from 'react';
import MenuItemCard from './MenuItemCard';

const CATEGORIES = ['STARTERS', 'MAINS', 'DESSERTS', 'DRINKS'];
const LABELS = {
  STARTERS: { label: 'Starters', emoji: '🥗' },
  MAINS:    { label: 'Mains',    emoji: '🍝' },
  DESSERTS: { label: 'Desserts', emoji: '🍮' },
  DRINKS:   { label: 'Drinks',   emoji: '🍷' },
};

export default function MenuDisplay({ items, cart, onAdd, onRemove }) {
  const [active, setActive] = useState('STARTERS');

  const filtered = items.filter((i) => i.category === active);
  const getQty = (id) => cart.filter((c) => c.menuItemId === id).reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="pt-6">
      {/* Category tabs */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-8 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all ${
              active === cat
                ? 'bg-brand-600 text-white shadow-md scale-105'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-400'
            }`}
          >
            <span>{LABELS[cat].emoji}</span>
            {LABELS[cat].label}
          </button>
        ))}
      </div>

      {/* Section heading */}
      <h2 className="text-xl font-serif font-bold text-stone-800 mb-5">
        {LABELS[active].emoji} {LABELS[active].label}
        <span className="ml-2 text-sm font-normal text-stone-400">({filtered.length} items)</span>
      </h2>

      {/* Grid — 2 columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
