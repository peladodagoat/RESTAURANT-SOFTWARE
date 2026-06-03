'use client';

import { useState, useEffect, useCallback } from 'react';
import OrderCard from '@/components/admin/OrderCard';

const STATUS_FILTERS = ['ALL', 'PENDING', 'IN_PROGRESS', 'DELIVERED'];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const url = filter === 'ALL' ? '/api/orders' : `/api/orders?status=${filter}`;
    const res = await fetch(url);
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

  const displayOrders = filter === 'ALL' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Live Orders</h2>
        <span className="text-xs text-stone-400 bg-stone-100 px-3 py-1 rounded-full">Auto-refreshes every 5s</span>
      </div>

      <div className="flex gap-2 mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${
              filter === s ? 'bg-brand-600 text-white' : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-400'
            }`}
          >
            {s === 'IN_PROGRESS' ? 'In Progress' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-stone-400 animate-pulse">Loading orders...</p>
      ) : displayOrders.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <div className="text-4xl mb-3">📭</div>
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {displayOrders.map((order) => (
            <OrderCard key={order.id} order={order} onStatusChange={updateStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
