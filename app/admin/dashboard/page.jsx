'use client';

import { useState, useEffect } from 'react';
import RevenueChart from '@/components/admin/RevenueChart';
import TopItemsTable from '@/components/admin/TopItemsTable';
import TableQRCodes from '@/components/admin/TableQRCodes';

const PERIODS = [{ key: 'day', label: 'Today' }, { key: 'week', label: 'This Week' }, { key: 'month', label: 'This Month' }];
const TABS    = [{ key: 'overview', label: '📊 Overview' }, { key: 'qr', label: '📱 Table QR Codes' }];

export default function Dashboard() {
  const [tab, setTab]       = useState('overview');
  const [period, setPeriod] = useState('day');
  const [revenue, setRevenue] = useState(null);
  const [topItems, setTopItems] = useState([]);
  const [orders, setOrders]   = useState([]);

  useEffect(() => {
    fetch(`/api/analytics/revenue?period=${period}`).then((r) => r.json()).then(setRevenue);
    fetch(`/api/analytics/top-items?period=${period}`).then((r) => r.json()).then(setTopItems);
  }, [period]);

  useEffect(() => {
    fetch('/api/orders').then((r) => r.json()).then(setOrders);
  }, []);

  const activeOrders   = orders.filter((o) => o.status === 'PENDING' || o.status === 'IN_PROGRESS');
  const deliveredToday = orders.filter((o) => o.status === 'DELIVERED').length;

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-ink-primary mb-6">Dashboard</h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface-card border border-surface-border rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t.key ? 'bg-gold text-surface-base shadow' : 'text-ink-secondary hover:text-ink-primary'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <StatCard label="Active Orders"    value={activeOrders.length}           icon="🔥" highlight />
            <StatCard label="Delivered Today"  value={deliveredToday}                icon="✅" />
            {revenue && <StatCard label="Revenue"       value={`$${revenue.total.toFixed(2)}`} icon="💰" />}
            {revenue && <StatCard label="Avg Order"     value={`$${revenue.avg.toFixed(2)}`}   icon="📈" />}
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {PERIODS.map((p) => (
              <button key={p.key} onClick={() => setPeriod(p.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${period === p.key ? 'bg-gold text-surface-base' : 'bg-surface-card border border-surface-border text-ink-secondary hover:border-gold hover:text-gold'}`}>
                {p.label}
              </button>
            ))}
          </div>

          <div className="bg-surface-card border border-surface-border rounded-2xl p-5 mb-4">
            <h3 className="font-semibold text-ink-primary mb-4">Revenue Overview</h3>
            {revenue ? <RevenueChart data={revenue.data} /> : <p className="text-ink-muted text-sm animate-pulse">Loading…</p>}
          </div>

          <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
            <h3 className="font-semibold text-ink-primary mb-4">
              🏆 Most Ordered — {PERIODS.find(p => p.key === period)?.label}
            </h3>
            <TopItemsTable items={topItems} />
          </div>
        </>
      )}

      {tab === 'qr' && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
          <TableQRCodes />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, highlight }) {
  return (
    <div className={`rounded-2xl p-4 border ${highlight ? 'bg-gold/10 border-gold/30 text-gold' : 'bg-surface-card border-surface-border'}`}>
      <div className="text-xl mb-2">{icon}</div>
      <p className={`text-xl font-bold ${highlight ? 'text-gold' : 'text-ink-primary'}`}>{value}</p>
      <p className={`text-xs mt-0.5 ${highlight ? 'text-gold/70' : 'text-ink-muted'}`}>{label}</p>
    </div>
  );
}
