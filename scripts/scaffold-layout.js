const fs = require('fs');
const path = require('path');

const files = {};

function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. ROOT APP LAYOUTS & REDIRECTS
// -------------------------------------------------------------

// app/layout.tsx
define('app/layout.tsx', `
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/shared/navbar';
import Sidebar from '@/components/shared/sidebar';
import Footer from '@/components/shared/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FactLens AI — Student Fact-Checking Platform',
  description: 'AI-powered media literacy and fact verification platform for schools and universities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full bg-slate-950 text-slate-100">
      <body className={\`\${inter.className} h-full antialiased flex flex-col\`}>
        
        {/* Navbar */}
        <Navbar />

        {/* Workspace Shell */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          
          <main className="flex-1 overflow-y-auto px-6 py-8 md:px-10 bg-slate-950">
            {children}
          </main>
        </div>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
`);

// app/page.tsx
define('app/page.tsx', `
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import LandingPage from './(marketing)/page';

export default function RootPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Fallback if not authenticated: show landing page
  return <LandingPage />;
}
`);

// app/loading.tsx
define('app/loading.tsx', `
import React from 'react';
import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loader className="h-8 w-8 text-cyan-400 animate-spin" />
      <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Loading Workspace...</span>
    </div>
  );
}
`);

// app/error.tsx
define('app/error.tsx', `
'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 select-none max-w-md mx-auto">
      <AlertCircle className="h-10 w-10 text-rose-500" />
      <div className="space-y-1">
        <h2 className="text-sm font-extrabold text-slate-200">Fact-Checking Pipeline Encountered an Error</h2>
        <p className="text-xs text-slate-500 font-medium">An unexpected exception occurred inside the RAG embedding synchronizer.</p>
      </div>
      <button 
        onClick={() => reset()}
        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
      >
        Re-initialize Session
      </button>
    </div>
  );
}
`);

// app/not-found.tsx
define('app/not-found.tsx', `
import React from 'react';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 max-w-md mx-auto select-none">
      <HelpCircle className="h-10 w-10 text-slate-600" />
      <div className="space-y-1">
        <h2 className="text-sm font-extrabold text-slate-200">404 — Research Path Not Found</h2>
        <p className="text-xs text-slate-400">The page link or analysis directory index requested does not exist.</p>
      </div>
      <Link href="/dashboard" className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors">
        Return to Dashboard
      </Link>
    </div>
  );
}
`);

// middleware.ts
define('middleware.ts', `
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  // Simple pass-through middleware
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
`);

// Write files to system
Object.keys(files).forEach((filePath) => {
  const fullPath = path.join(__dirname, '..', filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, files[filePath].trim());
  console.log('Scaffolded:', filePath);
});
console.log('Part 9 completed successfully.');
