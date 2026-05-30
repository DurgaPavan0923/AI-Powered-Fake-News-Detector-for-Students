import React from 'react';
import { HelpCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="border border-white/5 rounded-2xl p-12 text-center text-xs text-slate-500 font-semibold bg-slate-900/40 select-none">
      <HelpCircle className="h-8 w-8 text-slate-700 mx-auto mb-3" />
      <span className="text-slate-400 block font-bold text-xs">{title}</span>
      <p className="text-[11px] text-slate-500 font-semibold mt-1 max-w-xs mx-auto leading-normal">{description}</p>
    </div>
  );
}