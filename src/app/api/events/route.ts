// src/app/api/events/route.ts
import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM events ORDER BY date');
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}