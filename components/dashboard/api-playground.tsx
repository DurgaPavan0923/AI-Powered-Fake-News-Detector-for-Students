'use client';

import React, { useState } from 'react';
import { Key, Copy, Check, Terminal, Cpu, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApiPlayground() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeEndpoint, setActiveEndpoint] = useState<'analyze' | 'verify'>('analyze');

  const analyzeCommand = `curl -X POST https://ai-powered-fake-news-detector-for-s.vercel.app/api/analyze \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"text": "NASA Exoplanet Kepler-452b discovery details..."}'`;

  const verifyCommand = `curl -X POST https://ai-powered-fake-news-detector-for-s.vercel.app/api/verify \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"claim": "Global temperatures warming offset is 1.1C", "context": "Academic summary"}'`;

  const analyzeResponse = `{\n  "credibilityScore": 88,\n  "trustRating": "High",\n  "confidence": 92,\n  "biasSummary": "Minimal bias detected",\n  "claims": [\n    {\n      "claim": "NASA exoplanet habitable features",\n      "status": "Verified",\n      "evidenceStrength": 98\n    }\n  ]\n}`;

  const verifyResponse = `{\n  "claim": "Global temperatures warming offset is 1.1C",\n  "verified": true,\n  "consensusScore": 96,\n  "primarySource": "IPCC Assessment Report 6",\n  "contradictionsFound": 0\n}`;

  const handleCopy = (type: 'analyze' | 'verify') => {
    if (typeof window === 'undefined') return;
    const text = type === 'analyze' ? analyzeCommand : verifyCommand;
    navigator.clipboard.writeText(text);
    setCopied(type);
    confetti({ particleCount: 30, spread: 25 });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6 select-none max-w-3xl">
      
      <div className="space-y-1.5 text-left">
        <h2 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
          <Terminal className="h-4.5 w-4.5 text-cyan-400" /> Developer API Playground
        </h2>
        <p className="text-[10px] text-slate-500 font-semibold">Integrate FactLens verification pipelines directly inside external academic scripts</p>
      </div>

      {/* Endpoint Selector Tabs */}
      <div className="flex gap-2 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveEndpoint('analyze')}
          className={`pb-2 text-xs font-bold transition-all px-3 cursor-pointer border-b-2 ${
            activeEndpoint === 'analyze' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          POST /api/analyze
        </button>
        <button
          onClick={() => setActiveEndpoint('verify')}
          className={`pb-2 text-xs font-bold transition-all px-3 cursor-pointer border-b-2 ${
            activeEndpoint === 'verify' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          POST /api/verify
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Commands & Payloads */}
        <div className="lg:col-span-2 space-y-4 text-left">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
              <span>Sample cURL request</span>
              <button 
                onClick={() => handleCopy(activeEndpoint)}
                className="flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer"
              >
                {copied === activeEndpoint ? (
                  <>
                    <Check className="h-3 w-3 inline text-emerald-400" /> Copied!
                  </>
                ) : (
                  'Copy Code'
                )}
              </button>
            </div>
            <pre className="bg-black/60 p-4 border border-white/5 rounded-xl font-mono text-[9px] text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {activeEndpoint === 'analyze' ? analyzeCommand : verifyCommand}
            </pre>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 block">Response JSON</span>
            <pre className="bg-black/60 p-4 border border-white/5 rounded-xl font-mono text-[9px] text-emerald-400 leading-relaxed overflow-x-auto">
              {activeEndpoint === 'analyze' ? analyzeResponse : verifyResponse}
            </pre>
          </div>
        </div>

        {/* Right Column: Rate Limiting & BotID protection telemetry */}
        <div className="space-y-6 lg:border-l lg:border-white/5 lg:pl-6 text-left">
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" /> Bot Protection
            </h4>
            <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl space-y-1.5 text-[10px] text-slate-400 leading-normal font-semibold">
              <p>FactLens endpoints are protected by <strong>Vercel BotID</strong> web application firewalls and telemetry shields.</p>
              <p>All automated requests must supply an authorized User Session header to prevent rate injection.</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" /> Limits & Budget
            </h4>
            <div className="space-y-2 text-[10px] text-slate-500 font-bold uppercase tracking-wide">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Daily Token Limit</span>
                <span className="text-slate-300">50K tokens</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Rate Quota</span>
                <span className="text-slate-300">100 req / day</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Verification Guard</span>
                <span className="text-slate-300">Active Shield</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}