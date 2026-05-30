const fs = require('fs');
const path = require('path');

const files = {};

function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. AUTHENTICATION ROUTING PAGES
// -------------------------------------------------------------

// login/page.tsx
define('app/(auth)/login/page.tsx', `
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { ShieldCheck, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Student' | 'Admin'>('Student');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    setErrorMsg('');
    await login(email, role);
    router.push('/dashboard');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Glow circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      <div className="w-full max-w-md border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6">
        
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white mx-auto shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-400 font-medium">Access your FactLens student workspace</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4.5 w-4.5 text-slate-500" />
              <input 
                type="email" 
                placeholder="student@academy.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg py-2.5 pl-11 pr-4 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Password</label>
              <Link href="/forgot-password" className="text-[10px] text-cyan-400 hover:underline">Forgot password?</Link>
            </div>
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

          {/* Role selector Segment */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Workspace Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('Student')}
                className={\`py-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer \${
                  role === 'Student' 
                    ? 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' 
                    : 'border-white/10 bg-slate-950 text-slate-400 hover:text-slate-200'
                }\`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('Admin')}
                className={\`py-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer \${
                  role === 'Admin' 
                    ? 'border-violet-500/40 bg-violet-950/20 text-violet-300' 
                    : 'border-white/10 bg-slate-950 text-slate-400 hover:text-slate-200'
                }\`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-1.5 hover:scale-[1.01] active:scale-100 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="border-t border-white/5 pt-4 text-center text-xs text-slate-500">
          New to FactLens? <Link href="/register" className="text-cyan-400 font-bold hover:underline">Create Student Account</Link>
        </div>

      </div>
    </div>
  );
}
`);

// register/page.tsx
define('app/(auth)/register/page.tsx', `
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
`);

// onboarding/page.tsx
define('app/(auth)/onboarding/page.tsx', `
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
          <span className={\`h-1.5 w-6 rounded-full transition-all \${step >= 1 ? 'bg-cyan-400' : 'bg-slate-800'}\`} />
          <span className={\`h-1.5 w-6 rounded-full transition-all \${step >= 2 ? 'bg-cyan-400' : 'bg-slate-800'}\`} />
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
                  className={\`p-4 rounded-xl border transition-all text-xs font-bold flex items-center justify-between cursor-pointer \${
                    academicLevel === level 
                      ? 'border-cyan-500/40 bg-cyan-950/20 text-cyan-200' 
                      : 'border-white/5 bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }\`}
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
`);

// forgot-password/page.tsx
define('app/(auth)/forgot-password/page.tsx', `
import React from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="w-full max-w-md border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6 text-center">
        <h2 className="text-2xl font-extrabold text-slate-200 tracking-tight">Reset Password</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Provide your student email, and we will send instructions to verify and reset credentials.
        </p>
        <form className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <input type="email" placeholder="student@academy.edu" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500" required />
          </div>
          <button type="submit" className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer">
            Send Reset Link
          </button>
        </form>
        <div className="text-xs text-slate-500 border-t border-white/5 pt-4">
          <Link href="/login" className="hover:underline text-cyan-400">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
`);

// reset-password/page.tsx
define('app/(auth)/reset-password/page.tsx', `
import React from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="w-full max-w-md border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6 text-center">
        <h2 className="text-2xl font-extrabold text-slate-200 tracking-tight">Create New Password</h2>
        <form className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500" required />
          </div>
          <button type="submit" className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer">
            Update Credentials
          </button>
        </form>
      </div>
    </div>
  );
}
`);

// verify-email/page.tsx
define('app/(auth)/verify-email/page.tsx', `
import React from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="w-full max-w-md border border-white/10 rounded-2xl bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6 text-center">
        <h2 className="text-2xl font-extrabold text-slate-200 tracking-tight">Verify School Email</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Please check your email inbox for a verification code. Confirming links authorizes workspace database connections.
        </p>
        <Link href="/login" className="inline-block py-2.5 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors">
          Go to Sign In
        </Link>
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
console.log('Part 5 completed successfully.');
