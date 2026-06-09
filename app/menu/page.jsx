'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MenuDisplay from '@/components/user/MenuDisplay';
import Cart from '@/components/user/Cart';
import OrderSummary from '@/components/user/OrderSummary';
import PaymentScreen from '@/components/user/PaymentScreen';
import { useLang } from '@/lib/LanguageContext';

function MenuPage() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get('table') || '1';
  const { t, lang, toggle } = useLang();

  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState('menu');
  const [placedOrder, setPlacedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu').then((r) => r.json()).then((d) => { setMenuItems(d); setLoading(false); });
  }, []);

  const addToCart = (item, specialInstructions = '') => {
    setCart((prev) => {
      const ex = prev.find((c) => c.menuItemId === item.id && c.specialInstructions === specialInstructions);
      if (ex) return prev.map((c) => c.menuItemId === item.id && c.specialInstructions === specialInstructions ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { menuItemId: item.id, item, quantity: 1, specialInstructions }];
    });
  };

  const removeFromCart = (menuItemId, specialInstructions) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.menuItemId === menuItemId && c.specialInstructions === specialInstructions);
      if (!ex) return prev;
      if (ex.quantity === 1) return prev.filter((c) => !(c.menuItemId === menuItemId && c.specialInstructions === specialInstructions));
      return prev.map((c) => c.menuItemId === menuItemId && c.specialInstructions === specialInstructions ? { ...c, quantity: c.quantity - 1 } : c);
    });
  };

  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.quantity, 0);
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  const handlePlaceOrder = async (paymentMethod) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableId,
        paymentMethod,
        items: cart.map((c) => ({ menuItemId: c.menuItemId, quantity: c.quantity, specialInstructions: c.specialInstructions })),
      }),
    });
    const order = await res.json();
    setPlacedOrder(order);
    setCart([]);
    setStep('confirmed');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-base">
        <div className="text-center animate-fade-in">
          <div className="text-5xl mb-4">🍽️</div>
          <p className="text-ink-secondary animate-pulse font-sans text-sm">{t('loadingMenu')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base text-ink-primary font-sans">
      {/* Header */}
      <header className="bg-surface-card border-b border-surface-border sticky top-0 z-40 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-gold">Bella Vista</h1>
            <p className="text-xs text-ink-muted truncate">{t('table')} {tableId} · {t('restaurantTagline')}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-surface-border text-ink-secondary hover:border-gold hover:text-gold transition-colors"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <a
              href="/admin"
              className="flex items-center gap-1.5 bg-surface-elevated border border-surface-border text-ink-secondary text-xs font-semibold px-3 py-1.5 rounded-full hover:border-gold hover:text-gold transition-colors"
            >
              <span>🔐</span>
              <span className="hidden sm:inline">{t('staffLogin')}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-36">
        {step === 'menu' && (
          <MenuDisplay items={menuItems} cart={cart} onAdd={addToCart} onRemove={removeFromCart} />
        )}
        {step === 'summary' && (
          <OrderSummary cart={cart} total={cartTotal} tableId={tableId} onBack={() => setStep('menu')} onConfirm={() => setStep('payment')} onAdd={addToCart} onRemove={removeFromCart} />
        )}
        {step === 'payment' && (
          <PaymentScreen total={cartTotal} onBack={() => setStep('summary')} onPay={handlePlaceOrder} />
        )}
        {step === 'confirmed' && placedOrder && (
          <div className="text-center py-20 animate-slide-up">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-2xl font-serif font-bold text-gold mb-2">{t('orderConfirmed')}</h2>
            <p className="text-ink-secondary mb-1">{t('orderNumber')}{placedOrder.id.slice(-6).toUpperCase()}</p>
            <p className="text-ink-muted mb-10 text-sm">{t('estimatedWait')}</p>
            <button
              onClick={() => setStep('menu')}
              className="bg-gold text-surface-base px-8 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors"
            >
              {t('backToMenuBtn')}
            </button>
          </div>
        )}
      </main>

      {/* Floating cart */}
      {step === 'menu' && cartCount > 0 && (
        <div className="fixed bottom-5 left-0 right-0 flex justify-center z-50 px-4 animate-slide-up">
          <button
            onClick={() => setStep('summary')}
            className="bg-gold text-surface-base px-5 py-4 rounded-2xl shadow-glow-gold flex items-center gap-4 hover:bg-gold-light transition-all w-full max-w-md font-semibold"
          >
            <span className="bg-surface-base text-gold rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm flex-shrink-0">
              {cartCount}
            </span>
            <span className="flex-1 text-left">{t('viewOrder')}</span>
            <span className="font-bold">${cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function MenuPageWrapper() {
  return <Suspense><MenuPage /></Suspense>;
}
