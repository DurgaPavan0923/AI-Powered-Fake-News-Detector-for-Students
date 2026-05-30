import React from 'react';
import { Award, ShieldAlert } from 'lucide-react';

const RANKINGS = [
  { name: 'NASA Science Archives', domain: 'nasa.gov', score: 98 },
  { name: 'World Health Organization', domain: 'who.int', score: 95 },
  { name: 'Nature Publishing Group', domain: 'nature.com', score: 94 },
  { name: 'FactCheck.org', domain: 'factcheck.org', score: 92 },
  { name: 'Reuters Fact Checking', domain: 'reuters.com', score: 91 }
];

export default function SourceRankings() {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-cyan-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Whitelisted Sources</h3>
      </div>
      
      <div className="space-y-3 select-none">
        {RANKINGS.map((src, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold text-slate-200">{i + 1}. {src.name}</span>
              <p className="text-[9px] text-slate-500 font-semibold">{src.domain}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-2 py-0.5 rounded">
                {src.score}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}