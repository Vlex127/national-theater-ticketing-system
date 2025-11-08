// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if user has a session token
  const token =
    request.cookies.get('authjs.session-token') ||
    request.cookies.get('__Secure-authjs.session-token')

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

// ✅ Updated matcher combined properly
export const config = {
  matcher: [
    // Exclude: api, static, image, favicon, AND auth paths
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
}
