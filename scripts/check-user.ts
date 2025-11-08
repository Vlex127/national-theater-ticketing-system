import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcryptjs";

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function checkUser(email: string, password?: string) {
  console.log(`🔍 Checking user: ${email}`);
  
  // Find the user by email
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    console.error("❌ User not found");
    return;
  }

  console.log("✅ User found:", {
    id: user.id,
    email: user.email,
    hasPassword: !!user.password,
    passwordLength: user.password?.length,
  });

  // If trying to check a password
  if (password && user.password) {
    if (!user.password) {
      console.error("❌ User has no password set");
      return;
    }

    const isValid = await compare(password, user.password);
    console.log(`🔑 Password ${isValid ? '✅ valid' : '❌ invalid'}`);
  }
}

// Get email and password from command line arguments
const email = process.argv[2];
const password = process.argv[3];

if (!email) {
  console.error("Please provide an email address as the first argument");
  process.exit(1);
}

checkUser(email, password || "").catch(console.error);
