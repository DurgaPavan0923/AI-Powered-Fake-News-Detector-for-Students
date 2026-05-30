'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

const HISTORICAL_DATA = [
  { name: 'Mon', analyses: 4, score: 72 },
  { name: 'Tue', analyses: 6, score: 85 },
  { name: 'Wed', analyses: 3, score: 92 },
  { name: 'Thu', analyses: 8, score: 68 },
  { name: 'Fri', analyses: 5, score: 78 },
  { name: 'Sat', analyses: 2, score: 88 },
  { name: 'Sun', analyses: 1, score: 90 }
];

const CATEGORY_DATA = [
  { name: 'Scientific', count: 18, color: '#06b6d4' },
  { name: 'Political', count: 12, color: '#6366f1' },
  { name: 'Medical', count: 8, color: '#f43f5e' },
  { name: 'Financial', count: 5, color: '#10b981' }
];

export default function AnalyticsChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Line Chart */}
      <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Credibility Trend (Last 7 Days)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HISTORICAL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold' }}
                itemStyle={{ fontSize: '12px', color: '#38bdf8' }}
              />
              <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2.5} activeDot={{ r: 6 }} name="Credibility Index" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Analysis Distribution by Category</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CATEGORY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Analyses Count">
                {CATEGORY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}