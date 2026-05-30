'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { ShieldCheck, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    await register(name, email);
    router.push('/dashboard/onboarding');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="w-full max-w-md border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white mx-auto shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">Create Account</h2>
          <p className="text-xs text-slate-400 font-medium">Join classrooms decoding media integrity</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
            <div className="relative flex items-center">
              <UserIcon className="absolute left-3.5 h-4.5 w-4.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Academic Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4.5 w-4.5 text-slate-500" />
              <input 
                type="email" 
                placeholder="alex.mercer@academy.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Secure Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4.5 w-4.5 text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-100 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Register'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="border-t border-white/5 pt-4 text-center text-xs text-slate-500">
          Already have an account? <Link href="/login" className="text-cyan-400 font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}