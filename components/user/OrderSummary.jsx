'use client';

export default function OrderSummary({ cart, total, tableId, onBack, onConfirm, onAdd, onRemove }) {
  return (
    <div className="pt-6">
      <button onClick={onBack} className="text-sm text-stone-500 hover:text-brand-600 mb-6 flex items-center gap-1">
        ← Back to Menu
      </button>

      <h2 className="text-xl font-serif font-bold text-stone-900 mb-6">Your Order — Table {tableId}</h2>

      <div className="space-y-3 mb-6">
        {cart.map((c) => (
          <div key={`${c.menuItemId}-${c.specialInstructions}`} className="bg-white rounded-xl p-4 border border-stone-100 flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold text-sm text-stone-900">{c.item.name}</p>
              {c.specialInstructions && (
                <p className="text-xs text-stone-400 mt-0.5 italic">"{c.specialInstructions}"</p>
              )}
              <p className="text-xs text-stone-500 mt-0.5">${c.item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={() => onRemove(c.menuItemId, c.specialInstructions)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="font-bold text-brand-700 w-4 text-center">{c.quantity}</span>
              <button
                onClick={() => onAdd(c.item, c.specialInstructions)}
                className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors flex items-center justify-center"
              >
                +
              </button>
              <span className="font-semibold text-stone-800 w-16 text-right">
                ${(c.item.price * c.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-100 p-4 mb-8">
        <div className="flex justify-between text-stone-600 text-sm mb-2">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-stone-900 border-t border-stone-100 pt-2">
          <span>Total</span>
          <span className="text-brand-700">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-700 transition-colors shadow-lg"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
