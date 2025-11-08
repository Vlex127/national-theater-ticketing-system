// src/auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"
import { users } from "@/lib/db/schema"

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
  // Using JWT strategy for session management
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true, // Required for Vercel and custom domains
  secret: authSecret, // Validated secret
  debug: true, // Enable detailed auth logs for debugging
  logger: {
    error: (error: Error) => {
      console.error('Auth error:', error.message, error);
    },
    warn: (message: string) => {
      console.warn('Auth warning:', message);
    },
    debug: (message: string, metadata?: any) => {
      console.debug('Auth debug:', message, metadata || '');
    }
  },
  pages: {
    signIn: "/login",
    error: "/login", // Redirect errors to login page
  },
  providers: [
    Credentials({
      name: 'Credentials',
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

          console.log('📊 Attempting to find user in database...');
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .limit(1);

          console.log('🔍 User query result:', user ? 'User found' : 'No user found');

          if (!user) {
            console.error(`❌ User not found with email: ${credentials.email}`);
            return null;
          }

          if (!user.password) {
            console.error(`❌ User ${credentials.email} has no password set`);
            return null;
          }

          console.log('🔑 Comparing password hash...');
          const isValid = await compare(credentials.password as string, user.password);

          if (!isValid) {
            console.error(`❌ Invalid password for user: ${credentials.email}`);
            return null;
          }

          console.log(`✅ Authentication successful for user: ${user.id}`);
          return {
            id: user.id,
            email: user.email || '',
            name: user.name || (user.email ? user.email.split('@')[0] : 'User'),
          };
        } catch (error) {
          console.error('❌ Authentication error:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
})
