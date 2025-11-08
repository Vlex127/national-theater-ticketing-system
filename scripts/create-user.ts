import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from "@/lib/db/schema";
import { hash } from "bcryptjs";
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function createUser(email: string, password: string, name?: string) {
  console.log(`👤 Creating user: ${email}`);
  
  try {
    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      console.log('ℹ️ User already exists:', existingUser);
      return existingUser;
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);
    
    // Create the user
    const [newUser] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        email,
        name: name || email.split('@')[0],
        password: hashedPassword,
      })
      .returning();

    console.log('✅ User created successfully:', {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    });

    return newUser;
  } catch (error) {
    console.error('❌ Error creating user:', error);
    throw error;
  }
}

// Get email, password, and name from command line arguments
const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4];

if (!email || !password) {
  console.error('Usage: npx tsx scripts/create-user.ts <email> <password> [name]');
  process.exit(1);
}

createUser(email, password, name).catch(console.error);
