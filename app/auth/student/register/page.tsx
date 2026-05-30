'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function StudentRegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    await register(name, email);
    router.push('/dashboard');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="w-full max-w-sm border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">Create Student Account</h2>
          <p className="text-[10px] text-slate-500 font-semibold">Join academic fact-checking classrooms</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
            <input 
              type="text" 
              placeholder="Alex Mercer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
              required
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">School Email</label>
            <input 
              type="email" 
              placeholder="alex.mercer@academy.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-xs shadow-lg cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <div className="border-t border-white/5 pt-4 text-center text-xs text-slate-500">
          Already registered? <Link href="/auth/student/login" className="text-cyan-400 font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}