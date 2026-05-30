import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

const TRENDS = [
  { topic: 'Kepler-452b Habitable Planets', count: 124, score: 88, status: 'Credible' },
  { topic: 'Alternative Diabetes Herbal Tea Cures', count: 98, score: 45, status: 'Suspicious' },
  { topic: 'Weekly CO2 Atmospheric Peaks', count: 82, score: 92, status: 'Credible' },
  { topic: 'Artemis Mars Colonization Timelines', count: 64, score: 68, status: 'Mixed' }
];

export default function TopicTrends() {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-cyan-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Analyzed Topics</h3>
      </div>
      
      <div className="space-y-3">
        {TRENDS.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/2 border border-white/5">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-200">{t.topic}</span>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                <span>{t.count} student requests</span>
                <span>•</span>
                <span className={`font-bold ${
                  t.status === 'Credible' ? 'text-emerald-400' : (t.status === 'Suspicious' ? 'text-rose-400' : 'text-amber-400')
                }`}>
                  {t.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-slate-200">{t.score}%</span>
              <span className="text-[9px] text-slate-500 font-bold block mt-0.5">Trust rating</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}