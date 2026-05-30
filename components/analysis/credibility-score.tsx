'use client';

import React, { useEffect, useState } from 'react';

interface CredibilityScoreProps {
  score: number;
}

export default function CredibilityScore({ score }: CredibilityScoreProps) {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Direct count animation
      let start = 0;
      const duration = 1000;
      const stepTime = 15;
      const step = (score / duration) * stepTime;
      
      const interval = setInterval(() => {
        start += step;
        if (start >= score) {
          setCurrentScore(score);
          clearInterval(interval);
        } else {
          setCurrentScore(Math.floor(start));
        }
      }, stepTime);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Color mapping based on score
  const getColorClasses = (val: number) => {
    if (val >= 80) return { stroke: 'stroke-emerald-400', text: 'text-emerald-400', label: 'Highly Credible' };
    if (val >= 60) return { stroke: 'stroke-cyan-400', text: 'text-cyan-400', label: 'Mostly Credible' };
    if (val >= 40) return { stroke: 'stroke-amber-400', text: 'text-amber-400', label: 'Mixed / Unverified' };
    return { stroke: 'stroke-rose-500', text: 'text-rose-500', label: 'Misleading / Disinfo' };
  };

  const color = getColorClasses(currentScore);
  
  // SVG arc calculation (Circumference of r=50 is 314)
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg shadow-slate-950/40 text-center select-none">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Credibility Index</h3>
      
      <div className="relative flex items-center justify-center">
        {/* Ring */}
        <svg className="h-36 w-36 transform -rotate-90">
          <circle 
            className="stroke-slate-800" 
            fill="transparent" 
            strokeWidth={strokeWidth} 
            r={radius} 
            cx="72" 
            cy="72" 
          />
          <circle 
            className={`transition-all duration-300 ease-out ${color.stroke}`}
            fill="transparent" 
            strokeWidth={strokeWidth} 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={radius} 
            cx="72" 
            cy="72" 
          />
        </svg>

        {/* Value overlay */}
        <div className="absolute text-center">
          <span className={`text-4xl font-extrabold tracking-tight ${color.text}`}>{currentScore}</span>
          <span className="text-slate-500 text-xs font-bold block">/ 100</span>
        </div>
      </div>

      <div className="mt-4">
        <span className={`text-sm font-extrabold tracking-tight px-3 py-1.5 rounded-full bg-white/5 border border-white/5 ${color.text}`}>
          {color.label}
        </span>
      </div>
    </div>
  );
}