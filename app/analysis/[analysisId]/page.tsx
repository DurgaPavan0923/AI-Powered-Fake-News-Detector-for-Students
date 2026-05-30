'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import CredibilityGauge from '@/components/analysis/credibility-gauge';
import ExplainableAI from '@/components/analysis/explainable-ai';
import ChatPanel from '@/components/analysis/chat-panel';
import StudyMode from '@/components/analysis/study-mode';
import EvidenceCard from '@/components/analysis/evidence-card';
import SourceCard from '@/components/analysis/source-card';
import GraphView from '@/components/graph/graph-view';
import NodeCard from '@/components/graph/node-card';
import ReportSharing from '@/components/reports/report-sharing';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { jsPDF } from 'jspdf';
import { BookOpen, Star, FileText, Scale } from 'lucide-react';

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { records, toggleBookmark } = useAnalysisStore();
  const [activeTab, setActiveTab] = useState<'claims' | 'bias' | 'study' | 'graph'>('claims');
  const [selectedNode, setSelectedNode] = useState<{ label: string; type: string; description: string } | null>(null);

  const id = params.analysisId as string;
  const record = records.find(r => r.id === id);

  if (!record) {
    return (
      <div className="text-center py-20 text-slate-400 text-xs select-none max-w-md mx-auto">
        Report could not be found. Let's redirect to your workspace.
        <button onClick={() => router.push('/dashboard')} className="mt-4 block w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text('FactLens AI Fact-Check Portfolio', 14, 25);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text(`Analysis ID: ${record.id}  |  Date: ${record.date}`, 14, 32);
    doc.text(`Article Title: ${record.title.slice(0, 75)}`, 14, 38);

    doc.setDrawColor(226, 232, 240);
    doc.line(14, 45, 196, 45);

    doc.setFontSize(14);
    doc.text('Credibility Rating Overview', 14, 55);
    
    doc.setFontSize(11);
    doc.text(`Credibility Score: ${record.credibilityScore} / 100`, 14, 63);
    doc.text(`Fake News Probability: ${record.fakeProbability}%`, 14, 69);
    doc.text(`Consensus Trust Level: ${record.trustRating} Trust`, 14, 75);

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
      doc.text(`${i + 1}. Claim: "${c.claim.slice(0, 70)}..."`, 14, y);
      doc.setFontSize(10);
      doc.text(`Consensus Status: ${c.status}  |  Actor: ${c.entity}`, 16, y + 5);
      y += 15;
    });

    doc.save(`FactLens_Report_${record.id}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none">
      <Breadcrumbs items={[{ name: 'History Logs', href: '/dashboard/history' }, { name: 'Report detail' }]} />
      
      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded animate-pulse">
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                record.bookmarked 
                  ? 'text-amber-400 border-amber-500/30 bg-amber-950/20' 
                  : 'text-slate-300 border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <Star className="h-4 w-4 fill-current" /> Bookmark
            </button>
            <button 
              onClick={exportPDF}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
            >
              <FileText className="h-4 w-4" /> Download PDF
            </button>
          </div>
        </div>

        {/* Public Sharing Widget */}
        <ReportSharing />

        {/* Split grid of Gauges + AI Explanations + Chatbot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (Speedometer & Explainable metrics) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <CredibilityGauge score={record.credibilityScore} />
              <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fake Risk meter</span>
                  <h2 className="text-2xl font-extrabold text-rose-400 tracking-tight">{record.fakeProbability}% Risk</h2>
                  <p className="text-xs text-slate-400 leading-normal font-semibold">
                    The AI indicates a {record.fakeProbability}% probability of emotional manipulation, clickbait wording, or unverified claims.
                  </p>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/5 mt-4">
                  <div className="h-full bg-rose-500" style={{ width: `${record.fakeProbability}%` }} />
                </div>
              </div>
            </div>

            <ExplainableAI 
              score={record.credibilityScore} 
              confidence={92} 
              claims={record.claims}
              sources={record.suggestedSources}
            />
          </div>

          {/* Right Column (Ask FactLens Chat chatbot) */}
          <div>
            <ChatPanel 
              articleTitle={record.title} 
              claims={record.claims} 
            />
          </div>

        </div>

        {/* Tabs index */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('claims')}
              className={`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 shrink-0 cursor-pointer ${
                activeTab === 'claims' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Verification Claims ({record.claims.length})
            </button>
            <button 
              onClick={() => setActiveTab('study')}
              className={`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 shrink-0 cursor-pointer ${
                activeTab === 'study' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Study Helper
            </button>
            <button 
              onClick={() => setActiveTab('bias')}
              className={`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 shrink-0 cursor-pointer ${
                activeTab === 'bias' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Bias Spectrum
            </button>
            <button 
              onClick={() => setActiveTab('graph')}
              className={`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 shrink-0 cursor-pointer ${
                activeTab === 'graph' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
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
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Consensus Libraries</h4>
                  </div>
                  <SourceCard sources={record.suggestedSources} />
                </div>
              </div>
            )}

            {activeTab === 'study' && (
              <StudyMode articleTitle={record.title} />
            )}

            {activeTab === 'bias' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(record.bias).filter(([k]) => k !== 'explanation').map(([key, val]) => (
                  <div key={key} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span>{key} index</span>
                      <span className="text-slate-200 font-extrabold">{val as number}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-cyan-500" style={{ width: `${val}%` }} />
                    </div>
                  </div>
                ))}
                
                <div className="sm:col-span-2 p-6 rounded-2xl border border-white/10 bg-slate-900/60">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bias Evaluation Analysis</h4>
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