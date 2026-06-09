'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-surface-elevated border border-surface-border rounded-xl px-3 py-2 text-xs shadow-lg">
        <p className="text-ink-secondary mb-0.5">{label}</p>
        <p className="font-bold text-gold">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-ink-muted text-sm text-center py-8">No revenue data for this period.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2e2e38" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#52526a' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#52526a' }} tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200,133,58,0.05)' }} />
        <Bar dataKey="revenue" fill="#c8853a" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
