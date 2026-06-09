'use client';

const STATUS_STYLES = {
  PENDING:     'bg-amber-100 text-amber-700 border border-amber-200',
  IN_PROGRESS: 'bg-blue-100 text-blue-700 border border-blue-200',
  DELIVERED:   'bg-emerald-100 text-emerald-700 border border-emerald-200',
  CANCELLED:   'bg-surface-elevated text-ink-muted border border-surface-border',
};

const STATUS_LABELS = {
  PENDING: 'Pending', IN_PROGRESS: 'In Progress', DELIVERED: 'Delivered', CANCELLED: 'Cancelled',
};

function timeAgo(dateStr) {
  const mins = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
}

export default function OrderCard({ order, onStatusChange }) {
  const time = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`bg-surface-card border rounded-2xl p-5 shadow-card transition-all ${
      order.status === 'PENDING' ? 'border-amber-200' :
      order.status === 'IN_PROGRESS' ? 'border-blue-200' :
      'border-surface-border'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-2">
        <div>
          <p className="font-bold text-ink-primary text-base">Table {order.tableId}</p>
          <p className="text-xs text-ink-muted">#{order.id.slice(-6).toUpperCase()} · {time} · {timeAgo(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
            {STATUS_LABELS[order.status]}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-elevated border border-surface-border text-ink-secondary">
            {order.paymentMethod === 'APPLE_PAY' ? '🍎 Apple Pay' : '💵 Counter'}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-1.5 mb-4 bg-surface-elevated rounded-xl p-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-ink-secondary">
              <span className="font-semibold text-ink-primary">{item.quantity}×</span> {item.menuItem.name}
              {item.specialInstructions && (
                <span className="text-ink-muted italic ml-1">— "{item.specialInstructions}"</span>
              )}
            </span>
            <span className="text-ink-muted ml-2 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Footer: total + action buttons */}
      <div className="flex items-center justify-between border-t border-surface-border pt-3 gap-2 flex-wrap">
        <span className="font-bold text-gold text-base">${order.total.toFixed(2)}</span>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Back buttons */}
          {order.status === 'IN_PROGRESS' && (
            <button
              onClick={() => onStatusChange(order.id, 'PENDING')}
              className="text-xs px-3 py-1.5 rounded-lg border border-surface-border text-ink-secondary hover:border-amber-300 hover:text-amber-700 transition-all"
            >
              ← Pending
            </button>
          )}
          {order.status === 'DELIVERED' && (
            <button
              onClick={() => onStatusChange(order.id, 'IN_PROGRESS')}
              className="text-xs px-3 py-1.5 rounded-lg border border-surface-border text-ink-secondary hover:border-blue-300 hover:text-blue-700 transition-all"
            >
              ← In Progress
            </button>
          )}

          {/* Forward buttons */}
          {order.status === 'PENDING' && (
            <button
              onClick={() => onStatusChange(order.id, 'IN_PROGRESS')}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Mark In Progress →
            </button>
          )}
          {order.status === 'IN_PROGRESS' && (
            <button
              onClick={() => onStatusChange(order.id, 'DELIVERED')}
              className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
            >
              Mark Delivered ✓
            </button>
          )}
          {order.status === 'DELIVERED' && (
            <span className="text-xs text-emerald-600 font-semibold">✓ Done</span>
          )}
        </div>
      </div>
    </div>
  );
}
