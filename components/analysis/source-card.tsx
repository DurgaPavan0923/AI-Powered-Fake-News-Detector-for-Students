import React from 'react';
import { ExternalLink, Award } from 'lucide-react';

interface Source {
  name: string;
  url: string;
  category: string;
  reliability: 'Low' | 'Medium' | 'High';
}

interface SourceCardProps {
  sources: Source[];
}

export default function SourceCard({ sources }: SourceCardProps) {
  const getReliabilityColor = (rel: Source['reliability']) => {
    switch (rel) {
      case 'High': return 'text-emerald-400 bg-emerald-950/30 border-emerald-500/20';
      case 'Medium': return 'text-amber-400 bg-amber-950/30 border-amber-500/20';
      case 'Low': return 'text-rose-500 bg-rose-950/30 border-rose-500/20';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sources.map((s, i) => (
        <div key={i} className="p-5 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-0.5 bg-white/5 rounded">
                {s.category}
              </span>
              <span className={`text-[10px] font-extrabold px-2 py-0.5 border rounded-full ${getReliabilityColor(s.reliability)}`}>
                {s.reliability} Trust
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-cyan-400" />
              <h4 className="text-sm font-extrabold text-slate-200 truncate">{s.name}</h4>
            </div>
          </div>

          <a 
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 hover:underline mt-4 transition-colors cursor-pointer"
          >
            Go to Source Library
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      ))}
    </div>
  );
}