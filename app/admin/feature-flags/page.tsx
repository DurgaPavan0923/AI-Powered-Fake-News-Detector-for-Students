'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { useAuthStore } from '@/store/auth.store';
import { ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminFeatureFlagsPage() {
  const { user } = useAuthStore();
  const [flags, setFlags] = useState({
    geminiLive: false,
    pineconeRag: false,
    neo4jAura: false,
    redisCache: false
  });

  if (user?.role !== 'Admin') {
    return <div className="p-12 text-center text-slate-400 text-xs">Access Denied.</div>;
  }

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Admin Hub', href: '/admin' }, { name: 'Telemetry Flags' }]} />
      
      <div className="space-y-6 max-w-xl select-none">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">API Connectivity Toggles</h1>
          <p className="text-xs text-slate-400">Enable/disable external services. Inactive flags redirect to local simulated models.</p>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
          
          {Object.entries(flags).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between p-3.5 border border-white/5 rounded-xl bg-white/2">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-200 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')} Service
                </span>
                <p className="text-[10px] text-slate-500 font-semibold">
                  {val ? 'Connected to live cloud API' : 'Simulating locally via high-fidelity fallback rulebooks'}
                </p>
              </div>
              <button 
                onClick={() => toggleFlag(key as any)}
                className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {val ? (
                  <ToggleRight className="h-9 w-9 text-cyan-400" />
                ) : (
                  <ToggleLeft className="h-9 w-9 text-slate-600" />
                )}
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}