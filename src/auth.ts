// src/auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import { prisma } from "@/app/lib/Prisma"

// Validate AUTH_SECRET on startup
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
if (!authSecret) {
  console.error('❌ FATAL: AUTH_SECRET or NEXTAUTH_SECRET must be set!');
  throw new Error('AUTH_SECRET is required but not found in environment variables');
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true, // ✅ Required for Vercel and custom domains
  secret: authSecret, // ✅ Validated secret
  debug: true, // ✅ ENABLED: Always show detailed auth logs for debugging

  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login page
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log('🔐 Authorization attempt for:', credentials?.email);
          
          if (!credentials?.email || !credentials?.password) {
            console.error('❌ Missing credentials');
            throw new Error("Missing credentials")
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })

          if (!user || !user.password) {
            console.error('❌ User not found or no password:', credentials.email);
            throw new Error("Invalid credentials")
          }

          const isValid = await compare(
            credentials.password as string,
            user.password
          )

          if (!isValid) {
            console.error('❌ Invalid password for:', credentials.email);
            throw new Error("Invalid credentials")
          }

          console.log('✅ Authorization successful for:', credentials.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error('❌ Authorization error:', error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
