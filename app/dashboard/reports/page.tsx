'use client';

import React from 'react';
import { useAnalysisStore } from '@/store/analysis.store';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { FileText, Download, Table } from 'lucide-react';

export default function ReportsPage() {
  const { records } = useAnalysisStore();

  const handleExportCSV = () => {
    // Generate CSV string
    const headers = ['ID', 'Title', 'Date', 'Type', 'Credibility Score', 'Fake Probability', 'Trust Rating'];
    const rows = records.map(r => [
      r.id,
      `"${r.title.replace(/"/g, '""')}"`,
      r.date,
      r.type,
      r.credibilityScore,
      r.fakeProbability,
      r.trustRating
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `FactLens_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <Breadcrumbs items={[{ name: 'Reports' }]} />
      
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Export Center</h1>
          <p className="text-xs text-slate-400">Download data sheets, statistics summaries, and school citation files</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-3">
              <Table className="h-8 w-8 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-200">Export History to CSV</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download a clean comma-separated values spreadsheet containing analysis scores, categorization metadata, and date timestamps.
              </p>
            </div>
            <button 
              onClick={handleExportCSV}
              className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
            >
              <Download className="h-4 w-4" /> Download CSV Spreadsheet
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-3">
              <FileText className="h-8 w-8 text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-200">Interactive PDF Portfolios</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Individual PDF report documents containing visual charts, bias breakdown logs, and claim citation links can be downloaded from each article's details view.
              </p>
            </div>
            <div className="mt-6 text-center py-2.5 rounded-lg text-xs font-bold border border-white/10 bg-white/2 text-slate-500 select-none">
              Download from Report Details
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}