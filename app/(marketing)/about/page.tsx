import React from 'react';
import { ShieldAlert, Users, BookOpen, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">Our Mission</h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Helping students and educators navigate the digital landscape with transparency, evidence-based research, and critical analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
            <Users className="h-6 w-6 text-cyan-400 mb-4" />
            <h3 className="text-sm font-bold text-slate-200">Digital Literacy first</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              We design toolkits specifically to teach critical thinking. FactLens is an educational intelligence dashboard that helps students recognize bias patterns.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
            <Shield className="h-6 w-6 text-indigo-400 mb-4" />
            <h3 className="text-sm font-bold text-slate-200">Evidence over opinions</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              We compile factual evidence networks from academic, government, and peer-reviewed consensus databases to challenge unverified claims.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}