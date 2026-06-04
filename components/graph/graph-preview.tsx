'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Network, ArrowUpRight } from 'lucide-react';

interface PreviewNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  color: string;
}

export default function GraphPreview() {
  const [nodes, setNodes] = useState<PreviewNode[]>([
    { id: 'art', label: 'Mars Expedition', type: 'article', x: 150, y: 100, color: '#6366f1' },
    { id: 'clm', label: 'Life on Mars 2028', type: 'claim', x: 70, y: 50, color: '#f59e0b' },
    { id: 'src', label: 'NASA Archives', type: 'source', x: 230, y: 50, color: '#06b6d4' },
    { id: 'ent', label: 'SpaceX Mission', type: 'entity', x: 150, y: 160, color: '#a855f7' }
  ]);

  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setDraggedId(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setNodes(prev => prev.map(n => n.id === draggedId ? { ...n, x, y } : n));
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interactive Graph Preview</h3>
        </div>
        <Link href="/knowledge-graph" className="flex items-center gap-1 text-[10px] font-bold text-cyan-400 hover:underline cursor-pointer">
          Open Graph Explorer <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div 
        className="w-full h-44 bg-slate-950 border border-white/5 rounded-xl overflow-hidden relative cursor-grab active:cursor-grabbing select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={() => setDraggedId(null)}
        onMouseLeave={() => setDraggedId(null)}
      >
        <svg viewBox="0 0 300 176" className="w-full h-full">
          {/* Render lines */}
          <line x1={nodes[0].x} y1={nodes[0].y} x2={nodes[1].x} y2={nodes[1].y} stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <line x1={nodes[0].x} y1={nodes[0].y} x2={nodes[2].x} y2={nodes[2].y} stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <line x1={nodes[0].x} y1={nodes[0].y} x2={nodes[3].x} y2={nodes[3].y} stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

          {/* Render circles */}
          {nodes.map(n => (
            <circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={n.id === 'art' ? 14 : 10}
              fill={n.color}
              stroke="#020617"
              strokeWidth="2"
              onMouseDown={(e) => handleMouseDown(n.id, e)}
            />
          ))}
        </svg>
        <div className="absolute bottom-2.5 left-3 text-[9px] text-slate-500 font-medium">
          💡 Try dragging graph nodes directly.
        </div>
      </div>
    </div>
  );
}