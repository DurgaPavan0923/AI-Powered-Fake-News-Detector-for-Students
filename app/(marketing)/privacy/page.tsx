import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-slate-200">Privacy & Editorial Guidelines</h1>
        <p className="text-xs text-slate-400 leading-relaxed">Last Updated: May 2026</p>
        
        <div className="space-y-4 text-xs text-slate-400 leading-relaxed">
          <h3 className="text-sm font-bold text-slate-200 mt-6">1. Data Storage & Retrieval</h3>
          <p>
            FactLens processes documents and text queries solely to calculate credibility index parameters. We do not index copyrighted works or sell user data profile logs.
          </p>

          <h3 className="text-sm font-bold text-slate-200 mt-6">2. Verification Accuracy Disclaimer</h3>
          <p>
            AI fact checks are indicators calculated through search consensus mapping. FactLens acts as a digital media learning reference rather than an absolute regulatory legal arbiter of statements.
          </p>
        </div>
      </div>
    </div>
  );
}