'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { ShieldAlert, Mail, Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setErrorMsg('');
    await login(email, 'Admin');
    router.push('/admin');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-violet-500/10 to-indigo-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="w-full max-w-sm border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 mx-auto">
            <ShieldAlert className="h-5 w-5 animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Admin Gate</h2>
          <p className="text-[10px] text-slate-500 font-semibold">Administrative Access Portal only</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Admin Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-4 w-4 text-slate-500" />
              <input 
                type="email" 
                placeholder="admin@factlens.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-violet-500 font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-4 w-4 text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-violet-500 font-semibold"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : 'Enter Dashboard'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}