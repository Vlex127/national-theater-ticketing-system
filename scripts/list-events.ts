import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/lib/db/schema';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function main() {
  try {
    const rows = await db.select({ id: schema.events.id, title: schema.events.title, date: schema.events.date }).from(schema.events);
    if (!rows.length) {
      console.log('No events found.');
      return;
    }
    console.log('Events:');
    for (const e of rows) {
      console.log(`- ${e.id}  |  ${e.title}  |  ${new Date(e.date).toISOString()}`);
    }
  } catch (err) {
    console.error('Failed to list events:', err);
    process.exit(1);
  }
}

main();
