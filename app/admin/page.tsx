'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Users, Shield, ShieldAlert, Zap, BookOpen, AlertCircle, FileSpreadsheet } from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  if (user?.role !== 'Admin') {
    return (
      <div className="p-12 text-center text-slate-400 text-xs select-none">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-4" />
        Administrative privileges required to access this control deck.
      </div>
    );
  }

  const sections = [
    { name: 'User Management', href: '/admin/users', desc: 'Manage registered students, adjust verification limit caps, and toggle access roles.', icon: Users },
    { name: 'Sources Library', href: '/admin/sources', desc: 'Flag trusted consensus databases (academic, WHO, NASA) or blacklist Clickbait sites.', icon: BookOpen },
    { name: 'System Moderation', href: '/admin/moderation', desc: 'Inspect flagged content queue, report false negatives, and flush graph nodes.', icon: ShieldAlert },
    { name: 'Telemetry Flags', href: '/admin/feature-flags', desc: 'Toggle live API integrations for Pinecone, Neo4j, Gemini, and Ably caches.', icon: Zap }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Admin Hub' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">System Control Center</h1>
          <p className="text-xs text-slate-400 font-medium">Orchestrate fact-verification metrics, Whitelist domains, and supervise user profiles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mt-8">
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div 
                key={i} 
                onClick={() => router.push(sec.href)}
                className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 cursor-pointer transition-all flex flex-col justify-between h-48 select-none"
              >
                <div className="space-y-3">
                  <div className="h-9 w-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-200">{sec.name}</h3>
                  <p className="text-xs text-slate-400 leading-normal">{sec.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}