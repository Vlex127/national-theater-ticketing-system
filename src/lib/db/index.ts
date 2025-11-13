import { drizzle } from 'drizzle-orm/neon-http';
import { Pool, neon, neonConfig } from '@neondatabase/serverless';
import { eq, and, inArray } from 'drizzle-orm';
import * as schema from './schema';
import ws from 'ws';
import { v4 as uuidv4 } from 'uuid';

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon
  }
});

// Create a client for Drizzle
const sql = neon(process.env.DATABASE_URL!);

// Create the Drizzle instance
export const db = drizzle(sql, { schema });

// Test the database connection
async function testConnection() {
  try {
    await db.select().from(schema.events).limit(1);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
}

testConnection().catch(console.error);

// Helper functions
export async function getUserByEmail(email: string) {
  try {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    return user || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

export async function createUser(data: {
  id: string;
  email: string;
  name?: string;
  password?: string;
}) {
  try {
    const [user] = await db.insert(schema.users).values(data).returning();
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

// Event functions
export async function getEventById(id: string) {
  const [event] = await db.select().from(schema.events).where(eq(schema.events.id, id));
  return event || null;
}

export async function getEvents() {
  return await db.select().from(schema.events);
}

// Seat functions
export async function getSeatsByEventId(eventId: string) {
  return await db.select().from(schema.seats).where(eq(schema.seats.eventId, eventId));
}

export async function updateSeatStatus(seatId: string, status: 'available' | 'reserved' | 'booked') {
  const [seat] = await db
    .update(schema.seats)
    .set({ status, updatedAt: new Date() })
    .where(eq(schema.seats.id, seatId))
    .returning();
  return seat;
}

// Booking functions
export async function createBooking(data: {
  userId: string;
  eventId: string;
  seatIds: string[];
  totalAmount: number;
}) {
  const bookingId = uuidv4();
  const bookingReference = `BK-${Date.now()}`;
  
  // Start a transaction
  return await db.transaction(async (tx) => {
    // Create the booking
    const [booking] = await tx
      .insert(schema.bookings)
      .values({
        id: bookingId,
        userId: data.userId,
        eventId: data.eventId,
        totalAmount: data.totalAmount.toString(),
        bookingReference,
        status: 'pending',
        paymentStatus: 'pending',
      })
      .returning();

    // Create tickets for each seat
    const tickets = await Promise.all(
      data.seatIds.map(async (seatId) => {
        const [ticket] = await tx
          .insert(schema.tickets)
          .values({
            bookingId: booking.id,
            seatId,
            price: (data.totalAmount / data.seatIds.length).toString(),
            ticketNumber: `TKT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            status: 'active',
          })
          .returning();
        
        // Update seat status
        await tx
          .update(schema.seats)
          .set({ status: 'booked', updatedAt: new Date() })
          .where(eq(schema.seats.id, seatId));
        
        return ticket;
      })
    );

    return { booking, tickets };
  });
}

// Export types for type safety
export type User = typeof schema.users.$inferSelect;
export type NewUser = typeof schema.users.$inferInsert;
export type { Event, NewEvent } from './schema';
export type { Seat, NewSeat } from './schema';
export type { Booking, NewBooking } from './schema';
export type { Ticket, NewTicket } from './schema';
