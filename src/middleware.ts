// src/middleware.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith('/login')
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin')

  // Redirect logged-in users away from auth pages
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  // Redirect non-authenticated users trying to access admin
  if (isAdminPath && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${req.nextUrl.pathname}`, req.url)
    )
  }

  return NextResponse.next()
})

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