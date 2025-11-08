// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware for auth API routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Check if user has a session token (handles both HTTP and HTTPS)
  const token =
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value

  const isLoggedIn = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')

  // Redirect logged-in users away from /login
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Redirect users who are NOT logged in from /admin routes
  if (isAdminPath && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${request.nextUrl.pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

// Only run middleware on specific routes, exclude API and static files
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
