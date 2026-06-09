'use client';

import Image from 'next/image';

export default function MenuItemCard({ item, quantity, onAdd, onRemove }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
      {item.image && (
        <div className="relative w-full h-48">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 600px" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-serif font-bold text-stone-900 text-lg leading-tight">{item.name}</h3>
          <span className="font-bold text-brand-700 text-lg whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-stone-500 leading-relaxed mb-3">{item.description}</p>
        {item.allergens?.length > 0 && (
          <p className="text-xs text-amber-600 mb-4">⚠ Contains: {item.allergens.join(', ')}</p>
        )}
        <div className="flex justify-end">
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="bg-brand-600 text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-brand-700 transition-colors"
            >
              Add to Order
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={onRemove}
                className="w-9 h-9 rounded-full bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 transition-colors flex items-center justify-center text-lg"
              >
                −
              </button>
              <span className="font-bold text-brand-700 text-lg w-5 text-center">{quantity}</span>
              <button
                onClick={onAdd}
                className="w-9 h-9 rounded-full bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors flex items-center justify-center text-lg"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
