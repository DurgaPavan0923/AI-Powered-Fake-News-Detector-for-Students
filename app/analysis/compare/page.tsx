'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import ArticleComparison from '@/components/analysis/article-comparison';
import { Scale, Play, Loader } from 'lucide-react';

export default function ArticleComparePage() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [comparing, setComparing] = useState(false);
  
  const [comparisonResult, setComparisonResult] = useState<any | null>(null);

  const handleCompareSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textA || !textB) return;
    setComparing(true);
    setComparisonResult(null);

    await new Promise(r => setTimeout(r, 2000));

    setComparisonResult({
      titleA: textA.slice(0, 30) + '...',
      scoreA: 85,
      biasA: 15,
      claimsA: 3,
      titleB: textB.slice(0, 30) + '...',
      scoreB: 48,
      biasB: 68,
      claimsB: 5
    });
    setComparing(false);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      <Breadcrumbs items={[{ name: 'Compare Articles' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Compare Articles</h1>
          <p className="text-xs text-slate-400">Run comparative side-by-side diagnostics on multiple text drafts</p>
        </div>

        {comparing ? (
          <div className="p-12 text-center border border-white/10 rounded-2xl bg-slate-900/60 max-w-lg mx-auto flex flex-col items-center justify-center space-y-4">
            <Loader className="h-8 w-8 text-cyan-400 animate-spin" />
            <span className="text-xs font-bold text-slate-300">Comparing Document Matrices...</span>
          </div>
        ) : comparisonResult ? (
          <div className="space-y-6">
            <ArticleComparison result={comparisonResult} />
            <div className="text-center">
              <button 
                onClick={() => setComparisonResult(null)}
                className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold transition-all cursor-pointer"
              >
                Compare New Articles
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCompareSubmit} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Document A Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Document A Text Content</label>
                <textarea 
                  rows={8}
                  placeholder="Paste first draft here..."
                  value={textA}
                  onChange={(e) => setTextA(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold resize-none"
                  required
                />
              </div>

              {/* Document B Input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Document B Text Content</label>
                <textarea 
                  rows={8}
                  placeholder="Paste second draft to compare against..."
                  value={textB}
                  onChange={(e) => setTextB(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold resize-none"
                  required
                />
              </div>

            </div>

            <button 
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Scale className="h-4 w-4" /> Compare Documents
            </button>
          </form>
        )}
      </div>
    </div>
  );
}