'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAnalysisStore, AnalysisRecord } from '@/store/analysis.store';
import { FileText, Search, Trash2, ArrowUpRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function HistoryTable() {
  const { records, deleteRecord, toggleBookmark } = useAnalysisStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = records.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.trustRating.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-950/20 border-emerald-500/20';
    if (score >= 60) return 'text-cyan-400 bg-cyan-950/20 border-cyan-500/20';
    if (score >= 40) return 'text-amber-400 bg-amber-950/20 border-amber-500/20';
    return 'text-rose-400 bg-rose-950/20 border-rose-500/20';
  };

  return (
    <div className="space-y-4">
      {/* Search Filter Header */}
      <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-xl bg-slate-900/60 max-w-md">
        <Search className="h-4 w-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search by topic title or trust rating..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none text-xs text-slate-200 outline-none w-full placeholder-slate-500 font-semibold"
        />
      </div>

      {/* Table grid */}
      <div className="border border-white/10 rounded-2xl bg-slate-900/30 overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/2 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                <th className="py-4 px-6">Topic / Title</th>
                <th className="py-4 px-4 text-center">Score</th>
                <th className="py-4 px-4 text-center">Risk Factor</th>
                <th className="py-4 px-4 text-center">Input Source</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs font-semibold text-slate-500">
                    No analysis records match search criteria. Try another keyword.
                  </td>
                </tr>
              ) : (
                filtered.map((record) => (
                  <tr key={record.id} className="text-xs hover:bg-white/2 transition-colors">
                    
                    {/* Topic Title */}
                    <td className="py-4.5 px-6 max-w-sm">
                      <p className="font-extrabold text-slate-200 truncate">{record.title}</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">{record.date}</p>
                    </td>

                    {/* Score Gauge Badge */}
                    <td className="py-4.5 px-4 text-center">
                      <span className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md border ${getScoreColor(record.credibilityScore)}`}>
                        {record.credibilityScore} / 100
                      </span>
                    </td>

                    {/* Trust Rating Category */}
                    <td className="py-4.5 px-4 text-center">
                      <span className={`font-bold ${record.trustRating === 'High' ? 'text-emerald-400' : (record.trustRating === 'Low' ? 'text-rose-400' : 'text-amber-400')}`}>
                        {record.trustRating} Trust
                      </span>
                    </td>

                    {/* Input Source type */}
                    <td className="py-4.5 px-4 text-center uppercase text-[10px] font-bold text-slate-400">
                      {record.type}
                    </td>

                    {/* Actions column */}
                    <td className="py-4.5 px-6 text-right space-x-2">
                      <button 
                        onClick={() => toggleBookmark(record.id)}
                        className={`p-1.5 rounded-lg border hover:scale-105 transition-all cursor-pointer ${
                          record.bookmarked 
                            ? 'text-amber-400 bg-amber-950/20 border-amber-500/30' 
                            : 'text-slate-500 hover:text-slate-300 border-white/5 hover:bg-white/5'
                        }`}
                        title="Bookmark analysis"
                      >
                        ★
                      </button>
                      <Link 
                        href={`/analysis/${record.id}`}
                        className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-cyan-950/40 text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
                        title="Open Report detail"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <button 
                        onClick={() => deleteRecord(record.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-500/20 hover:scale-105 transition-all cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}