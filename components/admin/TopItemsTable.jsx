'use client';

const CAT_LABELS = { STARTERS: 'Starters', MAINS: 'Mains', DESSERTS: 'Desserts', DRINKS: 'Drinks' };

export default function TopItemsTable({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-ink-muted text-sm text-center py-8">No orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[480px]">
        <thead>
          <tr className="text-left text-ink-muted border-b border-surface-border">
            <th className="pb-3 pr-4 font-medium">#</th>
            <th className="pb-3 pr-4 font-medium">Item</th>
            <th className="pb-3 pr-4 font-medium">Category</th>
            <th className="pb-3 pr-4 font-medium text-right">Orders</th>
            <th className="pb-3 font-medium text-right">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-surface-elevated/50 transition-colors">
              <td className="py-3 pr-4 text-ink-muted font-medium">{item.rank}</td>
              <td className="py-3 pr-4 font-semibold text-ink-primary">{item.name}</td>
              <td className="py-3 pr-4 text-ink-secondary">{CAT_LABELS[item.category] || item.category}</td>
              <td className="py-3 pr-4 text-right font-bold text-gold">{item.totalOrders}</td>
              <td className="py-3 text-right text-ink-secondary">${item.revenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
