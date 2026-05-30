'use client';

import React from 'react';
import Link from 'next/link';
import { useAnalysisStore } from '@/store/analysis.store';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Bookmark, ArrowUpRight } from 'lucide-react';

export default function BookmarksPage() {
  const { records } = useAnalysisStore();
  const bookmarked = records.filter(r => r.bookmarked);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Bookmarks' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Saved Bookmarks</h1>
          <p className="text-xs text-slate-400">Pinned credibility evaluations and fact networks</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarked.length === 0 ? (
            <div className="col-span-full border border-white/5 rounded-2xl p-12 text-center text-xs text-slate-500 font-semibold bg-slate-900/40">
              <Bookmark className="h-8 w-8 text-slate-700 mx-auto mb-3" />
              No bookmarked analyses found. Star reports in the History Log to view them here.
            </div>
          ) : (
            bookmarked.map((r) => (
              <div key={r.id} className="p-6 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    r.credibilityScore >= 80 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20' : 'text-rose-400 border-rose-500/20 bg-rose-950/20'
                  }`}>
                    Score: {r.credibilityScore}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-200 line-clamp-2 leading-snug">{r.title}</h4>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-[10px] text-slate-500 font-medium">{r.date}</span>
                  <Link 
                    href={`/analysis/${r.id}`}
                    className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:underline cursor-pointer"
                  >
                    Open Report
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}