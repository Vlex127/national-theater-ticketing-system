// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"

// Log environment variable status on server startup
console.log('🔧 NextAuth Configuration Check:')
console.log('- AUTH_SECRET exists:', !!process.env.AUTH_SECRET)
console.log('- NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET)
console.log('- DATABASE_URL exists:', !!process.env.DATABASE_URL)
console.log('- NODE_ENV:', process.env.NODE_ENV)

// Validate critical environment variables
if (!process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
  console.error('❌ CRITICAL ERROR: No AUTH_SECRET or NEXTAUTH_SECRET found!')
  console.error('Please set AUTH_SECRET in your environment variables')
}

if (!process.env.DATABASE_URL) {
  console.error('❌ CRITICAL ERROR: No DATABASE_URL found!')
}

export const { GET, POST } = handlers