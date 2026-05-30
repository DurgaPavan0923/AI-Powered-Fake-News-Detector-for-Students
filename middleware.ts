import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Simulate cookie parse since Next Middleware operates in Edge environment
  const userCookie = request.cookies.get('factlens_user_session')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  // 1. Guard Student Routes
  const isStudentRoute = ['/dashboard', '/analysis', '/knowledge-graph'].some(prefix => path.startsWith(prefix));
  if (isStudentRoute) {
    if (!user || user.role !== 'Student') {
      // Redirect unauthorized users to login portal selector
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Guard Admin Routes
  const isAdminRoute = path.startsWith('/admin');
  if (isAdminRoute) {
    if (!user || user.role !== 'Admin') {
      // Direct access forbidden: render 403 or redirect
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/analysis/:path*',
    '/knowledge-graph/:path*',
    '/admin/:path*'
  ]
};