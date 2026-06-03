'use client';

import { useState, useEffect } from 'react';
import RevenueChart from '@/components/admin/RevenueChart';
import TopItemsTable from '@/components/admin/TopItemsTable';

const PERIODS = ['day', 'week', 'month'];

export default function Dashboard() {
  const [period, setPeriod] = useState('day');
  const [revenue, setRevenue] = useState(null);
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    fetch(`/api/analytics/revenue?period=${period}`)
      .then((r) => r.json())
      .then(setRevenue);
  }, [period]);

  useEffect(() => {
    fetch('/api/analytics/top-items')
      .then((r) => r.json())
      .then(setTopItems);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">Dashboard</h2>

      {/* Period switcher */}
      <div className="flex gap-2 mb-6">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${
              period === p ? 'bg-brand-600 text-white' : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-400'
            }`}
          >
            {p === 'day' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
          </button>
        ))}
      </div>

      {/* Stats */}
      {revenue && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total Revenue" value={`$${revenue.total.toFixed(2)}`} icon="💰" />
          <StatCard label="Total Orders" value={revenue.count} icon="🧾" />
          <StatCard label="Avg Order Value" value={`$${revenue.avg.toFixed(2)}`} icon="📈" />
        </div>
      )}

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
        <h3 className="font-semibold text-stone-800 mb-4">Revenue Overview</h3>
        {revenue ? <RevenueChart data={revenue.data} /> : <p className="text-stone-400 text-sm">Loading...</p>}
      </div>

      {/* Top items */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h3 className="font-semibold text-stone-800 mb-4">Most Ordered Items</h3>
        <TopItemsTable items={topItems} />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold text-stone-900">{value}</p>
      <p className="text-sm text-stone-500 mt-0.5">{label}</p>
    </div>
  );
}
