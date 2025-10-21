'use client';

import { useState, useMemo, useEffect } from 'react';

type Transaction = {
  id: string;
  date: string;
  amount: number;
  description?: string;
  category?: string;
};

type Props = {
  items: Transaction[];
  simulateLoadingMs?: number;
};

export default function TransactionsList({ items, simulateLoadingMs = 500 }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, simulateLoadingMs);
    return () => clearTimeout(timer);
  }, [simulateLoadingMs]);

  const filteredItems = useMemo(() => {
    try {
      return items
        .filter((t) => {
          const matchesSearch = t.description?.toLowerCase().includes(search.toLowerCase()) ?? false;
          const matchesCategory = category ? t.category === category : true;
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          if (sortBy === 'date') {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return b.amount - a.amount;
        });
    } catch {
      setError(true);
      return [];
    }
  }, [items, search, category, sortBy]);

  return (
    <section className="p-4" aria-label="list of transactions">
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Filter by description"
          className="border p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Sort by category"
          className="border p-2 rounded"
        >
          <option value="">All categories</option>
          {[...new Set(items.map((t) => t.category))].map((cat) =>
            cat ? <option key={cat} value={cat}>{cat}</option> : null
          )}
        </select>

        <div role="group" aria-label="Sort by" className="flex gap-2">
          <button
            onClick={() => setSortBy('date')}
            className={`border px-3 py-1 rounded ${sortBy === 'date' ? 'bg-blue-500 text-white' : ''}`}
          >
            Date
          </button>
          <button
            onClick={() => setSortBy('amount')}
            className={`border px-3 py-1 rounded ${sortBy === 'amount' ? 'bg-blue-500 text-white' : ''}`}
          >
            Price
          </button>
        </div>
      </div>

      {loading && <p role="status" aria-live="polite">Loading transactions...</p>}
      {error && <p role="alert">Error processing transactions</p>}
      {!loading && filteredItems.length === 0 && (
        <p role="status" aria-live="polite">No items available</p>
      )}
      {!loading && filteredItems.length > 0 && (
        <ul role="list" className="space-y-2">
          {filteredItems.map((t) => (
            <li key={t.id} role="listitem" className="flex justify-between border p-3 rounded">
              <div className="text-sm">
                <div className="font-medium">{t.description ?? 'Transacción'}</div>
                <div className="text-xs text-muted-foreground">{t.date}</div>
              </div>
              <div className="font-semibold">{t.amount}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}