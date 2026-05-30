const fs = require('fs');
const path = require('path');

const files = {};

function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. DASHBOARD NAVIGATION SUBPAGES
// -------------------------------------------------------------

// dashboard/page.tsx
define('app/dashboard/page.tsx', `
'use client';

import React from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useAnalysisStore } from '@/store/analysis.store';
import StatisticsCard from '@/components/dashboard/statistics-card';
import TopicTrends from '@/components/dashboard/topic-trends';
import HistoryTable from '@/components/dashboard/history-table';
import { FileSearch, Activity, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function DashboardIndex() {
  const { user } = useAuthStore();
  const { records } = useAnalysisStore();

  // Statistics summaries
  const totalAnalyzed = records.length;
  const avgCredibility = records.length > 0 
    ? Math.round(records.reduce((acc, r) => acc + r.credibilityScore, 0) / records.length) 
    : 0;
  const highRisk = records.filter(r => r.credibilityScore < 50).length;
  const verifiedRate = records.length > 0
    ? Math.round((records.filter(r => r.trustRating === 'High').length / records.length) * 100)
    : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Title greeting segment */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Student Workspace</h1>
        <p className="text-xs text-slate-400 font-medium">
          Welcome back, <strong className="text-slate-200">{user?.name || 'Researcher'}</strong>. Explore digital media integrity metrics.
        </p>
      </div>

      {/* Numerical Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard 
          title="Total Analyzed" 
          value={totalAnalyzed} 
          change="+18%" 
          isPositive={true} 
          icon={FileSearch} 
        />
        <StatisticsCard 
          title="Average Credibility" 
          value={\`\${avgCredibility}%\`} 
          change="+3.4%" 
          isPositive={true} 
          icon={Activity} 
        />
        <StatisticsCard 
          title="Verification Index" 
          value={\`\${verifiedRate}%\`} 
          change="+5.1%" 
          isPositive={true} 
          icon={ThumbsUp} 
        />
        <StatisticsCard 
          title="Flagged High Risk" 
          value={highRisk} 
          change="+12%" 
          isPositive={false} 
          icon={AlertTriangle} 
        />
      </div>

      {/* Trends & Charts grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Quick history preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider">Recent Analyses</h3>
            </div>
            <HistoryTable />
          </div>
        </div>

        <div>
          {/* Topics trend column */}
          <TopicTrends />
        </div>
      </div>

    </div>
  );
}
`);

// dashboard/history/page.tsx
define('app/dashboard/history/page.tsx', `
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
`);

// dashboard/analytics/page.tsx
define('app/dashboard/analytics/page.tsx', `
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
`);

// dashboard/bookmarks/page.tsx
define('app/dashboard/bookmarks/page.tsx', `
'use client';

import React from 'react';
import Link from 'next/link';
import { useAnalysisStore } from '@/store/analysis.store';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Bookmark, ArrowUpRight } from 'lucide-react';

export default function BookmarksPage() {
  const { records } = useAnalysisStore();
  const bookmarked = records.filter(r => r.bookmarked);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Bookmarks' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Saved Bookmarks</h1>
          <p className="text-xs text-slate-400">Pinned credibility evaluations and fact networks</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarked.length === 0 ? (
            <div className="col-span-full border border-white/5 rounded-2xl p-12 text-center text-xs text-slate-500 font-semibold bg-slate-900/40">
              <Bookmark className="h-8 w-8 text-slate-700 mx-auto mb-3" />
              No bookmarked analyses found. Star reports in the History Log to view them here.
            </div>
          ) : (
            bookmarked.map((r) => (
              <div key={r.id} className="p-6 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className={\`text-[10px] font-extrabold px-2 py-0.5 rounded-full border \${
                    r.credibilityScore >= 80 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20' : 'text-rose-400 border-rose-500/20 bg-rose-950/20'
                  }\`}>
                    Score: {r.credibilityScore}
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-200 line-clamp-2 leading-snug">{r.title}</h4>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-[10px] text-slate-500 font-medium">{r.date}</span>
                  <Link 
                    href={\`/analysis/\${r.id}\`}
                    className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:underline cursor-pointer"
                  >
                    Open Report
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
`);

// dashboard/reports/page.tsx
define('app/dashboard/reports/page.tsx', `
'use client';

import React from 'react';
import { useAnalysisStore } from '@/store/analysis.store';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { FileText, Download, Table } from 'lucide-react';

export default function ReportsPage() {
  const { records } = useAnalysisStore();

  const handleExportCSV = () => {
    // Generate CSV string
    const headers = ['ID', 'Title', 'Date', 'Type', 'Credibility Score', 'Fake Probability', 'Trust Rating'];
    const rows = records.map(r => [
      r.id,
      \`"\${r.title.replace(/"/g, '""')}"\`,
      r.date,
      r.type,
      r.credibilityScore,
      r.fakeProbability,
      r.trustRating
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', \`FactLens_Report_\${new Date().toISOString().slice(0, 10)}.csv\`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Reports' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Export Center</h1>
          <p className="text-xs text-slate-400">Download data sheets, statistics summaries, and school citation files</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-3">
              <Table className="h-8 w-8 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-200">Export History to CSV</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download a clean comma-separated values spreadsheet containing analysis scores, categorization metadata, and date timestamps.
              </p>
            </div>
            <button 
              onClick={handleExportCSV}
              className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" /> Download CSV Spreadsheet
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-3">
              <FileText className="h-8 w-8 text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-200">Interactive PDF Portfolios</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Individual PDF report documents containing visual charts, bias breakdown logs, and claim citation links can be downloaded from each article's details view.
              </p>
            </div>
            <div className="mt-6 text-center py-2.5 rounded-lg text-xs font-bold border border-white/10 bg-white/2 text-slate-500 select-none">
              Download from Report Details
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
`);

// dashboard/settings/page.tsx
define('app/dashboard/settings/page.tsx', `
'use client';

import React, { useState } from 'react';
import { useAnalysisStore } from '@/store/analysis.store';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Key, Database, RefreshCw, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SettingsPage() {
  const { activeApiKey, setApiKey } = useAnalysisStore();
  const [keyInput, setKeyInput] = useState(activeApiKey);
  const [saved, setSaved] = useState(false);

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(keyInput);
    setSaved(true);
    confetti({ particleCount: 60, spread: 45, origin: { y: 0.8 } });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Settings' }]} />
      
      <div className="space-y-6 max-w-xl">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-400 font-medium">Configure credentials, caches, and live database synchronizers</p>
        </div>

        {/* Saved Alert banner */}
        {saved && (
          <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> API Credentials saved successfully!
          </div>
        )}

        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6">
          <div className="flex items-center gap-2 text-slate-300">
            <Key className="h-5 w-5 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Gemini AI Credentials</h3>
          </div>

          <form onSubmit={handleSaveKeys} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gemini 2.5 Pro Key Override</label>
              <input 
                type="password"
                placeholder="AIzaSy..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono font-semibold"
              />
              <span className="text-[10px] text-slate-500 leading-normal block">
                Provide a personal Gemini key. If empty, the workspace uses standard in-memory simulation rules.
              </span>
            </div>

            <button type="submit" className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer">
              Save Configuration
            </button>
          </form>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Database className="h-5 w-5 text-indigo-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">Graph Sync Cache</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Flush or reset local storage analysis cache records. Note that this restores the default mock datasets.
          </p>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 text-slate-400" /> Flush Memory & Cache
          </button>
        </div>

      </div>
    </div>
  );
}
`);

// dashboard/notifications/page.tsx
define('app/dashboard/notifications/page.tsx', `
'use client';

import React from 'react';
import { useNotificationStore } from '@/store/notification.store';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Bell, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotificationStore();

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Notifications' }]} />
      
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Alert Center</h1>
            <p className="text-xs text-slate-400">Workspace updates, verification reviews, and administrative triggers</p>
          </div>
          <div className="flex gap-2">
            <button onClick={markAllAsRead} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 text-[11px] font-bold text-slate-200 cursor-pointer">Mark read</button>
            <button onClick={clearAll} className="px-3 py-1.5 rounded-lg border border-transparent text-[11px] font-bold text-rose-400 hover:bg-rose-950/20 cursor-pointer">Clear</button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="border border-white/5 rounded-2xl p-12 text-center text-xs text-slate-500 font-semibold bg-slate-900/40">
              <Bell className="h-8 w-8 text-slate-700 mx-auto mb-3" />
              Inbox empty. No new notifications.
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id} 
                onClick={() => markAsRead(n.id)}
                className={\`p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 hover:bg-white/2 \${
                  n.read ? 'bg-slate-900/30 border-white/5 text-slate-400' : 'bg-slate-900 border-white/10 text-slate-200'
                }\`}
              >
                <div className={\`h-2 w-2 rounded-full mt-1.5 shrink-0 \${
                  n.read ? 'bg-transparent' : (n.type === 'alert' ? 'bg-rose-500' : 'bg-cyan-500')
                }\`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{n.title}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))
          )}
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
console.log('Part 6 completed successfully.');
