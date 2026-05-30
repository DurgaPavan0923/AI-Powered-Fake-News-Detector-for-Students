'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useAnalysisStore } from '@/store/analysis.store';
import StatisticsCard from '@/components/dashboard/statistics-card';
import TopicTrends from '@/components/dashboard/topic-trends';
import HistoryTable from '@/components/dashboard/history-table';
import AIInsights from '@/components/dashboard/ai-insights';
import GraphPreview from '@/components/graph/graph-preview';
import SourceRankings from '@/components/dashboard/source-rankings';
import { FileSearch, Activity, ThumbsUp, AlertTriangle, TrendingUp } from 'lucide-react';

export default function DashboardIndex() {
  const { user } = useAuthStore();
  const { records } = useAnalysisStore();

  const totalAnalyzed = records.length;
  const avgCredibility = records.length > 0 
    ? Math.round(records.reduce((acc, r) => acc + r.credibilityScore, 0) / records.length) 
    : 0;
  const highRisk = records.filter(r => r.credibilityScore < 50).length;
  const verifiedRate = records.length > 0
    ? Math.round((records.filter(r => r.trustRating === 'High').length / records.length) * 100)
    : 0;

  // Custom upgraded top analyzed topics list with extra parameters
  const TRENDING_TOPICS = [
    { topic: 'Kepler-452b Habitable Planets', trend: '▲ 18%', mentions: 124, risk: 'Low', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20' },
    { topic: 'Alternative Diabetes Herbal Tea Cures', trend: '▲ 45%', mentions: 98, risk: 'High', color: 'text-rose-400 border-rose-500/20 bg-rose-950/20' },
    { topic: 'Weekly CO2 Atmospheric Peaks', trend: '▼ 3%', mentions: 82, risk: 'Low', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header Greeting */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Student Workspace</h1>
        <p className="text-xs text-slate-400 font-medium">
          Welcome back, <strong className="text-slate-200">{user?.name || 'Researcher'}</strong>. Explore digital media integrity metrics.
        </p>
      </div>

      {/* AI Insights Card */}
      <AIInsights />

      {/* Numerical Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard 
          title="Total Analyzed" 
          value={totalAnalyzed} 
          change="+18%" 
          isPositive={true} 
          icon={FileSearch} 
        />
        <StatisticsCard 
          title="Average Credibility" 
          value={`${avgCredibility}%`} 
          change="+3.4%" 
          isPositive={true} 
          icon={Activity} 
        />
        <StatisticsCard 
          title="Verification Index" 
          value={`${verifiedRate}%`} 
          change="+5.1%" 
          isPositive={true} 
          icon={ThumbsUp} 
        />
        <StatisticsCard 
          title="Flagged High Risk" 
          value={highRisk} 
          change="+12%" 
          isPositive={false} 
          icon={AlertTriangle} 
        />
      </div>

      {/* Main dashboard content grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns (Table & Previews) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider">Recent Analyses</h3>
            <HistoryTable />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GraphPreview />
            <SourceRankings />
          </div>
        </div>

        {/* Right Columns (Trends & Rankings) */}
        <div className="space-y-6">
          
          {/* Top Analyzed Topics widget */}
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Analyzed Topics</h3>
            </div>
            
            <div className="space-y-3.5 select-none">
              {TRENDING_TOPICS.map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-extrabold text-slate-200 max-w-[150px] leading-tight">{t.topic}</span>
                    <span className="text-[10px] font-bold text-cyan-400">{t.trend}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold border-t border-white/5 pt-2">
                    <span>Mentions: <strong className="text-slate-300">{t.mentions}</strong></span>
                    <span className={`px-2 py-0.5 rounded border uppercase ${t.color}`}>
                      {t.risk} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}