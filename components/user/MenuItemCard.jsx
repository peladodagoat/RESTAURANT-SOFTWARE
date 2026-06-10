'use client';

import Image from 'next/image';
import { useLang } from '@/lib/LanguageContext';

export default function MenuItemCard({ item, quantity, onAdd, onRemove }) {
  const { t, lang } = useLang();

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden shadow-card hover:border-gold/40 transition-all duration-200 group">
      {item.image && (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-card/80 to-transparent" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-serif text-base font-bold text-ink-primary leading-snug">{item.name}</h3>
          <span className="font-bold text-gold text-base whitespace-nowrap flex-shrink-0">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-xs text-ink-secondary leading-relaxed mb-3 line-clamp-2">
          {lang === 'es' && item.descriptionEs ? item.descriptionEs : item.description}
        </p>
        {item.allergens?.length > 0 && (
          <p className="text-xs text-amber-500/80 mb-3">⚠ {t('contains')}: {item.allergens.join(', ')}</p>
        )}
        <div className="flex justify-end">
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="bg-gold/10 border border-gold/30 text-gold text-xs font-semibold px-5 py-2 rounded-full hover:bg-gold hover:text-surface-base transition-all"
            >
              {t('addToOrder')}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={onRemove} className="w-8 h-8 rounded-full bg-surface-elevated border border-surface-border text-ink-primary font-bold hover:border-gold hover:text-gold transition-colors flex items-center justify-center">−</button>
              <span className="font-bold text-gold w-5 text-center">{quantity}</span>
              <button onClick={onAdd} className="w-8 h-8 rounded-full bg-gold text-surface-base font-bold hover:bg-gold-light transition-colors flex items-center justify-center">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
