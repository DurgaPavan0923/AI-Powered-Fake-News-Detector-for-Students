'use client';

import React, { useState } from 'react';
import GraphView from '@/components/graph/graph-view';
import NodeCard from '@/components/graph/node-card';
import Breadcrumbs from '@/components/shared/breadcrumbs';

export default function KnowledgeGraphExplorer() {
  const [selectedNode, setSelectedNode] = useState<{ label: string; type: string; description: string } | null>(null);

  // Global consolidated mock facts network representing school context
  const mockClaims = [
    { claim: 'NASA Kepler Rocky Habitable Exoplanet observations', entity: 'NASA Exoplanet Lab', status: 'Verified' },
    { claim: 'Global mean temp rose 1.1 degrees Celsius', entity: 'IPCC Panel', status: 'Verified' },
    { claim: 'Herbal secret infusion restores diabetic sugar levels', entity: 'Alternative Miracle Tea', status: 'False' }
  ];

  const mockSources = [
    { name: 'NASA Exoplanet Archives', url: 'https://exoplanets.nasa.gov', reliability: 'High' },
    { name: 'IPCC Chapter 3 Reports', url: 'https://www.ipcc.ch', reliability: 'High' },
    { name: 'World Health Organization WHO', url: 'https://www.who.int', reliability: 'High' }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Topic Graph' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Knowledge Graph Explorer</h1>
          <p className="text-xs text-slate-400">Map semantic linkages between isolated article claims, verified databases, and entities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GraphView 
              articleTitle="Workspace Knowledge Graph"
              claims={mockClaims}
              sources={mockSources}
              onSelectNode={setSelectedNode}
            />
          </div>
          <div>
            <NodeCard node={selectedNode} />
          </div>
        </div>
      </div>
    </div>
  );
}