'use client';

const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-stone-100 text-stone-500',
};

const NEXT_STATUS = {
  PENDING: 'IN_PROGRESS',
  IN_PROGRESS: 'DELIVERED',
};

const NEXT_LABEL = {
  PENDING: 'Mark In Progress',
  IN_PROGRESS: 'Mark Delivered',
};

export default function OrderCard({ order, onStatusChange }) {
  const time = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-stone-900">Table {order.tableId}</p>
          <p className="text-xs text-stone-400">#{order.id.slice(-6).toUpperCase()} · {time}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
            {order.status === 'IN_PROGRESS' ? 'In Progress' : order.status.charAt(0) + order.status.slice(1).toLowerCase()}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
            {order.paymentMethod === 'APPLE_PAY' ? '🍎 Apple Pay' : '💵 Counter'}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-stone-700">
              <span className="font-medium">{item.quantity}×</span> {item.menuItem.name}
              {item.specialInstructions && (
                <span className="text-stone-400 italic ml-1">"{item.specialInstructions}"</span>
              )}
            </span>
            <span className="text-stone-500">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 pt-3">
        <span className="font-bold text-stone-900">${order.total.toFixed(2)}</span>
        {NEXT_STATUS[order.status] && (
          <button
            onClick={() => onStatusChange(order.id, NEXT_STATUS[order.status])}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors"
          >
            {NEXT_LABEL[order.status]}
          </button>
        )}
      </div>
    </div>
  );
}
