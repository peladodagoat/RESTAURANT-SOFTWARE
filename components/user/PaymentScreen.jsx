'use client';

import { useState } from 'react';

export default function PaymentScreen({ total, onBack, onPay }) {
  const [loading, setLoading] = useState(false);

  const handlePay = async (method) => {
    setLoading(true);
    await onPay(method);
    setLoading(false);
  };

  return (
    <div className="pt-6">
      <button onClick={onBack} className="text-sm text-stone-500 hover:text-brand-600 mb-6 flex items-center gap-1">
        ← Back to Order
      </button>

      <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">Payment</h2>
      <p className="text-stone-500 text-sm mb-8">
        Total due: <span className="font-bold text-brand-700 text-lg">${total.toFixed(2)}</span>
      </p>

      <div className="space-y-4">
        <button
          disabled={loading}
          onClick={() => handlePay('APPLE_PAY')}
          className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-stone-900 transition-colors disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Pay with Apple Pay
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-stone-400 text-sm">or</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        <button
          disabled={loading}
          onClick={() => handlePay('COUNTER')}
          className="w-full bg-white border-2 border-brand-500 text-brand-700 py-4 rounded-2xl font-semibold text-lg hover:bg-brand-50 transition-colors disabled:opacity-50"
        >
          💵 Pay at Counter
        </button>
      </div>

      <p className="text-center text-xs text-stone-400 mt-6">
        By placing your order you agree to our terms. All prices include applicable taxes.
      </p>
    </div>
  );
}
