const fs = require('fs');
const path = require('path');

const files = {};

function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. MARKETING / FRONT PAGES
// -------------------------------------------------------------

// landing page.tsx
define('app/(marketing)/page.tsx', `
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
`);

// about page.tsx
define('app/(marketing)/about/page.tsx', `
import React from 'react';
import { ShieldAlert, Users, BookOpen, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">Our Mission</h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Helping students and educators navigate the digital landscape with transparency, evidence-based research, and critical analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
            <Users className="h-6 w-6 text-cyan-400 mb-4" />
            <h3 className="text-sm font-bold text-slate-200">Digital Literacy first</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              We design toolkits specifically to teach critical thinking. FactLens is an educational intelligence dashboard that helps students recognize bias patterns.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
            <Shield className="h-6 w-6 text-indigo-400 mb-4" />
            <h3 className="text-sm font-bold text-slate-200">Evidence over opinions</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              We compile factual evidence networks from academic, government, and peer-reviewed consensus databases to challenge unverified claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

// features page.tsx
define('app/(marketing)/features/page.tsx', `
import React from 'react';
import { Search, Network, FileCheck, Compass, Sparkles, Database } from 'lucide-react';

export default function FeaturesPage() {
  const feats = [
    { title: 'Multi-Input Analysis', desc: 'Accepts plain text, links, and documents (PDFs, DOCX).', icon: Compass },
    { title: 'Fact Extraction Engine', desc: 'Isolates claims, metrics, and associated actors.', icon: Search },
    { title: 'Knowledge Graph Visualization', desc: 'Syncs data to Neo4j to display graphical claims mapping.', icon: Network },
    { title: 'Bias & Emotional Meter', desc: 'Checks for clickbait headlines and emotional triggers.', icon: Sparkles },
    { title: 'Cross-Reference Verification', desc: 'Performs semantic searches across whitelisted databases.', icon: FileCheck },
    { title: 'Academic Database Library', desc: 'Lists trusted peer-reviewed publication indexes.', icon: Database }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">Core Features</h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Fully featured analysis dashboard equipped with AI, RAG embeddings, and graphical relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {feats.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="p-6 rounded-2xl border border-white/15 bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-200">{f.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
`);

// pricing page.tsx
define('app/(marketing)/pricing/page.tsx', `
import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">Academic Plans</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Providing free access to students. Scalable research capabilities for classrooms and universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-md border border-cyan-500/20 inline-block">Student Free</span>
              <div>
                <h2 className="text-4xl font-extrabold text-slate-100">$0</h2>
                <p className="text-[10px] text-slate-500 mt-1">Free forever with school email</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 30 analyzes per month</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Interactive Knowledge Graphs</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> PDF report generation</li>
              </ul>
            </div>
            <Link href="/register" className="mt-8 block text-center py-2.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors">
              Get Started Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="p-8 rounded-2xl border border-cyan-500/30 bg-slate-900 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-indigo-500 text-[9px] font-bold text-white px-3 py-1 rounded-bl-xl shadow-lg">
              POPULAR
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950/50 px-3 py-1 rounded-md border border-indigo-500/20 inline-block">Educator Pro</span>
              <div>
                <h2 className="text-4xl font-extrabold text-slate-100">$9</h2>
                <p className="text-[10px] text-slate-500 mt-1">Per educator / user monthly</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Unlimited analyses & batch uploads</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Full CSV/PDF analytics exports</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Custom whitelists for classrooms</li>
              </ul>
            </div>
            <Link href="/register" className="mt-8 block text-center py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white shadow-lg transition-all">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

// contact page.tsx
define('app/(marketing)/contact/page.tsx', `
import React from 'react';

export default function ContactPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-md mx-auto space-y-8 border border-white/10 p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-200">Contact Support</h1>
          <p className="text-xs text-slate-400 leading-normal">Submit questions, report false negatives, or propose whitelisting sources.</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <input type="email" placeholder="student@academy.edu" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</label>
            <input type="text" placeholder="Whitelisting request" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Message Description</label>
            <textarea rows={4} placeholder="Please detail your request..." className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 resize-none" required />
          </div>
          <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 rounded-lg text-xs font-bold text-white transition-all cursor-pointer">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
`);

// privacy page.tsx
define('app/(marketing)/privacy/page.tsx', `
import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-200">Privacy & Editorial Guidelines</h1>
        <p className="text-xs text-slate-400 leading-relaxed">Last Updated: May 2026</p>
        
        <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
          <h3 className="text-sm font-bold text-slate-200 mt-6">1. Data Storage & Retrieval</h3>
          <p>
            FactLens processes documents and text queries solely to calculate credibility index parameters. We do not index copyrighted works or sell user data profile logs.
          </p>

          <h3 className="text-sm font-bold text-slate-200 mt-6">2. Verification Accuracy Disclaimer</h3>
          <p>
            AI fact checks are indicators calculated through search consensus mapping. FactLens acts as a digital media learning reference rather than an absolute regulatory legal arbiter of statements.
          </p>
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
console.log('Part 4 completed successfully.');
