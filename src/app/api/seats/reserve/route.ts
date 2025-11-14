import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { seats as seatsTable } from '@/lib/db/schema';
import { and, eq, inArray } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventId, seatIds, action } = body as {
      eventId?: string;
      seatIds: string[];
      action: 'reserve' | 'release';
    };

    if (!Array.isArray(seatIds) || seatIds.length === 0 || !['reserve', 'release'].includes(action)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const hasOnlyUUIDs = seatIds.every((id) => uuidRegex.test(id));
    if (!hasOnlyUUIDs) {
      return NextResponse.json({ error: 'Invalid seat id format (expected UUIDs)' }, { status: 400 });
    }

    // Derive eventId from provided seats to avoid UUID casting issues
    const foundSeats = await db.query.seats.findMany({
      where: (s, { inArray }) => inArray(s.id, seatIds),
      columns: { id: true, eventId: true, status: true },
    });

    if (foundSeats.length !== seatIds.length) {
      return NextResponse.json({ error: 'Some seats do not exist' }, { status: 404 });
    }

    const distinctEventIds = Array.from(new Set(foundSeats.map((s) => s.eventId)));
    const effectiveEventId = distinctEventIds[0];
    if (distinctEventIds.length > 1) {
      return NextResponse.json({ error: 'Seats belong to different events' }, { status: 400 });
    }

    const targetStatus = action === 'reserve' ? 'reserved' : 'available';
    const requiredCurrent = action === 'reserve' ? 'available' : 'reserved';

    const updated = await db
      .update(seatsTable)
      .set({ status: targetStatus, updatedAt: new Date() })
      .where(
        and(
          inArray(seatsTable.id, seatIds),
          eq(seatsTable.eventId, effectiveEventId),
          eq(seatsTable.status, requiredCurrent)
        )
      )
      .returning({ id: seatsTable.id, status: seatsTable.status });

    if (updated.length !== seatIds.length) {
      return NextResponse.json(
        { error: 'Some seats could not be updated (possibly already taken)', updated },
        { status: 409 }
      );
    }

    return NextResponse.json({ updated });
  } catch (error) {
    console.error('Seat reserve/release error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
