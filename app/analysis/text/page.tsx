'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import { analyzeContent } from '@/services/ai/analysis.service';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import PipelineAnimator from '@/components/analysis/pipeline-animator';
import { Play } from 'lucide-react';
import confetti from 'canvas-confetti';

function TextAnalysisForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addRecord, activeApiKey } = useAnalysisStore();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  // Pre-populate input based on demo sandbox queries
  useEffect(() => {
    const demo = searchParams.get('demo');
    if (demo === 'space') {
      setTitle('NASA Exoplanet Habitable Kepler Findings');
      setText('NASA Exoplanet Archive researchers confirmed rocky planet parameters for Kepler-452b in 2025. Recent observations show multiple planets positioned in stellar habitable zones. SpaceX plans Mars missions by 2028.');
    } else if (demo === 'climate') {
      setTitle('IPCC Global Temperatures Carbon Peaks');
      setText('Global temperatures have risen by 1.1 degrees Celsius since the pre-industrial era, matching international climate consensus reports. Carbon dioxide concentrations reached historic peak peaks of 424 ppm in 2024.');
    } else if (demo === 'health') {
      setTitle('Miracle Herbal Tea Curative Diabetes Treatment');
      setText('A secret herbal tea infusion completely cures diabetes and restores pancreatic insulin production in two weeks. Pharmaceutical companies hide the cure to maintain profits.');
    }
  }, [searchParams]);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    setAnalyzing(true);

    setTimeout(async () => {
      try {
        const record = await analyzeContent({
          type: 'text',
          data: text,
          title: title || undefined
        }, activeApiKey);

        addRecord(record);
        confetti({ particleCount: 100, spread: 60, origin: { y: 0.7 } });
        router.push(`/analysis/<span className="text-cyan-400">${record.id}</span>`);
      } catch (e) {
        console.error(e);
        setAnalyzing(false);
      }
    }, 6600);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Plain Text Analysis</h1>
        <p className="text-xs text-slate-400">Verify content validity using RAG consensus checking</p>
      </div>

      {analyzing ? (
        <PipelineAnimator />
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
  );
}

export default function TextAnalysisPage() {
  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      <Breadcrumbs items={[{ name: 'Analyze Content', href: '/analysis' }, { name: 'Plain Text' }]} />
      <Suspense fallback={<div className="text-xs text-slate-500">Loading Form...</div>}>
        <TextAnalysisForm />
      </Suspense>
    </div>
  );
}