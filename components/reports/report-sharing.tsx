'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReportSharing() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    confetti({ particleCount: 30, spread: 25 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 rounded-xl border border-white/10 bg-slate-900/60 flex items-center justify-between select-none">
      <div className="space-y-0.5">
        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Share2 className="h-4 w-4 text-cyan-400" /> Share Report Portfolio
        </span>
        <p className="text-[10px] text-slate-500 font-semibold">Allow classmates or educators to inspect this fact-checking verification.</p>
      </div>

      <button 
        onClick={handleCopyLink}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
          copied 
            ? 'border-emerald-500/25 bg-emerald-950/20 text-emerald-400' 
            : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-200'
        }`}
      >
        <LinkIcon className="h-3.5 w-3.5" /> {copied ? 'Copied URL!' : 'Copy Public URL'}
      </button>
    </div>
  );
}