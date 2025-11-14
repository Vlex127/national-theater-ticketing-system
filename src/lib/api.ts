import { Booking, Ticket } from './db/schema';

const API_BASE_URL = '/api';

export interface CreateBookingRequest {
  eventId: string;
  seatIds: string[];
  paymentMethod?: string;
  email?: string; // For guest checkout
}

export interface CreateBookingResponse {
  success: boolean;
  bookingId: string;
  bookingReference: string;
  totalAmount: number;
  seatCount: number;
  tickets?: Ticket[];
  authorizationUrl?: string;
  paymentReference?: string;
}

export const createBooking = async (data: CreateBookingRequest): Promise<CreateBookingResponse> => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    let message = 'Failed to create booking';
    try {
      const error = await response.json();
      message = error.error || error.message || message;
    } catch {}
    throw new Error(message);
  }

  return response.json();
};

export const updateSeatReservation = async (
  eventId: string,
  seatIds: string[],
  action: 'reserve' | 'release'
): Promise<{ updated: { id: string; status: string }[] }> => {
  const response = await fetch(`${API_BASE_URL}/seats/reserve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, seatIds, action }),
  });

  if (!response.ok) {
    let msg = 'Failed to update seat(s)';
    try {
      const data = await response.json();
      msg = data.error || msg;
    } catch {}
    throw new Error(msg);
  }

  return response.json();
};

export const getBooking = async (bookingId: string): Promise<Booking & { tickets: Ticket[] }> => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch booking');
  }

  return response.json();
};
