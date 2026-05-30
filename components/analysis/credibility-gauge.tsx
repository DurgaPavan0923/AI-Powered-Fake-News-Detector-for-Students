'use client';

import React from 'react';

interface CredibilityGaugeProps {
  score: number;
}

export default function CredibilityGauge({ score }: CredibilityGaugeProps) {
  // Translate score to angle: 0% is -90 deg, 100% is 90 deg (total 180 degrees arc)
  const angle = (score / 100) * 180 - 90;

  const getLabel = (val: number) => {
    if (val >= 80) return { label: 'Highly Trusted', color: 'text-emerald-400' };
    if (val >= 60) return { label: 'Mostly Credible', color: 'text-cyan-400' };
    if (val >= 40) return { label: 'Mixed Content', color: 'text-amber-400' };
    return { label: 'High Risk / Fake', color: 'text-rose-500' };
  };

  const level = getLabel(score);

  return (
    <div className="flex flex-col items-center p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-lg text-center select-none">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Credibility Index</h3>
      
      <div className="relative h-28 w-48 flex justify-center items-end overflow-hidden">
        {/* Speedometer Arc SVG */}
        <svg className="w-full h-full transform translate-y-2">
          {/* Base path */}
          <path 
            d="M 10 100 A 80 80 0 0 1 180 100" 
            fill="transparent" 
            stroke="rgba(255,255,255,0.06)" 
            strokeWidth="12" 
            strokeLinecap="round"
          />
          {/* Fill path */}
          <path 
            d="M 10 100 A 80 80 0 0 1 180 100" 
            fill="transparent" 
            stroke="url(#speedometer-gradient)" 
            strokeWidth="12" 
            strokeLinecap="round"
            strokeDasharray="267"
            strokeDashoffset={267 - (score / 100) * 267}
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="speedometer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Center Point */}
          <circle cx="95" cy="100" r="6" fill="#475569" />
          
          {/* Speedometer Needle */}
          <line 
            x1="95" 
            y1="100" 
            x2="95" 
            y2="30" 
            stroke="#ffffff" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            transform={`rotate(${angle}, 95, 100)`}
            className="transition-all duration-1000 ease-out origin-[95px_100px]"
          />
        </svg>

        {/* Numeric value absolute overlay at bottom */}
        <div className="absolute bottom-0 text-center space-y-0.5">
          <span className="text-3xl font-extrabold text-slate-100 tracking-tight">{score}</span>
          <span className="text-[10px] text-slate-500 font-bold block">/ 100 Rating</span>
        </div>
      </div>

      <div className="mt-4">
        <span className={`text-xs font-extrabold tracking-tight px-3 py-1 rounded-full bg-white/5 border border-white/5 ${level.color}`}>
          {level.label}
        </span>
      </div>
    </div>
  );
}