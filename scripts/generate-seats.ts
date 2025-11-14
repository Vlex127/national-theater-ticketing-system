import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { seats } from '@/lib/db/schema';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment variables.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

type SectionConfig = {
  name: string;
  category: 'VIP' | 'Standard' | 'Balcony';
  rows: number;
  seatsPerRow: number;
  price: number;
};

const SECTION_CONFIGS: SectionConfig[] = [
  { name: 'VIP', category: 'VIP', rows: 5, seatsPerRow: 20, price: 25000 },
  { name: 'Standard', category: 'Standard', rows: 10, seatsPerRow: 30, price: 15000 },
  { name: 'Balcony', category: 'Balcony', rows: 8, seatsPerRow: 25, price: 8000 },
];

type GeneratorOptions = {
  keepDistribution: boolean;
};

async function generateSeats(eventId: string, options: GeneratorOptions) {
  console.log(`🎭 Generating seats for event: ${eventId}`);

  try {
    const existing = await db.select({ count: seats.id }).from(seats).where(eq(seats.eventId, eventId));
    const existingCount = existing.length;

    if (existingCount > 0) {
      console.log(`ℹ️ Found ${existingCount} existing seats for this event. Removing them before regeneration.`);
      await db.delete(seats).where(eq(seats.eventId, eventId));
    }

    const now = new Date();
    const seatRows = SECTION_CONFIGS.flatMap((section) => {
      const rows: typeof seats.$inferInsert[] = [];

      for (let rowIndex = 0; rowIndex < section.rows; rowIndex++) {
        const rowLetter = String.fromCharCode(65 + rowIndex);

        for (let seatNumber = 1; seatNumber <= section.seatsPerRow; seatNumber++) {
          const status = options.keepDistribution
            ? determineSeatStatus(section.name, rowLetter, seatNumber)
            : 'available';

          rows.push({
            eventId,
            section: section.name,
            row: rowLetter,
            number: seatNumber,
            status,
            price: section.price.toString(),
            category: section.category,
            createdAt: now,
            updatedAt: now,
          });
        }
      }

      return rows;
    });

    await db.insert(seats).values(seatRows);

    console.log(`✅ Successfully generated ${seatRows.length} seats for event ${eventId}`);
  } catch (error) {
    console.error('❌ Failed to generate seats:', error);
    process.exitCode = 1;
  }
}

function determineSeatStatus(section: string, row: string, seatNumber: number): 'available' | 'reserved' | 'booked' {
  if (section === 'VIP') {
    return seatNumber % 10 === 0 ? 'reserved' : 'available';
  }

  if (section === 'Standard') {
    if (seatNumber % 20 === 0) {
      return 'booked';
    }
    return seatNumber % 8 === 0 ? 'reserved' : 'available';
  }

  // Balcony
  if (seatNumber % 15 === 0) {
    return 'booked';
  }
  return seatNumber % 6 === 0 ? 'reserved' : 'available';
}

const eventId = process.argv[2];
const keepDistributionFlag = process.argv.includes('--keep-distribution');

if (!eventId) {
  console.error('Usage: npx tsx scripts/generate-seats.ts <eventId> [--keep-distribution]');
  process.exit(1);
}

generateSeats(eventId, { keepDistribution: keepDistributionFlag })
  .then(() => {
    console.log('✨ Seat generation complete.');
  })
  .catch((error) => {
    console.error('❌ Seat generation failed:', error);
    process.exit(1);
  });
