import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-slate-950 py-6 px-6 text-center">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <p className="text-xs text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} FactLens AI. Dedicated to digital literacy, objective journalism, and research excellence.
        </p>
        <div className="flex items-center gap-6 text-xs font-semibold text-slate-400">
          <Link href="/about" className="hover:text-slate-200 transition-colors">About</Link>
          <Link href="/features" className="hover:text-slate-200 transition-colors">Features</Link>
          <Link href="/privacy" className="hover:text-slate-200 transition-colors">Privacy & Guidelines</Link>
          <Link href="/contact" className="hover:text-slate-200 transition-colors">Contact Support</Link>
        </div>
      </div>
    </footer>
  );
}