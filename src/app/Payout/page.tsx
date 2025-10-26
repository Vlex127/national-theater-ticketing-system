"use client";
import { useState } from "react";

export default function PayoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between py-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="material-icons text-gray-900 font-bold">theater_comedy</span>
            </div>
            <div>
              <h2 className="text-white text-xl font-bold font-poppins">National Theater</h2>
              <p className="text-amber-500 text-xs">Nigeria</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-white text-sm font-medium hover:text-amber-500 transition-colors" href="/">Home</a>
            <a className="text-white text-sm font-medium hover:text-amber-500 transition-colors" href="#">Events</a>
            <a className="text-white text-sm font-medium hover:text-amber-500 transition-colors" href="#">About</a>
            <a className="text-white text-sm font-medium hover:text-amber-500 transition-colors" href="#">Contact</a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-8">
            <a className="text-gray-400 text-sm hover:text-amber-500 transition-colors" href="/seats">
              Select Seats
            </a>
            <span className="text-gray-600">/</span>
            <span className="text-amber-500 text-sm font-semibold">Payment</span>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400 text-sm">Confirmation</span>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 font-poppins">
            Complete Your Payment
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 font-poppins">Payment Method</h3>
                
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="space-y-4">
                    {/* Card Payment */}
                    <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "card" 
                        ? "border-amber-500 bg-amber-500/10" 
                        : "border-gray-600 hover:border-gray-500"
                    }`}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-white font-medium">Debit Card</span>
                    </label>

                    {paymentMethod === "card" && (
                      <div className="space-y-6 pl-4 border-l-2 border-amber-500 ml-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="XXXX XXXX XXXX XXXX"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              placeholder="XXX"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bank Transfer */}
                    <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "bank" 
                        ? "border-amber-500 bg-amber-500/10" 
                        : "border-gray-600 hover:border-gray-500"
                    }`}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-white font-medium">Bank Transfer</span>
                    </label>

                    {/* Paystack */}
                    <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === "paystack" 
                        ? "border-amber-500 bg-amber-500/10" 
                        : "border-gray-600 hover:border-gray-500"
                    }`}>
                      <input
                        type="radio"
                        name="payment_method"
                        value="paystack"
                        checked={paymentMethod === "paystack"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-white font-medium">Paystack</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Payment Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <button className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                  <span className="material-icons">lock</span>
                  Pay ₦47,000
                </button>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="material-icons text-green-500">verified</span>
                  SSL Secured & PCI Compliant
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sticky top-8">
                <h3 className="text-xl font-bold text-white mb-6 font-poppins">Order Summary</h3>
                
                {/* Event Details */}
                <div className="flex gap-4 mb-6">
                  <div className="w-24 h-24 bg-gray-700 rounded-lg flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <span className="material-icons text-gray-900 text-2xl">theater_comedy</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-lg mb-1">The Lion King</h4>
                    <p className="text-gray-400 text-sm mb-2">Sat, 24th July 2024 - 7:30 PM</p>
                    <p className="text-gray-400 text-sm">National Theater, Lagos</p>
                    <p className="text-amber-500 text-sm font-medium mt-1">Balcony, Row E, Seats 12-14</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 my-4"></div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">₦45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fees</span>
                    <span className="text-white">₦2,000</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between">
                      <span className="text-white font-bold text-lg">Total</span>
                      <span className="text-amber-500 font-bold text-lg">₦47,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-700 py-8 mt-12">
          <div className="flex justify-center gap-8 text-sm">
            <a className="text-gray-400 hover:text-amber-500 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-gray-400 hover:text-amber-500 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-gray-400 hover:text-amber-500 transition-colors" href="#">
              Customer Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}