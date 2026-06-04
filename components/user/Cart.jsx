'use client';

export default function Cart({ cart, total, onRemove, onAdd, onCheckout, onClose }) {
  if (!cart || cart.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="fixed inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white w-full max-w-sm h-full shadow-2xl flex flex-col cart-enter">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
            <h2 className="font-serif font-bold text-lg text-stone-900">Your Order</h2>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-700 text-xl leading-none">×</button>
          </div>
          <div className="flex-1 flex items-center justify-center text-center px-6">
            <div>
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-stone-400 text-sm">Your cart is empty.<br />Add items from the menu.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm h-full shadow-2xl flex flex-col cart-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <h2 className="font-serif font-bold text-lg text-stone-900">Your Order</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 text-2xl leading-none">×</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cart.map((c) => (
            <div key={`${c.menuItemId}-${c.specialInstructions}`} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-stone-900 truncate">{c.item.name}</p>
                {c.specialInstructions && (
                  <p className="text-xs text-stone-400 italic truncate">"{c.specialInstructions}"</p>
                )}
                <p className="text-xs text-stone-500">${c.item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onRemove(c.menuItemId, c.specialInstructions)}
                  className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 font-bold text-xs hover:bg-stone-200 transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <span className="font-bold text-brand-700 w-4 text-center text-sm">{c.quantity}</span>
                <button
                  onClick={() => onAdd(c.item, c.specialInstructions)}
                  className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <span className="text-sm font-semibold text-stone-800 w-14 text-right flex-shrink-0">
                ${(c.item.price * c.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-stone-100 px-5 py-4">
          <div className="flex justify-between text-base font-bold text-stone-900 mb-4">
            <span>Total</span>
            <span className="text-brand-700">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-brand-600 text-white py-3.5 rounded-2xl font-bold text-base hover:bg-brand-700 transition-colors shadow-lg"
          >
            Review Order
          </button>
        </div>
      </div>
    </div>
  );
}
