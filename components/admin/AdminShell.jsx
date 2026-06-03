'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/orders', label: 'Live Orders', icon: '🗂️' },
  { href: '/admin/menu', label: 'Menu', icon: '🍽️' },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin';
  if (isLoginPage) return <>{children}</>;

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-stone-900 text-white flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="px-5 py-6 border-b border-stone-700">
          <h1 className="font-serif font-bold text-brand-400 text-xl">Bella Vista</h1>
          <p className="text-stone-400 text-xs mt-0.5">Staff Portal</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                pathname.startsWith(n.href)
                  ? 'bg-brand-600 text-white'
                  : 'text-stone-300 hover:bg-stone-800'
              )}
            >
              <span>{n.icon}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 pb-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-400 hover:bg-stone-800 transition-colors"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-56 flex-1 min-h-screen">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
