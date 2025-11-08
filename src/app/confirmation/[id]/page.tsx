'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function BookingConfirmation() {
  const { id } = useParams();
  const router = useRouter();

  // In a real app, we would fetch the booking details using the ID
  const bookingDetails = {
    bookingId: `#${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    eventName: 'Nigerian National Theater Event', // This would come from the actual event data
    date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    venue: 'Nigerian National Theater, Iganmu, Lagos',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your booking. Your tickets have been reserved successfully.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium">{bookingDetails.bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Event:</span>
              <span className="font-medium">{bookingDetails.eventName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">{bookingDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Venue:</span>
              <span className="font-medium text-right max-w-xs">{bookingDetails.venue}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-yellow-700">
              Your e-tickets have been sent to your email. Please present the QR code at the entrance.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
          <Button 
            onClick={() => window.print()}
            className="w-full sm:w-auto"
          >
            Print Tickets
          </Button>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Need help? Contact our support at support@nationaltheater.ng or call +234 800 000 0000
        </p>
      </div>
    </div>
  );
}
