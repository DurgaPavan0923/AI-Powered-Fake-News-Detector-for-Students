'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Type, Link as LinkIcon, Upload, ArrowRight } from 'lucide-react';

export default function AnalysisIndex() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Analyze Content' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">New Evaluation</h1>
          <p className="text-xs text-slate-400">Select an input channel to begin the fact-verification process</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-8">
          
          {/* Text channel */}
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between h-64">
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
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between h-64">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <LinkIcon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">URL Fact-Scraping</h3>
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
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between h-64">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-200">PDF / DOCX Reports</h3>
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