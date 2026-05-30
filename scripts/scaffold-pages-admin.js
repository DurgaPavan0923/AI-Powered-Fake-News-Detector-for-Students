const fs = require('fs');
const path = require('path');

const files = {};

function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. ADMIN PAGES
// -------------------------------------------------------------

// admin/page.tsx
define('app/admin/page.tsx', `
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
`);

// admin/users/page.tsx
define('app/admin/users/page.tsx', `
'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { useAuthStore } from '@/store/auth.store';
import { UserCheck, ShieldAlert, Award } from 'lucide-react';

const MOCK_USERS = [
  { id: 'usr_1', name: 'Alex Mercer', email: 'alex.mercer@academy.edu', role: 'Student', status: 'Active' },
  { id: 'usr_2', name: 'Sarah Connor', email: 'sarah.c@academy.edu', role: 'Student', status: 'Active' },
  { id: 'usr_3', name: 'Dr. Bruce Banner', email: 'banner.b@academy.edu', role: 'Admin', status: 'Active' },
  { id: 'usr_4', name: 'Clark Kent', email: 'kent.c@dailyplanet.edu', role: 'Student', status: 'Flagged' }
];

export default function AdminUsersPage() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState(MOCK_USERS);

  if (user?.role !== 'Admin') {
    return <div className="p-12 text-center text-slate-400 text-xs">Access Denied.</div>;
  }

  const toggleUserRole = (id: string) => {
    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, role: u.role === 'Student' ? 'Admin' : 'Student' } : u
    ));
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Admin Hub', href: '/admin' }, { name: 'User Management' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">User Registrations</h1>
          <p className="text-xs text-slate-400">supervise active student workloads and toggling roles</p>
        </div>

        <div className="border border-white/10 rounded-2xl bg-slate-900/30 overflow-hidden backdrop-blur-md max-w-4xl select-none">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/2 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                <th className="py-4 px-6">User / Researcher</th>
                <th className="py-4 px-4 text-center">System Role</th>
                <th className="py-4 px-4 text-center">Security Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-white/2 transition-colors">
                  <td className="py-4.5 px-6">
                    <p className="font-extrabold text-slate-200">{u.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-semibold">{u.email}</p>
                  </td>
                  <td className="py-4.5 px-4 text-center">
                    <span className={\`px-2.5 py-0.5 rounded text-[11px] font-extrabold border \${
                      u.role === 'Admin' ? 'text-violet-400 bg-violet-950/20 border-violet-500/20' : 'text-cyan-400 bg-cyan-950/20 border-cyan-500/20'
                    }\`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4.5 px-4 text-center">
                    <span className={\`font-bold \${u.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}\`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4.5 px-6 text-right">
                    <button 
                      onClick={() => toggleUserRole(u.id)}
                      className="px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-200 transition-colors cursor-pointer"
                    >
                      Toggle Privilege Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
`);

// admin/sources/page.tsx
define('app/admin/sources/page.tsx', `
'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { useAuthStore } from '@/store/auth.store';
import { TRUSTED_SOURCES } from '@/lib/constants';
import { PlusCircle, Globe, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminSourcesPage() {
  const { user } = useAuthStore();
  const [sources, setSources] = useState(TRUSTED_SOURCES);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('Academic Research');
  const [trust, setTrust] = useState<'High' | 'Medium' | 'Low'>('High');

  if (user?.role !== 'Admin') {
    return <div className="p-12 text-center text-slate-400 text-xs">Access Denied.</div>;
  }

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !domain) return;
    
    setSources(prev => [
      { name, domain, category, trustRating: trust },
      ...prev
    ]);
    
    confetti({ particleCount: 50, spread: 30 });
    setName('');
    setDomain('');
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Admin Hub', href: '/admin' }, { name: 'Sources Library' }]} />
      
      <div className="space-y-8 max-w-4xl select-none">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Whitelisted Domains</h1>
          <p className="text-xs text-slate-400">Configure trustworthy databases for automated RAG cross-references</p>
        </div>

        {/* Add Source form */}
        <form onSubmit={handleAddSource} className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Source Name</label>
            <input type="text" placeholder="Science Hub" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Web Domain</label>
            <input type="text" placeholder="sciencehub.org" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold">
              <option value="Academic Journal">Academic Journal</option>
              <option value="Government & Space">Government & Space</option>
              <option value="Global Health">Global Health</option>
              <option value="Fact Checking">Fact Checking</option>
            </select>
          </div>
          <button type="submit" className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1">
            <PlusCircle className="h-4 w-4" /> Whitelist
          </button>
        </form>

        {/* List of sources */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sources.map((s, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-extrabold text-slate-200">{s.name}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">{s.domain} • {s.category}</p>
              </div>
              <span className="flex items-center gap-0.5 text-[9px] font-extrabold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/20 border border-emerald-500/20">
                <ShieldCheck className="h-3 w-3" /> whitelisted
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
`);

// admin/moderation/page.tsx
define('app/admin/moderation/page.tsx', `
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
`);

// admin/feature-flags/page.tsx
define('app/admin/feature-flags/page.tsx', `
'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { useAuthStore } from '@/store/auth.store';
import { ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminFeatureFlagsPage() {
  const { user } = useAuthStore();
  const [flags, setFlags] = useState({
    geminiLive: false,
    pineconeRag: false,
    neo4jAura: false,
    redisCache: false
  });

  if (user?.role !== 'Admin') {
    return <div className="p-12 text-center text-slate-400 text-xs">Access Denied.</div>;
  }

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Admin Hub', href: '/admin' }, { name: 'Telemetry Flags' }]} />
      
      <div className="space-y-6 max-w-xl select-none">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">API Connectivity Toggles</h1>
          <p className="text-xs text-slate-400">Enable/disable external services. Inactive flags redirect to local simulated models.</p>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
          
          {Object.entries(flags).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between p-3.5 border border-white/5 rounded-xl bg-white/2">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-200 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')} Service
                </span>
                <p className="text-[10px] text-slate-500 font-semibold">
                  {val ? 'Connected to live cloud API' : 'Simulating locally via high-fidelity fallback rulebooks'}
                </p>
              </div>
              <button 
                onClick={() => toggleFlag(key as any)}
                className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {val ? (
                  <ToggleRight className="h-9 w-9 text-cyan-400" />
                ) : (
                  <ToggleLeft className="h-9 w-9 text-slate-600" />
                )}
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
`);

// -------------------------------------------------------------
// 2. KNOWLEDGE GRAPH EXPLORER PAGE
// -------------------------------------------------------------

// knowledge-graph/page.tsx
define('app/knowledge-graph/page.tsx', `
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
`);

// Write files to system
Object.keys(files).forEach((filePath) => {
  const fullPath = path.join(__dirname, '..', filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, files[filePath].trim());
  console.log('Scaffolded:', filePath);
});
console.log('Part 8 completed successfully.');
