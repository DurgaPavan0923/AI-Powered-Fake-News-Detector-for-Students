'use client';

import React from 'react';
import HistoryTable from '@/components/dashboard/history-table';
import Breadcrumbs from '@/components/shared/breadcrumbs';

export default function HistoryPage() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'History Logs' }]} />
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Analysis History</h1>
          <p className="text-xs text-slate-400">View and manage all past credibility scoring operations</p>
        </div>
        <HistoryTable />
      </div>
    </div>
  );
}