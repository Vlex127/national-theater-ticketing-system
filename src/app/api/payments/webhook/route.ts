import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bookings, tickets, seats as seatsTable } from '@/lib/db/schema';
import { and, eq, inArray } from 'drizzle-orm';

// This endpoint handles Paystack webhook events
// It processes payment events asynchronously

export async function POST(request: Request) {
  try {
    // Verify the webhook signature (Paystack sends this in the headers)
    const signature = request.headers.get('x-paystack-signature');
    if (!signature) {
      return new Response('No signature provided', { status: 400 });
    }

    // Get the raw body as text for signature verification
    const body = await request.text();
    
    // Verify the webhook signature (you need to implement this function)
    const isValid = await verifyWebhookSignature(body, signature);
    
    if (!isValid) {
      return new Response('Invalid signature', { status: 401 });
    }

    const event = JSON.parse(body);
    const { event: eventType, data } = event;

    // We're only interested in charge.success events
    if (eventType !== 'charge.success') {
      return new Response(JSON.stringify({ received: true }));
    }

    const { reference, customer, metadata } = data;
    const customerEmail = customer?.email;
    const bookingReference = reference || metadata?.reference;

    if (!bookingReference) {
      console.error('No booking reference found in webhook payload');
      return new Response('No booking reference', { status: 400 });
    }

    // Find the booking by reference
    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.bookingReference, bookingReference))
      .limit(1);

    if (!booking) {
      console.error('Booking not found for reference:', bookingReference);
      return new Response('Booking not found', { status: 404 });
    }

    // Skip if already processed
    if (booking.paymentStatus === 'paid' && booking.status === 'confirmed') {
      return new Response(JSON.stringify({ status: 'already_processed' }));
    }

    // Update booking status to confirmed
    await db
      .update(bookings)
      .set({
        status: 'confirmed',
        paymentStatus: 'paid',
        updatedAt: new Date(),
        ...(customerEmail && { customerEmail }), // Update email if provided by Paystack
      })
      .where(eq(bookings.id, booking.id));

    // Get all tickets for this booking
    const bookingTickets = await db
      .select()
      .from(tickets)
      .where(eq(tickets.bookingId, booking.id));

    // Update seat status to 'booked' for all tickets
    await db
      .update(seatsTable)
      .set({ status: 'booked', updatedAt: new Date() })
      .where(
        and(
          inArray(
            seatsTable.id,
            bookingTickets.map((t) => t.seatId)
          ),
          inArray(seatsTable.status, ['available', 'reserved'])
        )
      );

    // Here you would typically send a confirmation email with tickets
    // await sendConfirmationEmail(booking, customerEmail, bookingTickets);

    return new Response(JSON.stringify({ status: 'success' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

// Helper function to verify the webhook signature
async function verifyWebhookSignature(
  body: string,
  signature: string
): Promise<boolean> {
  // Get the secret key from environment variables
  const secret = process.env.PAYSTACK_SECRET_KEY || '';
  
  // For local development, you might want to skip verification
  if (process.env.NODE_ENV === 'development' && !process.env.FORCE_WEBHOOK_VERIFICATION) {
    console.warn('Skipping webhook signature verification in development');
    return true;
  }

  // In a production environment, you should verify the signature
  // This requires the crypto module from Node.js
  const crypto = require('crypto');
  
  const hmac = crypto.createHmac('sha512', secret);
  hmac.update(body);
  const computedSignature = hmac.digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'utf8'),
    Buffer.from(computedSignature, 'utf8')
  );
}
