'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 select-none max-w-md mx-auto">
      <AlertCircle className="h-10 w-10 text-rose-500" />
      <div className="space-y-1">
        <h2 className="text-sm font-extrabold text-slate-200">Fact-Checking Pipeline Encountered an Error</h2>
        <p className="text-xs text-slate-500 font-medium">An unexpected exception occurred inside the RAG embedding synchronizer.</p>
      </div>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
      >
        Re-initialize Session
      </button>
    </div>
  );
}