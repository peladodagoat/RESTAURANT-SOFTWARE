'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';

const TABLE_COUNT = 12;

export default function TableQRCodes() {
  const [baseUrl, setBaseUrl] = useState(
    typeof window !== 'undefined' ? window.location.origin : ''
  );
  const { t } = useLang();

  const tables = Array.from({ length: TABLE_COUNT }, (_, i) => i + 1);

  const qrUrl = (tableId) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`${baseUrl}/menu?table=${tableId}`)}`;

  const print = () => window.print();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-ink-primary">{t('qrTitle')}</h3>
          <p className="text-xs text-ink-muted mt-0.5">{t('qrSubtitle')}</p>
        </div>
        <button
          onClick={print}
          className="flex items-center gap-2 bg-gold text-surface-base px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors"
        >
          {t('qrPrintAll')}
        </button>
      </div>

      {/* Base URL override */}
      <div className="mb-6 flex items-center gap-3">
        <label className="text-xs text-ink-muted whitespace-nowrap">{t('qrSiteUrl')}</label>
        <input
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://your-site.vercel.app"
          className="flex-1 bg-surface-base border border-surface-border rounded-xl px-3 py-1.5 text-sm text-ink-primary focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((tableNum) => (
          <div key={tableNum} className="bg-surface-elevated border border-surface-border rounded-2xl p-4 flex flex-col items-center gap-3">
            <p className="font-bold text-ink-primary text-sm">{t('qrTable')} {tableNum}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl(tableNum)}
              alt={`QR code for table ${tableNum}`}
              width={120}
              height={120}
              className="rounded-lg"
            />
            <p className="text-xs text-ink-muted text-center break-all">/menu?table={tableNum}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
