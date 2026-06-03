'use client';

import { useState, useEffect } from 'react';
import MenuDisplay from '@/components/user/MenuDisplay';
import Cart from '@/components/user/Cart';
import OrderSummary from '@/components/user/OrderSummary';
import PaymentScreen from '@/components/user/PaymentScreen';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function MenuPage() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get('table') || '1';

  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState('menu'); // menu | summary | payment | confirmed
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then((r) => r.json())
      .then((data) => { setMenuItems(data); setLoading(false); });
  }, []);

  const addToCart = (item, specialInstructions = '') => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItemId === item.id && c.specialInstructions === specialInstructions);
      if (existing) {
        return prev.map((c) =>
          c.menuItemId === item.id && c.specialInstructions === specialInstructions
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { menuItemId: item.id, item, quantity: 1, specialInstructions }];
    });
  };

  const removeFromCart = (menuItemId, specialInstructions) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.menuItemId === menuItemId && c.specialInstructions === specialInstructions);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((c) => !(c.menuItemId === menuItemId && c.specialInstructions === specialInstructions));
      return prev.map((c) =>
        c.menuItemId === menuItemId && c.specialInstructions === specialInstructions
          ? { ...c, quantity: c.quantity - 1 }
          : c
      );
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.quantity, 0);
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  const handlePlaceOrder = async (paymentMethod) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableId,
        paymentMethod,
        items: cart.map((c) => ({
          menuItemId: c.menuItemId,
          quantity: c.quantity,
          specialInstructions: c.specialInstructions,
        })),
      }),
    });
    const order = await res.json();
    setPlacedOrder(order);
    clearCart();
    setStep('confirmed');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="text-4xl mb-4">🍽️</div>
          <p className="text-stone-500 animate-pulse">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-brand-700">Bella Vista</h1>
            <p className="text-xs text-stone-500">Table {tableId}</p>
          </div>
          <p className="text-sm text-stone-500 italic">Authentic Italian Cuisine</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-36">
        {step === 'menu' && (
          <MenuDisplay
            items={menuItems}
            cart={cart}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />
        )}
        {step === 'summary' && (
          <OrderSummary
            cart={cart}
            total={cartTotal}
            tableId={tableId}
            onBack={() => setStep('menu')}
            onConfirm={() => setStep('payment')}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />
        )}
        {step === 'payment' && (
          <PaymentScreen
            total={cartTotal}
            onBack={() => setStep('summary')}
            onPay={handlePlaceOrder}
          />
        )}
        {step === 'confirmed' && placedOrder && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-2xl font-serif font-bold text-brand-700 mb-2">Order Confirmed!</h2>
            <p className="text-stone-600 mb-1">Order #{placedOrder.id.slice(-6).toUpperCase()}</p>
            <p className="text-stone-500 mb-8">Your food is being prepared. Estimated wait: 20–30 min.</p>
            <button
              onClick={() => setStep('menu')}
              className="bg-brand-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-700 transition-colors"
            >
              Back to Menu
            </button>
          </div>
        )}
      </main>

      {/* Floating cart button */}
      {step === 'menu' && cartCount > 0 && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4">
          <button
            onClick={() => setStep('summary')}
            className="bg-brand-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 hover:bg-brand-700 transition-colors w-full max-w-sm"
          >
            <span className="bg-white text-brand-700 rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
              {cartCount}
            </span>
            <span className="flex-1 text-left font-semibold">View Order</span>
            <span className="font-bold">${cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function MenuPageWrapper() {
  return (
    <Suspense>
      <MenuPage />
    </Suspense>
  );
}
