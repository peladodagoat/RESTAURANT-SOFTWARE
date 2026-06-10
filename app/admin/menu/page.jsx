'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/lib/LanguageContext';

const CATEGORIES = ['STARTERS', 'MAINS', 'DESSERTS', 'DRINKS'];
const CAT_KEYS = { STARTERS: 'starters', MAINS: 'mains', DESSERTS: 'desserts', DRINKS: 'drinks' };
const EMPTY = { name: '', description: '', price: '', category: 'STARTERS', image: '', allergens: '', available: true };

export default function MenuManagerPage() {
  const [items, setItems]       = useState([]);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter]     = useState('ALL');
  const { t } = useLang();

  const load = () => fetch('/api/menu').then((r) => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const openNew  = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (item) => {
    setForm({ ...item, price: item.price.toString(), allergens: item.allergens.join(', ') });
    setEditing(item.id);
    setShowForm(true);
  };

  const save = async () => {
    const payload = {
      ...form,
      price: parseFloat(form.price),
      allergens: form.allergens ? form.allergens.split(',').map((a) => a.trim()).filter(Boolean) : [],
    };
    if (editing) {
      await fetch(`/api/menu/${editing}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/menu', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setShowForm(false);
    load();
  };

  const remove = async (id) => {
    if (!confirm(t('deleteConfirm'))) return;
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    load();
  };

  const toggleAvailable = async (item) => {
    await fetch(`/api/menu/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...item, available: !item.available }) });
    load();
  };

  const displayed = filter === 'ALL' ? items : items.filter((i) => i.category === filter);

  const inputCls = 'w-full bg-surface-base border border-surface-border rounded-xl px-3 py-2.5 text-sm text-ink-primary placeholder-ink-muted focus:outline-none focus:border-gold transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-serif font-bold text-ink-primary">{t('menuMgmtTitle')}</h2>
        <button onClick={openNew} className="bg-gold text-surface-base px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gold-light transition-colors flex-shrink-0">
          {t('addItemBtn')}
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['ALL', ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${filter === c ? 'bg-gold text-surface-base' : 'bg-surface-card border border-surface-border text-ink-secondary hover:border-gold hover:text-gold'}`}>
            {c === 'ALL' ? t('filterAll') : t(CAT_KEYS[c])}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead className="border-b border-surface-border">
            <tr className="text-left text-ink-muted">
              <th className="px-4 py-3 font-medium">{t('colName')}</th>
              <th className="px-4 py-3 font-medium">{t('colCategory')}</th>
              <th className="px-4 py-3 font-medium">{t('colPrice')}</th>
              <th className="px-4 py-3 font-medium">{t('colStatus')}</th>
              <th className="px-4 py-3 font-medium">{t('colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {displayed.map((item) => (
              <tr key={item.id} className="hover:bg-surface-elevated/30 transition-colors">
                <td className="px-4 py-3 font-medium text-ink-primary">{item.name}</td>
                <td className="px-4 py-3 text-ink-secondary">{CAT_KEYS[item.category] ? t(CAT_KEYS[item.category]) : item.category}</td>
                <td className="px-4 py-3 text-gold font-semibold">${item.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleAvailable(item)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${item.available ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-surface-elevated text-ink-muted border-surface-border'}`}>
                    {item.available ? t('statusActive') : t('statusHidden')}
                  </button>
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => openEdit(item)} className="text-xs text-gold hover:underline font-medium">{t('editBtn')}</button>
                  <button onClick={() => remove(item.id)} className="text-xs text-red-400 hover:underline font-medium">{t('deleteBtn')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-4 pb-4 sm:pb-0">
          <div className="bg-surface-card border border-surface-border rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <h3 className="font-bold text-lg text-ink-primary mb-5">{editing ? t('modalEditTitle') : t('modalNewTitle')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">{t('fieldName')}</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">{t('fieldDescription')}</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputCls} resize-none`} rows={2} />
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">{t('fieldImageUrl')}</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">{t('fieldPrice')}</label>
                  <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1.5">{t('fieldCategory')}</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{t(CAT_KEYS[c])}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5">{t('fieldAllergens')}</label>
                <input value={form.allergens} onChange={(e) => setForm({ ...form, allergens: e.target.value })} placeholder={t('fieldAllergensPlaceholder')} className={inputCls} />
              </div>
              <label className="flex items-center gap-2 text-sm text-ink-secondary cursor-pointer">
                <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-gold" />
                {t('fieldAvailable')}
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-gold text-surface-base py-3 rounded-xl font-semibold hover:bg-gold-light transition-colors text-sm">
                {editing ? t('saveChanges') : t('addItemBtn')}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-surface-elevated border border-surface-border text-ink-secondary py-3 rounded-xl font-semibold hover:text-ink-primary transition-colors text-sm">
                {t('cancelBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
