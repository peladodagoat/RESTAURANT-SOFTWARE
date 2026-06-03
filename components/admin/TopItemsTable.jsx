'use client';

const CATEGORY_LABELS = { STARTERS: 'Starters', MAINS: 'Mains', DESSERTS: 'Desserts', DRINKS: 'Drinks' };

export default function TopItemsTable({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-stone-400 text-sm text-center py-8">No orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-stone-500 border-b border-stone-100">
            <th className="pb-2 pr-4 font-medium">#</th>
            <th className="pb-2 pr-4 font-medium">Item</th>
            <th className="pb-2 pr-4 font-medium">Category</th>
            <th className="pb-2 pr-4 font-medium text-right">Orders</th>
            <th className="pb-2 font-medium text-right">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-stone-50 transition-colors">
              <td className="py-2.5 pr-4 text-stone-400 font-medium">{item.rank}</td>
              <td className="py-2.5 pr-4 font-medium text-stone-900">{item.name}</td>
              <td className="py-2.5 pr-4 text-stone-500">{CATEGORY_LABELS[item.category] || item.category}</td>
              <td className="py-2.5 pr-4 text-right font-semibold text-brand-700">{item.totalOrders}</td>
              <td className="py-2.5 text-right text-stone-700">${item.revenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
