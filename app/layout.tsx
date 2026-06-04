import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/shared/navbar';
import Sidebar from '@/components/shared/sidebar';
import Footer from '@/components/shared/footer';
import FactLensCopilot from '@/components/shared/copilot';
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
      <body className={`${inter.className} h-full antialiased flex flex-col`}>
        
        {/* Navbar */}
        <Navbar />

        {/* Workspace Shell */}
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-10 md:py-8 bg-slate-950">
            {children}
          </main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Global Floating Copilot */}
        <FactLensCopilot />

      </body>
    </html>
  );
}