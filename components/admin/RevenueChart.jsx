'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RevenueChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-stone-400 text-sm text-center py-8">No revenue data for this period.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#78716c' }} />
        <YAxis tick={{ fontSize: 11, fill: '#78716c' }} tickFormatter={(v) => `$${v}`} />
        <Tooltip formatter={(v) => [`$${v.toFixed(2)}`, 'Revenue']} />
        <Bar dataKey="revenue" fill="#d4821a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
