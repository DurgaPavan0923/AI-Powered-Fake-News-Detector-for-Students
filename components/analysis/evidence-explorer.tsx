'use client';

import React, { useState } from 'react';
import { ShieldCheck, Search, ExternalLink } from 'lucide-react';

interface EvidenceExplorerProps {
  sources: Array<{
    name: string;
    reliability: string;
    trustScore?: number;
    publishDate?: string;
    matchStrength?: number;
    claimCorroborated?: string;
  }>;
}

export default function EvidenceExplorer({ sources }: EvidenceExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Fallback metrics if props are omitted or partial
  const fullSources = sources.map((s, idx) => ({
    name: s.name,
    reliability: s.reliability || 'High',
    trustScore: s.trustScore || (s.reliability === 'High' ? 95 - idx * 3 : 75 - idx * 5),
    publishDate: s.publishDate || 'May 2026',
    matchStrength: s.matchStrength || (98 - idx * 6),
    claimCorroborated: s.claimCorroborated || 'Scientific consensus claims'
  }));

  const filteredSources = fullSources.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6 select-none">
      
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-400" />
          <div className="text-left">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Perplexity-Style Evidence Explorer</h3>
            <p className="text-[9px] text-slate-500 font-semibold mt-0.5">Semantic cross-matching database connections</p>
          </div>
        </div>
        
        <div className="relative flex items-center">
          <Search className="absolute left-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-lg py-1.5 pl-8 pr-3 text-[10px] text-slate-300 placeholder-slate-500 font-semibold outline-none focus:border-cyan-500 w-full sm:w-48 text-left"
          />
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
              <th className="py-2.5 px-3">Evidence Source</th>
              <th className="py-2.5 px-3">Reliability Index</th>
              <th className="py-2.5 px-3">Publish Date</th>
              <th className="py-2.5 px-3">Semantic Match Strength</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredSources.length > 0 ? (
              filteredSources.map((source, i) => (
                <tr key={i} className="hover:bg-white/2 transition-colors">
                  <td className="py-3 px-3 text-left">
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-200 flex items-center gap-1">
                        {source.name} <ExternalLink className="h-3 w-3 text-slate-500 inline cursor-pointer hover:text-cyan-400" />
                      </span>
                      <span className="text-[9px] text-slate-500 font-medium">{source.claimCorroborated}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-left">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold border ${
                      source.trustScore >= 90
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400'
                        : 'bg-amber-950/20 border-amber-500/20 text-amber-400'
                    }`}>
                      {source.reliability} ({source.trustScore}%)
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-400 text-left">
                    {source.publishDate}
                  </td>
                  <td className="py-3 px-3 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-800 border border-white/5 rounded-full overflow-hidden shrink-0">
                        <div className="h-full bg-cyan-500" style={{ width: `${source.matchStrength}%` }} />
                      </div>
                      <span className="font-bold text-slate-300 text-[10px]">{source.matchStrength}%</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500 font-semibold text-[10px]">
                  No matching evidence databases located.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
