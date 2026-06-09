'use client';

import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    restaurantTagline: 'Authentic Italian Cuisine',
    table: 'Table',
    staffLogin: 'Staff Login',
    loadingMenu: 'Loading menu…',
    starters: 'Starters', mains: 'Mains', desserts: 'Desserts', drinks: 'Drinks',
    addToOrder: 'Add to Order',
    contains: 'Contains',
    viewOrder: 'View Order',
    yourOrder: 'Your Order',
    backToMenu: '← Back to Menu',
    backToOrder: '← Back to Order',
    each: 'each',
    subtotal: 'Subtotal',
    total: 'Total',
    proceedToPayment: 'Proceed to Payment',
    payment: 'Payment',
    totalDue: 'Total due',
    payApplePay: 'Pay with Apple Pay',
    payCounter: 'Pay at Counter',
    paymentTerms: 'By placing your order you agree to our terms. All prices include applicable taxes.',
    orderConfirmed: 'Order Confirmed!',
    orderNumber: 'Order #',
    estimatedWait: 'Your food is being prepared. Estimated wait: 20–30 min.',
    backToMenuBtn: 'Back to Menu',
    cartEmpty: 'Your cart is empty.',
    cartEmptyHint: 'Add items from the menu.',
    reviewOrder: 'Review Order',
    items: 'items',
    adminTitle: 'Staff Portal',
    adminUsername: 'Username',
    adminPassword: 'Password',
    adminSignIn: 'Sign In',
    adminSigningIn: 'Signing in…',
    adminDemoHint: 'Demo: admin / admin123',
    adminInvalidCreds: 'Invalid username or password.',
  },
  es: {
    restaurantTagline: 'Auténtica Cocina Italiana',
    table: 'Mesa',
    staffLogin: 'Acceso Personal',
    loadingMenu: 'Cargando menú…',
    starters: 'Entrantes', mains: 'Platos Principales', desserts: 'Postres', drinks: 'Bebidas',
    addToOrder: 'Añadir',
    contains: 'Contiene',
    viewOrder: 'Ver Pedido',
    yourOrder: 'Tu Pedido',
    backToMenu: '← Volver al Menú',
    backToOrder: '← Volver al Pedido',
    each: 'c/u',
    subtotal: 'Subtotal',
    total: 'Total',
    proceedToPayment: 'Ir al Pago',
    payment: 'Pago',
    totalDue: 'Total a pagar',
    payApplePay: 'Pagar con Apple Pay',
    payCounter: 'Pagar en Caja',
    paymentTerms: 'Al realizar tu pedido aceptas nuestros términos. Los precios incluyen impuestos.',
    orderConfirmed: '¡Pedido Confirmado!',
    orderNumber: 'Pedido #',
    estimatedWait: 'Tu comida está siendo preparada. Tiempo estimado: 20–30 min.',
    backToMenuBtn: 'Volver al Menú',
    cartEmpty: 'Tu carrito está vacío.',
    cartEmptyHint: 'Agrega productos desde el menú.',
    reviewOrder: 'Revisar Pedido',
    items: 'productos',
    adminTitle: 'Portal de Personal',
    adminUsername: 'Usuario',
    adminPassword: 'Contraseña',
    adminSignIn: 'Iniciar Sesión',
    adminSigningIn: 'Iniciando…',
    adminDemoHint: 'Demo: admin / admin123',
    adminInvalidCreds: 'Usuario o contraseña incorrectos.',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = (key) => translations[lang][key] ?? key;
  const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'));
  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
