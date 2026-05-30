import React from 'react';
import { CheckCircle, AlertTriangle, HelpCircle, FileCheck, ExternalLink } from 'lucide-react';

interface Evidence {
  claim: string;
  entity: string;
  type: string;
  status: 'Verified' | 'Partially Verified' | 'Unverified' | 'False';
  explanation: string;
}

interface EvidenceCardProps {
  claims: Evidence[];
}

export default function EvidenceCard({ claims }: EvidenceCardProps) {
  const getStatusIcon = (status: Evidence['status']) => {
    switch (status) {
      case 'Verified': 
        return <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />;
      case 'Partially Verified': 
        return <HelpCircle className="h-5 w-5 text-amber-400 shrink-0" />;
      case 'Unverified': 
        return <HelpCircle className="h-5 w-5 text-slate-500 shrink-0" />;
      case 'False': 
        return <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />;
    }
  };

  const getStatusStyle = (status: Evidence['status']) => {
    switch (status) {
      case 'Verified': return 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300';
      case 'Partially Verified': return 'bg-amber-950/20 border-amber-500/20 text-amber-300';
      case 'Unverified': return 'bg-slate-900 border-white/5 text-slate-400';
      case 'False': return 'bg-rose-950/20 border-rose-500/20 text-rose-300';
    }
  };

  return (
    <div className="space-y-4">
      {claims.map((c, i) => (
        <div key={i} className={`p-5 rounded-xl border transition-all hover:scale-[1.005] ${getStatusStyle(c.status)}`}>
          <div className="flex items-start gap-4">
            {getStatusIcon(c.status)}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white/5 px-2.5 py-0.5 rounded-md">
                  {c.type}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Target Entity: <strong className="text-slate-200 font-extrabold">{c.entity}</strong>
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-200 leading-snug">"{c.claim}"</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed bg-black/10 p-3 rounded-lg border border-white/5">
                {c.explanation}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}