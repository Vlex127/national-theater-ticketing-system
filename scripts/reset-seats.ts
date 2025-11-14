import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function main() {
  const eventId = process.argv[2];
  if (!eventId) {
    console.error('Usage: npx tsx scripts/reset-seats.ts <EVENT_UUID>');
    process.exit(1);
  }

  try {
    console.log(`Resetting all seats to 'available' for event: ${eventId}`);
    const res = await db
      .update(schema.seats)
      .set({ status: 'available', updatedAt: new Date() })
      .where(eq(schema.seats.eventId, eventId))
      .returning({ id: schema.seats.id, status: schema.seats.status });

    console.log(`✅ Updated ${res.length} seats to 'available'.`);
  } catch (err) {
    console.error('❌ Failed to reset seats:', err);
    process.exit(1);
  }
}

main();
