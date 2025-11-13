// src/app/api/events/[id]/route.ts
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let client;
  try {
    const { id } = await params;
    console.log('Fetching event with ID:', id);
    client = await pool.connect();
    const result = await client.query('SELECT * FROM events WHERE id = $1', [id]);
    console.log('Query result:', result.rows);
    
    if (result.rows.length === 0) {
      console.log('No event found with ID:', id);
      return new NextResponse(
        JSON.stringify({ error: 'Event not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify(result.rows[0]),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let client;
  try {
    const { id } = await params;
    const eventData = await request.json();
    
    // Validate required fields
    if (!eventData.title || !eventData.date || !eventData.venue || !eventData.category) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    client = await pool.connect();
    
    const result = await client.query(
      `UPDATE events 
       SET title = $1, 
           description = $2, 
           image_url = $3, 
           link = $4, 
           date = $5, 
           venue = $6, 
           category = $7,
           updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [
        eventData.title,
        eventData.description || null,
        eventData.image_url || null,
        eventData.link || null,
        eventData.date,
        eventData.venue,
        eventData.category,
        id
      ]
    );

    if (result.rows.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: 'Event not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify(result.rows[0]),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating event:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}