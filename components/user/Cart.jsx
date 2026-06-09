'use client';

import { useLang } from '@/lib/LanguageContext';

export default function Cart({ cart, total, onRemove, onAdd, onCheckout, onClose }) {
  const { t } = useLang();

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-card border-l border-surface-border w-full max-w-sm h-full shadow-2xl flex flex-col animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-border">
          <h2 className="font-serif font-bold text-lg text-ink-primary">{t('yourOrder')}</h2>
          <button onClick={onClose} className="text-ink-muted hover:text-ink-primary text-2xl leading-none transition-colors">×</button>
        </div>

        {!cart || cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center px-6">
            <div>
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-ink-secondary text-sm">{t('cartEmpty')}<br />{t('cartEmptyHint')}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cart.map((c) => (
                <div key={`${c.menuItemId}-${c.specialInstructions}`} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-ink-primary truncate">{c.item.name}</p>
                    {c.specialInstructions && <p className="text-xs text-ink-muted italic truncate">"{c.specialInstructions}"</p>}
                    <p className="text-xs text-ink-muted">${c.item.price.toFixed(2)} {t('each')}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => onRemove(c.menuItemId, c.specialInstructions)} className="w-6 h-6 rounded-full bg-surface-elevated border border-surface-border text-ink-secondary hover:text-gold hover:border-gold transition-colors flex items-center justify-center text-xs">−</button>
                    <span className="font-bold text-gold w-4 text-center text-sm">{c.quantity}</span>
                    <button onClick={() => onAdd(c.item, c.specialInstructions)} className="w-6 h-6 rounded-full bg-gold text-surface-base font-bold hover:bg-gold-light transition-colors flex items-center justify-center text-xs">+</button>
                  </div>
                  <span className="text-sm font-semibold text-ink-primary w-14 text-right flex-shrink-0">${(c.item.price * c.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-surface-border px-5 py-4">
              <div className="flex justify-between font-bold text-base text-ink-primary mb-4">
                <span>{t('total')}</span>
                <span className="text-gold">${total.toFixed(2)}</span>
              </div>
              <button onClick={onCheckout} className="w-full bg-gold text-surface-base py-3.5 rounded-2xl font-bold text-base hover:bg-gold-light transition-colors shadow-glow-gold">
                {t('reviewOrder')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
