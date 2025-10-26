// src/app/Details/[id]/page.tsx
'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import 'material-icons/iconfont/material-icons.css';
import Image from 'next/image';
import { Spinner } from "@/components/ui/spinner";

const ACCENT_COLOR = "text-amber-500";
const ACCENT_BG = "bg-amber-500";
const DARK_BG = "bg-gray-900";
const MID_BG = "bg-gray-800";
const BORDER_COLOR = "border-gray-700";

interface Event {
  id: number;
  title: string;
  description: string;
  image_url: string;
  date: string;
  venue: string;
  category: string;
  duration?: string;
  price_range?: string;
  age_restriction?: string;
  [key: string]: any; // Allow additional properties
}

export default function DetailsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

// In your DetailsPage component, change the fetch call:
useEffect(() => {
  async function fetchEvent() {
    try {
      setLoading(true);
      console.log('Fetching event with ID:', id);
      
      if (!id) {
        throw new Error('Event ID is missing');
      }

      // Use search params instead of dynamic route
      const response = await fetch(`/api/events?id=${id}`);
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw new Error(errorData.error || `Failed to fetch event (${response.status})`);
      }
      
      const data = await response.json();
      console.log('Event data received:', data);
      
      setEvent(data);
    } catch (err) {
      console.error('Error in fetchEvent:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch event');
    } finally {
      setLoading(false);
    }
  }

  if (id) {
    fetchEvent();
  } else {
    setError('Event ID is missing');
    setLoading(false);
  }
}, [id]);

  // Loading component
  const Spinner = () => (
    <div className="flex items-center justify-center">
      <Spinner />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
        <p className="text-gray-300">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-center">
        <span className="material-icons text-6xl text-red-500 mb-4">error</span>
        <h1 className="text-3xl font-bold text-white mb-4">Event Not Found</h1>
        <p className="text-gray-300 text-lg mb-8 max-w-md">
          {error === 'Event not found' 
            ? "We couldn't find the event you're looking for. It may have been removed or the URL might be incorrect."
            : `Error: ${error || 'An unknown error occurred'}`}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <span className="material-icons">arrow_back</span>
            <span className="ml-2">Back</span>
          </button>
          <h1 className="text-xl font-bold">Event Details</h1>
          <div className="w-8"></div> {/* For balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Event Image */}
          <div className="md:col-span-2">
            <div className="relative h-96 w-full rounded-xl overflow-hidden">
              <Image
                src={event.image_url || '/placeholder-event.jpg'}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Event Info */}
            <div className="mt-8">
              <div className="flex items-center mb-2">
                <span className="material-icons text-amber-500 mr-2">event</span>
                <span className="text-gray-300">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              <div className="flex items-center mb-2">
                <span className="material-icons text-amber-500 mr-2">location_on</span>
                <span className="text-gray-300">{event.venue}</span>
              </div>
              
              {event.duration && (
                <div className="flex items-center mb-2">
                  <span className="material-icons text-amber-500 mr-2">schedule</span>
                  <span className="text-gray-300">{event.duration}</span>
                </div>
              )}
              
              {event.age_restriction && (
                <div className="flex items-center mb-4">
                  <span className="material-icons text-amber-500 mr-2">person</span>
                  <span className="text-gray-300">Age {event.age_restriction}+</span>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-4">About the Event</h3>
                <p className="text-gray-300 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
          
          {/* Booking Card */}
          <div className="md:col-span-1">
            <div className={`${MID_BG} rounded-xl p-6 sticky top-24`}>
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-300 mb-6">{event.category}</p>
              
              {event.price_range && (
                <div className="mb-6">
                  <p className="text-3xl font-bold text-amber-500">{event.price_range}</p>
                  <p className="text-sm text-gray-400">Price per ticket</p>
                </div>
              )}
              
              <button 
                className={`w-full py-3 ${ACCENT_BG} text-white font-medium rounded-md hover:opacity-90 transition-opacity`}
                onClick={() => router.push(`/book/${event.id}`)}
              >
                Book Now
              </button>
              
              <div className="mt-6 text-sm text-gray-400">
                <p className="flex items-center mb-2">
                  <span className="material-icons text-base mr-2">confirmation_number</span>
                  Mobile tickets
                </p>
                <p className="flex items-center">
                  <span className="material-icons text-base mr-2">event_available</span>
                  Easy cancellation
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`${DARK_BG} py-8 px-4`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">National Theater</h3>
              <p className="text-gray-400">Your premier destination for world-class performances</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="material-icons">twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <span className="material-icons">instagram</span>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} National Theater. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Client-side page component - no server-side exports allowed here with 'use client'