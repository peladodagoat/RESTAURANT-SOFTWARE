'use client';

import { useState, useEffect } from 'react';
import OrderCard from '@/components/admin/OrderCard';
import { useLang } from '@/lib/LanguageContext';

const FILTERS = ['ALL', 'PENDING', 'IN_PROGRESS', 'DELIVERED'];
const FILTER_KEYS = {
  ALL: 'filterAll', PENDING: 'filterPending', IN_PROGRESS: 'filterInProgress', DELIVERED: 'filterDelivered',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); });
  }, []);

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o)
    );
  };

  const counts = {
    ALL:         orders.length,
    PENDING:     orders.filter((o) => o.status === 'PENDING').length,
    IN_PROGRESS: orders.filter((o) => o.status === 'IN_PROGRESS').length,
    DELIVERED:   orders.filter((o) => o.status === 'DELIVERED').length,
  };

  const displayed = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter);

  const ORDER_PRIORITY = { PENDING: 0, IN_PROGRESS: 1, DELIVERED: 2, CANCELLED: 3 };
  const sorted = [...displayed].sort((a, b) => {
    const diff = ORDER_PRIORITY[a.status] - ORDER_PRIORITY[b.status];
    if (diff !== 0) return diff;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-2xl font-serif font-bold text-ink-primary">{t('liveOrdersTitle')}</h2>
        <span className="text-xs text-ink-muted bg-surface-card border border-surface-border px-3 py-1 rounded-full">
          {counts.PENDING} {t('filterPending').toLowerCase()} · {counts.IN_PROGRESS} {t('filterInProgress').toLowerCase()} · {counts.DELIVERED} {t('filterDelivered').toLowerCase()}
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
              filter === s
                ? 'bg-gold text-surface-base'
                : 'bg-surface-card border border-surface-border text-ink-secondary hover:border-gold hover:text-gold'
            }`}
          >
            {t(FILTER_KEYS[s])}
            {counts[s] > 0 && (
              <span className={`text-xs rounded-full px-1.5 ${filter === s ? 'bg-surface-base text-gold' : 'bg-surface-elevated text-ink-muted'}`}>
                {counts[s]}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink-muted animate-pulse text-sm">{t('loadingOrders')}</p>
      ) : sorted.length === 0 ? (
        <div className="text-center py-20 text-ink-muted">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-sm">{t('noOrdersFound')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sorted.map((order) => (
            <OrderCard key={order.id} order={order} onStatusChange={updateStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
