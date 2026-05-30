'use client';

import React from 'react';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { useAuthStore } from '@/store/auth.store';
import { ShieldAlert, Check } from 'lucide-react';

export default function AdminModerationPage() {
  const { user } = useAuthStore();

  if (user?.role !== 'Admin') {
    return <div className="p-12 text-center text-slate-400 text-xs">Access Denied.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Admin Hub', href: '/admin' }, { name: 'System Moderation' }]} />
      
      <div className="space-y-6 max-w-xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Moderation Queue</h1>
          <p className="text-xs text-slate-400">Address flagged assertions and false-negative submissions</p>
        </div>

        <div className="border border-white/5 rounded-2xl p-12 text-center text-xs text-slate-500 font-semibold bg-slate-900/40 select-none">
          <ShieldAlert className="h-8 w-8 text-slate-700 mx-auto mb-3" />
          No items flagged for manual audit review. FactLens AI databases are synchronized.
        </div>
      </div>
    </div>
  );
}