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