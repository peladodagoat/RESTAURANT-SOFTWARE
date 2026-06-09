'use client';

import { useState, useEffect, useCallback } from 'react';
import OrderCard from '@/components/admin/OrderCard';

const FILTERS = ['ALL', 'PENDING', 'IN_PROGRESS', 'DELIVERED'];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const res = await fetch(filter === 'ALL' ? '/api/orders' : `/api/orders?status=${filter}`);
    if (res.ok) setOrders(await res.json());
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const displayed = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-serif font-bold text-ink-primary">Live Orders</h2>
        <span className="text-xs text-ink-muted bg-surface-card border border-surface-border px-3 py-1 rounded-full">Refreshes every 5s</span>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${filter === s ? 'bg-gold text-surface-base' : 'bg-surface-card border border-surface-border text-ink-secondary hover:border-gold hover:text-gold'}`}>
            {s === 'IN_PROGRESS' ? 'In Progress' : s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink-muted animate-pulse text-sm">Loading orders…</p>
      ) : displayed.length === 0 ? (
        <div className="text-center py-20 text-ink-muted">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-sm">No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayed.map((order) => (
            <OrderCard key={order.id} order={order} onStatusChange={updateStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
