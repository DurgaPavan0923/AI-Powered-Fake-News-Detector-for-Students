'use client';

import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

interface ResearchModeProps {
  articleTitle: string;
  sourceUrl?: string;
  publishDate?: string;
}

export default function ResearchMode({ articleTitle, sourceUrl = 'https://factlens.ai/report/ex', publishDate = '2026-05-30' }: ResearchModeProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const cleanTitle = articleTitle.replace(/[\.\?\!]$/, '');
  const currentYear = new Date().getFullYear();

  const citations = {
    APA: `FactLens AI. (${currentYear}). Verification Analysis: "${cleanTitle}". Retrieved from ${sourceUrl}`,
    MLA: `FactLens AI. "Verification Analysis: ${cleanTitle}." FactLens Reports, ${publishDate}, ${sourceUrl}.`,
    Chicago: `FactLens AI. "Verification Analysis: ${cleanTitle}." FactLens Reports. ${publishDate}. ${sourceUrl}.`,
    BibTeX: `@article{factlens_${currentYear},\n  title={Verification Analysis: ${cleanTitle}},\n  author={FactLens AI Intelligence Suite},\n  journal={FactLens Reports},\n  year={${currentYear}},\n  url={${sourceUrl}}\n}`
  };

  const handleCopy = (key: keyof typeof citations) => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(citations[key]);
    setCopiedFormat(key);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6 select-none">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Research Citation & Bibliography</h3>
        </div>
      </div>

      <div className="space-y-4">
        {/* Abstract / Summary */}
        <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-2">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Academic Abstract Summary</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-semibold">
            This verification report analyzes assertions regarding "{articleTitle}". Using multi-agent consensus algorithms, FactLens AI evaluated the logical semantic patterns, cross-referenced verified publications, and calculated bias weights to establish academic validity.
          </p>
        </div>

        {/* Citation Formats */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Export Academic Citation</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(Object.keys(citations) as Array<keyof typeof citations>).map((key) => (
              <div key={key} className="p-4 rounded-xl bg-slate-950 border border-white/5 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{key} Style</span>
                  <button 
                    onClick={() => handleCopy(key)}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-cyan-400 transition-colors cursor-pointer flex items-center justify-center"
                    title="Copy Citation"
                  >
                    {copiedFormat === key ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <pre className="text-[10px] text-slate-300 font-mono leading-relaxed whitespace-pre-wrap font-medium">
                  {citations[key]}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
