import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AIInsights() {
  return (
    <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/15 via-slate-900 to-slate-900 shadow-xl relative overflow-hidden select-none">
      {/* Visual background lights */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
      
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 shrink-0">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">🤖 AI Insight Summary</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            Your recent workspace checks show highly credible findings in **Science** (82% avg credibility). However, **Health-related** queries exhibit the highest misinformation rates this week, with 2 suspicious sources flagged.
          </p>
          <div className="text-[10px] font-bold text-cyan-400 flex items-center gap-1.5 bg-cyan-950/40 border border-cyan-500/15 px-3 py-1.5 rounded-lg w-fit max-w-full">
            💡 Recommended: Cross-reference health claims against American Diabetes Whitelists.
          </div>
        </div>
      </div>
    </div>
  );
}