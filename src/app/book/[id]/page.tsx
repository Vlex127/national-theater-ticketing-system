'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ChevronLeft, ZoomIn, ZoomOut } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import 'material-icons/iconfont/material-icons.css';

const ACCENT_COLOR = "text-amber-500";
const ACCENT_BG = "bg-amber-500";
const DARK_BG = "bg-gray-900";
const MID_BG = "bg-gray-800";
const BORDER_COLOR = "border-gray-700";

type Seat = {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'unavailable';
  price: number;
  category: 'VIP' | 'Regular' | 'Balcony';
};

type Section = {
  name: string;
  price: number;
  rows: {
    [key: string]: Seat[];
  };
};

// Add touch detection
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export default function SeatSelection() {
  const { id } = useParams();
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Generate theater seats (mock data)
  useEffect(() => {
    // Simulate API call
    const generateTheaterSeats = () => {
      const newSections: Section[] = [
        {
          name: 'VIP',
          price: 15000,
          rows: {},
        },
        {
          name: 'Regular',
          price: 10000,
          rows: {},
        },
        {
          name: 'Balcony',
          price: 5000,
          rows: {},
        },
      ];

      // Generate seats for each section
      newSections.forEach((section, sectionIndex) => {
        const rowCount = sectionIndex === 0 ? 5 : sectionIndex === 1 ? 10 : 8;
        const seatsPerRow = sectionIndex === 0 ? 20 : sectionIndex === 1 ? 30 : 25;
        
        for (let i = 0; i < rowCount; i++) {
          const rowLetter = String.fromCharCode(65 + i);
          section.rows[rowLetter] = [];
          
          for (let j = 1; j <= seatsPerRow; j++) {
            section.rows[rowLetter].push({
              id: `${section.name}-${rowLetter}-${j}`,
              row: rowLetter,
              number: j,
              status: Math.random() > 0.2 ? 'available' : 'unavailable',
              price: section.price,
              category: section.name as 'VIP' | 'Regular' | 'Balcony',
            });
          }
        }
      });

      setSections(newSections);
      setIsLoading(false);
    };

    generateTheaterSeats();
  }, []);

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.status === 'unavailable') return;

    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.id === seat.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) return;
    setShowCheckout(true);
  };

  const handleConfirmBooking = () => {
    // TODO: Implement booking confirmation
    console.log('Booking confirmed:', selectedSeats);
    router.push(`/confirmation/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Handle touch/mouse events for dragging
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isMobile) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setIsDragging(true);
    setStartX(clientX - (containerRef.current?.offsetLeft || 0));
    setStartY(clientY - (containerRef.current?.offsetTop || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    setScrollTop(containerRef.current?.scrollTop || 0);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !isMobile) return;
    e.preventDefault();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - (containerRef.current?.offsetLeft || 0);
    const y = clientY - (containerRef.current?.offsetTop || 0);
    
    const walkX = (x - startX) * 2;
    const walkY = (y - startY) * 2;
    
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walkX;
      containerRef.current.scrollTop = scrollTop - walkY;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 1.5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.7));
  };

  return (
    <div className="bg-gray-900 text-gray-300 font-body min-h-screen flex flex-col">
      {/* Header */}
      
      <header className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-md shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
      {/* Back Button (Left side) */}
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-300 hover:text-white transition-colors absolute left-4 sm:left-6 lg:left-8"
      >
        <span className="material-icons">arrow_back</span>
        <span className="ml-2">Back</span>
      </button>

      {/* Seat Selection Title (Center) */}
      <div className="flex-grow flex justify-center">
        <h1 className="text-xl font-bold text-white">Seat Selection</h1>
      </div>

      {/* Placeholder for balance (Right side - optional but recommended for perfect centering) */}
      <div className="w-20"></div> {/* Adjust width to match the approximate width of the Back button/text */}
      
    </div>
  </div>
</header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Screen */}
        <div className="bg-gray-700 text-white py-4 mb-8 rounded-lg text-center font-semibold border border-gray-600 mx-auto max-w-3xl">
          STAGE
        </div>

        {/* Seating Area */}
        <div 
          ref={containerRef}
          className="relative w-full h-[calc(100vh-300px)] overflow-auto touch-none bg-gray-800 rounded-xl p-4 border border-gray-700"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          <div className="p-4" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>

          {sections.map((section) => (
            <div key={section.name} className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-white px-2">
                {section.name} Section - <span className={ACCENT_COLOR}>₦{section.price.toLocaleString()}</span>
              </h2>
              <div className="overflow-visible">
                {Object.entries(section.rows).map(([rowLetter, seats]) => (
                  <div key={rowLetter} className="flex items-center mb-2">
                    <span className="w-6 text-xs font-medium text-gray-400">{rowLetter}</span>
                    <div className="flex space-x-1">
                      {seats.map((seat) => {
                        const isSelected = selectedSeats.some((s) => s.id === seat.id);
                        const isUnavailable = seat.status === 'unavailable';
                        
                        const getSeatColor = () => {
                          if (isSelected) return 'bg-blue-600 border-blue-500 text-white';
                          if (isUnavailable) return 'bg-gray-700 border-gray-600 text-gray-500';
                          if (section.name === 'VIP') return 'bg-amber-500/20 border-amber-500 text-amber-500';
                          if (section.name === 'Balcony') return 'bg-purple-600/20 border-purple-600 text-purple-400';
                          return 'bg-blue-600/20 border-blue-500 text-blue-400';
                        };
                        
                        return (
                          <button
                            key={seat.id}
                            onClick={() => toggleSeatSelection(seat)}
                            onTouchStart={(e) => e.stopPropagation()}
                            disabled={isUnavailable}
                            className={`flex-shrink-0 w-8 h-8 rounded border flex items-center justify-center text-xs font-medium transition-all ${
                              isSelected 
                                ? 'scale-110 shadow-lg' 
                                : 'hover:brightness-125 active:scale-95'
                            } ${getSeatColor()}`}
                            aria-label={`${isUnavailable ? 'Unavailable: ' : ''}${section.name} - Row ${rowLetter} Seat ${seat.number} - ₦${seat.price.toLocaleString()}`}
                          >
                            {seat.number}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700 max-w-3xl mx-auto">
        <h4 className="font-semibold mb-3 text-white text-sm">Legend</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-blue-500 bg-blue-600/20"></div>
            <span className="text-gray-300">Regular</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-amber-500 bg-amber-500/20"></div>
            <span className="text-gray-300">VIP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-purple-600 bg-purple-600/20"></div>
            <span className="text-gray-300">Balcony</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-blue-500 bg-blue-600"></div>
            <span className="text-gray-300">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-gray-600 bg-gray-700"></div>
            <span className="text-gray-500">Unavailable</span>
          </div>
        </div>
      </div>

      </main>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="max-w-[60%]">
                <h3 className="font-medium text-white text-sm">
                  {selectedSeats.length} {selectedSeats.length === 1 ? 'Seat' : 'Seats'} Selected • 
                  <span className={ACCENT_COLOR}>
                    {' '}₦{selectedSeats.reduce((sum, seat) => sum + seat.price, 0).toLocaleString()}
                  </span>
                </h3>
                <p className="text-xs text-gray-400 truncate mt-1">
                  {selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(', ')}
                </p>
              </div>
              <button 
                onClick={handleProceedToCheckout}
                className={`${ACCENT_BG} hover:bg-amber-600 text-gray-900 font-semibold py-3 px-6 rounded-lg text-sm transition-colors duration-200 flex items-center gap-2`}
              >
                <span>Continue</span>
                <span className="material-icons text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`${DARK_BG} rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto border ${BORDER_COLOR} shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Confirm Your Seats</h2>
              <button 
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-white"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-medium text-gray-300 mb-3">Selected Seats</h3>
                <ul className="space-y-2">
                  {selectedSeats.map((seat) => (
                    <li key={seat.id} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
                      <div>
                        <p className="text-white font-medium">
                          {seat.category} - Row {seat.row} Seat {seat.number}
                        </p>
                        <p className="text-amber-500 text-sm">
                          ₦{seat.price.toLocaleString()}
                        </p>
                      </div>
                      <button 
                        onClick={() => toggleSeatSelection(seat)}
                        className="text-gray-400 hover:text-white p-1"
                      >
                        <span className="material-icons text-lg">close</span>
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">
                      ₦{selectedSeats.reduce((sum, seat) => sum + seat.price, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>Fees</span>
                    <span>₦500</span>
                  </div>
                  <div className="flex justify-between mt-3 pt-3 border-t border-gray-700">
                    <span className="font-semibold text-white">Total</span>
                    <span className={`${ACCENT_COLOR} font-bold`}>
                      ₦{(selectedSeats.reduce((sum, seat) => sum + seat.price, 0) + 500).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 text-sm text-blue-300">
                <p>Your seats will be held for 10 minutes while you complete your booking.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleConfirmBooking}
                className={`w-full py-3 ${ACCENT_BG} hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2`}
              >
                <span>Proceed to Payment</span>
                <span className="material-icons">arrow_forward</span>
              </button>
              <button 
                onClick={() => setShowCheckout(false)}
                className="w-full py-3 bg-transparent hover:bg-gray-800 text-gray-300 font-medium rounded-lg border border-gray-700 transition-colors duration-200"
              >
                Back to Seats
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
