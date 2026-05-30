'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import { analyzeContent } from '@/services/ai/analysis.service';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Play, Sparkles, Loader } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TextAnalysisPage() {
  const router = useRouter();
  const { addRecord, activeApiKey } = useAnalysisStore();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [logStep, setLogStep] = useState('');

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    setAnalyzing(true);

    const steps = [
      'Extracting content tokens...',
      'Running Gemini credibility checks...',
      'Isolating claim schemas...',
      'Validating source databases...',
      'Generating relationship graph matrices...',
      'Synthesizing final credibility score...'
    ];

    // Simulating progress logs for premium UX
    for (let i = 0; i < steps.length; i++) {
      setLogStep(steps[i]);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const record = await analyzeContent({
        type: 'text',
        data: text,
        title: title || undefined
      }, activeApiKey);

      addRecord(record);
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.7 } });
      router.push(`/analysis/${record.id}`);
    } catch (e) {
      console.error(e);
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Analyze Content', href: '/analysis' }, { name: 'Plain Text' }]} />
      
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Plain Text Analysis</h1>
          <p className="text-xs text-slate-400">Verify content validity using RAG consensus checking</p>
        </div>

        {analyzing ? (
          <div className="border border-white/10 rounded-2xl bg-slate-900/60 p-12 text-center flex flex-col items-center justify-center space-y-6">
            <Loader className="h-10 w-10 text-cyan-400 animate-spin" />
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-200">FactLens Scanning Pipeline</h3>
              <p className="text-xs text-slate-500 font-mono tracking-tight animate-pulse">{logStep}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRun} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6">
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Topic Title (Optional)</label>
              <input 
                type="text" 
                placeholder="NASA Kepler Planet Discovery Review"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Content / Article draft</label>
              <textarea 
                rows={8}
                placeholder="Paste the news draft, statement, or thesis copy here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold resize-none"
                required
              />
            </div>

            <button 
              type="submit" 
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" /> Start Fact Check
            </button>

          </form>
        )}
      </div>
    </div>
  );
}