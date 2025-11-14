// src/app/api/events/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json({ error: 'Invalid event id (expected UUID)' }, { status: 400 });
    }

    const [event] = await db
      .select()
      .from(schema.events)
      .where(eq(schema.events.id, id))
      .limit(1);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'date', 'time', 'venue', 'category'];
    const missingFields = requiredFields.filter(field => !eventData[field]);
    
    if (missingFields.length > 0) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Missing required fields',
          missingFields 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate the date
    let eventDate: Date;
    try {
      eventDate = eventData.date ? new Date(eventData.date) : new Date();
      if (isNaN(eventDate.getTime())) {
        throw new Error('Invalid date format');
      }
    } catch (error) {
      console.error('Invalid date:', eventData.date, error);
      return new NextResponse(
        JSON.stringify({ error: 'Invalid date format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format the time (ensure it's in HH:MM format)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const eventTime = timeRegex.test(eventData.time) ? eventData.time : '19:00';
    
    // Update the event using Drizzle ORM
    const now = new Date();

    const [updatedEvent] = await db
      .update(schema.events)
      .set({
        title: eventData.title,
        description: eventData.description || null,
        image_url: eventData.image_url || null,
        date: eventDate,
        time: eventTime,
        venue: eventData.venue,
        category: eventData.category,
        duration: eventData.duration || '2h',
        age_restriction: eventData.age_restriction || '12+',
        updated_at: now
      })
      .where(eq(schema.events.id, id))
      .returning();

    if (!updatedEvent) {
      return new NextResponse(
        JSON.stringify({ error: 'Event not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify(updatedEvent),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating event:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}