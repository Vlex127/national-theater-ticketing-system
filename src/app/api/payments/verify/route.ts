import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bookings, tickets, seats as seatsTable } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

// This endpoint handles the Paystack callback after payment
// It verifies the payment and updates the booking status accordingly
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get('reference');
  
  if (!reference) {
    return NextResponse.redirect(
      new URL('/payment/failed?error=missing_reference', request.url)
    );
  }

  try {
    // Verify the payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verification = await paystackResponse.json();

    if (!verification.status || !verification.data) {
      console.error('Paystack verification failed:', verification);
      return NextResponse.redirect(
        new URL(`/payment/failed?error=verification_failed&reference=${reference}`, request.url)
      );
    }

    const { status, reference: paystackRef, metadata } = verification.data;
    const customerEmail = verification.data.customer?.email;
    const bookingReference = verification.data.reference || paystackRef;

    // Find the booking by reference
    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.bookingReference, bookingReference))
      .limit(1);

    if (!booking) {
      console.error('Booking not found for reference:', bookingReference);
      return NextResponse.redirect(
        new URL(`/payment/failed?error=booking_not_found&reference=${bookingReference}`, request.url)
      );
    }

    if (status === 'success') {
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

      return NextResponse.redirect(
        new URL(`/bookings/${booking.id}?payment=success`, request.url)
      );
    } else {
      // Payment failed or was abandoned
      // Release the seats back to available
      const bookingTickets = await db
        .select()
        .from(tickets)
        .where(eq(tickets.bookingId, booking.id));

      await db
        .update(seatsTable)
        .set({ status: 'available', updatedAt: new Date() })
        .where(
          inArray(
            seatsTable.id,
            bookingTickets.map((t) => t.seatId)
          )
        );

      // Update booking status to failed
      await db
        .update(bookings)
        .set({
          status: 'cancelled',
          paymentStatus: 'failed',
          updatedAt: new Date(),
        })
        .where(eq(bookings.id, booking.id));

      return NextResponse.redirect(
        new URL(`/bookings/${booking.id}?payment=failed`, request.url)
      );
    }
  } catch (error) {
    console.error('Error processing payment verification:', error);
    return NextResponse.redirect(
      new URL(`/payment/error?error=processing_error&reference=${reference}`, request.url)
    );
  }
}
