'use client';

import React from 'react';
import AnalyticsChart from '@/components/dashboard/analytics-chart';
import Breadcrumbs from '@/components/shared/breadcrumbs';

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Analytics' }]} />
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Dashboard Analytics</h1>
          <p className="text-xs text-slate-400">Track source reliability scores and categories distribution</p>
        </div>
        <AnalyticsChart />
      </div>
    </div>
  );
}