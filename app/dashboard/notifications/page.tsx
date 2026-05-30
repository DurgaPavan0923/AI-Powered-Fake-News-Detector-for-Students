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
                className={`p-5 rounded-xl border cursor-pointer transition-all flex items-start gap-4 hover:bg-white/2 ${
                  n.read ? 'bg-slate-900/30 border-white/5 text-slate-400' : 'bg-slate-900 border-white/10 text-slate-200'
                }`}
              >
                <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                  n.read ? 'bg-transparent' : (n.type === 'alert' ? 'bg-rose-500' : 'bg-cyan-500')
                }`} />
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