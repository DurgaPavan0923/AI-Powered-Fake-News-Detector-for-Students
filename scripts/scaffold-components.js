const fs = require('fs');
const path = require('path');

const files = {};

function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. SHARED COMPONENTS
// -------------------------------------------------------------

// navbar.tsx
define('components/shared/navbar.tsx', `
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useNotificationStore } from '@/store/notification.store';
import { Bell, ShieldAlert, Sparkles, User as UserIcon, LogOut, CheckCircle, GraduationCap, Moon } from 'lucide-react';

export default function Navbar() {
  const { user, logout, toggleRole } = useAuthStore();
  const { notifications, markAllAsRead } = useNotificationStore();
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-500 p-2 shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
            <ShieldAlert className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-200 to-violet-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
            FactLens <span className="text-cyan-400">AI</span>
          </span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          
          {/* Dashboard Quicklink */}
          {user && (
            <Link 
              href="/dashboard" 
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 transition-colors border border-white/10"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              Go to Workspace
            </Link>
          )}

          {/* Role Toggle Flagger */}
          {user && (
            <button
              onClick={toggleRole}
              title="Toggle Student vs Admin View"
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/40 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              Role: {user.role}
            </button>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setNotiOpen(!notiOpen); setDropdownOpen(false); }}
              className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {notiOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-xl border border-white/10 bg-slate-900 shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-slate-200">Alert Center</span>
                  <button 
                    onClick={() => { markAllAsRead(); }} 
                    className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                  >
                    Clear Unread
                  </button>
                </div>
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-500">No new notifications.</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={\`p-2.5 rounded-lg text-left transition-colors border \${n.read ? 'bg-transparent border-transparent' : 'bg-white/5 border-white/5'}\`}>
                        <div className="flex items-center justify-between">
                          <span className={\`text-xs font-semibold \${n.type === 'alert' ? 'text-rose-400' : 'text-slate-200'}\`}>{n.title}</span>
                          <span className="text-[9px] text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile User Panel */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => { setDropdownOpen(!dropdownOpen); setNotiOpen(false); }}
                className="flex items-center gap-2 p-1.5 pr-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
              >
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-xs font-bold text-white uppercase">
                  {user.name.slice(0,2)}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-bold text-slate-200 leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{user.role}</p>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/5 bg-white/2 font-medium">
                    <p className="text-xs text-slate-200 font-bold">{user.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 truncate">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <Link href="/dashboard/settings" onClick={() => setDropdownOpen(false)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-white/5 transition-all">
                      <UserIcon className="h-4 w-4 text-slate-400" />
                      Settings & API Keys
                    </Link>
                    <button 
                      onClick={() => { setDropdownOpen(false); logout(); router.push('/'); }} 
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/20 transition-all text-left cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-100 transition-all duration-300"
            >
              Sign In
            </Link>
          )}

        </div>

      </div>
    </header>
  );
}
`);

// sidebar.tsx
define('components/shared/sidebar.tsx', `
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { 
  LayoutDashboard, 
  History, 
  Bookmark, 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  ListFilter,
  Shield,
  PlusCircle,
  Network
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Analyze Content', href: '/analysis', icon: PlusCircle },
    { name: 'History Logs', href: '/dashboard/history', icon: History },
    { name: 'Saved Bookmarks', href: '/dashboard/bookmarks', icon: Bookmark },
    { name: 'Topic Graph', href: '/knowledge-graph', icon: Network },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Export Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'System Settings', href: '/dashboard/settings', icon: Settings }
  ];

  const adminLinks = [
    { name: 'Admin Hub', href: '/admin', icon: Shield },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Sources Library', href: '/admin/sources', icon: ListFilter }
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-slate-950 px-4 py-6 shrink-0 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase px-3 block">Navigation</span>
          <nav className="mt-3 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={\`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all border \${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-300 border-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                  }\`}
                >
                  <Icon className={\`h-4.5 w-4.5 \${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}\`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {user?.role === 'Admin' && (
          <div>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase px-3 block">Admin Tools</span>
            <nav className="mt-3 space-y-1">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={\`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all border \${
                      isActive
                        ? 'bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-300 border-violet-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                    }\`}
                  >
                    <Icon className={\`h-4.5 w-4.5 \${isActive ? 'text-violet-400' : 'text-slate-400'}\`} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/5 bg-gradient-to-br from-cyan-950/20 to-slate-900 p-3">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">System Health</p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-300">Live Simulation Mode</span>
        </div>
      </div>
    </aside>
  );
}
`);

// footer.tsx
define('components/shared/footer.tsx', `
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950 py-6 px-6 text-center">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <p className="text-xs text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} FactLens AI. Dedicated to digital literacy, objective journalism, and research excellence.
        </p>
        <div className="flex items-center gap-6 text-xs font-semibold text-slate-400">
          <Link href="/about" className="hover:text-slate-200 transition-colors">About</Link>
          <Link href="/features" className="hover:text-slate-200 transition-colors">Features</Link>
          <Link href="/privacy" className="hover:text-slate-200 transition-colors">Privacy & Guidelines</Link>
          <Link href="/contact" className="hover:text-slate-200 transition-colors">Contact Support</Link>
        </div>
      </div>
    </footer>
  );
}
`);

// breadcrumbs.tsx
define('components/shared/breadcrumbs.tsx', `
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{ name: string; href?: string }>;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-500 font-semibold mb-6">
      <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3 w-3 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-300 transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-slate-300 font-bold truncate max-w-[200px]">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
`);

// -------------------------------------------------------------
// 2. ANALYSIS VISUAL COMPONENTS
// -------------------------------------------------------------

// credibility-score.tsx
define('components/analysis/credibility-score.tsx', `
'use client';

import React, { useEffect, useState } from 'react';

interface CredibilityScoreProps {
  score: number;
}

export default function CredibilityScore({ score }: CredibilityScoreProps) {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Direct count animation
      let start = 0;
      const duration = 1000;
      const stepTime = 15;
      const step = (score / duration) * stepTime;
      
      const interval = setInterval(() => {
        start += step;
        if (start >= score) {
          setCurrentScore(score);
          clearInterval(interval);
        } else {
          setCurrentScore(Math.floor(start));
        }
      }, stepTime);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Color mapping based on score
  const getColorClasses = (val: number) => {
    if (val >= 80) return { stroke: 'stroke-emerald-400', text: 'text-emerald-400', label: 'Highly Credible' };
    if (val >= 60) return { stroke: 'stroke-cyan-400', text: 'text-cyan-400', label: 'Mostly Credible' };
    if (val >= 40) return { stroke: 'stroke-amber-400', text: 'text-amber-400', label: 'Mixed / Unverified' };
    return { stroke: 'stroke-rose-500', text: 'text-rose-500', label: 'Misleading / Disinfo' };
  };

  const color = getColorClasses(currentScore);
  
  // SVG arc calculation (Circumference of r=50 is 314)
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg shadow-slate-950/40 text-center select-none">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Credibility Index</h3>
      
      <div className="relative flex items-center justify-center">
        {/* Ring */}
        <svg className="h-36 w-36 transform -rotate-90">
          <circle 
            className="stroke-slate-800" 
            fill="transparent" 
            strokeWidth={strokeWidth} 
            r={radius} 
            cx="72" 
            cy="72" 
          />
          <circle 
            className={\`transition-all duration-300 ease-out \${color.stroke}\`}
            fill="transparent" 
            strokeWidth={strokeWidth} 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={radius} 
            cx="72" 
            cy="72" 
          />
        </svg>

        {/* Value overlay */}
        <div className="absolute text-center">
          <span className={\`text-4xl font-extrabold tracking-tight \${color.text}\`}>{currentScore}</span>
          <span className="text-slate-500 text-xs font-bold block">/ 100</span>
        </div>
      </div>

      <div className="mt-4">
        <span className={\`text-sm font-extrabold tracking-tight px-3 py-1.5 rounded-full bg-white/5 border border-white/5 \${color.text}\`}>
          {color.label}
        </span>
      </div>
    </div>
  );
}
`);

// fake-news-meter.tsx
define('components/analysis/fake-news-meter.tsx', `
'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface FakeNewsMeterProps {
  probability: number;
}

export default function FakeNewsMeter({ probability }: FakeNewsMeterProps) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg shadow-slate-950/40">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fake Probability</h3>
        <div className="flex items-center gap-1.5">
          {probability >= 50 ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 px-2 py-0.5 rounded-md bg-rose-950/30">
              <AlertTriangle className="h-3 w-3" /> High Risk
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-950/30">
              <ShieldCheck className="h-3 w-3" /> Safe Content
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-white/5">
        {/* Fill bar */}
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-1000 ease-out" 
          style={{ width: \`\${probability}%\` }}
        />
        {/* Visual Needle / Handle marker at edge of fill */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-xl transition-all duration-1000 ease-out"
          style={{ left: \`calc(\${probability}% - 2px)\` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-2.5">
        <span>0% (Factual)</span>
        <span className="text-slate-300 font-extrabold text-xs">{probability}%</span>
        <span>100% (Fabricated)</span>
      </div>

      <p className="text-slate-400 text-xs mt-3.5 leading-relaxed">
        Calculated using style metrics, emotional charge frequency, cross-referenced databases, and source integrity indexing.
      </p>
    </div>
  );
}
`);

// evidence-card.tsx
define('components/analysis/evidence-card.tsx', `
import React from 'react';
import { CheckCircle, AlertTriangle, HelpCircle, FileCheck, ExternalLink } from 'lucide-react';

interface Evidence {
  claim: string;
  entity: string;
  type: string;
  status: 'Verified' | 'Partially Verified' | 'Unverified' | 'False';
  explanation: string;
}

interface EvidenceCardProps {
  claims: Evidence[];
}

export default function EvidenceCard({ claims }: EvidenceCardProps) {
  const getStatusIcon = (status: Evidence['status']) => {
    switch (status) {
      case 'Verified': 
        return <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />;
      case 'Partially Verified': 
        return <HelpCircle className="h-5 w-5 text-amber-400 shrink-0" />;
      case 'Unverified': 
        return <HelpCircle className="h-5 w-5 text-slate-500 shrink-0" />;
      case 'False': 
        return <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />;
    }
  };

  const getStatusStyle = (status: Evidence['status']) => {
    switch (status) {
      case 'Verified': return 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300';
      case 'Partially Verified': return 'bg-amber-950/20 border-amber-500/20 text-amber-300';
      case 'Unverified': return 'bg-slate-900 border-white/5 text-slate-400';
      case 'False': return 'bg-rose-950/20 border-rose-500/20 text-rose-300';
    }
  };

  return (
    <div className="space-y-4">
      {claims.map((c, i) => (
        <div key={i} className={\`p-5 rounded-xl border transition-all hover:scale-[1.005] \${getStatusStyle(c.status)}\`}>
          <div className="flex items-start gap-4">
            {getStatusIcon(c.status)}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white/5 px-2.5 py-0.5 rounded-md">
                  {c.type}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Target Entity: <strong className="text-slate-200 font-extrabold">{c.entity}</strong>
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-200 leading-snug">"{c.claim}"</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed bg-black/10 p-3 rounded-lg border border-white/5">
                {c.explanation}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
`);

// source-card.tsx
define('components/analysis/source-card.tsx', `
import React from 'react';
import { ExternalLink, Award } from 'lucide-react';

interface Source {
  name: string;
  url: string;
  category: string;
  reliability: 'Low' | 'Medium' | 'High';
}

interface SourceCardProps {
  sources: Source[];
}

export default function SourceCard({ sources }: SourceCardProps) {
  const getReliabilityColor = (rel: Source['reliability']) => {
    switch (rel) {
      case 'High': return 'text-emerald-400 bg-emerald-950/30 border-emerald-500/20';
      case 'Medium': return 'text-amber-400 bg-amber-950/30 border-amber-500/20';
      case 'Low': return 'text-rose-500 bg-rose-950/30 border-rose-500/20';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sources.map((s, i) => (
        <div key={i} className="p-5 rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-0.5 bg-white/5 rounded">
                {s.category}
              </span>
              <span className={\`text-[10px] font-extrabold px-2 py-0.5 border rounded-full \${getReliabilityColor(s.reliability)}\`}>
                {s.reliability} Trust
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-cyan-400" />
              <h4 className="text-sm font-extrabold text-slate-200 truncate">{s.name}</h4>
            </div>
          </div>

          <a 
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 hover:underline mt-4 transition-colors cursor-pointer"
          >
            Go to Source Library
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      ))}
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
console.log('Part 2 completed successfully.');
