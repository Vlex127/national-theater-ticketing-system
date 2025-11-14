import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentError({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const errorMessage = searchParams.error || 'An unexpected error occurred';
  const reference = searchParams.reference || '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <AlertTriangle className="h-10 w-10 text-yellow-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Processing Error</h1>
        <p className="text-gray-600 mb-6">
          We encountered an issue while processing your payment. Please try again or contact support if the problem persists.
        </p>
        
        {reference && (
          <div className="mb-6 p-4 bg-gray-100 rounded-md text-sm text-left">
            <p className="font-medium">Reference:</p>
            <p className="break-all">{reference}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/bookings">Back to Bookings</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          If you were charged, please contact our support team with the reference number above.
        </p>
      </div>
    </div>
  );
}
