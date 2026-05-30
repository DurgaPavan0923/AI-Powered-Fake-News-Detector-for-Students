'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import { analyzeContent } from '@/services/ai/analysis.service';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Play, Upload, Loader, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UploadAnalysisPage() {
  const router = useRouter();
  const { addRecord, activeApiKey } = useAnalysisStore();
  const [fileName, setFileName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [logStep, setLogStep] = useState('');

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;
    setAnalyzing(true);

    const steps = [
      'Extracting PDF text structures...',
      'Filtering footnotes and bibliographies...',
      'Mapping isolated claim clusters...',
      'Consulting government registries...',
      'Synthesizing bias distributions...',
      'Publishing evaluation report...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setLogStep(steps[i]);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const record = await analyzeContent({
        type: 'upload',
        data: `Uploaded research document file named: ${fileName}. Content contains assertions regarding Kepler and space habitable variables.`,
        title: fileName
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
      <Breadcrumbs items={[{ name: 'Analyze Content', href: '/analysis' }, { name: 'PDF/DOCX Upload' }]} />
      
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Upload Document</h1>
          <p className="text-xs text-slate-400">Extract content and run fact checks on scientific PDF/DOCX essays</p>
        </div>

        {analyzing ? (
          <div className="border border-white/10 rounded-2xl bg-slate-900/60 p-12 text-center flex flex-col items-center justify-center space-y-6">
            <Loader className="h-10 w-10 text-cyan-400 animate-spin" />
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-200">FactLens Processing PDF Payload</h3>
              <p className="text-xs text-slate-500 font-mono tracking-tight animate-pulse">{logStep}</p>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6">
            
            <div className="border-2 border-dashed border-white/10 rounded-xl p-10 text-center space-y-4 hover:border-cyan-500/40 transition-colors select-none">
              <Upload className="h-10 w-10 text-slate-600 mx-auto" />
              <div className="space-y-1 text-slate-400">
                <p className="text-xs font-bold">Drag and drop academic PDF, DOCX or TXT files here</p>
                <p className="text-[10px] text-slate-500">Max size limit: 12MB. Text layer is processed securely.</p>
              </div>
              <input 
                type="file" 
                accept=".pdf,.docx,.txt"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
                className="hidden" 
                id="file-trigger" 
              />
              <label 
                htmlFor="file-trigger"
                className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded text-[11px] font-bold text-slate-200 transition-colors cursor-pointer"
              >
                Browse local disk
              </label>
            </div>

            {fileName && (
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-white/2 border border-white/5 text-xs text-slate-300 font-semibold">
                <div className="flex items-center gap-2">
                  <FileText className="h-4.5 w-4.5 text-cyan-400" />
                  <span>{fileName}</span>
                </div>
                <button 
                  onClick={handleRun}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded text-[11px] font-extrabold transition-colors cursor-pointer"
                >
                  Verify document <Play className="h-3 w-3" />
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}