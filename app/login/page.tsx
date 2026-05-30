'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, GraduationCap, Shield } from 'lucide-react';

export default function LoginPortalSelector() {
  const router = useRouter();

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
      {/* Glow circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="w-full max-w-lg border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-8 select-none">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white mx-auto shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">Welcome to FactLens AI</h2>
          <p className="text-xs text-slate-400 font-medium font-semibold">Select your verification gateway to continue</p>
        </div>

        {/* Portal selection deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Student Portal Card */}
          <div 
            onClick={() => router.push('/auth/student/login')}
            className="p-6 rounded-xl border border-cyan-500/10 bg-slate-950/40 hover:bg-slate-950/80 hover:border-cyan-500/30 transition-all cursor-pointer flex flex-col justify-between h-48 group hover:scale-[1.01]"
          >
            <div className="space-y-3 text-left">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-200">Student Portal</h3>
              <p className="text-[10px] text-slate-500 leading-normal font-semibold">Analyze content, upload PDF documents, study concepts, and view reports.</p>
            </div>
            <span className="text-[10px] font-bold text-cyan-400 group-hover:underline">Continue as Student →</span>
          </div>

          {/* Admin Portal Card */}
          <div 
            onClick={() => router.push('/auth/admin/login')}
            className="p-6 rounded-xl border border-violet-500/10 bg-slate-950/40 hover:bg-slate-950/80 hover:border-violet-500/30 transition-all cursor-pointer flex flex-col justify-between h-48 group hover:scale-[1.01]"
          >
            <div className="space-y-3 text-left">
              <div className="h-9 w-9 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                <Shield className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-200">Admin Portal</h3>
              <p className="text-[10px] text-slate-500 leading-normal font-semibold">Whitelist domains, configure telemetry, verify audit logs, and toggle flags.</p>
            </div>
            <span className="text-[10px] font-bold text-violet-400 group-hover:underline">Continue as Admin →</span>
          </div>

        </div>

      </div>
    </div>
  );
}