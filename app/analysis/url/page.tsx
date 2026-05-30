'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import { analyzeContent } from '@/services/ai/analysis.service';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import PipelineAnimator from '@/components/analysis/pipeline-animator';
import { Play, Link as LinkIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UrlAnalysisPage() {
  const router = useRouter();
  const { addRecord, activeApiKey } = useAnalysisStore();
  const [urlInput, setUrlInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    setAnalyzing(true);

    setTimeout(async () => {
      try {
        const record = await analyzeContent({
          type: 'url',
          data: urlInput
        }, activeApiKey);

        addRecord(record);
        confetti({ particleCount: 100, spread: 65, origin: { y: 0.7 } });
        router.push(`/analysis/${record.id}`);
      } catch (e) {
        console.error(e);
        setAnalyzing(false);
      }
    }, 6600);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      <Breadcrumbs items={[{ name: 'Analyze Content', href: '/analysis' }, { name: 'URL Link' }]} />
      
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">URL Web Analysis</h1>
          <p className="text-xs text-slate-400">Scrape, extract, and verify online statements and articles</p>
        </div>

        {analyzing ? (
          <PipelineAnimator />
        ) : (
          <form onSubmit={handleRun} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6">
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Web Article URL Link</label>
              <div className="relative flex items-center">
                <LinkIcon className="absolute left-3.5 h-4.5 w-4.5 text-slate-500" />
                <input 
                  type="url" 
                  placeholder="https://www.nature.com/articles/astronomy- Kepler-452"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" /> Scrape & Fact Check
            </button>

          </form>
        )}
      </div>
    </div>
  );
}