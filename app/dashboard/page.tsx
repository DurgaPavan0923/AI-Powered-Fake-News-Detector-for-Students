'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useAnalysisStore } from '@/store/analysis.store';
import StatisticsCard from '@/components/dashboard/statistics-card';
import TopicTrends from '@/components/dashboard/topic-trends';
import HistoryTable from '@/components/dashboard/history-table';
import { FileSearch, Activity, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function DashboardIndex() {
  const { user } = useAuthStore();
  const { records } = useAnalysisStore();

  // Statistics summaries
  const totalAnalyzed = records.length;
  const avgCredibility = records.length > 0 
    ? Math.round(records.reduce((acc, r) => acc + r.credibilityScore, 0) / records.length) 
    : 0;
  const highRisk = records.filter(r => r.credibilityScore < 50).length;
  const verifiedRate = records.length > 0
    ? Math.round((records.filter(r => r.trustRating === 'High').length / records.length) * 100)
    : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Title greeting segment */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Student Workspace</h1>
        <p className="text-xs text-slate-400 font-medium">
          Welcome back, <strong className="text-slate-200">{user?.name || 'Researcher'}</strong>. Explore digital media integrity metrics.
        </p>
      </div>

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

      {/* Trends & Charts grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Quick history preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider">Recent Analyses</h3>
            </div>
            <HistoryTable />
          </div>
        </div>

        <div>
          {/* Topics trend column */}
          <TopicTrends />
        </div>
      </div>

    </div>
  );
}