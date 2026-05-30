'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { Compass, GraduationCap, School, Check, BookOpen } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { setOnboarded } = useAuthStore();
  const [step, setStep] = useState(1);
  const [academicLevel, setAcademicLevel] = useState('undergraduate');
  const [school, setSchool] = useState('');

  const handleComplete = () => {
    setOnboarded(true);
    router.push('/dashboard');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="w-full max-w-lg border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6">
        
        {/* Step dots */}
        <div className="flex items-center gap-2 justify-center">
          <span className={`h-1.5 w-6 rounded-full transition-all ${step >= 1 ? 'bg-cyan-400' : 'bg-slate-800'}`} />
          <span className={`h-1.5 w-6 rounded-full transition-all ${step >= 2 ? 'bg-cyan-400' : 'bg-slate-800'}`} />
        </div>

        {step === 1 && (
          <div className="space-y-6 text-center">
            <GraduationCap className="h-12 w-12 text-cyan-400 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-200">Select Academic Level</h2>
              <p className="text-xs text-slate-400">Tell us about your educational background</p>
            </div>
            
            <div className="grid grid-cols-1 gap-2.5 text-left">
              {['highschool', 'undergraduate', 'postgraduate'].map((level) => (
                <button
                  key={level}
                  onClick={() => setAcademicLevel(level)}
                  className={`p-4 rounded-xl border transition-all text-xs font-bold flex items-center justify-between cursor-pointer ${
                    academicLevel === level 
                      ? 'border-cyan-500/40 bg-cyan-950/20 text-cyan-200' 
                      : 'border-white/5 bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span className="capitalize">{level.replace('school', ' School')}</span>
                  {academicLevel === level && <Check className="h-4.5 w-4.5 text-cyan-400" />}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center">
            <School className="h-12 w-12 text-indigo-400 mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-200">Enter Institution</h2>
              <p className="text-xs text-slate-400">Specify school, academy or college name</p>
            </div>
            
            <div className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Institution Name</label>
                <input 
                  type="text"
                  placeholder="Harvard University"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)}
                className="w-1/3 py-2.5 rounded-lg border border-white/10 bg-slate-950 hover:bg-slate-900 text-slate-300 font-extrabold text-xs transition-colors cursor-pointer"
              >
                Back
              </button>
              <button 
                onClick={handleComplete}
                className="w-2/3 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/10 transition-all cursor-pointer"
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}