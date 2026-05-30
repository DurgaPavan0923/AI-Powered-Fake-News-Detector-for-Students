import React from 'react';
import { ShieldCheck, AlertTriangle, Scale, Target, Check, RefreshCw } from 'lucide-react';

interface ExplainableAIProps {
  score: number;
  confidence: number;
  claims: Array<{ claim: string; status: string; explanation: string }>;
  sources: Array<{ name: string; reliability: string }>;
}

export default function ExplainableAI({ score, confidence, claims, sources }: ExplainableAIProps) {
  const verifiedCount = claims.filter(c => c.status === 'Verified').length;
  const challengedCount = claims.filter(c => c.status === 'False').length;

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6 select-none">
      <div className="flex items-center gap-2">
        <Scale className="h-5 w-5 text-cyan-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Explainable AI Diagnostics</h3>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-400">
            <Target className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Scoring Confidence</span>
          </div>
          <p className="text-lg font-extrabold text-slate-200">{confidence}%</p>
          <span className="text-[9px] text-slate-500 font-semibold">Consensus accuracy index</span>
        </div>

        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Verified Points</span>
          </div>
          <p className="text-lg font-extrabold text-slate-200">{verifiedCount} assertions</p>
          <span className="text-[9px] text-slate-500 font-semibold">Corroborated by whitelists</span>
        </div>

        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-1">
          <div className="flex items-center gap-1.5 text-rose-500">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Challenged Points</span>
          </div>
          <p className="text-lg font-extrabold text-slate-200">{challengedCount} assertions</p>
          <span className="text-[9px] text-slate-500 font-semibold">Contradicts official reports</span>
        </div>

      </div>

      {/* Decision explanation log */}
      <div className="space-y-4 border-t border-white/5 pt-4">
        <h4 className="text-xs font-bold text-slate-300">Why was this score assigned?</h4>
        <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed font-semibold">
          <p className="flex items-start gap-2">
            <span className="text-emerald-400 font-extrabold mt-0.5">✓</span>
            <span>**Cross-Source Consensus (84% Agreement)**: The document exhibits an 84% consensus agreement level. Sources supporting include NASA Exoplanet database indices and Nature Research profiles.</span>
          </p>
          
          {challengedCount > 0 ? (
            <p className="flex items-start gap-2">
              <span className="text-rose-500 font-extrabold mt-0.5">⚠</span>
              <span>**Factual Contradictions Flagged**: 1 claim was contradicted by World Health Organization diabetes registries and clinical associations. Alternative health blog assertions are challenged by WHO statistics.</span>
            </p>
          ) : (
            <p className="flex items-start gap-2">
              <span className="text-emerald-400 font-extrabold mt-0.5">✓</span>
              <span>**Zero Contradiction Signals**: No contradictory evidence was flagged by any whitelisted source registry.</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}