import React from 'react';
import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loader className="h-8 w-8 text-cyan-400 animate-spin" />
      <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Loading Workspace...</span>
    </div>
  );
}