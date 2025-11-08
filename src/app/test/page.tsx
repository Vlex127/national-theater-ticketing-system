import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    AUTH_SECRET: !!process.env.AUTH_SECRET ? "Set" : "Not set",
    AUTH_URL: process.env.AUTH_URL || "Not set",
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET ? "Set" : "Not set",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "Not set",
    DATABASE_URL: !!process.env.DATABASE_URL ? "Set" : "Not set",
    NODE_ENV: process.env.NODE_ENV,
  })
}