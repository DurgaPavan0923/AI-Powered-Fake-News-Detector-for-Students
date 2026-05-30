'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Type, Link as LinkIcon, Upload, ArrowRight, Play, Sparkles } from 'lucide-react';

export default function AnalysisIndex() {
  const demos = [
    { title: 'NASA Kepler-452b Discovery', category: 'Factual Consensus', link: '/analysis/text?demo=space', desc: 'Pre-fills space exploration content supporting Earth-like parameters.' },
    { title: 'Global IPCC Temperature Offset', category: 'Factual Consensus', link: '/analysis/text?demo=climate', desc: 'Pre-fills environmental statistics showing global 1.1°C offsets.' },
    { title: 'Miracle Herbal Diabetes Cure', category: 'High Misinformation', link: '/analysis/text?demo=health', desc: 'Pre-fills warning health assertions claiming instant cures.' }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      <Breadcrumbs items={[{ name: 'Analyze Content' }]} />
      
      <div className="space-y-8">
        
        {/* Banner greeting */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">New Evaluation</h1>
          <p className="text-xs text-slate-400">Select an input channel to begin the fact-verification process</p>
        </div>

        {/* Recruiter / Reviewer Demo Mode Panel */}
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 max-w-4xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="h-4.5 w-4.5" />
              <span className="text-xs font-bold uppercase tracking-wider">Portfolio Demo Sandbox</span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Reviewing this project for a hackathon or recruitment review? Tap any card below to pre-populate text inputs with consensus or warning drafts to test immediate functionality.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {demos.map((d, i) => (
                <Link 
                  key={i} 
                  href={d.link}
                  className="p-4 rounded-xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-colors flex flex-col justify-between text-left space-y-2 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                      d.category.includes('Consensus') ? 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20' : 'text-rose-400 border-rose-500/20 bg-rose-950/20'
                    }`}>
                      {d.category}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-200">{d.title}</h4>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">{d.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Input Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          
          {/* Text channel */}
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between h-60">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Type className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">Plain Text Input</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Paste raw article drafts, claims, social media posts, or research summaries directly to run checks.
              </p>
            </div>
            <Link 
              href="/analysis/text"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
            >
              Analyze Text <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* URL channel */}
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between h-60">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <LinkIcon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">URL Web Scraper</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide article links, blogs, or press statements. Our scraper will fetch text payloads for RAG indexing.
              </p>
            </div>
            <Link 
              href="/analysis/url"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
            >
              Analyze URL <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* File Upload channel */}
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between h-60">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">PDF / DOCX Upload</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upload academic essays, drafts, or PDF reports to verify numerical consensus claims and charts.
              </p>
            </div>
            <Link 
              href="/analysis/upload"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
            >
              Upload Document <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}