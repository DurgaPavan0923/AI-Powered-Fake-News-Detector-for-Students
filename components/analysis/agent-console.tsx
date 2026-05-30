'use client';

import React, { useState } from 'react';
import { Terminal, Shield, Eye, Database, HelpCircle } from 'lucide-react';

interface AgentConsoleProps {
  score: number;
}

export default function AgentConsole({ score }: AgentConsoleProps) {
  const [activeAgent, setActiveAgent] = useState<'claim' | 'evidence' | 'bias' | 'consensus'>('claim');

  const logs = {
    claim: [
      '[ClaimAgent] Loading document payload metrics...',
      '[ClaimAgent] Scanning sentence structure tags...',
      '[ClaimAgent] Isolated Claim A: "NASA confirmed exoplanet Kepler-452b in 2025" (Entity: NASA)',
      '[ClaimAgent] Isolated Claim B: "Colony will be established by 2028" (Entity: SpaceX / NASA)',
      '[ClaimAgent] Finished. Exporting isolated entities schema to EvidenceAgent.'
    ],
    evidence: [
      '[EvidenceAgent] Initializing whitelisted database consults...',
      '[EvidenceAgent] Querying exoplanets.nasa.gov archive indices...',
      '[EvidenceAgent] Result: Match found (Score: 98% confidence). Corroborated Kepler-452b metrics.',
      '[EvidenceAgent] Querying Mars logistics and starship test records...',
      '[EvidenceAgent] Result: No scientific flight logs corroborating colonizing timelines by 2028.'
    ],
    bias: [
      '[BiasAgent] Initiating style syntax diagnostics...',
      '[BiasAgent] Clickbait Headline Index: 25% (Low sensational rating)',
      '[BiasAgent] Emotional trigger rate: 15% (Neutral objective wording)',
      '[BiasAgent] Political partisanship: 5% (Objective scientific focus)',
      '[BiasAgent] Report finalized. Styling score output: mostly factual.'
    ],
    consensus: [
      '[ConsensusAgent] Compiling Agent ledger consensus rates...',
      '[ConsensusAgent] Claim A: 100% agreement across 3 journals.',
      '[ConsensusAgent] Claim B: 30% agreement (exaggerated timelines challenged).',
      '[ConsensusAgent] Cross-Source Consensus Rating: 84% support level.',
      '[ConsensusAgent] Emitting final credibility score matrix.'
    ]
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <Terminal className="h-5 w-5 text-cyan-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Multi-Agent Execution Logs</h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1.5">
        {(['claim', 'evidence', 'bias', 'consensus'] as const).map(agent => (
          <button
            key={agent}
            onClick={() => setActiveAgent(agent)}
            className={`px-3 py-1.5 rounded text-[10px] font-bold border transition-colors cursor-pointer capitalize ${
              activeAgent === agent ? 'border-cyan-500/20 bg-cyan-950/20 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {agent} Agent
          </button>
        ))}
      </div>

      {/* Terminal View */}
      <div className="bg-black/60 rounded-xl p-4 border border-white/5 font-mono text-[10px] text-emerald-400 space-y-1.5 min-h-[120px] max-h-48 overflow-y-auto">
        {logs[activeAgent].map((log, idx) => (
          <div key={idx} className="leading-relaxed">
            <span className="text-slate-600 font-extrabold">&gt;</span> {log}
          </div>
        ))}
      </div>

    </div>
  );
}