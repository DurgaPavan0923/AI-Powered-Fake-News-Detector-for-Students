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
                      <div key={n.id} className={`p-2.5 rounded-lg text-left transition-colors border ${n.read ? 'bg-transparent border-transparent' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${n.type === 'alert' ? 'text-rose-400' : 'text-slate-200'}`}>{n.title}</span>
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