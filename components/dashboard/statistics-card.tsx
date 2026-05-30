import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export default function StatisticsCard({ title, value, change, isPositive, icon: Icon }: StatisticsCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg shadow-slate-950/20 flex justify-between items-start select-none">
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">{value}</h2>
        
        <div className="flex items-center gap-1.5">
          <span className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
            isPositive ? 'text-emerald-400 bg-emerald-950/30' : 'text-rose-400 bg-rose-950/30'
          }`}>
            {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {change}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">vs last month</span>
        </div>
      </div>
      
      <div className="rounded-xl bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 p-2.5 border border-cyan-500/20 text-cyan-400">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}