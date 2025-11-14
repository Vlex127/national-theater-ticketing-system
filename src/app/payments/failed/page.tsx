import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. Please try again or contact support if the issue persists.
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/bookings">Try Again</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          If you were charged, the amount will be refunded to your account within 3-5 business days.
        </p>
      </div>
    </div>
  );
}
