'use client';

import React, { useState } from 'react';
import { useAnalysisStore } from '@/store/analysis.store';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Key, Database, RefreshCw, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsPage() {
  const { activeApiKey, setApiKey } = useAnalysisStore();
  const [keyInput, setKeyInput] = useState(activeApiKey);
  const [saved, setSaved] = useState(false);

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(keyInput);
    setSaved(true);
    confetti({ particleCount: 60, spread: 45, origin: { y: 0.8 } });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Settings' }]} />
      
      <div className="space-y-6 max-w-xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-400 font-medium">Configure credentials, caches, and live database synchronizers</p>
        </div>

        {/* Saved Alert banner */}
        {saved && (
          <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> API Credentials saved successfully!
          </div>
        )}

        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2 text-slate-300">
            <Key className="h-5 w-5 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Gemini AI Credentials</h3>
          </div>

          <form onSubmit={handleSaveKeys} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gemini 2.5 Pro Key Override</label>
              <input 
                type="password"
                placeholder="AIzaSy..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono font-semibold"
              />
              <span className="text-[10px] text-slate-500 leading-normal block">
                Provide a personal Gemini key. If empty, the workspace uses standard in-memory simulation rules.
              </span>
            </div>

            <button type="submit" className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer">
              Save Configuration
            </button>
          </form>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Database className="h-5 w-5 text-indigo-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Graph Sync Cache</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Flush or reset local storage analysis cache records. Note that this restores the default mock datasets.
          </p>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 text-slate-400" /> Flush Memory & Cache
          </button>
        </div>

      </div>
    </div>
  );
}