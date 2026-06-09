'use client';

import { useLang } from '@/lib/LanguageContext';

export default function OrderSummary({ cart, total, tableId, onBack, onConfirm, onAdd, onRemove }) {
  const { t } = useLang();

  return (
    <div className="pt-6 max-w-lg mx-auto animate-slide-up">
      <button onClick={onBack} className="text-sm text-ink-secondary hover:text-gold mb-6 flex items-center gap-1 transition-colors">
        {t('backToMenu')}
      </button>
      <h2 className="font-serif text-2xl font-bold text-ink-primary mb-1">{t('yourOrder')}</h2>
      <p className="text-ink-muted text-sm mb-6">{t('table')} {tableId}</p>

      <div className="space-y-3 mb-6">
        {cart.map((c) => (
          <div key={`${c.menuItemId}-${c.specialInstructions}`} className="bg-surface-card border border-surface-border rounded-2xl p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-ink-primary truncate">{c.item.name}</p>
              {c.specialInstructions && <p className="text-xs text-ink-muted italic mt-0.5 truncate">"{c.specialInstructions}"</p>}
              <p className="text-xs text-ink-muted mt-0.5">${c.item.price.toFixed(2)} {t('each')}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => onRemove(c.menuItemId, c.specialInstructions)} className="w-7 h-7 rounded-full bg-surface-elevated border border-surface-border text-ink-secondary hover:border-gold hover:text-gold transition-colors flex items-center justify-center text-sm">−</button>
              <span className="font-bold text-gold w-4 text-center text-sm">{c.quantity}</span>
              <button onClick={() => onAdd(c.item, c.specialInstructions)} className="w-7 h-7 rounded-full bg-gold text-surface-base font-bold hover:bg-gold-light transition-colors flex items-center justify-center text-sm">+</button>
            </div>
            <span className="font-semibold text-ink-primary w-14 text-right text-sm flex-shrink-0">${(c.item.price * c.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="bg-surface-card border border-surface-border rounded-2xl p-4 mb-8">
        <div className="flex justify-between text-ink-secondary text-sm mb-2">
          <span>{t('subtotal')}</span><span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base text-ink-primary border-t border-surface-border pt-3">
          <span>{t('total')}</span>
          <span className="text-gold">${total.toFixed(2)}</span>
        </div>
      </div>

      <button onClick={onConfirm} className="w-full bg-gold text-surface-base py-4 rounded-2xl font-bold text-base hover:bg-gold-light transition-colors shadow-glow-gold">
        {t('proceedToPayment')}
      </button>
    </div>
  );
}
