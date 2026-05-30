'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';

export default function PrintableReportPage() {
  const params = useParams();
  const { records } = useAnalysisStore();
  const id = params.analysisId as string;
  const record = records.find(r => r.id === id);

  if (!record) return <div className="p-8 text-center text-slate-500 text-xs">Analysis record not found.</div>;

  return (
    <div className="bg-white text-slate-900 min-h-screen p-12 max-w-4xl mx-auto space-y-8 font-sans select-none">
      <div className="border-b-2 border-slate-200 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">FactLens AI Fact-Verification Report</h1>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2 font-semibold">
          <span>Report ID: {record.id}</span>
          <span>Timestamp: {record.date}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Article / Topic Title</h2>
        <p className="text-sm font-semibold italic p-4 rounded bg-slate-50 border border-slate-100">"{record.title}"</p>
      </div>

      <div className="grid grid-cols-3 gap-4 border border-slate-200 p-6 rounded-lg bg-slate-50/50">
        <div className="text-center border-r border-slate-200">
          <span className="text-xs text-slate-500 font-bold block">Credibility Index</span>
          <span className="text-3xl font-extrabold text-indigo-600 block mt-1">{record.credibilityScore} / 100</span>
        </div>
        <div className="text-center border-r border-slate-200">
          <span className="text-xs text-slate-500 font-bold block">Fake Probability</span>
          <span className="text-3xl font-extrabold text-rose-500 block mt-1">{record.fakeProbability}%</span>
        </div>
        <div className="text-center">
          <span className="text-xs text-slate-500 font-bold block">Trust Rating</span>
          <span className="text-3xl font-extrabold text-emerald-600 block mt-1">{record.trustRating}</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-1">AI Explanatory Synthesis</h3>
        <p className="text-xs text-slate-600 leading-relaxed font-semibold">{record.explanation}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-1">Consensus Verification Checklist</h3>
        <div className="space-y-3">
          {record.claims.map((c, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-lg bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-100 px-2 py-0.5 rounded">{c.type}</span>
                <span className="text-xs font-bold text-slate-700">Verification: {c.status}</span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">"{c.claim}"</p>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed border-t border-slate-50 pt-2">{c.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}