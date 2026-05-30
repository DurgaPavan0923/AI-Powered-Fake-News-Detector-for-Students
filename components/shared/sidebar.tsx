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
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all border ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-300 border-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
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
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all border ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-300 border-violet-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
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