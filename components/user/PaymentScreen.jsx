'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';

export default function PaymentScreen({ total, onBack, onPay }) {
  const [loading, setLoading] = useState(false);
  const { t } = useLang();

  const handlePay = async (method) => {
    setLoading(true);
    await onPay(method);
    setLoading(false);
  };

  return (
    <div className="pt-6 max-w-lg mx-auto animate-slide-up">
      <button onClick={onBack} className="text-sm text-ink-secondary hover:text-gold mb-6 flex items-center gap-1 transition-colors">
        {t('backToOrder')}
      </button>

      <h2 className="font-serif text-2xl font-bold text-ink-primary mb-2">{t('payment')}</h2>
      <p className="text-ink-secondary text-sm mb-10">
        {t('totalDue')}: <span className="font-bold text-gold text-xl">${total.toFixed(2)}</span>
      </p>

      <div className="space-y-4">
        <button
          disabled={loading}
          onClick={() => handlePay('APPLE_PAY')}
          className="w-full bg-ink-primary text-surface-base py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 hover:bg-white transition-colors disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          {t('payApplePay')}
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-surface-border" />
          <span className="text-ink-muted text-xs">or</span>
          <div className="flex-1 h-px bg-surface-border" />
        </div>

        <button
          disabled={loading}
          onClick={() => handlePay('COUNTER')}
          className="w-full bg-surface-card border-2 border-gold/40 text-gold py-4 rounded-2xl font-semibold text-base hover:bg-gold/10 hover:border-gold transition-all disabled:opacity-40"
        >
          💵 {t('payCounter')}
        </button>
      </div>

      <p className="text-center text-xs text-ink-muted mt-8 leading-relaxed">{t('paymentTerms')}</p>
    </div>
  );
}
