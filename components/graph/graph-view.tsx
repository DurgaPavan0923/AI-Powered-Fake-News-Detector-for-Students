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
      const id = `claim_${idx}`;

      initialNodes.push({
        id,
        label: c.claim.length > 25 ? c.claim.slice(0, 25) + '...' : c.claim,
        type: 'claim',
        x,
        y: y - 20, // Offset upwards
        radius: 16,
        color: c.status === 'Verified' ? '#10b981' : (c.status === 'False' ? '#f43f5e' : '#f59e0b'), // Green, Red, Yellow
        description: `[Claim] "${c.claim}". Status determined to be ${c.status}.`
      });

      initialLinks.push({
        source: 'root',
        target: id,
        label: 'asserts'
      });

      // Target Entity Node linked to Claim
      const entId = `entity_${idx}`;
      initialNodes.push({
        id: entId,
        label: c.entity,
        type: 'entity',
        x: x + Math.cos(angle - 0.3) * 80,
        y: (y - 20) + Math.sin(angle - 0.3) * 80,
        radius: 12,
        color: '#a855f7', // Purple
        description: `[Entity] ${c.entity}. Identified as key participant in the claim.`
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
      const id = `source_${idx}`;

      initialNodes.push({
        id,
        label: s.name,
        type: 'source',
        x,
        y: y + 20, // Offset downwards
        radius: 16,
        color: '#06b6d4', // Cyan
        description: `[Source Database] ${s.name}. Reliability rated as ${s.reliability}.`
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
            target: `claim_${cIdx}`,
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
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
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
                transform={`translate(${node.x}, ${node.y})`}
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