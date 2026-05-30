import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 max-w-md mx-auto select-none">
      <HelpCircle className="h-10 w-10 text-slate-600" />
      <div className="space-y-1">
        <h2 className="text-sm font-extrabold text-slate-200">404 — Research Path Not Found</h2>
        <p className="text-xs text-slate-400">The page link or analysis directory index requested does not exist.</p>
      </div>
      <Link href="/dashboard" className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors">
        Return to Dashboard
      </Link>
    </div>
  );
}