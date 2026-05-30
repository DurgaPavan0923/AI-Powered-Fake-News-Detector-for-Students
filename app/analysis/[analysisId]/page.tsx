'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAnalysisStore } from '@/store/analysis.store';
import CredibilityGauge from '@/components/analysis/credibility-gauge';
import ExplainableAI from '@/components/analysis/explainable-ai';
import ChatPanel from '@/components/analysis/chat-panel';
import StudyMode from '@/components/analysis/study-mode';
import AgentConsole from '@/components/analysis/agent-console';
import EvidenceCard from '@/components/analysis/evidence-card';
import GraphView from '@/components/graph/graph-view';
import NodeCard from '@/components/graph/node-card';
import ReportSharing from '@/components/reports/report-sharing';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import EvidenceExplorer from '@/components/analysis/evidence-explorer';
import ResearchMode from '@/components/analysis/research-mode';
import { jsPDF } from 'jspdf';
import { BookOpen, Star, FileText, Activity } from 'lucide-react';

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { records, toggleBookmark } = useAnalysisStore();
  const [activeTab, setActiveTab] = useState<'claims' | 'evidence' | 'research' | 'study' | 'agents' | 'bias' | 'graph'>('claims');
  const [selectedNode, setSelectedNode] = useState<{ label: string; type: string; description: string } | null>(null);

  const id = params.analysisId as string;
  const record = records.find(r => r.id === id);

  if (!record) {
    return (
      <div className="text-center py-20 text-slate-400 text-xs select-none max-w-md mx-auto">
        Report could not be found. Let's redirect to your workspace.
        <button onClick={() => router.push('/dashboard')} className="mt-4 block w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');
    doc.text('FactLens Fact-Check Portfolio', 14, 25);
    doc.text(`Title: ${record.title}`, 14, 35);
    doc.text(`Trust Rating: ${record.trustRating}`, 14, 45);
    doc.text(`Credibility Score: ${record.credibilityScore}%`, 14, 55);
    doc.save(`FactLens_Report_${record.id}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 select-none px-6">
      <Breadcrumbs items={[{ name: 'History Logs', href: '/dashboard/history' }, { name: 'Report detail' }]} />
      
      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1.5 max-w-3xl text-left">
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

        {/* Public Sharing Link */}
        <ReportSharing />

        {/* Split grid of Gauges + AI Explanations + Chatbot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (Speedometer & Explainable metrics) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Credibility Gauge */}
              <div className="sm:col-span-1">
                <CredibilityGauge score={record.credibilityScore} />
              </div>

              {/* Reading Difficulty Panel */}
              <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between h-full min-h-[180px] text-left">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> Reading Difficulty
                  </span>
                  <div className="space-y-0.5 mt-2">
                    <p className="text-sm font-extrabold text-slate-200">Grade Level: 11</p>
                    <p className="text-[11px] font-bold text-slate-400">Complexity: Medium</p>
                    <p className="text-[11px] font-bold text-slate-400">Read Time: 4 min</p>
                  </div>
                </div>
                <span className="text-[9px] text-slate-500 font-semibold leading-normal block mt-4 border-t border-white/5 pt-2">
                  Synthesized through Flesch-Kincaid complexity indexes.
                </span>
              </div>

              {/* Credibility Dimensions Radar chart mock */}
              <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between h-full min-h-[180px] text-left">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5" /> Radar Dimensions
                  </span>
                  {/* Visual SVG Radar diagram */}
                  <div className="relative h-20 w-20 mx-auto mt-2 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-18">
                      {/* Web ring */}
                      <polygon points="40,5 75,30 65,75 15,75 5,30" fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                      <polygon points="40,15 65,35 55,65 25,65 15,35" fill="transparent" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      {/* Value Fill */}
                      <polygon points="40,10 70,32 58,68 28,60 18,34" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between text-[8px] text-slate-500 font-extrabold uppercase mt-2">
                  <span>Trust</span>
                  <span>Bias</span>
                  <span>Evid</span>
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
              Verification Claims
            </button>
            <button 
              onClick={() => setActiveTab('evidence')}
              className={`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 shrink-0 cursor-pointer ${
                activeTab === 'evidence' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Evidence Explorer
            </button>
            <button 
              onClick={() => setActiveTab('research')}
              className={`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 shrink-0 cursor-pointer ${
                activeTab === 'research' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Research & Citations
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
              onClick={() => setActiveTab('agents')}
              className={`pb-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 px-4 shrink-0 cursor-pointer ${
                activeTab === 'agents' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              Agent Execution Traces
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
              <div className="space-y-4 max-w-4xl mx-auto text-left">
                <EvidenceCard claims={record.claims} />
              </div>
            )}

            {activeTab === 'evidence' && (
              <EvidenceExplorer sources={record.suggestedSources} />
            )}

            {activeTab === 'research' && (
              <ResearchMode articleTitle={record.title} sourceUrl={`https://factlens.ai/report/${record.id}`} />
            )}

            {activeTab === 'study' && (
              <StudyMode articleTitle={record.title} />
            )}

            {activeTab === 'agents' && (
              <AgentConsole score={record.credibilityScore} />
            )}

            {activeTab === 'bias' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
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