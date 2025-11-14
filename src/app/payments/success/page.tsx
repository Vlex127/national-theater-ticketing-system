import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your booking. Your payment was successful and your tickets have been confirmed.
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/bookings">View My Bookings</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          A confirmation email with your tickets has been sent to your email address.
          If you don't see it, please check your spam folder.
        </p>
      </div>
    </div>
  );
}
