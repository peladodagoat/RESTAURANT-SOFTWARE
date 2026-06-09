'use client';

import { useState } from 'react';

const TABLE_COUNT = 12;

export default function TableQRCodes() {
  const [baseUrl, setBaseUrl] = useState(
    typeof window !== 'undefined' ? window.location.origin : ''
  );

  const tables = Array.from({ length: TABLE_COUNT }, (_, i) => i + 1);

  const qrUrl = (tableId) =>
    `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`${baseUrl}/menu?table=${tableId}`)}`;

  const print = () => window.print();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-stone-800">Table QR Codes</h3>
          <p className="text-xs text-stone-400 mt-0.5">Customers scan these to open the menu on their table</p>
        </div>
        <button
          onClick={print}
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-stone-700 transition-colors"
        >
          🖨️ Print All
        </button>
      </div>

      {/* Base URL override */}
      <div className="mb-6 flex items-center gap-3">
        <label className="text-xs text-stone-500 whitespace-nowrap">Site URL:</label>
        <input
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://your-site.vercel.app"
          className="flex-1 border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((t) => (
          <div key={t} className="bg-white border border-stone-100 rounded-2xl p-4 flex flex-col items-center gap-3 shadow-sm">
            <p className="font-bold text-stone-800 text-sm">Table {t}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl(t)}
              alt={`QR code for table ${t}`}
              width={120}
              height={120}
              className="rounded-lg"
            />
            <p className="text-xs text-stone-400 text-center break-all">/menu?table={t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
