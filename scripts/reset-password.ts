import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from "@/lib/db/schema";
import { hash } from "bcryptjs";
import { eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

// Initialize the database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function resetPassword(email: string, newPassword: string) {
  console.log(`🔄 Resetting password for: ${email}`);
  
  try {
    // Hash the new password
    const hashedPassword = await hash(newPassword, 12);
    
    // Update the user's password
    const [updatedUser] = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email))
      .returning();

    if (!updatedUser) {
      console.error('❌ User not found');
      return;
    }

    console.log('✅ Password updated successfully');
    console.log({
      id: updatedUser.id,
      email: updatedUser.email,
      passwordUpdated: true
    });
  } catch (error) {
    console.error('❌ Error updating password:', error);
    throw error;
  }
}

// Get email and new password from command line arguments
const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.error('Usage: npx tsx scripts/reset-password.ts <email> <new-password>');
  process.exit(1);
}

resetPassword(email, newPassword).catch(console.error);
