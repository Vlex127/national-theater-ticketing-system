// app/api/events/route.ts (modified to handle single events)
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';
import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

type EventData = {
  title: string;
  description?: string | null;
  image_url?: string | null;
  date: string;
  time?: string | null;
  venue: string;
  duration?: string | null;
  age_restriction?: string | null;
};

const mapEventResponse = (event: any) => ({
  ...event,
  image_url: event.image_url ?? event.imageUrl ?? null,
  age_restriction: event.age_restriction ?? event.ageRestriction ?? null,
  created_at: event.created_at ?? event.createdAt ?? null,
  updated_at: event.updated_at ?? event.updatedAt ?? null,
});

export async function POST(request: NextRequest) {
  try {
    const eventData: EventData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'date', 'venue'];
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
    const eventDate = eventData.date ? new Date(eventData.date) : new Date();
    
    const now = new Date();

    const result = await db
      .insert(schema.events)
      .values({
        title: eventData.title,
        description: eventData.description || null,
        imageUrl: eventData.image_url || null,
        date: eventDate,
        time: eventData.time || '19:00',
        venue: eventData.venue,
        duration: eventData.duration || '2h',
        ageRestriction: eventData.age_restriction || '12+',
        createdAt: now,
        updatedAt: now
      })
      .returning();
      
    return new NextResponse(
      JSON.stringify(mapEventResponse(result[0])),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Handle single event request
    try {
      const client = await pool.connect();
      
      try {
        const result = await client.query('SELECT * FROM events WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
          return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
          );
        }
        
        return NextResponse.json(mapEventResponse(result.rows[0]));
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch event' },
        { status: 500 }
      );
    }
  } else {
    // Handle all events request
    try {
      const client = await pool.connect();
      
      try {
        const result = await client.query('SELECT * FROM events ORDER BY date ASC');
        return NextResponse.json(result.rows.map(mapEventResponse));
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch events' },
        { status: 500 }
      );
    }
  }
}