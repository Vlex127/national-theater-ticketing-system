// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user has a session token
  const token = request.cookies.get('authjs.session-token') || 
                request.cookies.get('__Secure-authjs.session-token')
  
  const isLoggedIn = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')

  // Redirect logged-in users away from auth pages
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Redirect non-authenticated users trying to access admin
  if (isAdminPath && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${request.nextUrl.pathname}`, request.url)
    )
  }

  return NextResponse.next()
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
}