import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, index, integer, uuid, boolean, decimal, jsonb, primaryKey } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: timestamp('email_verified'),
  password: text('password'),
  image: text('image'),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
}));

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (table) => ({
  providerProviderAccountIdIdx: index('provider_provider_account_id_idx').on(
    table.provider,
    table.providerAccountId
  ),
  userIdIdx: index('user_id_idx').on(table.userId),
}));

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
}, (table) => ({
  sessionTokenIdx: index('session_token_idx').on(table.sessionToken),
  userIdIdx: index('user_id_session_idx').on(table.userId),
}));

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull(),
}, (table) => ({
  identifierTokenIdx: index('identifier_token_idx').on(table.identifier, table.token),
}));

// Events table
export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  date: timestamp('date', { withTimezone: true }).notNull(),
  time: text('time'),
  venue: text('venue').notNull(),
  imageUrl: text('image_url'),
  duration: text('duration'),
  ageRestriction: text('age_restriction'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Seats table
export const seats = pgTable('seats', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  section: text('section').notNull(),
  row: text('row').notNull(),
  number: integer('number').notNull(),
  status: text('status', { enum: ['available', 'reserved', 'booked'] }).default('available').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  eventIdIdx: index('seats_event_id_idx').on(table.eventId),
  seatLocationIdx: index('seat_location_idx').on(table.section, table.row, table.number),
}));

// Bookings table
export const bookings = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  status: text('status', { enum: ['pending', 'confirmed', 'cancelled'] }).default('pending').notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  paymentStatus: text('payment_status', { enum: ['pending', 'paid', 'failed', 'refunded'] }).default('pending').notNull(),
  paymentMethod: text('payment_method'),
  paymentId: text('payment_id'),
  bookingReference: text('booking_reference').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('bookings_user_id_idx').on(table.userId),
  eventIdIdx: index('bookings_event_id_idx').on(table.eventId),
  bookingReferenceIdx: index('booking_reference_idx').on(table.bookingReference),
}));

// Tickets table
export const tickets = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  bookingId: uuid('booking_id').notNull().references(() => bookings.id, { onDelete: 'cascade' }),
  seatId: uuid('seat_id').notNull().references(() => seats.id, { onDelete: 'cascade' }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  status: text('status', { enum: ['active', 'cancelled', 'used'] }).default('active').notNull(),
  ticketNumber: text('ticket_number').notNull().unique(),
  qrCode: text('qr_code'),
  checkedIn: boolean('checked_in').default(false).notNull(),
  checkedInAt: timestamp('checked_in_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  bookingIdIdx: index('tickets_booking_id_idx').on(table.bookingId),
  seatIdIdx: index('tickets_seat_id_idx').on(table.seatId),
  ticketNumberIdx: index('ticket_number_idx').on(table.ticketNumber),
}));

// Zod schemas for validation
export const insertEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.date().min(new Date(), 'Event date must be in the future'),
  time: z.string().optional(),
  venue: z.string().min(1, 'Venue is required'),
  imageUrl: z.string().url().optional(),
  duration: z.string().optional(),
  ageRestriction: z.string().optional()
});

export const insertSeatSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  section: z.string().min(1, 'Section is required'),
  row: z.string().min(1, 'Row is required'),
  number: z.number().int().positive('Seat number must be positive'),
  status: z.enum(['available', 'reserved', 'booked']).default('available'),
  price: z.number().min(0, 'Price cannot be negative'),
  category: z.string().min(1, 'Category is required')
});

export const insertBookingSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  eventId: z.string().uuid('Invalid event ID'),
  status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending'),
  totalAmount: z.number().min(0, 'Total amount cannot be negative'),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).default('pending'),
  paymentMethod: z.string().optional(),
  paymentId: z.string().optional(),
  bookingReference: z.string().min(1, 'Booking reference is required')
});

export const insertTicketSchema = z.object({
  bookingId: z.string().uuid('Invalid booking ID'),
  seatId: z.string().uuid('Invalid seat ID'),
  price: z.number().min(0, 'Price cannot be negative'),
  status: z.enum(['active', 'cancelled', 'used']).default('active'),
  ticketNumber: z.string().min(1, 'Ticket number is required'),
  qrCode: z.string().optional(),
  checkedIn: z.boolean().default(false)
});

// Types
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type Seat = typeof seats.$inferSelect;
export type NewSeat = typeof seats.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;
