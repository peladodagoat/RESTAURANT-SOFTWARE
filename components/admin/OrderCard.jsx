'use client';

const STATUS_STYLES = {
  PENDING:     'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  DELIVERED:   'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  CANCELLED:   'bg-surface-elevated text-ink-muted border border-surface-border',
};

const NEXT_STATUS = { PENDING: 'IN_PROGRESS', IN_PROGRESS: 'DELIVERED' };
const NEXT_LABEL  = { PENDING: 'Mark In Progress', IN_PROGRESS: 'Mark Delivered' };

export default function OrderCard({ order, onStatusChange }) {
  const time = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-5 hover:border-gold/20 transition-all">
      <div className="flex items-start justify-between mb-4 gap-2">
        <div>
          <p className="font-bold text-ink-primary">Table {order.tableId}</p>
          <p className="text-xs text-ink-muted">#{order.id.slice(-6).toUpperCase()} · {time}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
            {order.status === 'IN_PROGRESS' ? 'In Progress' : order.status.charAt(0) + order.status.slice(1).toLowerCase()}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-elevated border border-surface-border text-ink-secondary">
            {order.paymentMethod === 'APPLE_PAY' ? '🍎 Apple Pay' : '💵 Counter'}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-ink-secondary">
              <span className="font-semibold text-ink-primary">{item.quantity}×</span> {item.menuItem.name}
              {item.specialInstructions && <span className="text-ink-muted italic ml-1">"{item.specialInstructions}"</span>}
            </span>
            <span className="text-ink-muted">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-surface-border pt-3">
        <span className="font-bold text-gold">${order.total.toFixed(2)}</span>
        {NEXT_STATUS[order.status] && (
          <button
            onClick={() => onStatusChange(order.id, NEXT_STATUS[order.status])}
            className="bg-gold/10 border border-gold/30 text-gold px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gold hover:text-surface-base transition-all"
          >
            {NEXT_LABEL[order.status]}
          </button>
        )}
      </div>
    </div>
  );
}
