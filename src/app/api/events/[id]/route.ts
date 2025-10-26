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