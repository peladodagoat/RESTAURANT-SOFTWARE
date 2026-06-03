'use client';

import { useState, useEffect } from 'react';

const CATEGORIES = ['STARTERS', 'MAINS', 'DESSERTS', 'DRINKS'];
const EMPTY = { name: '', description: '', price: '', category: 'STARTERS', image: '', allergens: '', available: true };

export default function MenuManagerPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('ALL');

  const load = () =>
    fetch('/api/menu').then((r) => r.json()).then(setItems);

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
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
    if (!confirm('Delete this menu item?')) return;
    await fetch(`/api/menu/${id}`, { method: 'DELETE' });
    load();
  };

  const toggleAvailable = async (item) => {
    await fetch(`/api/menu/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, available: !item.available, allergens: item.allergens }),
    });
    load();
  };

  const displayed = filter === 'ALL' ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Menu Management</h2>
        <button onClick={openNew} className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors">
          + Add Item
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['ALL', ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${
              filter === c ? 'bg-brand-600 text-white' : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-400'
            }`}>
            {c === 'ALL' ? 'All' : c.charAt(0) + c.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Items table */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr className="text-left text-stone-500">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Available</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {displayed.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-4 py-3 font-medium text-stone-900">{item.name}</td>
                <td className="px-4 py-3 text-stone-500 capitalize">{item.category.toLowerCase()}</td>
                <td className="px-4 py-3 text-brand-700 font-semibold">${item.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleAvailable(item)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.available ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                    {item.available ? 'Active' : 'Hidden'}
                  </button>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-xs text-brand-600 hover:underline font-medium">Edit</button>
                  <button onClick={() => remove(item.id)} className="text-xs text-red-500 hover:underline font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-stone-900 mb-4">{editing ? 'Edit Item' : 'New Menu Item'}</h3>
            <div className="space-y-3">
              {[['name', 'Name'], ['description', 'Description'], ['image', 'Image URL (optional)']].map(([k, l]) => (
                <div key={k}>
                  <label className="block text-xs font-medium text-stone-600 mb-1">{l}</label>
                  {k === 'description' ? (
                    <textarea value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" rows={2} />
                  ) : (
                    <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Price ($)</label>
                  <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0) + c.slice(1).toLowerCase()}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Allergens (comma-separated)</label>
                <input value={form.allergens} onChange={(e) => setForm({ ...form, allergens: e.target.value })}
                  placeholder="e.g. Gluten, Dairy, Nuts"
                  className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
              </div>
              <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer">
                <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="accent-brand-600" />
                Available on menu
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-brand-600 text-white py-2.5 rounded-lg font-semibold hover:bg-brand-700 transition-colors text-sm">
                {editing ? 'Save Changes' : 'Add Item'}
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-stone-100 text-stone-700 py-2.5 rounded-lg font-semibold hover:bg-stone-200 transition-colors text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
