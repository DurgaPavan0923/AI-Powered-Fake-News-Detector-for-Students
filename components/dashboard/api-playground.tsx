'use client';

import React, { useState } from 'react';
import { Key, Copy, CheckCircle, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApiPlayground() {
  const [copied, setCopied] = useState(false);

  const curlCommand = `curl -X POST https://ai-powered-fake-news-detector-for-s.vercel.app/api/analyze \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"text": "NASA Exoplanet Kepler-452b discovery details..."}'`;

  const responseJson = `{
  "credibilityScore": 88,
  "fakeProbability": 12,
  "trustRating": "High",
  "consensusAgreement": 84,
  "claims": [
    {
      "claim": "NASA exoplanet habitable features",
      "status": "Verified",
      "entity": "NASA"
    }
  ]
}`;

  const handleCopy = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    confetti({ particleCount: 30, spread: 25 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6 select-none max-w-2xl">
      
      <div className="space-y-1">
        <h2 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
          <Terminal className="h-4.5 w-4.5 text-cyan-400" /> Developer API Playground
        </h2>
        <p className="text-[10px] text-slate-500 font-semibold">Integrate FactLens verification pipelines directly inside classroom apps</p>
      </div>

      {/* Curl snippet */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
          <span>Request Endpoint (POST)</span>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-cyan-400 hover:underline cursor-pointer"
          >
            <Copy className="h-3 w-3" /> {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        <pre className="bg-black/60 p-4 border border-white/5 rounded-xl font-mono text-[9px] text-slate-300 leading-relaxed overflow-x-auto">
          {curlCommand}
        </pre>
      </div>

      {/* Response snippet */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-400 block">Response payload (JSON)</span>
        <pre className="bg-black/60 p-4 border border-white/5 rounded-xl font-mono text-[9px] text-emerald-400 leading-relaxed overflow-x-auto">
          {responseJson}
        </pre>
      </div>

    </div>
  );
}