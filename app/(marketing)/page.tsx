import React from 'react';
import Link from 'next/link';
import { ShieldAlert, BookOpen, GraduationCap, Network, Search, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />
        
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-tight mb-8">
          🚀 Next-Generation Media Literacy Platform
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-200 to-violet-400 bg-clip-text text-transparent leading-[1.1] max-w-4xl">
          Empowering Students to Decode Information Credibility with AI
        </h1>
        
        <p className="text-sm md:text-lg text-slate-400 font-medium max-w-2xl mt-6 leading-relaxed">
          Evaluate online sources, extract factual assertions, inspect interactive relationship graphs, and verify claims against reliable databases in seconds.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link 
            href="/login"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-100 transition-all duration-300"
          >
            Start Analyzing Free
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link 
            href="/features"
            className="px-6 py-3 rounded-lg text-sm font-bold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            Explore Core Features
          </Link>
        </div>

        {/* Feature quick dashboard grid preview */}
        <div className="mt-20 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-md">
            <div className="h-10 w-10 rounded-lg bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Fact Extraction</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Extract assertions, numbers, statistics, entities, and sources automatically from any news copy or PDF paper.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-md">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <Network className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Knowledge Graphing</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Visualize networks of claims, organizations, topics, and authors to discover systemic bias or narrative patterns.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 backdrop-blur-md">
            <div className="h-10 w-10 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Evidence Citations</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Cross-check statements with verified consensus sources, government registries, and peer-reviewed journals.
            </p>
          </div>

        </div>

      </section>

      {/* RAG-based explanation CTA segment */}
      <section className="bg-slate-900/40 border-y border-white/5 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 px-3 py-1 bg-cyan-950/40 border border-cyan-500/20 rounded-md">
              <BookOpen className="h-3.5 w-3.5" /> Explainable Verification
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-200 tracking-tight leading-tight">
              We Don't Just Say "True" or "False". We Explain Why.
            </h2>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Traditional verification models provide binary flags. FactLens AI delivers deep cognitive breakdowns, assessing emotional framing, clickbait triggers, and logical fallacies, along with fully transparent citation linkups.
            </p>
            <div className="space-y-3 font-semibold text-xs text-slate-300">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Style-based emotional load indexing</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Multi-perspective consensus extraction</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Academic & Journal directory checks</div>
            </div>
          </div>
          
          {/* Visual card */}
          <div className="w-full lg:w-96 p-6 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl relative select-none">
            <div className="absolute -top-3.5 -right-3.5 bg-gradient-to-tr from-cyan-500 to-indigo-500 text-[10px] font-bold text-white px-3 py-1 rounded-md shadow-lg">
              FactLens Report
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Example Score Summary</p>
            <div className="mt-4 flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <span className="text-3xl font-extrabold text-cyan-400">88%</span>
                <span className="text-[10px] text-slate-500 block font-bold mt-0.5">Credibility Rating</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                Factual Consensus
              </span>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <p className="font-bold text-slate-300">Verified Quote</p>
              <p className="italic text-slate-400 leading-normal p-2.5 rounded bg-white/2 border border-white/5">
                "Global averages rose by 1.1°C..."
              </p>
              <p className="text-[10px] text-slate-500 font-semibold mt-2">
                ✓ Corroborated by NOAA Mauna Loa observations & IPCC Sixth Assessment Report (Chapter 3).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}