'use client';

import { useState, useEffect } from 'react';
import RevenueChart from '@/components/admin/RevenueChart';
import TopItemsTable from '@/components/admin/TopItemsTable';
import TableQRCodes from '@/components/admin/TableQRCodes';

const PERIODS = [
  { key: 'day',   label: 'Today' },
  { key: 'week',  label: 'This Week' },
  { key: 'month', label: 'This Month' },
];

const TABS = [
  { key: 'overview', label: '📊 Overview' },
  { key: 'qr',       label: '📱 Table QR Codes' },
];

export default function Dashboard() {
  const [tab, setTab] = useState('overview');
  const [period, setPeriod] = useState('day');
  const [revenue, setRevenue] = useState(null);
  const [topItems, setTopItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/analytics/revenue?period=${period}`)
      .then((r) => r.json())
      .then(setRevenue);
  }, [period]);

  useEffect(() => {
    fetch('/api/analytics/top-items').then((r) => r.json()).then(setTopItems);
    fetch('/api/orders').then((r) => r.json()).then(setOrders);
  }, []);

  const activeOrders = orders.filter((o) => o.status === 'PENDING' || o.status === 'IN_PROGRESS');
  const deliveredToday = orders.filter((o) => o.status === 'DELIVERED').length;

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Dashboard</h2>

      {/* Tab switcher */}
      <div className="flex gap-2 mb-6 border-b border-stone-200 pb-0">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition-colors -mb-px ${
              tab === t.key
                ? 'bg-white border border-b-white border-stone-200 text-brand-700'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          {/* Live status cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Active Orders" value={activeOrders.length} icon="🔥" highlight />
            <StatCard label="Delivered Today" value={deliveredToday} icon="✅" />
            {revenue && <StatCard label={PERIODS.find(p => p.key === period)?.label + ' Revenue'} value={`$${revenue.total.toFixed(2)}`} icon="💰" />}
            {revenue && <StatCard label="Avg Order" value={`$${revenue.avg.toFixed(2)}`} icon="📈" />}
          </div>

          {/* Period switcher */}
          <div className="flex gap-2 mb-4">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  period === p.key
                    ? 'bg-brand-600 text-white'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-400'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
            <h3 className="font-semibold text-stone-800 mb-4">Revenue Overview</h3>
            {revenue ? <RevenueChart data={revenue.data} /> : <p className="text-stone-400 text-sm animate-pulse">Loading...</p>}
          </div>

          {/* Top items */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <h3 className="font-semibold text-stone-800 mb-4">🏆 Most Ordered Items</h3>
            <TopItemsTable items={topItems} />
          </div>
        </>
      )}

      {tab === 'qr' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <TableQRCodes />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, highlight }) {
  return (
    <div className={`rounded-2xl p-5 shadow-sm border ${highlight ? 'bg-brand-600 border-brand-500 text-white' : 'bg-white border-stone-100 text-stone-900'}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-stone-900'}`}>{value}</p>
      <p className={`text-sm mt-0.5 ${highlight ? 'text-brand-100' : 'text-stone-500'}`}>{label}</p>
    </div>
  );
}
