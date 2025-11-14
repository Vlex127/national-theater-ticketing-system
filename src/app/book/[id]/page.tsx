'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, ChevronLeft, ArrowRight, Calendar, Clock, MapPin, Ticket, X, CheckCircle } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import { createBooking, updateSeatReservation } from '@/lib/api';
import { toast } from 'react-toastify';

// Theme colors
const THEME = {
  primary: {
    bg: 'bg-amber-600',
    hover: 'hover:bg-amber-700',
    text: 'text-amber-600',
    border: 'border-amber-600',
    light: 'bg-amber-50',
  },
  secondary: {
    bg: 'bg-gray-800',
    hover: 'hover:bg-gray-700',
    text: 'text-gray-800',
    border: 'border-gray-300',
  },
  dark: {
    bg: 'bg-gray-900',
    light: 'bg-gray-800',
    lighter: 'bg-gray-700',
  },
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

type Seat = {
  id: string;
  sectionId: string;
  sectionName: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'unavailable' | 'reserved';
  price: number;
  category: 'VIP' | 'Standard' | 'Balcony';
};

type Section = {
  id: string;
  name: string;
  price: number;
  color: string;
  rows: {
    [key: string]: Seat[];
  };
};

type EventDetails = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  description: string;
  duration: string;
  ageRestriction: string;
};

const SECTION_COLORS: Record<string, string> = {
  VIP: 'bg-amber-500',
  Standard: 'bg-blue-500',
  Balcony: 'bg-green-500',
};

const getSectionColor = (sectionName: string) =>
  SECTION_COLORS[sectionName as keyof typeof SECTION_COLORS] ?? 'bg-gray-500';

// Fetch event data from API
const fetchEvent = async (id: string): Promise<EventDetails> => {
  const response = await fetch(`/api/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  const event = await response.json();
  
  // Extract date and time from the PostgreSQL timestamp
  // The date is stored in UTC in the database
  const eventDate = new Date(event.date);
  
  // Get UTC date components
  const year = eventDate.getUTCFullYear();
  const month = String(eventDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(eventDate.getUTCDate()).padStart(2, '0');
  const hours = String(eventDate.getUTCHours()).padStart(2, '0');
  const minutes = String(eventDate.getUTCMinutes()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD
  const formattedTime = `${hours}:${minutes}`; // HH:MM in UTC
  
  // Transform API response to match our EventDetails type
  return {
    id: event.id,
    title: event.title,
    date: formattedDate,
    time: formattedTime,
    venue: event.venue,
    image: event.imageUrl || event.image_url || '/images/placeholder-event.jpg',
    description: event.description || '',
    duration: '2h 30m',
    ageRestriction: '12+',
  };
};

type ApiSeat = {
  id: string;
  section: string;
  row: string;
  number: number;
  status: 'available' | 'reserved' | 'booked';
  price: string | number;
  category: 'VIP' | 'Standard' | 'Balcony';
};

const fetchSeatSections = async (eventId: string): Promise<Section[]> => {
  const response = await fetch(`/api/events/${eventId}/seats`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch seats');
  }

  const apiSeats: ApiSeat[] = await response.json();

  if (!apiSeats.length) {
    throw new Error('No seats available');
  }

  const sectionsMap = new Map<string, Section>();

  const mapStatus = (status: ApiSeat['status']): Seat['status'] => {
    if (status === 'available') return 'available';
    if (status === 'reserved') return 'reserved';
    return 'unavailable';
  };

  apiSeats.forEach((seat) => {
    const sectionId = seat.section.toLowerCase().replace(/\s+/g, '-');

    if (!sectionsMap.has(sectionId)) {
      sectionsMap.set(sectionId, {
        id: sectionId,
        name: seat.section,
        price: typeof seat.price === 'string' ? Number(seat.price) : seat.price,
        color: getSectionColor(seat.section),
        rows: {},
      });
    }

    const section = sectionsMap.get(sectionId)!;
    if (!section.rows[seat.row]) {
      section.rows[seat.row] = [];
    }

    section.rows[seat.row].push({
      id: seat.id,
      sectionId,
      sectionName: seat.section,
      row: seat.row,
      number: seat.number,
      status: mapStatus(seat.status),
      price: typeof seat.price === 'string' ? Number(seat.price) : seat.price,
      category: seat.category,
    });
  });

  sectionsMap.forEach((section) => {
    Object.keys(section.rows).forEach((rowKey) => {
      section.rows[rowKey] = section.rows[rowKey].sort((a, b) => a.number - b.number);
    });
  });

  return Array.from(sectionsMap.values());
};

// Generate default seats if API fails
const generateDefaultSeats = (): Section[] => {
  return [
    {
      id: 'vip',
      name: 'VIP',
      price: 25000,
      color: getSectionColor('VIP'),
      rows: generateRows('vip', 'VIP', 'VIP', 5, 20, 25000, 1),
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 15000,
      color: getSectionColor('Standard'),
      rows: generateRows('standard', 'Standard', 'Standard', 10, 30, 15000, 1),
    },
    {
      id: 'balcony',
      name: 'Balcony',
      price: 8000,
      color: getSectionColor('Balcony'),
      rows: generateRows('balcony', 'Balcony', 'Balcony', 8, 25, 8000, 1),
    },
  ];
};

// Helper function to generate rows of seats
const generateRows = (
  sectionId: string,
  sectionName: string,
  category: 'VIP' | 'Standard' | 'Balcony',
  rowCount: number,
  seatsPerRow: number,
  price: number,
  availableRatio: number
): { [key: string]: Seat[] } => {
  const rows: { [key: string]: Seat[] } = {};
  
  for (let i = 0; i < rowCount; i++) {
    const rowLetter = String.fromCharCode(65 + i);
    rows[rowLetter] = [];
    
    for (let j = 1; j <= seatsPerRow; j++) {
      const seatId = `${sectionId}-${rowLetter}-${j}`;
      const isAvailable = Math.random() < availableRatio;
      
      rows[rowLetter].push({
        id: seatId,
        sectionId,
        sectionName,
        row: rowLetter,
        number: j,
        status: isAvailable ? 'available' : 'unavailable',
        price,
        category,
      });
    }
  }
  
  return rows;
};

export default function SeatSelection() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showLegend, setShowLegend] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [seatOps, setSeatOps] = useState<Record<string, boolean>>({});
  const isUUID = (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  const hasNonUUIDSelected = selectedSeats.some((s) => !isUUID(s.id));
  
  // Filter sections to only show active section on mobile
  const visibleSections = isMobile && activeSection 
    ? sections.filter(section => section.id === activeSection)
    : sections;

  // Fetch event and seats data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch event details
        const eventData = await fetchEvent(id as string);
        setEvent(eventData);
        
        // Try to fetch seat data from API, fallback to default if fails
        let seatSections: Section[];
        try {
          seatSections = await fetchSeatSections(id as string);
          if (!seatSections || seatSections.length === 0) {
            throw new Error('No seat data available');
          }
        } catch (err) {
          console.warn('Using default seat configuration:', err);
          seatSections = generateDefaultSeats();
        }
        
        setSections(seatSections);
        if (seatSections.length > 0) {
          setActiveSection(seatSections[0].id);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load event data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const toggleSeatSelection = async (seat: Seat) => {
    if (!event) return;
    if (seatOps[seat.id]) return; // prevent double clicks

    const isSelected = selectedSeats.some((s) => s.id === seat.id);

    try {
      setSeatOps((m) => ({ ...m, [seat.id]: true }));

      if (!isSelected) {
        // selecting => reserve in DB first
        if (seat.status !== 'available') return;
        if (isUUID(seat.id)) {
          await updateSeatReservation(event.id, [seat.id], 'reserve');
        }

        // update UI: mark seat reserved in grid, add to selected as 'selected'
        setSections((prev) => updateSeatStatusInSections(prev, seat.id, 'reserved'));
        setSelectedSeats((prev) => {
          if (prev.length >= 10) return prev;
          return [...prev, { ...seat, status: 'selected' }];
        });
      } else {
        // deselect => release
        if (isUUID(seat.id)) {
          await updateSeatReservation(event.id, [seat.id], 'release');
        }
        setSections((prev) => updateSeatStatusInSections(prev, seat.id, 'available'));
        setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
      }
    } catch (e) {
      console.error('Seat toggle failed', e);
      toast.error(e instanceof Error ? e.message : 'Seat update failed');
      // optional: refetch seats to reconcile
    } finally {
      setSeatOps((m) => ({ ...m, [seat.id]: false }));
    }
  };

  const removeSeat = async (seatId: string) => {
    if (!event) return;
    try {
      if (isUUID(seatId)) {
        await updateSeatReservation(event.id, [seatId], 'release');
      }
      setSections((prev) => updateSeatStatusInSections(prev, seatId, 'available'));
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seatId));
    } catch (e) {
      console.error('Release failed', e);
      toast.error('Failed to release seat');
    }
  };

  const updateSeatStatusInSections = (
    sectionsState: Section[],
    seatId: string,
    newStatus: Seat['status']
  ): Section[] => {
    return sectionsState.map((sec) => ({
      ...sec,
      rows: Object.fromEntries(
        Object.entries(sec.rows).map(([rowKey, rowSeats]) => [
          rowKey,
          rowSeats.map((s) => (s.id === seatId ? { ...s, status: newStatus } : s)),
        ])
      ),
    }));
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  };

  const getServiceFee = () => {
    return Math.ceil(getTotalPrice() * 0.05); // 5% service fee
  };

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) return;
    setShowCheckout(true);
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) return;
    setShowEmailInput(true);
  };

  const handleConfirmBooking = async () => {
    if (!event) return;
    if (hasNonUUIDSelected || !isUUID(event.id)) {
      toast.error('These seats are not from the database. Generate seats for this event and open /book/<EVENT_UUID>');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    try {
      setIsBooking(true);

      const booking = await createBooking({
        eventId: event.id,
        seatIds: selectedSeats.map(seat => seat.id),
        paymentMethod: 'card',
        email: email // Include the email in the booking request
      });

      // If a Paystack authorization URL is provided, redirect the user immediately
      if (booking.authorizationUrl) {
        toast.success('Redirecting to Paystack to complete payment...');
        window.location.href = booking.authorizationUrl;
        return;
      }

      setBookingData(booking);
      setBookingComplete(true);
      setShowEmailInput(false);

      // Clear selected seats
      setSelectedSeats([]);

      toast.success('Booking confirmed! Redirecting to your tickets...');

      // Redirect to booking confirmation page after a short delay
      setTimeout(() => {
        router.push(`/bookings/${booking.bookingId}`);
      }, 2000);

    } catch (error) {
      console.error('Booking failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to complete booking');
    } finally {
      setIsBooking(false);
    }
  };

  // Format date for display (handles PostgreSQL timestamps like '2025-11-21 09:18:04.206156+00')
  const formatDate = (dateTimeString: string) => {
    try {
      // Handle PostgreSQL timestamp format
      const date = new Date(dateTimeString);
      
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateTimeString);
        return 'Date not available';
      }
      
      return date.toLocaleDateString('en-NG', { 
        weekday: 'short', 
        year: 'numeric',
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateTimeString.split(' ')[0]; // Return just the date part if parsing fails
    }
  };
  
  // Format time for display (handles various time formats including 'HH:MM' and PostgreSQL timestamps)
  const formatTime = (timeString: string) => {
    if (!timeString) return 'Time TBD';
    
    try {
      // Handle simple 'HH:MM' format
      if (/^\d{1,2}:\d{2}$/.test(timeString)) {
        // Parse as UTC time to avoid timezone conversion
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setUTCHours(hours, minutes, 0, 0);
        return date.toLocaleTimeString('en-NG', {
          timeZone: 'UTC',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }).toUpperCase() + ' WAT'; // Add timezone indicator
      }
      
      // Handle full date-time strings
      const date = new Date(timeString);
      
      if (isNaN(date.getTime())) {
        console.warn('Invalid time string:', timeString);
        return timeString;
      }
      
      // Format time in 12-hour format with AM/PM in UTC
      return date.toLocaleTimeString('en-NG', { 
        timeZone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toUpperCase() + ' WAT'; // Add timezone indicator
    } catch (error) {
      console.error('Error formatting time:', error);
      const timePart = timeString.split(' ')[1]?.split('.')[0];
      return timePart ? timePart + ' WAT' : timeString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold mb-2">Error Loading Event</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Event not found</h2>
          <p className="text-gray-600 mt-2">The requested event could not be found.</p>
        </div>
      </div>
    );
  }

  // Color mapping for each section type
  const sectionColors = {
    'VIP': {
      border: 'border-amber-500',
      hover: 'hover:bg-amber-50',
      selected: 'bg-amber-600 border-amber-600 text-white'
    },
    'Standard': {
      border: 'border-blue-500',
      hover: 'hover:bg-blue-50',
      selected: 'bg-blue-600 border-blue-600 text-white'
    },
    'Balcony': {
      border: 'border-green-500',
      hover: 'hover:bg-green-50',
      selected: 'bg-green-600 border-green-600 text-white'
    }
  };

  // Get seat status class
  const getSeatStatusClass = (seat: Seat) => {
    const baseClass = 'border-2';
    const colors = sectionColors[seat.category] || sectionColors['Standard'];
    
    if (seat.status === 'selected') return colors.selected;
    if (seat.status === 'unavailable') return 'bg-gray-200 border-gray-300 cursor-not-allowed';
    if (seat.status === 'reserved') return 'bg-gray-100 border-gray-300 cursor-not-allowed';
    
    // Available seat
    return `${baseClass} bg-white ${colors.border} ${colors.hover}`;
  };
  
  // Get section by ID
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1 font-medium">Back</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Select Seats</h1>
            <div className="w-8"></div> {/* For balance */}
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{event.title}</h2>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{formatTime(event.time)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 w-full">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
          {/* Seat Map */}
          <div className="w-full lg:flex-1 min-w-0">
            {/* Screen */}
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-3 rounded-lg mb-8 mx-auto max-w-2xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600 bg-white/80 px-3 py-0.5 rounded-full">STAGE</span>
              </div>
            </div>

            {/* Section Tabs - Mobile */}
            {isMobile && (
              <div className="mb-4 lg:hidden">
                <label htmlFor="section-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Section
                </label>
                <select
                  id="section-select"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={activeSection || ''}
                  onChange={(e) => setActiveSection(e.target.value)}
                >
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name} - {formatCurrency(section.price)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Section Tabs - Desktop */}
            <div className="hidden lg:flex mb-6 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Sections">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeSection === section.id
                        ? 'border-amber-500 text-amber-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {section.name} <span className="text-xs">({formatCurrency(section.price)})</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Seating Area */}
            <div 
              ref={containerRef}
              className="relative w-full overflow-x-auto touch-none bg-white rounded-xl p-2 sm:p-4 border border-gray-200 shadow-sm"
            >
              <div className="min-w-max sm:min-w-0 w-full">
                {visibleSections.map((section) => (
                  <div key={section.id} className="mb-8">
                    <h2 className="text-sm font-medium text-gray-700 mb-3 px-2">
                      {section.name} Section - <span className="font-semibold">{formatCurrency(section.price)}</span>
                    </h2>
                    <div className="overflow-x-auto">
                      {Object.entries(section.rows).map(([rowLetter, seats]) => (
                        <div key={rowLetter} className="flex items-center mb-2">
                          <span className="w-6 text-xs font-medium text-gray-500">{rowLetter}</span>
                          <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
                            {seats.map((seat) => {
                              const isSelected = selectedSeats.some((s) => s.id === seat.id);
                              const isUnavailable = seat.status === 'unavailable' || seat.status === 'reserved';
                              
                              return (
                                <button
                                  key={seat.id}
                                  onClick={() => toggleSeatSelection(seat)}
                                  disabled={isUnavailable}
                                  className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded border flex items-center justify-center text-xs font-medium transition-all ${
                                    isSelected 
                                      ? 'scale-110 shadow-md' 
                                      : isUnavailable 
                                        ? '' 
                                        : 'hover:scale-105 active:scale-95'
                                  } ${getSeatStatusClass(seat)}`}
                                  aria-label={`${isUnavailable ? 'Unavailable: ' : ''}${section.name} - Row ${rowLetter} Seat ${seat.number} - ${formatCurrency(seat.price)}`}
                                >
                                  {isUnavailable ? '' : seat.number}
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
            <div className="mt-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">Seat Status</h3>
                <button 
                  onClick={() => setShowLegend(!showLegend)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showLegend ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
              
              {showLegend && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  {sections.map((section) => (
                    <div key={section.id} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${section.color}`}></div>
                      <span className="text-gray-700">{section.name}</span>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2 bg-amber-600"></div>
                    <span className="text-gray-700">Selected</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2 bg-gray-200"></div>
                    <span className="text-gray-500">Unavailable</span>
                  </div>
                </div>
              )}
            </div>

          </div>
          
          {/* Order Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-4">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedSeats.length} {selectedSeats.length === 1 ? 'Ticket' : 'Tickets'} Selected
                </p>
              </div>
              
              {/* Selected Seats */}
              <div className="max-h-64 overflow-y-auto">
                {selectedSeats.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {selectedSeats.map((seat) => {
                      const section = sections.find(s => s.id === seat.sectionId);
                      return (
                        <li key={seat.id} className="p-3 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {(section?.name ?? seat.sectionName)} - Row {seat.row}, Seat {seat.number}
                            </p>
                            <p className="text-sm text-gray-500">{formatCurrency(seat.price)}</p>
                          </div>
                          <button
                            onClick={() => removeSeat(seat.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="p-6 text-center">
                    <Ticket className="w-10 h-10 mx-auto text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">Select seats to continue</p>
                  </div>
                )}
              </div>
              
              {/* Price Summary */}
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Service Fee</span>
                    <span className="text-gray-900">{formatCurrency(getServiceFee())}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-amber-600">
                        {formatCurrency(getTotalPrice() + getServiceFee())}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToCheckout}
                  disabled={selectedSeats.length === 0}
                  className={`w-full mt-4 py-3 px-4 rounded-lg font-medium text-white bg-amber-600 hover:bg-amber-700 shadow-md transition-colors flex items-center justify-center`}
                >
                  Continue to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                
                <p className="mt-3 text-xs text-center text-gray-500">
                  You won't be charged until you complete your purchase
                </p>
              </div>
            </div>
            
            {/* Help Section */}
            <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Need help?</h4>
              <p className="text-sm text-gray-600 mb-3">
                Contact our support team for assistance with your booking.
              </p>
              <a 
                href="mailto:support@nationaltheater.ng" 
                className="text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                Contact Support →
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Confirm Your Seats</h2>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Event Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">{event.title}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="col-span-2 flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                      <span className="flex-1">{event.venue}</span>
                    </div>
                  </div>
                </div>
                
                {/* Selected Seats */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Selected Seats</h3>
                  <ul className="space-y-3">
                    {selectedSeats.map((seat) => {
                      const section = sections.find(s => s.id === seat.id.split('-')[0]);
                      return (
                        <li key={seat.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">
                              {section?.name} - Row {seat.row}, Seat {seat.number}
                            </p>
                            <p className="text-sm text-gray-500">{formatCurrency(seat.price)}</p>
                          </div>
                          <button
                            onClick={() => {
                              removeSeat(seat.id);
                              if (selectedSeats.length === 1) setShowCheckout(false);
                            }}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                {/* Price Summary */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({selectedSeats.length} {selectedSeats.length === 1 ? 'ticket' : 'tickets'})</span>
                    <span className="font-medium">{formatCurrency(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">{formatCurrency(getServiceFee())}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-amber-600">
                        {formatCurrency(getTotalPrice() + getServiceFee())}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700">
                        By proceeding, you agree to our Terms of Service and confirm that you are at least 18 years old. 
                        Tickets are non-refundable except in case of event cancellation.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {showEmailInput ? (
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email for ticket confirmation"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowEmailInput(false)}
                          className="flex-1 py-2 px-4 border border-gray-300 rounded-md font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleConfirmBooking}
                          disabled={!email || isBooking}
                          className={`flex-1 py-2 px-4 rounded-md font-medium text-white ${!email ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'} transition-colors flex items-center justify-center gap-2`}
                        >
                          {isBooking ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Confirm & Pay'
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleProceedToPayment}
                      disabled={selectedSeats.length === 0}
                      className={`w-full py-3 px-6 rounded-md font-medium text-white ${selectedSeats.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700'} transition-colors flex items-center justify-center gap-2`}
                    >
                      Proceed to Payment
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-2.5 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Back to Seat Selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
