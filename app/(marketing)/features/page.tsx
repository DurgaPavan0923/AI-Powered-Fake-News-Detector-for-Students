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