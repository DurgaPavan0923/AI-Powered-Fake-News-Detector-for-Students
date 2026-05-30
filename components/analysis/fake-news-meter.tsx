'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface FakeNewsMeterProps {
  probability: number;
}

export default function FakeNewsMeter({ probability }: FakeNewsMeterProps) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg shadow-slate-950/40">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fake Probability</h3>
        <div className="flex items-center gap-1.5">
          {probability >= 50 ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 px-2 py-0.5 rounded-md bg-rose-950/30">
              <AlertTriangle className="h-3 w-3" /> High Risk
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-950/30">
              <ShieldCheck className="h-3 w-3" /> Safe Content
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-white/5">
        {/* Fill bar */}
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-1000 ease-out" 
          style={{ width: `${probability}%` }}
        />
        {/* Visual Needle / Handle marker at edge of fill */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-xl transition-all duration-1000 ease-out"
          style={{ left: `calc(${probability}% - 2px)` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-2.5">
        <span>0% (Factual)</span>
        <span className="text-slate-300 font-extrabold text-xs">{probability}%</span>
        <span>100% (Fabricated)</span>
      </div>

      <p className="text-slate-400 text-xs mt-3.5 leading-relaxed">
        Calculated using style metrics, emotional charge frequency, cross-referenced databases, and source integrity indexing.
      </p>
    </div>
  );
}