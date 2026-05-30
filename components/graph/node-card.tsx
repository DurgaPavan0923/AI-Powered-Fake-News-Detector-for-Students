import React from 'react';
import { Info, Network, AlertCircle } from 'lucide-react';

interface NodeDetails {
  label: string;
  type: string;
  description: string;
}

interface NodeCardProps {
  node: NodeDetails | null;
}

export default function NodeCard({ node }: NodeCardProps) {
  if (!node) {
    return (
      <div className="border border-white/10 rounded-2xl bg-slate-900/60 p-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
        <Network className="h-8 w-8 text-slate-600 mb-3" />
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          Select an entity or claim in the Knowledge Graph to view extraction mapping details.
        </p>
      </div>
    );
  }

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'article': return 'bg-indigo-950 text-indigo-300 border-indigo-500/30';
      case 'claim': return 'bg-amber-950 text-amber-300 border-amber-500/30';
      case 'entity': return 'bg-purple-950 text-purple-300 border-purple-500/30';
      case 'source': return 'bg-cyan-950 text-cyan-300 border-cyan-500/30';
      default: return 'bg-slate-800 text-slate-300 border-white/10';
    }
  };

  return (
    <div className="border border-white/10 rounded-2xl bg-slate-900/60 p-5 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border ${getTypeStyle(node.type)}`}>
          {node.type}
        </span>
        <div className="flex items-center gap-1 text-slate-500">
          <Info className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-sm font-extrabold text-slate-200">{node.label}</h4>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed bg-black/15 p-3 rounded-lg border border-white/5">
        {node.description}
      </p>

      <div className="flex items-start gap-2 text-[10px] text-slate-500 leading-normal">
        <AlertCircle className="h-3.5 w-3.5 text-slate-600 shrink-0 mt-0.5" />
        <span>Nodes represent claims or elements verified via Gemini RAG pipeline. Connections are synced to AuraDB database records.</span>
      </div>
    </div>
  );
}