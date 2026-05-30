import React from 'react';
import Link from 'next/link';

export default function StudentForgotPassword() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
      <div className="w-full max-w-sm border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-200">Reset Student Password</h2>
        <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">Enter your academic email to receive password reset guides.</p>
        <input type="email" placeholder="student@academy.edu" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold text-left" required />
        <button className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer">
          Send Recovery Link
        </button>
        <div className="text-xs text-slate-500"><Link href="/auth/student/login" className="hover:underline text-cyan-400">Return to Login</Link></div>
      </div>
    </div>
  );
}