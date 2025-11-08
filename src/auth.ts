// src/auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "@/app/lib/Prisma"

// Validate AUTH_SECRET on startup
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
if (!authSecret) {
  console.error('❌ WARNING: AUTH_SECRET or NEXTAUTH_SECRET is not set!');
  console.error('Authentication will not work properly without this.');
  console.error('Please add AUTH_SECRET to your .env.local file');
}

console.log('🔐 Auth Secret Status:', {
  hasAuthSecret: !!process.env.AUTH_SECRET,
  hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
  usingSecret: authSecret ? `${authSecret.substring(0, 10)}...` : 'NONE'
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  // NOTE: Using JWT strategy without adapter for Credentials provider
  // adapter: PrismaAdapter(prisma), // Removed - conflicts with JWT + Credentials
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
            return null;
          }

          console.log('📊 Attempting database query...');
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          }).catch((dbError: unknown) => {
            console.error('❌ Database connection error:', dbError);
            throw new Error("Database connection failed");
          });

          if (!user) {
            console.error('❌ User not found:', credentials.email);
            return null;
          }

          if (!user.password) {
            console.error('❌ User has no password:', credentials.email);
            return null;
          }

          console.log('🔑 Comparing password...');
          const isValid = await compare(
            credentials.password as string,
            user.password
          );

          if (!isValid) {
            console.error('❌ Invalid password for:', credentials.email);
            return null;
          }

          console.log('✅ Authorization successful for:', credentials.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error('❌ Authorization error:', error);
          // Return null instead of throwing to avoid "Configuration" error
          return null;
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
