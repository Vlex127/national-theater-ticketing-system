import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bookings, tickets, seats as seatsTable } from '@/lib/db/schema';
import { eq, and, inArray } from 'drizzle-orm';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    // Authenticate the user
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { eventId, seatIds, paymentMethod = 'card' } = await request.json();

    if (!eventId || !Array.isArray(seatIds) || seatIds.length === 0) {
      return NextResponse.json(
        { error: 'Event ID and at least one seat ID are required' },
        { status: 400 }
      );
    }

    // Validate UUIDs early to avoid DB cast errors
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(eventId) || !seatIds.every((id: string) => uuidRegex.test(id))) {
      return NextResponse.json(
        { error: 'Invalid eventId/seatIds (expected UUIDs)' },
        { status: 400 }
      );
    }

    // 1) Lock seats by setting status to 'booked' only if currently available or reserved
    const lockedSeats = await db
      .update(seatsTable)
      .set({ status: 'booked', updatedAt: new Date() })
      .where(
        and(
          inArray(seatsTable.id, seatIds),
          eq(seatsTable.eventId, eventId),
          inArray(seatsTable.status, ['available', 'reserved'])
        )
      )
      .returning({ id: seatsTable.id, price: seatsTable.price });

    if (lockedSeats.length !== seatIds.length) {
      // Some seats could not be booked (race condition)
      return NextResponse.json(
        { error: 'One or more seats are not bookable (already taken)' },
        { status: 409 }
      );
    }

    // 2) Calculate total from locked seats
    const totalAmount = lockedSeats.reduce((sum, s) => sum + Number(s.price), 0);

    // 3) Initialize Paystack payment
    const bookingReference = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      // Rollback seat lock if no key configured
      await db.update(seatsTable)
        .set({ status: 'available', updatedAt: new Date() })
        .where(inArray(seatsTable.id, lockedSeats.map((s) => s.id)));
      return NextResponse.json(
        { error: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    // Resolve payer email
    let payerEmail: string | null = (session as any)?.user?.email ?? null;
    if (!payerEmail) {
      const u = await db.query.users.findFirst({
        where: (u, { eq }) => eq(u.id, session.user.id),
        columns: { email: true },
      });
      payerEmail = u?.email ?? null;
    }
    if (!payerEmail) {
      // Rollback seat lock if no email for Paystack
      await db.update(seatsTable)
        .set({ status: 'available', updatedAt: new Date() })
        .where(inArray(seatsTable.id, lockedSeats.map((s) => s.id)));
      return NextResponse.json(
        { error: 'User email required for payment' },
        { status: 400 }
      );
    }

    const callbackUrl = process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/payments/verify` : undefined;
    const initRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      // Paystack expects amount in kobo
      body: JSON.stringify({
        email: payerEmail,
        amount: Math.round(totalAmount * 100),
        reference: bookingReference,
        currency: 'NGN',
        ...(callbackUrl ? { callback_url: callbackUrl } : {}),
      }),
    });

    if (!initRes.ok) {
      const errData = await initRes.json().catch(() => ({}));
      // Rollback seat lock on failure
      await db.update(seatsTable)
        .set({ status: 'available', updatedAt: new Date() })
        .where(inArray(seatsTable.id, lockedSeats.map((s) => s.id)));
      return NextResponse.json(
        { error: errData?.message || 'Failed to initialize payment' },
        { status: 502 }
      );
    }

    const initJson: any = await initRes.json();
    const authorizationUrl: string | undefined = initJson?.data?.authorization_url;
    const gatewayReference: string | undefined = initJson?.data?.reference;
    if (!authorizationUrl || !gatewayReference) {
      // Rollback seat lock on malformed response
      await db.update(seatsTable)
        .set({ status: 'available', updatedAt: new Date() })
        .where(inArray(seatsTable.id, lockedSeats.map((s) => s.id)));
      return NextResponse.json(
        { error: 'Invalid payment initialization response' },
        { status: 502 }
      );
    }

    // 4) Create booking (pending until webhook confirms)
    const [booking] = await db
      .insert(bookings)
      .values({
        userId: session.user.id,
        eventId,
        status: 'pending',
        totalAmount: totalAmount.toString(),
        paymentStatus: 'pending',
        paymentMethod,
        paymentId: gatewayReference,
        bookingReference,
      })
      .returning();

    // 4) Create tickets
    await Promise.all(
      lockedSeats.map((s) => {
        const ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        return db.insert(tickets).values({
          bookingId: booking.id,
          seatId: s.id,
          price: s.price.toString(),
          status: 'active',
          ticketNumber,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketNumber}`,
        });
      })
    );

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.id,
        bookingReference,
        totalAmount,
        seatCount: lockedSeats.length,
        authorizationUrl,
        paymentReference: gatewayReference,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
