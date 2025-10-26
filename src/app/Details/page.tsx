"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import NavLinks from "../../components/NavLinks";
import 'material-icons/iconfont/material-icons.css';

const ACCENT_COLOR = "text-amber-500";
const ACCENT_BG = "bg-amber-500";
const DARK_BG = "bg-gray-900";
const MID_BG = "bg-gray-800";
const BORDER_COLOR = "border-gray-700";

export default function DetailsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dummy data; you can replace this with real fetch
  const showInfo = {
    title: "Fela's Republic",
    date: "Dec 25, 2024, 7:00 PM",
    venue: "Main Auditorium",
    description: "Experience the legendary Fela's music and dance performance.",
    // Add more details as needed
  };

  return (
    <div className="bg-gray-900 text-gray-300 font-body min-h-screen flex flex-col">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`size-8 sm:size-10 flex items-center justify-center rounded-full ${ACCENT_BG} shadow-lg`}>
                <span className="material-icons text-gray-900 font-bold text-lg sm:text-xl">
                  theater_comedy
                </span>
              </div>
              <div>
                <h2 className="text-white text-lg sm:text-xl font-bold">National Theater</h2>
                <p className="text-amber-500 text-xs">Nigeria</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <NavLinks />
            </nav>

            {/* Search & CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search - hidden on small screens */}
              <div className="hidden lg:flex items-center bg-gray-800 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="bg-transparent border-none focus:outline-none text-white placeholder-gray-400 w-40 xl:w-48"
                />
                <button className="text-gray-400 hover:text-amber-500 transition-colors p-2">
                  <span className="material-icons">search</span>
                </button>
              </div>

              {/* Book Tickets Button */}
              <button className="hidden sm:flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-200 text-sm sm:text-base">
                <span className="material-icons text-lg">confirmation_number</span>
                <span className="hidden sm:inline">Book Tickets</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="material-icons text-2xl">{isMenuOpen ? "close" : "menu"}</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-gray-800 rounded-2xl mt-2 p-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
              <nav className="flex flex-col gap-2">
                <NavLinks />
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center bg-gray-700 rounded-lg px-4 py-3 mb-4">
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="w-full bg-transparent border-none focus:outline-none text-white placeholder-gray-400"
                    />
                    <span className="material-icons text-gray-400">search</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 rounded-lg transition-all duration-300">
                    <span className="material-icons text-lg">confirmation_number</span>
                    Book Tickets
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold font-display text-white">{showInfo.title}</h1>
            <p className="text-gray-400">{showInfo.venue} - {showInfo.date}</p>
            <p className="mt-2 text-gray-300">{showInfo.description}</p>
          </div>
          {/* Buttons */}
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-gray-800 text-white hover:bg-gray-700 transition">
              <span className="material-icons">zoom_in</span>
            </button>
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-gray-800 text-white hover:bg-gray-700 transition">
              <span className="material-icons">zoom_out</span>
            </button>
          </div>
        </div>

        {/* Seat Map + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-white text-2xl font-semibold mb-6 text-center">Stage & Seats</h2>
            
            {/* Stage */}
            <div className="bg-gray-700 text-white py-4 mb-8 rounded-lg text-center font-semibold border border-gray-600">
              STAGE
            </div>
            
            {/* Seat Layout */}
            <div className="h-[500px] overflow-auto flex flex-col gap-4 text-xs p-4">
              {/* Example rows */}
              {['A', 'B', 'C', 'D', 'E'].map(row => (
                <div key={row} className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5, 6].map(seat => (
                    <div 
                      key={`${row}${seat}`}
                      className="w-8 h-8 rounded bg-blue-600 border border-blue-500 cursor-pointer hover:bg-blue-500 transition-colors flex items-center justify-center text-white text-xs"
                      title={`${row}${seat} - Available`}
                    >
                      {row}{seat}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 sticky top-28 self-start">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-white text-2xl font-bold mb-6">Your Selection</h3>
              
              {/* Selected seats list */}
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-400">Selected Seats:</span>
                  <span className="font-bold text-white">2</span>
                </div>
                <ul className="border-t border-b border-gray-600 py-4 space-y-3">
                  <li className="flex justify-between items-center">
                    <div>
                      <span className="block font-medium text-white">VIP, A3</span>
                      <span className="text-amber-500 text-sm">₦50,000</span>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <span className="material-icons text-lg">close</span>
                    </button>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <span className="block font-medium text-white">VIP, A4</span>
                      <span className="text-amber-500 text-sm">₦50,000</span>
                    </div>
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <span className="material-icons text-lg">close</span>
                    </button>
                  </li>
                </ul>
              </div>
              
              {/* Subtotal & Total */}
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-gray-300">
                  <span>Subtotal</span>
                  <span>₦100,000</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-300">
                  <span>Fees</span>
                  <span>₦2,500</span>
                </div>
                <div className="flex justify-between border-t border-gray-600 pt-3 mt-3">
                  <span className="text-xl font-bold text-amber-500">Total</span>
                  <span className="text-xl font-bold text-amber-500">₦102,500</span>
                </div>
              </div>
              
              {/* Proceed Button */}
              <a href='/Payout'>
              <button className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors duration-200 mb-6">
                Proceed to Payment
              </button>
              </a>
              
              {/* Legend */}
              <div>
                <h4 className="font-semibold mb-3 text-white text-sm">Legend</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-blue-600 border border-blue-500"></div>
                    <span className="text-gray-300">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-amber-500"></div>
                    <span className="text-gray-300">VIP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gray-600"></div>
                    <span className="text-gray-300">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-green-800"></div>
                    <span className="text-gray-300">Main Hall</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-purple-600"></div>
                    <span className="text-gray-300">Balcony</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gray-400"></div>
                    <span className="text-gray-300">Selected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}