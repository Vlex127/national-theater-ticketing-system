import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { seats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await context.params;
    
    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event id format (expected UUID)' },
        { status: 400 }
      );
    }

    // Fetch all seats for the event
    const eventSeats = await db.query.seats.findMany({
      where: (seats, { eq }) => eq(seats.eventId, eventId),
      columns: {
        id: true,
        row: true,
        number: true,
        status: true,
        price: true,
        category: true,
        section: true,
      },
    });

    return NextResponse.json(eventSeats);
  } catch (error) {
    console.error('Error fetching seats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seats' },
      { status: 500 }
    );
  }
}
