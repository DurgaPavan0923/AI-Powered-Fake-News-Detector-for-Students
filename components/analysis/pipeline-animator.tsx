'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PipelineAnimator() {
  const steps = [
    { label: 'Uploading Document Payload', key: 'upload' },
    { label: 'Sanitizing & Extracting Text Tokens', key: 'extract' },
    { label: 'Isolating Claims & Entity Clusters', key: 'claims' },
    { label: 'Consulting Whitelisted Databases', key: 'verify' },
    { label: 'Evaluating Clickbait & Sentiment Bias', key: 'bias' },
    { label: 'Formulating FactLens Verification Ledger', key: 'report' }
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= steps.length) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => prev + 1);
    }, 1100);

    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <div className="border border-white/10 rounded-2xl bg-slate-900/60 p-8 max-w-lg mx-auto space-y-6 shadow-2xl backdrop-blur-md select-none">
      
      {/* Header */}
      <div className="text-center space-y-2 border-b border-white/5 pb-4">
        <Loader className="h-8 w-8 text-cyan-400 animate-spin mx-auto" />
        <h3 className="text-sm font-extrabold text-slate-200">FactLens Scanning Pipeline</h3>
        <p className="text-[10px] text-slate-500 font-semibold">Running multi-perspective AI credibility consensus mapping...</p>
      </div>

      {/* Animated Steps checklist */}
      <div className="space-y-3.5 pr-2">
        {steps.map((s, i) => {
          const isDone = activeStep > i;
          const isActive = activeStep === i;
          
          return (
            <motion.div 
              key={s.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex items-center gap-3.5 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-white/5' : ''
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              ) : isActive ? (
                <Loader className="h-5 w-5 text-cyan-400 animate-spin shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-white/10 bg-slate-950 shrink-0" />
              )}
              
              <span className={`text-xs font-bold transition-colors ${
                isDone ? 'text-slate-400 line-through' : isActive ? 'text-cyan-300' : 'text-slate-500'
              }`}>
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Final check completion overlay */}
      {activeStep >= steps.length && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2"
        >
          <ShieldCheck className="h-4.5 w-4.5" /> Pipeline Verification Successful!
        </motion.div>
      )}

    </div>
  );
}