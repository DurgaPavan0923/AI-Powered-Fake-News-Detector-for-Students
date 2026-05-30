'use client';

import React from 'react';
import ApiPlayground from '@/components/dashboard/api-playground';
import Breadcrumbs from '@/components/shared/breadcrumbs';

export default function ApiPlaygroundPage() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Settings', href: '/dashboard/settings' }, { name: 'Developer API' }]} />
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">API Reference Documentation</h1>
          <p className="text-xs text-slate-400">Integrate FactLens verification consensus engines directly within school tools.</p>
        </div>
        <ApiPlayground />
      </div>
    </div>
  );
}