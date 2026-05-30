'use client';

import React from 'react';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { useAuthStore } from '@/store/auth.store';
import { Key, DollarSign, Database, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const COST_DATA = [
  { name: 'May 24', tokens: 120, cost: 0.18 },
  { name: 'May 25', tokens: 180, cost: 0.27 },
  { name: 'May 26', tokens: 150, cost: 0.22 },
  { name: 'May 27', tokens: 280, cost: 0.42 },
  { name: 'May 28', tokens: 320, cost: 0.48 },
  { name: 'May 29', tokens: 410, cost: 0.61 },
  { name: 'May 30', tokens: 480, cost: 0.72 }
];

export default function AdminAnalyticsPage() {
  const { user } = useAuthStore();

  if (user?.role !== 'Admin') {
    return <div className="p-12 text-center text-slate-400 text-xs">Access Denied.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      <Breadcrumbs items={[{ name: 'Admin Hub', href: '/admin' }, { name: 'Usage Telemetry' }]} />
      
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">AI Cost Dashboard</h1>
          <p className="text-xs text-slate-400">Track API token transactions, Gemini budgets, and rate quotas</p>
        </div>

        {/* Cost metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Accumulated Cost</span>
              <h2 className="text-2xl font-extrabold text-emerald-400 font-mono">$2.90 USD</h2>
              <span className="text-[9px] text-slate-500 font-semibold block">Monthly Gemini budget cap: $50.00</span>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20"><DollarSign className="h-5 w-5" /></div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Tokens</span>
              <h2 className="text-2xl font-extrabold text-cyan-400 font-mono">1.93M tokens</h2>
              <span className="text-[9px] text-slate-500 font-semibold block">Includes prompt context blocks</span>
            </div>
            <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 border border-cyan-500/20"><Database className="h-5 w-5" /></div>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Quota Limits</span>
              <h2 className="text-2xl font-extrabold text-indigo-400 font-mono">15 requests/min</h2>
              <span className="text-[9px] text-slate-500 font-semibold block">Active tier: Gemini free trial</span>
            </div>
            <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-400 border border-indigo-500/20"><Activity className="h-5 w-5" /></div>
          </div>
        </div>

        {/* Cost curves AreaChart */}
        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Gemini Daily Spending Profile</h3>
          <div className="h-64 w-full font-sans">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COST_DATA}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="cost" stroke="#06b6d4" fillOpacity={1} fill="url(#colorCost)" name="Spending ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}