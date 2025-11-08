import { drizzle } from 'drizzle-orm/neon-http';
import { Pool, neon, neonConfig } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import * as schema from './schema';
import ws from 'ws';

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Create a client for Drizzle
const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

// Helper functions
export async function getUserByEmail(email: string) {
  try {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    return user || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

export async function createUser(data: {
  id: string;
  email: string;
  name?: string;
  password?: string;
}) {
  try {
    const [user] = await db.insert(schema.users).values(data).returning();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

// Export types for type safety
export type User = typeof schema.users.$inferSelect;
export type NewUser = typeof schema.users.$inferInsert;
