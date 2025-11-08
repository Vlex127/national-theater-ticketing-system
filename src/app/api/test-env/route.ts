// Test endpoint to verify environment variables (REMOVE IN PRODUCTION!)
import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    hasAuthSecret: !!process.env.AUTH_SECRET,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    authSecretLength: process.env.AUTH_SECRET?.length || 0,
    nextAuthSecretLength: process.env.NEXTAUTH_SECRET?.length || 0,
  }

  return NextResponse.json(envCheck)
}
