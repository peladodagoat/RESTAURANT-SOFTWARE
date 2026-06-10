'use client';

import { useLang } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="w-full border-t border-surface-border bg-surface-elevated py-4 px-4 mt-auto">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-2">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gold text-white text-xs font-bold font-serif flex-shrink-0">
          CC
        </div>
        <p className="text-xs text-ink-muted">
          {t('footerPoweredBy')}{' '}
          <span className="font-semibold text-ink-secondary">{t('footerBrand')}</span>
        </p>
      </div>
    </footer>
  );
}
