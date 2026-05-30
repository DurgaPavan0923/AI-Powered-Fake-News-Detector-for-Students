'use client';

import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Legend
} from 'recharts';

const RISK_DATA = [
  { name: 'Low Risk', count: 18, color: '#10b981' },
  { name: 'Medium Risk', count: 12, color: '#f59e0b' },
  { name: 'High Risk', count: 5, color: '#f43f5e' }
];

const CATEGORY_DATA = [
  { name: 'Science', value: 45, color: '#06b6d4' },
  { name: 'Politics', value: 20, color: '#6366f1' },
  { name: 'Health', value: 15, color: '#f43f5e' },
  { name: 'Tech', value: 20, color: '#10b981' }
];

export default function AnalyticsChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 select-none">
      
      {/* Risk Distribution Bar Chart */}
      <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Risk Level Distribution</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RISK_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Analyses">
                {RISK_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Distribution Pie Chart */}
      <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Topic Distribution (%)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CATEGORY_DATA}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {CATEGORY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36} iconSize={10} formatter={(value) => <span className="text-[10px] font-bold text-slate-400">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}