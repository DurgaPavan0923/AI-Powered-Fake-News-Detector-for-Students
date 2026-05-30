import React from 'react';

export default function ContactPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-md mx-auto space-y-8 border border-white/10 p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-slate-200">Contact Support</h1>
          <p className="text-xs text-slate-400 leading-normal">Submit questions, report false negatives, or propose whitelisting sources.</p>
        </div>
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <input type="email" placeholder="student@academy.edu" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</label>
            <input type="text" placeholder="Whitelisting request" className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500" required />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Message Description</label>
            <textarea rows={4} placeholder="Please detail your request..." className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-cyan-500 resize-none" required />
          </div>
          <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 rounded-lg text-xs font-bold text-white transition-all cursor-pointer">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}