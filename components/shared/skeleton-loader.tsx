import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="w-full space-y-4 animate-pulse select-none">
      <div className="h-8 bg-slate-800 rounded-lg w-1/3" />
      <div className="h-32 bg-slate-900 rounded-xl border border-white/5 p-4 flex flex-col justify-between">
        <div className="h-4 bg-slate-800 rounded w-2/3" />
        <div className="h-4 bg-slate-800 rounded w-1/2" />
        <div className="h-4 bg-slate-800 rounded w-1/4" />
      </div>
    </div>
  );
}