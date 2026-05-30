import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{ name: string; href?: string }>;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-500 font-semibold mb-6">
      <Link href="/dashboard" className="hover:text-slate-300 transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3 w-3 shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-300 transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-slate-300 font-bold truncate max-w-[200px]">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}