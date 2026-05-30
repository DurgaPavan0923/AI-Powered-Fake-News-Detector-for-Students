import React from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="w-full max-w-md border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6 text-center">
        <h2 className="text-2xl font-extrabold text-slate-200 tracking-tight">Create New Password</h2>
        <form className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500" required />
          </div>
          <button type="submit" className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer">
            Update Credentials
          </button>
        </form>
      </div>
    </div>
  );
}