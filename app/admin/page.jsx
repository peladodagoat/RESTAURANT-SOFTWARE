'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/LanguageContext';

export default function AdminLogin() {
  const router = useRouter();
  const { t } = useLang();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError(t('adminInvalidCreds'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-gold mb-1">Bella Vista</h1>
          <p className="text-ink-muted text-sm">{t('adminTitle')}</p>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">{t('adminUsername')}</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-surface-elevated border border-surface-border rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">{t('adminPassword')}</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-surface-elevated border border-surface-border rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-surface-base py-3 rounded-xl font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? t('adminSigningIn') : t('adminSignIn')}
            </button>
          </form>
          <p className="text-xs text-ink-muted text-center mt-5">{t('adminDemoHint')}</p>
        </div>
      </div>
    </div>
  );
}
