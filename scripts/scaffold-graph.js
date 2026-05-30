const fs = require('fs');
const path = require('path');

const files = {};

function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. KNOWLEDGE GRAPH GRAPHICAL COMPONENT (SVG-based Drag & Drop)
// -------------------------------------------------------------

// graph-view.tsx
define('components/graph/graph-view.tsx', `
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RefreshCw, Info, HelpCircle } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'article' | 'claim' | 'entity' | 'source';
  x: number;
  y: number;
  radius: number;
  color: string;
  description: string;
}

interface Link {
  source: string;
  target: string;
  label: string;
}

interface GraphViewProps {
  articleTitle?: string;
  claims?: Array<{ claim: string; entity: string; status: string }>;
  sources?: Array<{ name: string; url: string; reliability: string }>;
  onSelectNode?: (node: { label: string; type: string; description: string } | null) => void;
}

export default function GraphView({ articleTitle = 'Primary Document', claims = [], sources = [], onSelectNode }: GraphViewProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const containerRef = useRef<SVGSVGElement | null>(null);

  // Initialize network layout around center
  useEffect(() => {
    const width = 800;
    const height = 450;
    const centerX = width / 2;
    const centerY = height / 2;

    const initialNodes: Node[] = [];
    const initialLinks: Link[] = [];

    // Root Article Node
    initialNodes.push({
      id: 'root',
      label: articleTitle.length > 30 ? articleTitle.slice(0, 30) + '...' : articleTitle,
      type: 'article',
      x: centerX,
      y: centerY,
      radius: 22,
      color: '#6366f1', // Indigo
      description: 'The primary document submitted for analysis. Source text coordinates are extracted relative to this.'
    });

    // Claims Nodes (placed in an upper semicircle)
    claims.forEach((c, idx) => {
      const angle = Math.PI + (idx + 1) * (Math.PI / (claims.length + 1));
      const distance = 140;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const id = \`claim_\${idx}\`;

      initialNodes.push({
        id,
        label: c.claim.length > 25 ? c.claim.slice(0, 25) + '...' : c.claim,
        type: 'claim',
        x,
        y: y - 20, // Offset upwards
        radius: 16,
        color: c.status === 'Verified' ? '#10b981' : (c.status === 'False' ? '#f43f5e' : '#f59e0b'), // Green, Red, Yellow
        description: \`[Claim] "\${c.claim}". Status determined to be \${c.status}.\`
      });

      initialLinks.push({
        source: 'root',
        target: id,
        label: 'asserts'
      });

      // Target Entity Node linked to Claim
      const entId = \`entity_\${idx}\`;
      initialNodes.push({
        id: entId,
        label: c.entity,
        type: 'entity',
        x: x + Math.cos(angle - 0.3) * 80,
        y: (y - 20) + Math.sin(angle - 0.3) * 80,
        radius: 12,
        color: '#a855f7', // Purple
        description: \`[Entity] \${c.entity}. Identified as key participant in the claim.\`
      });

      initialLinks.push({
        source: id,
        target: entId,
        label: 'involves'
      });
    });

    // Sources Nodes (placed in a lower semicircle)
    sources.forEach((s, idx) => {
      const angle = (idx + 1) * (Math.PI / (sources.length + 1));
      const distance = 140;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const id = \`source_\${idx}\`;

      initialNodes.push({
        id,
        label: s.name,
        type: 'source',
        x,
        y: y + 20, // Offset downwards
        radius: 16,
        color: '#06b6d4', // Cyan
        description: \`[Source Database] \${s.name}. Reliability rated as \${s.reliability}.\`
      });

      initialLinks.push({
        source: 'root',
        target: id,
        label: 'references'
      });

      // Connect sources back to claims to simulate verification edges
      claims.forEach((c, cIdx) => {
        if (cIdx === idx || (idx === 0 && cIdx === claims.length - 1)) {
          initialLinks.push({
            source: id,
            target: \`claim_\${cIdx}\`,
            label: s.reliability === 'High' ? 'verifies' : 'challenges'
          });
        }
      });
    });

    setNodes(initialNodes);
    setLinks(initialLinks);
  }, [articleTitle, claims, sources]);

  // Handle Drag & Drop SVG elements
  const handleMouseDown = (nodeId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setDraggedNode(nodeId);
    setSelectedNodeId(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    if (node && onSelectNode) {
      onSelectNode({ label: node.label, type: node.type, description: node.description });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNode || !containerRef.current) return;
    
    // Get mouse position relative to SVG element canvas
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;

    setNodes(prev => prev.map(n => n.id === draggedNode ? { ...n, x: mouseX, y: mouseY } : n));
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const resetPositions = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="relative border border-white/10 rounded-2xl bg-slate-950 overflow-hidden shadow-2xl">
      {/* Legend overlays */}
      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-white/5 space-y-1.5 z-10 text-[10px] text-slate-400 select-none">
        <p className="font-bold uppercase text-[9px] text-slate-500 tracking-wider mb-1">Graph Legend</p>
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-indigo-500" /> Primary Article</div>
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Verified Claim</div>
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> False Claim</div>
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-purple-500" /> Named Entity</div>
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-cyan-500" /> Evidence Source</div>
      </div>

      <div className="absolute top-4 right-4 flex gap-1.5 z-10">
        <button onClick={() => setZoom(z => Math.min(z + 0.15, 2.5))} className="p-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:bg-slate-800 transition-colors"><ZoomIn className="h-4 w-4" /></button>
        <button onClick={() => setZoom(z => Math.max(z - 0.15, 0.5))} className="p-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:bg-slate-800 transition-colors"><ZoomOut className="h-4 w-4" /></button>
        <button onClick={resetPositions} className="p-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:bg-slate-800 transition-colors"><RefreshCw className="h-4 w-4" /></button>
      </div>

      {/* SVG Canvas drawing nodes and links */}
      <svg 
        ref={containerRef}
        className="w-full h-[450px] cursor-grab active:cursor-grabbing select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={\`translate(\${pan.x}, \${pan.y}) scale(\${zoom})\`}>
          {/* Link lines */}
          {links.map((link, i) => {
            const src = nodes.find(n => n.id === link.source);
            const tgt = nodes.find(n => n.id === link.target);
            if (!src || !tgt) return null;

            return (
              <g key={i}>
                <line 
                  x1={src.x} 
                  y1={src.y} 
                  x2={tgt.x} 
                  y2={tgt.y} 
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2" 
                />
                {/* Link label center tag */}
                <text
                  x={(src.x + tgt.x) / 2}
                  y={(src.y + tgt.y) / 2 - 4}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="8"
                  fontWeight="bold"
                  className="bg-slate-950 px-1 py-0.5 rounded"
                >
                  {link.label}
                </text>
              </g>
            );
          })}

          {/* Node circles */}
          {nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <g 
                key={node.id} 
                transform={\`translate(\${node.x}, \${node.y})\`}
                onMouseDown={(e) => handleMouseDown(node.id, e)}
                className="cursor-pointer"
              >
                {/* Selection shadow */}
                {isSelected && (
                  <circle 
                    r={node.radius + 6} 
                    fill="transparent" 
                    stroke="rgba(6, 182, 212, 0.4)" 
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    className="animate-spin-slow"
                  />
                )}
                {/* Circle base */}
                <circle 
                  r={node.radius} 
                  fill={node.color} 
                  stroke="#020617" 
                  strokeWidth="2"
                  className="shadow-2xl shadow-indigo-500/20"
                />
                {/* Inside icon details */}
                <text
                  y="4"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  {node.type.slice(0, 1).toUpperCase()}
                </text>
                {/* Node Label underneath */}
                <text
                  y={node.radius + 14}
                  textAnchor="middle"
                  fill={isSelected ? '#22d3ee' : '#cbd5e1'}
                  fontSize="9.5"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <div className="bg-slate-900 border-t border-white/5 p-3 text-center text-[10px] text-slate-500 font-medium">
        💡 Drag nodes around to customize mapping. Click a node to inspect parameters.
      </div>
    </div>
  );
}
`);

// node-card.tsx
define('components/graph/node-card.tsx', `
import React from 'react';
import { Info, Network, AlertCircle } from 'lucide-react';

interface NodeDetails {
  label: string;
  type: string;
  description: string;
}

interface NodeCardProps {
  node: NodeDetails | null;
}

export default function NodeCard({ node }: NodeCardProps) {
  if (!node) {
    return (
      <div className="border border-white/10 rounded-2xl bg-slate-900/60 p-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
        <Network className="h-8 w-8 text-slate-600 mb-3" />
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          Select an entity or claim in the Knowledge Graph to view extraction mapping details.
        </p>
      </div>
    );
  }

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'article': return 'bg-indigo-950 text-indigo-300 border-indigo-500/30';
      case 'claim': return 'bg-amber-950 text-amber-300 border-amber-500/30';
      case 'entity': return 'bg-purple-950 text-purple-300 border-purple-500/30';
      case 'source': return 'bg-cyan-950 text-cyan-300 border-cyan-500/30';
      default: return 'bg-slate-800 text-slate-300 border-white/10';
    }
  };

  return (
    <div className="border border-white/10 rounded-2xl bg-slate-900/60 p-5 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <span className={\`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border \${getTypeStyle(node.type)}\`}>
          {node.type}
        </span>
        <div className="flex items-center gap-1 text-slate-500">
          <Info className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-sm font-extrabold text-slate-200">{node.label}</h4>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed bg-black/15 p-3 rounded-lg border border-white/5">
        {node.description}
      </p>

      <div className="flex items-start gap-2 text-[10px] text-slate-500 leading-normal">
        <AlertCircle className="h-3.5 w-3.5 text-slate-600 shrink-0 mt-0.5" />
        <span>Nodes represent claims or elements verified via Gemini RAG pipeline. Connections are synced to AuraDB database records.</span>
      </div>
    </div>
  );
}
`);

// -------------------------------------------------------------
// 2. DASHBOARD VISUALIZATIONS
// -------------------------------------------------------------

// analytics-chart.tsx
define('components/dashboard/analytics-chart.tsx', `
'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

const HISTORICAL_DATA = [
  { name: 'Mon', analyses: 4, score: 72 },
  { name: 'Tue', analyses: 6, score: 85 },
  { name: 'Wed', analyses: 3, score: 92 },
  { name: 'Thu', analyses: 8, score: 68 },
  { name: 'Fri', analyses: 5, score: 78 },
  { name: 'Sat', analyses: 2, score: 88 },
  { name: 'Sun', analyses: 1, score: 90 }
];

const CATEGORY_DATA = [
  { name: 'Scientific', count: 18, color: '#06b6d4' },
  { name: 'Political', count: 12, color: '#6366f1' },
  { name: 'Medical', count: 8, color: '#f43f5e' },
  { name: 'Financial', count: 5, color: '#10b981' }
];

export default function AnalyticsChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Line Chart */}
      <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Credibility Trend (Last 7 Days)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={HISTORICAL_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold' }}
                itemStyle={{ fontSize: '12px', color: '#38bdf8' }}
              />
              <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={2.5} activeDot={{ r: 6 }} name="Credibility Index" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Analysis Distribution by Category</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CATEGORY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Analyses Count">
                {CATEGORY_DATA.map((entry, index) => (
                  <Cell key={\`cell-\${index}\`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
`);

// history-table.tsx
define('components/dashboard/history-table.tsx', `
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAnalysisStore, AnalysisRecord } from '@/store/analysis.store';
import { BookmarksIcon, FileText, Search, Trash2, ArrowUpRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function HistoryTable() {
  const { records, deleteRecord, toggleBookmark } = useAnalysisStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = records.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.trustRating.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-950/20 border-emerald-500/20';
    if (score >= 60) return 'text-cyan-400 bg-cyan-950/20 border-cyan-500/20';
    if (score >= 40) return 'text-amber-400 bg-amber-950/20 border-amber-500/20';
    return 'text-rose-400 bg-rose-950/20 border-rose-500/20';
  };

  return (
    <div className="space-y-4">
      {/* Search Filter Header */}
      <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-xl bg-slate-900/60 max-w-md">
        <Search className="h-4 w-4 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search by topic title or trust rating..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none text-xs text-slate-200 outline-none w-full placeholder-slate-500 font-semibold"
        />
      </div>

      {/* Table grid */}
      <div className="border border-white/10 rounded-2xl bg-slate-900/30 overflow-hidden backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/2 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              <th className="py-4 px-6">Topic / Title</th>
              <th className="py-4 px-4 text-center">Score</th>
              <th className="py-4 px-4 text-center">Risk Factor</th>
              <th className="py-4 px-4 text-center">Input Source</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-xs font-semibold text-slate-500">
                  No analysis records match search criteria. Try another keyword.
                </td>
              </tr>
            ) : (
              filtered.map((record) => (
                <tr key={record.id} className="text-xs hover:bg-white/2 transition-colors">
                  
                  {/* Topic Title */}
                  <td className="py-4.5 px-6 max-w-sm">
                    <p className="font-extrabold text-slate-200 truncate">{record.title}</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">{record.date}</p>
                  </td>

                  {/* Score Gauge Badge */}
                  <td className="py-4.5 px-4 text-center">
                    <span className={\`px-2.5 py-1 text-[11px] font-extrabold rounded-md border \${getScoreColor(record.credibilityScore)}\`}>
                      {record.credibilityScore} / 100
                    </span>
                  </td>

                  {/* Trust Rating Category */}
                  <td className="py-4.5 px-4 text-center">
                    <span className={\`font-bold \${record.trustRating === 'High' ? 'text-emerald-400' : (record.trustRating === 'Low' ? 'text-rose-400' : 'text-amber-400')}\`}>
                      {record.trustRating} Trust
                    </span>
                  </td>

                  {/* Input Source type */}
                  <td className="py-4.5 px-4 text-center uppercase text-[10px] font-bold text-slate-400">
                    {record.type}
                  </td>

                  {/* Actions column */}
                  <td className="py-4.5 px-6 text-right space-x-2">
                    <button 
                      onClick={() => toggleBookmark(record.id)}
                      className={\`p-1.5 rounded-lg border hover:scale-105 transition-all cursor-pointer \${
                        record.bookmarked 
                          ? 'text-amber-400 bg-amber-950/20 border-amber-500/30' 
                          : 'text-slate-500 hover:text-slate-300 border-white/5 hover:bg-white/5'
                      }\`}
                      title="Bookmark analysis"
                    >
                      ★
                    </button>
                    <Link 
                      href={\`/analysis/\${record.id}\`}
                      className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-cyan-950/40 text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 hover:scale-105 transition-all cursor-pointer"
                      title="Open Report detail"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <button 
                      onClick={() => deleteRecord(record.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-500/20 hover:scale-105 transition-all cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`);

// topic-trends.tsx
define('components/dashboard/topic-trends.tsx', `
import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

const TRENDS = [
  { topic: 'Kepler-452b Habitable Planets', count: 124, score: 88, status: 'Credible' },
  { topic: 'Alternative Diabetes Herbal Tea Cures', count: 98, score: 45, status: 'Suspicious' },
  { topic: 'Weekly CO2 Atmospheric Peaks', count: 82, score: 92, status: 'Credible' },
  { topic: 'Artemis Mars Colonization Timelines', count: 64, score: 68, status: 'Mixed' }
];

export default function TopicTrends() {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-cyan-400" />
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Analyzed Topics</h3>
      </div>
      
      <div className="space-y-3">
        {TRENDS.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/2 border border-white/5">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-slate-200">{t.topic}</span>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                <span>{t.count} student requests</span>
                <span>•</span>
                <span className={\`font-bold \${
                  t.status === 'Credible' ? 'text-emerald-400' : (t.status === 'Suspicious' ? 'text-rose-400' : 'text-amber-400')
                }\`}>
                  {t.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-slate-200">{t.score}%</span>
              <span className="text-[9px] text-slate-500 font-bold block mt-0.5">Trust rating</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

// statistics-card.tsx
define('components/dashboard/statistics-card.tsx', `
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export default function StatisticsCard({ title, value, change, isPositive, icon: Icon }: StatisticsCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg shadow-slate-950/20 flex justify-between items-start select-none">
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">{value}</h2>
        
        <div className="flex items-center gap-1.5">
          <span className={\`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded \${
            isPositive ? 'text-emerald-400 bg-emerald-950/30' : 'text-rose-400 bg-rose-950/30'
          }\`}>
            {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {change}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">vs last month</span>
        </div>
      </div>
      
      <div className="rounded-xl bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 p-2.5 border border-cyan-500/20 text-cyan-400">
        <Icon className="h-5 w-5" />
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
console.log('Part 3 completed successfully.');
