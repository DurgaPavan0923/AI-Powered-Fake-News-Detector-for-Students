'use client';

import React, { useEffect, useState } from 'react';
import { Search, Loader } from 'lucide-react';
import { useAnalysisStore } from '@/store/analysis.store';
import Link from 'next/link';

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { records } = useAnalysisStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = query.trim() === '' ? [] : records.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) || 
    r.claims.some(c => c.claim.toLowerCase().includes(query.toLowerCase()))
  );

  if (!open) return (
    <button 
      onClick={() => setOpen(true)}
      className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 text-xs font-semibold transition-all select-none cursor-pointer"
    >
      <Search className="h-4 w-4 text-slate-500" />
      <span>Search workspace...</span>
      <kbd className="bg-slate-800 text-[10px] text-slate-500 border border-white/5 px-1.5 py-0.5 rounded font-mono">Ctrl+K</kbd>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[350px]">
        {/* Search Input bar */}
        <div className="flex items-center gap-3 p-4 border-b border-white/5">
          <Search className="h-4.5 w-4.5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Type keywords to search reports, claims, or citations..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-xs text-slate-200 font-semibold"
            autoFocus
          />
          <button 
            onClick={() => { setOpen(false); setQuery(''); }}
            className="text-[10px] font-bold text-slate-500 hover:text-slate-300 border border-white/5 px-2 py-1 rounded bg-slate-950/60 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-[11px] text-slate-500 font-semibold">
              Type above to search active directories.
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-[11px] text-slate-500 font-semibold">
              No matching records found.
            </div>
          ) : (
            results.map(r => (
              <Link 
                key={r.id} 
                href={`/analysis/${r.id}`}
                onClick={() => { setOpen(false); setQuery(''); }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/5 text-left"
              >
                <div className="space-y-0.5 max-w-[80%]">
                  <span className="text-xs font-extrabold text-slate-200 truncate block">{r.title}</span>
                  <p className="text-[9px] text-slate-500 font-semibold">{r.date}</p>
                </div>
                <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded">
                  Score: {r.credibilityScore}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}