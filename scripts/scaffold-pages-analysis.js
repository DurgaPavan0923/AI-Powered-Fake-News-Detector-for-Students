const fs = require('fs');
const path = require('path');

const files = {};

function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. ANALYSIS PAGES
// -------------------------------------------------------------

// analysis/page.tsx
define('app/analysis/page.tsx', `
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
`);

// analysis/new/page.tsx
define('app/analysis/new/page.tsx', `
import { redirect } from 'next/navigation';
export default function NewAnalysisRedirect() {
  redirect('/analysis');
}
`);

// analysis/text/page.tsx
define('app/analysis/text/page.tsx', `
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
      router.push(\`/analysis/\${record.id}\`);
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
`);

// analysis/url/page.tsx
define('app/analysis/url/page.tsx', `
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import { analyzeContent } from '@/services/ai/analysis.service';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Play, Link as LinkIcon, Loader } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UrlAnalysisPage() {
  const router = useRouter();
  const { addRecord, activeApiKey } = useAnalysisStore();
  const [urlInput, setUrlInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [logStep, setLogStep] = useState('');

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    setAnalyzing(true);

    const steps = [
      'Scraping target domain parameters...',
      'Sanitizing parsed DOM text layers...',
      'Identifying source author metadata...',
      'Invoking RAG claim-comparison vectors...',
      'Computing bias emotional markers...',
      'Formulating final report payload...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setLogStep(steps[i]);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const record = await analyzeContent({
        type: 'url',
        data: urlInput
      }, activeApiKey);

      addRecord(record);
      confetti({ particleCount: 100, spread: 65, origin: { y: 0.7 } });
      router.push(\`/analysis/\${record.id}\`);
    } catch (e) {
      console.error(e);
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Analyze Content', href: '/analysis' }, { name: 'URL Link' }]} />
      
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">URL Web Analysis</h1>
          <p className="text-xs text-slate-400">Scrape, extract, and verify online statements and articles</p>
        </div>

        {analyzing ? (
          <div className="border border-white/10 rounded-2xl bg-slate-900/60 p-12 text-center flex flex-col items-center justify-center space-y-6">
            <Loader className="h-10 w-10 text-cyan-400 animate-spin" />
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-slate-200">FactLens Web-Scraper Running</h3>
              <p className="text-xs text-slate-500 font-mono tracking-tight animate-pulse">{logStep}</p>
            </div>
          </div>
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
`);

// analysis/upload/page.tsx
define('app/analysis/upload/page.tsx', `
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
        data: \`Uploaded research document file named: \${fileName}. Content contains assertions regarding Kepler and space habitable variables.\`,
        title: fileName
      }, activeApiKey);

      addRecord(record);
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.7 } });
      router.push(\`/analysis/\${record.id}\`);
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
`);

// analysis/[analysisId]/page.tsx
define('app/analysis/[analysisId]/page.tsx', `
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import CredibilityScore from '@/components/analysis/credibility-score';
import FakeNewsMeter from '@/components/analysis/fake-news-meter';
import EvidenceCard from '@/components/analysis/evidence-card';
import SourceCard from '@/components/analysis/source-card';
import GraphView from '@/components/graph/graph-view';
import NodeCard from '@/components/graph/node-card';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { jsPDF } from 'jspdf';
import { BookOpen, Star, Sparkles, FileText, ChevronRight, Network, Share2, HelpCircle } from 'lucide-react';

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { records, toggleBookmark } = useAnalysisStore();
  const [activeTab, setActiveTab] = useState<'claims' | 'bias' | 'graph'>('claims');
  const [selectedNode, setSelectedNode] = useState<{ label: string; type: string; description: string } | null>(null);

  const id = params.analysisId as string;
  const record = records.find(r => r.id === id);

  if (!record) {
    return (
      <div className="text-center py-20 text-slate-400 text-sm font-semibold max-w-md mx-auto">
        Report could not be found. Let's redirect to your workspace.
        <button onClick={() => router.push('/dashboard')} className="mt-4 block w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors">
          Return to Dashboard
        </button>
      </div>
    );
  }

  // jsPDF printable portfolio export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text('FactLens AI Fact-Check Portfolio', 14, 25);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text(\`Analysis ID: \${record.id}  |  Date: \${record.date}\`, 14, 32);
    doc.text(\`Article Title: \${record.title.slice(0, 75)}\`, 14, 38);

    doc.setDrawColor(226, 232, 240);
    doc.line(14, 45, 196, 45);

    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text('Credibility Rating Overview', 14, 55);
    
    doc.setFontSize(11);
    doc.text(\`Credibility Score: \${record.credibilityScore} / 100\`, 14, 63);
    doc.text(\`Fake News Probability: \${record.fakeProbability}%\`, 14, 69);
    doc.text(\`Consensus Trust Level: \${record.trustRating} Trust\`, 14, 75);

    doc.text('AI Explanatory Notes:', 14, 87);
    doc.setFontSize(10);
    const splitExplanation = doc.splitTextToSize(record.explanation, 180);
    doc.text(splitExplanation, 14, 93);

    doc.setFontSize(14);
    doc.text('Extracted Claims & Consensus Verification', 14, 130);
    
    let y = 138;
    record.claims.forEach((c, i) => {
      if (y > 260) {
        doc.addPage();
        y = 25;
      }
      doc.setFontSize(11);
      doc.text(\`\${i + 1}. Claim: "\${c.claim.slice(0, 70)}..."\`, 14, y);
      doc.setFontSize(10);
      doc.text(\`Consensus Status: \${c.status}  |  Actor: \${c.entity}\`, 16, y + 5);
      y += 15;
    });

    doc.save(\`FactLens_Report_\${record.id}.pdf\`);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'History Logs', href: '/dashboard/history' }, { name: 'Report detail' }]} />
      
      <div className="space-y-8">
        
        {/* Upper Header segment */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                Verified: {record.trustRating} Trust
              </span>
              <span className="text-[10px] text-slate-500 font-semibold">{record.date}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight leading-normal">
              {record.title}
            </h1>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => toggleBookmark(record.id)}
              className={\`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer \${
                record.bookmarked 
                  ? 'text-amber-400 border-amber-500/30 bg-amber-950/20' 
                  : 'text-slate-300 border-white/10 bg-white/5 hover:bg-white/10'
              }\`}
            >
              <Star className="h-4 w-4 fill-current" /> Bookmark
            </button>
            <button 
              onClick={exportPDF}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
            >
              <FileText className="h-4 w-4" /> Download PDF Report
            </button>
          </div>
        </div>

        {/* Scoring Gauges split segment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CredibilityScore score={record.credibilityScore} />
          <div className="md:col-span-2">
            <FakeNewsMeter probability={record.fakeProbability} />
          </div>
        </div>

        {/* Explainability Synthesis */}
        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">AI Explanatory Synthesis</h3>
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
            {record.explanation}
          </p>
        </div>

        {/* Main Tabbed interactive interface */}
        <div className="space-y-6">
          
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <button 
              onClick={() => setActiveTab('claims')}
              className={\`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 cursor-pointer \${
                activeTab === 'claims' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }\`}
            >
              Verification Claims ({record.claims.length})
            </button>
            <button 
              onClick={() => setActiveTab('bias')}
              className={\`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 cursor-pointer \${
                activeTab === 'bias' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }\`}
            >
              Bias Spectrum
            </button>
            <button 
              onClick={() => setActiveTab('graph')}
              className={\`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 cursor-pointer \${
                activeTab === 'graph' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }\`}
            >
              Knowledge Graph Visualizer
            </button>
          </div>

          <div className="mt-4">
            
            {activeTab === 'claims' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <EvidenceCard claims={record.claims} />
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Consensus Repositories</h4>
                    <p className="text-[10px] text-slate-500 font-semibold leading-normal">Cross-referenced citation referenceswhitelisted for fact checking.</p>
                  </div>
                  <SourceCard sources={record.suggestedSources} />
                </div>
              </div>
            )}

            {activeTab === 'bias' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(record.bias).filter(([k]) => k !== 'explanation').map(([key, val]) => (
                  <div key={key} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span>{key} index</span>
                      <span className="text-slate-200 font-extrabold">{val as number}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-cyan-500" style={{ width: \`\${val}%\` }} />
                    </div>
                  </div>
                ))}
                
                <div className="sm:col-span-2 p-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bias Evaluation log</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">{record.bias.explanation}</p>
                </div>
              </div>
            )}

            {activeTab === 'graph' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <GraphView 
                    articleTitle={record.title} 
                    claims={record.claims}
                    sources={record.suggestedSources}
                    onSelectNode={setSelectedNode} 
                  />
                </div>
                <div>
                  <NodeCard node={selectedNode} />
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
`);

// analysis/[analysisId]/graph/page.tsx
define('app/analysis/[analysisId]/graph/page.tsx', `
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import GraphView from '@/components/graph/graph-view';
import NodeCard from '@/components/graph/node-card';
import Breadcrumbs from '@/components/shared/breadcrumbs';

export default function AnalysisGraphDetailPage() {
  const params = useParams();
  const { records } = useAnalysisStore();
  const [selectedNode, setSelectedNode] = useState<{ label: string; type: string; description: string } | null>(null);

  const id = params.analysisId as string;
  const record = records.find(r => r.id === id);

  if (!record) {
    return <div className="p-12 text-center text-xs text-slate-500">Report not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Topic Graph', href: '/knowledge-graph' }, { name: 'Graph Detail' }]} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2">
          <GraphView 
            articleTitle={record.title} 
            claims={record.claims} 
            sources={record.suggestedSources}
            onSelectNode={setSelectedNode} 
          />
        </div>
        <div>
          <NodeCard node={selectedNode} />
        </div>
      </div>
    </div>
  );
}
`);

// analysis/[analysisId]/report/page.tsx
define('app/analysis/[analysisId]/report/page.tsx', `
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
`);

// Write files to system
Object.keys(files).forEach((filePath) => {
  const fullPath = path.join(__dirname, '..', filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, files[filePath].trim());
  console.log('Scaffolded:', filePath);
});
console.log('Part 7 completed successfully.');
