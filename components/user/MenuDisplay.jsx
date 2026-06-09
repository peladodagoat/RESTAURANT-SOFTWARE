'use client';

import { useState } from 'react';
import MenuItemCard from './MenuItemCard';
import { useLang } from '@/lib/LanguageContext';

const CATEGORIES = ['STARTERS', 'MAINS', 'DESSERTS', 'DRINKS'];
const EMOJIS = { STARTERS: '🥗', MAINS: '🍝', DESSERTS: '🍮', DRINKS: '🍷' };

export default function MenuDisplay({ items, cart, onAdd, onRemove }) {
  const [active, setActive] = useState('STARTERS');
  const { t } = useLang();

  const KEY_MAP = { STARTERS: 'starters', MAINS: 'mains', DESSERTS: 'desserts', DRINKS: 'drinks' };
  const filtered = items.filter((i) => i.category === active);
  const getQty = (id) => cart.filter((c) => c.menuItemId === id).reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="pt-6">
      {/* Hero */}
      <div className="text-center py-8 mb-6">
        <p className="text-ink-muted text-xs uppercase tracking-widest mb-2 font-sans">Bella Vista</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-ink-primary leading-tight">
          Taste the <span className="text-gold italic">Authentic</span>
        </h2>
        <p className="text-ink-secondary text-sm mt-2">Fresh ingredients. Crafted daily.</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              active === cat
                ? 'bg-gold text-surface-base shadow-glow-gold'
                : 'bg-surface-card border border-surface-border text-ink-secondary hover:border-gold hover:text-gold'
            }`}
          >
            <span>{EMOJIS[cat]}</span>
            {t(KEY_MAP[cat])}
          </button>
        ))}
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">{EMOJIS[active]}</span>
        <h3 className="font-serif text-xl text-ink-primary">{t(KEY_MAP[active])}</h3>
        <span className="text-xs text-ink-muted bg-surface-elevated px-2 py-0.5 rounded-full border border-surface-border">
          {filtered.length}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
