'use client';

import { useState, useEffect } from 'react';

const PAY_LABEL = { APPLE_PAY: '🍎 Apple Pay', COUNTER: '💵 Pay at Counter' };

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function ReceiptHTML(order) {
  const lines = order.items.map(i =>
    `<tr>
      <td style="padding:4px 0;color:#555;">${i.quantity}× ${i.menuItem.name}${i.specialInstructions ? ` <em style="color:#999;">(${i.specialInstructions})</em>` : ''}</td>
      <td style="padding:4px 0;text-align:right;color:#555;">$${(i.price * i.quantity).toFixed(2)}</td>
    </tr>`
  ).join('');

  return `
    <div style="font-family:Georgia,serif;width:320px;margin:0 auto 40px;padding:24px;border:1px solid #ddd;border-radius:12px;page-break-inside:avoid;">
      <div style="text-align:center;margin-bottom:16px;">
        <h2 style="margin:0;font-size:22px;color:#2c1a0e;">Bella Vista</h2>
        <p style="margin:4px 0 0;font-size:11px;color:#888;">Authentic Italian Cuisine</p>
      </div>
      <hr style="border:none;border-top:1px dashed #ccc;margin:12px 0;"/>
      <div style="font-size:12px;color:#555;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;"><span>Order</span><strong>#${order.id.slice(-6).toUpperCase()}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Table</span><strong>${order.tableId}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Date</span><strong>${formatDate(order.createdAt)}</strong></div>
        <div style="display:flex;justify-content:space-between;"><span>Payment</span><strong>${order.paymentMethod === 'APPLE_PAY' ? 'Apple Pay' : 'Counter'}</strong></div>
      </div>
      <hr style="border:none;border-top:1px dashed #ccc;margin:12px 0;"/>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">${lines}</table>
      <hr style="border:none;border-top:1px solid #ccc;margin:12px 0;"/>
      <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:bold;color:#2c1a0e;">
        <span>Total</span><span>$${order.total.toFixed(2)}</span>
      </div>
      <p style="text-align:center;font-size:10px;color:#aaa;margin-top:16px;">Thank you for dining with us!</p>
    </div>`;
}

export default function ReceiptsPage() {
  const [orders, setOrders]     = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((data) => { setOrders(data); setLoading(false); });
  }, []);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected(selected.size === orders.length ? new Set() : new Set(orders.map((o) => o.id)));
  };

  const printOrders = (list) => {
    const html = list.map(ReceiptHTML).join('');
    const win  = window.open('', '_blank', 'width=800,height=600');
    win.document.write(`
      <!DOCTYPE html><html><head>
        <title>Receipts — Bella Vista</title>
        <style>
          body { background:#fff; margin:0; padding:24px; display:flex; flex-wrap:wrap; gap:16px; justify-content:center; }
          @media print { body { padding:0; } }
        </style>
      </head><body>${html}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  };

  const printAll      = () => printOrders(orders);
  const printSelected = () => printOrders(orders.filter((o) => selected.has(o.id)));

  const allChecked  = orders.length > 0 && selected.size === orders.length;
  const someChecked = selected.size > 0 && selected.size < orders.length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-2xl font-serif font-bold text-ink-primary">Receipts</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {selected.size > 0 && (
            <button
              onClick={printSelected}
              className="flex items-center gap-2 bg-gold text-surface-base px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors"
            >
              🖨️ Print Selected ({selected.size})
            </button>
          )}
          <button
            onClick={printAll}
            className="flex items-center gap-2 bg-surface-card border border-surface-border text-ink-secondary px-4 py-2 rounded-xl text-sm font-semibold hover:border-gold hover:text-gold transition-all"
          >
            🖨️ Print All
          </button>
        </div>
      </div>

      {/* Select all */}
      {!loading && orders.length > 0 && (
        <label className="flex items-center gap-2 text-sm text-ink-secondary mb-4 cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={allChecked}
            ref={(el) => { if (el) el.indeterminate = someChecked; }}
            onChange={toggleAll}
            className="accent-gold w-4 h-4"
          />
          Select all ({orders.length} receipts)
        </label>
      )}

      {loading ? (
        <p className="text-ink-muted animate-pulse text-sm">Loading receipts…</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-ink-muted">
          <div className="text-4xl mb-3">🧾</div>
          <p className="text-sm">No receipts yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => toggle(order.id)}
              className={`bg-surface-card border rounded-2xl p-5 cursor-pointer transition-all shadow-card ${
                selected.has(order.id)
                  ? 'border-gold shadow-glow-gold ring-1 ring-gold/30'
                  : 'border-surface-border hover:border-gold/40'
              }`}
            >
              {/* Receipt header */}
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.has(order.id)}
                    onChange={() => toggle(order.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="accent-gold w-4 h-4 flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-ink-primary text-sm">Table {order.tableId} · #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-ink-muted">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-surface-elevated border border-surface-border text-ink-secondary whitespace-nowrap">
                  {PAY_LABEL[order.paymentMethod]}
                </span>
              </div>

              {/* Items */}
              <div className="bg-surface-elevated rounded-xl p-3 mb-3 space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-ink-secondary">
                    <span>{item.quantity}× {item.menuItem.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Total + print */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-gold">${order.total.toFixed(2)}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); printOrders([order]); }}
                  className="text-xs text-ink-secondary hover:text-gold transition-colors flex items-center gap-1"
                >
                  🖨️ Print
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
