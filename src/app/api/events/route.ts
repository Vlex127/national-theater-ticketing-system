// app/api/events/route.ts (modified to handle single events)
import { NextRequest, NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
        
        return NextResponse.json(result.rows[0]);
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
        return NextResponse.json(result.rows);
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