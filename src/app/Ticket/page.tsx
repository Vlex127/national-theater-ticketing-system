"use client"; // This component will require client-side interactivity

import Image from "next/image";
import { useState } from "react";
import Head from "next/head";

// Reusable color variables for consistency
const ACCENT_COLOR = "bg-yellow-400";
const DARK_BG = "bg-gray-950";
const MID_BG = "bg-gray-900";
const BORDER_COLOR = "border-gray-800";

// Dummy data for event and ticket types
const eventData = {
  title: "FELA! The Musical",
  date: "Saturday, November 9, 2025",
  time: "7:00 PM - 10:00 PM",
  venue: "Main Auditorium, National Theater Lagos",
  description: "Experience the electrifying story of Afrobeat pioneer Fela Kuti. A powerful, theatrical celebration of his life, music, and activism.",
  posterUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhtbVFkgv5EwpP9RS3JWVOoi0KZl1BgefXXntLuWO5A8XUA2Yms8ksA5JXYewDBdJA_buf9GsK78Co7gLRKH0HuPeUPRARVy4BTE84KSiiXrNp-_v3m_9x2SLURwRdXXlrYjW7_s253J7NO51a7i11DkQIo8R4WP5BjJK2ZEYUWjRWv-FGvI4WIIf6g5pmhvFJUNii-xOq8RMchdlJBW0LtJxBzIiiFSdiOUb5AQzG1o2x23n4FnDMqBf4MQS8nOzaVwGgDkkBRvc", // Use a relevant image URL
};

const ticketTypes = [
  { id: 1, name: "VIP Seating", price: 15000, description: "Front rows and exclusive lounge access." },
  { id: 2, name: "Premium Seating", price: 10000, description: "Center seats with best views." },
  { id: 3, name: "Standard Seating", price: 5000, description: "Upper levels or side seating." },
];

export default function TicketPage() {
  const [quantities, setQuantities] = useState({});

  // Function to update ticket quantity
  const handleQuantityChange = (id, change) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const newQuantity = Math.max(0, current + change);
      return { ...prev, [id]: newQuantity };
    });
  };

  // Calculate total cost
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const subtotal = ticketTypes.reduce((sum, ticket) => {
    return sum + (quantities[ticket.id] || 0) * ticket.price;
  }, 0);
  
  // Format price to Naira (₦)
  const formatPrice = (price) => `₦${price.toLocaleString()}`;

  // Check if any tickets are selected
  const isCartEmpty = totalItems === 0;

  return (
    <>
      <Head>
        <title>Book Tickets | {eventData.title}</title>
      </Head>

      <div className={`min-h-screen ${DARK_BG} text-white`}>
        {/* Header (Simplified for internal page) */}
        <header className={`py-4 border-b ${BORDER_COLOR} px-4 md:px-8 lg:px-12`}>
          <a href="/
          ">
          <h1 className="text-xl font-bold tracking-tight text-white/90">
            National Theater / Booking
          </h1>
          </a>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
            Select Tickets
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* 1. Event Details Column (1/3 width on desktop) */}
            <div className="lg:col-span-1">
              <div className={`${MID_BG} rounded-xl overflow-hidden shadow-2xl sticky top-20`}>
                {/* Event Poster */}
                <div 
                  className="w-full h-64 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${eventData.posterUrl})` }}
                  role="img" 
                  aria-label={`Poster for ${eventData.title}`}
                ></div>
                
                {/* Details Card */}
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-2xl font-bold leading-snug">{eventData.title}</h3>
                  <div className="text-sm text-gray-300">
                    <p className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-base text-yellow-400">calendar_month</span>
                      {eventData.date}
                    </p>
                    <p className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-base text-yellow-400">schedule</span>
                      {eventData.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-yellow-400">location_on</span>
                      {eventData.venue}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 border-t pt-4 border-gray-800">
                    {eventData.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Ticket Selection & Summary Column (2/3 width on desktop) */}
            <div className="lg:col-span-2">
              
              {/* Ticket Selection List */}
              <div className="mb-10 flex flex-col gap-4">
                <h3 className="text-2xl font-bold mb-4">Choose Your Seating</h3>
                {ticketTypes.map((ticket) => (
                  <div key={ticket.id} className={`flex justify-between items-center ${MID_BG} p-5 rounded-lg border ${BORDER_COLOR} hover:border-yellow-400/50 transition-all`}>
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold">{ticket.name}</p>
                      <p className="text-sm text-gray-400">{ticket.description}</p>
                      <p className={`text-xl font-bold mt-1 text-yellow-400`}>{formatPrice(ticket.price)}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleQuantityChange(ticket.id, -1)}
                        className="size-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                        disabled={quantities[ticket.id] === 0 || isCartEmpty}
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="w-8 text-center text-lg font-bold">{quantities[ticket.id] || 0}</span>
                      <button 
                        onClick={() => handleQuantityChange(ticket.id, 1)}
                        className="size-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-400 hover:text-gray-950 transition-colors"
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary & Checkout */}
              <div className={`mt-10 p-6 rounded-xl shadow-lg ${MID_BG} border ${BORDER_COLOR}`}>
                <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
                <div className="flex justify-between text-lg mb-2">
                  <p className="text-gray-400">Total Tickets</p>
                  <p className="font-semibold">{totalItems}</p>
                </div>
                
                <div className="flex justify-between text-2xl font-extrabold border-t pt-4 mt-4 border-gray-700">
                  <p>Subtotal</p>
                  <p className="text-yellow-400">{formatPrice(subtotal)}</p>
                </div>
                
                <button 
                  className={`w-full h-14 mt-6 rounded-lg text-lg font-bold tracking-wider transition-all duration-300 ${isCartEmpty ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : `${ACCENT_COLOR} text-gray-950 hover:bg-yellow-500`}`}
                  disabled={isCartEmpty}
                >
                  {isCartEmpty ? 'Select Tickets to Proceed' : `Continue to Checkout`}
                </button>
                
                <p className="text-xs text-center text-gray-500 mt-3">
                  (Taxes and fees calculated at checkout)
                </p>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}