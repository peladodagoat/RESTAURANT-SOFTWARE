'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import Footer from '@/components/Footer';

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard',    icon: '📊' },
  { href: '/admin/orders',    label: 'Live Orders',  icon: '🗂️' },
  { href: '/admin/menu',      label: 'Menu',         icon: '🍽️' },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (pathname === '/admin') return <>{children}</>;

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  const SidebarContent = () => (
    <>
      <div className="px-5 py-6 border-b border-surface-border">
        <h1 className="font-serif font-bold text-gold text-xl">Bella Vista</h1>
        <p className="text-ink-muted text-xs mt-0.5">Staff Portal</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              pathname.startsWith(n.href)
                ? 'bg-gold/10 text-gold border border-gold/20'
                : 'text-ink-secondary hover:bg-surface-elevated hover:text-ink-primary'
            )}
          >
            <span>{n.icon}</span>{n.label}
          </Link>
        ))}
      </nav>
      <div className="px-3 pb-4 space-y-1 border-t border-surface-border pt-3">
        <Link
          href="/menu?table=1"
          onClick={() => setOpen(false)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-secondary hover:bg-surface-elevated hover:text-ink-primary transition-all"
        >
          <span>🏠</span> User Portal
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:bg-surface-elevated hover:text-ink-primary transition-all"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface-base text-ink-primary font-sans flex">
      {/* Desktop sidebar */}
      <aside className="w-56 bg-surface-card border-r border-surface-border flex-col fixed inset-y-0 left-0 z-30 hidden md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-surface-card border-b border-surface-border flex items-center justify-between px-4 py-3">
        <h1 className="font-serif font-bold text-gold text-lg">Bella Vista</h1>
        <button onClick={() => setOpen(!open)} className="text-ink-secondary hover:text-gold transition-colors p-1">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="relative w-64 bg-surface-card border-r border-surface-border flex flex-col h-full z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="md:ml-56 flex-1 min-h-screen flex flex-col">
        <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
