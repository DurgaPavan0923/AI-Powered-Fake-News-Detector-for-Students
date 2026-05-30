import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">Academic Plans</h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Providing free access to students. Scalable research capabilities for classrooms and universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-md border border-cyan-500/20 inline-block">Student Free</span>
              <div>
                <h2 className="text-4xl font-extrabold text-slate-100">$0</h2>
                <p className="text-[10px] text-slate-500 mt-1">Free forever with school email</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 30 analyzes per month</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Interactive Knowledge Graphs</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> PDF report generation</li>
              </ul>
            </div>
            <Link href="/register" className="mt-8 block text-center py-2.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors">
              Get Started Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="p-8 rounded-2xl border border-cyan-500/30 bg-slate-900 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-indigo-500 text-[9px] font-bold text-white px-3 py-1 rounded-bl-xl shadow-lg">
              POPULAR
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950/50 px-3 py-1 rounded-md border border-indigo-500/20 inline-block">Educator Pro</span>
              <div>
                <h2 className="text-4xl font-extrabold text-slate-100">$9</h2>
                <p className="text-[10px] text-slate-500 mt-1">Per educator / user monthly</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Unlimited analyses & batch uploads</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Full CSV/PDF analytics exports</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Custom whitelists for classrooms</li>
              </ul>
            </div>
            <Link href="/register" className="mt-8 block text-center py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white shadow-lg transition-all">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}