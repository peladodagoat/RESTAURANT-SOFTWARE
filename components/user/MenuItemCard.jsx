'use client';

import Image from 'next/image';

export default function MenuItemCard({ item, quantity, onAdd, onRemove }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex">
      {item.image && (
        <div className="relative w-28 h-28 flex-shrink-0">
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
        </div>
      )}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-stone-900 text-sm leading-tight">{item.name}</h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">{item.description}</p>
          {item.allergens?.length > 0 && (
            <p className="text-xs text-amber-600 mt-1">⚠ {item.allergens.join(', ')}</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-brand-700">${item.price.toFixed(2)}</span>
          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="bg-brand-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-brand-700 transition-colors"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={onRemove}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="font-bold text-brand-700 w-4 text-center">{quantity}</span>
              <button
                onClick={onAdd}
                className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors flex items-center justify-center"
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
