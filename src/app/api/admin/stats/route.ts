import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    
    try {
      // Get total events count
      const eventsResult = await client.query('SELECT COUNT(*) FROM events');
      const totalEvents = parseInt(eventsResult.rows[0].count) || 0;
      
      // For now, we'll just return the events count
      // You can add more stats queries here as needed
      return NextResponse.json({
        totalEvents,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
