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
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold border ${
                      u.role === 'Admin' ? 'text-violet-400 bg-violet-950/20 border-violet-500/20' : 'text-cyan-400 bg-cyan-950/20 border-cyan-500/20'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4.5 px-4 text-center">
                    <span className={`font-bold ${u.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}`}>
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