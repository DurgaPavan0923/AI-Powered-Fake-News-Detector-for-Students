import React from 'react';
import { Scale, Target, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ComparisonResult {
  titleA: string;
  scoreA: number;
  biasA: number;
  claimsA: number;
  titleB: string;
  scoreB: number;
  biasB: number;
  claimsB: number;
}

export default function ArticleComparison({ result }: { result: ComparisonResult }) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6 select-none max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-4">
        <Scale className="h-5 w-5 text-cyan-400" />
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Side-by-Side Comparison</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Document A */}
        <div className="p-6 rounded-xl border border-cyan-500/20 bg-slate-950/60 space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">Document A</span>
            <h4 className="text-xs font-bold text-slate-200 truncate">{result.titleA}</h4>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white/2 p-2.5 rounded border border-white/5">
              <span className="text-[9px] text-slate-500 font-bold block">Credibility</span>
              <span className="text-sm font-extrabold text-cyan-400 mt-1 block">{result.scoreA}%</span>
            </div>
            <div className="bg-white/2 p-2.5 rounded border border-white/5">
              <span className="text-[9px] text-slate-500 font-bold block">Bias Slant</span>
              <span className="text-sm font-extrabold text-slate-300 mt-1 block">{result.biasA}%</span>
            </div>
            <div className="bg-white/2 p-2.5 rounded border border-white/5">
              <span className="text-[9px] text-slate-500 font-bold block">Claims</span>
              <span className="text-sm font-extrabold text-slate-300 mt-1 block">{result.claimsA}</span>
            </div>
          </div>
        </div>

        {/* Document B */}
        <div className="p-6 rounded-xl border border-indigo-500/20 bg-slate-950/60 space-y-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400">Document B</span>
            <h4 className="text-xs font-bold text-slate-200 truncate">{result.titleB}</h4>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white/2 p-2.5 rounded border border-white/5">
              <span className="text-[9px] text-slate-500 font-bold block">Credibility</span>
              <span className="text-sm font-extrabold text-indigo-400 mt-1 block">{result.scoreB}%</span>
            </div>
            <div className="bg-white/2 p-2.5 rounded border border-white/5">
              <span className="text-[9px] text-slate-500 font-bold block">Bias Slant</span>
              <span className="text-sm font-extrabold text-slate-300 mt-1 block">{result.biasB}%</span>
            </div>
            <div className="bg-white/2 p-2.5 rounded border border-white/5">
              <span className="text-[9px] text-slate-500 font-bold block">Claims</span>
              <span className="text-sm font-extrabold text-slate-300 mt-1 block">{result.claimsB}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Comparative Insight Card */}
      <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-2 text-xs">
        <span className="text-[10px] font-extrabold text-slate-200 block uppercase tracking-wider flex items-center gap-1.5">
          <Target className="h-4 w-4 text-cyan-400" /> Comparison AI Diagnosis
        </span>
        <p className="text-slate-400 leading-relaxed font-semibold">
          {result.scoreA > result.scoreB ? (
            `Document A exhibits higher structural credibility ({result.scoreA}% vs {result.scoreB}%). Document B contains multiple uncorroborated assertions and has a higher emotional bias slant ({result.biasB}%).`
          ) : (
            `Document B exhibits higher structural credibility ({result.scoreB}% vs {result.scoreA}%). Document A contains multiple uncorroborated assertions and has a higher emotional bias slant ({result.biasA}%).`
          )}
        </p>
      </div>

    </div>
  );
}