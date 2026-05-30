import React from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="w-full max-w-md border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6 text-center">
        <h2 className="text-2xl font-extrabold text-slate-200 tracking-tight">Verify School Email</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Please check your email inbox for a verification code. Confirming links authorizes workspace database connections.
        </p>
        <Link href="/login" className="inline-block py-2.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors">
          Go to Sign In
        </Link>
      </div>
    </div>
  );
}