'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { useAuthStore } from '@/store/auth.store';
import { TRUSTED_SOURCES } from '@/lib/constants';
import { PlusCircle, Globe, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminSourcesPage() {
  const { user } = useAuthStore();
  const [sources, setSources] = useState(TRUSTED_SOURCES);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('Academic Research');
  const [trust, setTrust] = useState<'High' | 'Medium' | 'Low'>('High');

  if (user?.role !== 'Admin') {
    return <div className="p-12 text-center text-slate-400 text-xs">Access Denied.</div>;
  }

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !domain) return;
    
    setSources(prev => [
      { name, domain, category, trustRating: trust },
      ...prev
    ]);
    
    confetti({ particleCount: 50, spread: 30 });
    setName('');
    setDomain('');
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Admin Hub', href: '/admin' }, { name: 'Sources Library' }]} />
      
      <div className="space-y-8 max-w-4xl select-none">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Whitelisted Domains</h1>
          <p className="text-xs text-slate-400">Configure trustworthy databases for automated RAG cross-references</p>
        </div>

        {/* Add Source form */}
        <form onSubmit={handleAddSource} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Source Name</label>
            <input type="text" placeholder="Science Hub" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Web Domain</label>
            <input type="text" placeholder="sciencehub.org" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold">
              <option value="Academic Journal">Academic Journal</option>
              <option value="Government & Space">Government & Space</option>
              <option value="Global Health">Global Health</option>
              <option value="Fact Checking">Fact Checking</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1">
            <PlusCircle className="h-4 w-4" /> Whitelist
          </button>
        </form>

        {/* List of sources */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sources.map((s, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-extrabold text-slate-200">{s.name}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">{s.domain} • {s.category}</p>
              </div>
              <span className="flex items-center gap-0.5 text-[9px] font-extrabold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/20 border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3" /> whitelisted
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}