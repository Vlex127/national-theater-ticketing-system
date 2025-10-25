"use client";
import Image from "next/image";
import Head from "next/head";
import { useState, useEffect } from "react";

const ACCENT_COLOR = "text-amber-500";
const ACCENT_BG = "bg-amber-500";
const DARK_BG = "bg-gray-900";
const MID_BG = "bg-gray-800";
const BORDER_COLOR = "border-gray-700";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const events = [
    {
      title: "FELA! The Musical",
      description: "The electrifying story of a legend.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhtbVFkgv5EwpP9RS3JWVOoi0KZl1BgefXXntLuWO5A8XUA2Yms8ksA5JXYewDBdJA_buf9GsK78Co7gLRKH0HuPeUPRARVy4BTE84KSiiXrNp-_v3m_9x2SLURwRdXXlrYjW7_s253J7NO51a7i11DkQIo8R4WP5BjJK2ZEYUWjRWv-FGvI4WIIf6g5pmhvFJUNii-xOq8RMchdlJBW0LtJxBzIiiFSdiOUb5AQzG1o2x23n4FnDMqBf4MQS8nOzaVwGgDkkBRvc",
      link: "#",
      date: "Dec 15, 2024",
      venue: "Main Hall"
    },
    {
      title: "The Lion and the Jewel",
      description: "A classic Nigerian comedy.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyYxCKkIsziTyLRAA0iQe9Ld9YuljtgZecmTq0Oar-1bS6MwvdbYIFSu3EdRNsgz-w1_4R4DdUkMUUyBXsMeQgJqzh_2iHuemYiHtkC_q0I3dCV6aeqQ2wZzQb8NdjADPUF2FXWkl1JkW-X-I_s3tic_3iP-78sA_lO1c1rEgvK5SZpUfhJc1EcpIORPCC9PEb3xI_I3sUBBU7suwukLqocUU1880O2f_-67qz_UOiMAg-dlr1i8PyTE_OlmXQ1No8q0tNpmtkr8Q",
      link: "#",
      date: "Jan 20, 2025",
      venue: "Drama Studio"
    },
    {
      title: "Death and the King's Horseman",
      description: "A timeless tale of honor and sacrifice.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdKrpME_oUJAcdqtjz-V9D6z1nMwq7zKumdtV4s0khPXhXmh7NhGMvhITJ2z0ttRmaN9Gc_icZsBXUcd5_29uu1T6ytKs64O4ZzkI6jqHXcx18OYEiCK6U0cJXsNggF3rgBJlREdmfRALAtMcJsdjm4R27egea6a0C7Uu2cZY-WjGJaz2vWHpj52H0ky3CQLq3sNsjqZzhIYgdwzB6TZ9hPNbTCSENU3a6YEUa_I16cQEKaXG3_1uccI70cM0FHEHjn8lPnA6d-6E",
      link: "#",
      date: "Feb 5, 2025",
      venue: "Main Hall"
    },
    {
      title: "Moremi the Musical",
      description: "A story of courage and sacrifice.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4CAkGxpRXugACeGr2YR4LHYeSjrlvrWN8RWnY6GOcMWKbUWbLxPipV1OvIrZu3p4mtm61JRYt1uxgdMmzoP4oM-nrBGzUd62vTA8ZTIG5BMiRY-JU777PmUoNbTLhFUk2l_5F8_HvkbNdurOcGg2Gtky5r20mPxzmo54XvdlAy8IpKRs701DVf8FEVRWRvga8IrkaTUUh1iAnnJf-uT9nvNDABNxNh2GWFOiSC7v3fIQjNOxOIwMArmmqd6OELjk0nFbhfs4v240",
      link: "#",
      date: "Mar 12, 2025",
      venue: "Amphitheater"
    },
  ];

  const NavLinks = () => (
    <>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-2" href="/">
        Home
      </a>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-2" href="#">
        Shows
      </a>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-2" href="#">
        About
      </a>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-2" href="#">
        Contact
      </a>
    </>
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>National Theater Nigeria | Cultural Hub of Nigerian Arts</title>
        <meta name="description" content="Experience world-class performances at Nigeria's premier cultural institution. Book tickets for theater, music, and dance events." />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </Head>

      <div className={`min-h-screen ${DARK_BG} text-white font-sans`}>
        {/* Enhanced Navigation */}
        <header className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className={`size-10 flex items-center justify-center rounded-full ${ACCENT_BG} shadow-lg`}>
                  <span className="material-symbols-outlined text-gray-900 font-bold text-xl">
                    theater_comedy
                  </span>
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold">National Theater</h2>
                  <p className="text-amber-400 text-xs">Nigeria</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                <NavLinks />
              </nav>

              {/* Search & CTA */}
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center bg-gray-800 rounded-full pl-4 pr-2 py-2">
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="bg-transparent border-none focus:outline-none text-white placeholder-gray-400 w-48"
                  />
                  <button className="text-gray-400 hover:text-amber-400 transition-colors p-2">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>

                <button className="hidden md:flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105">
                  <span>Book Tickets</span>
                </button>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {isMenuOpen ? "close" : "menu"}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden bg-gray-800 rounded-2xl mt-2 p-6 shadow-2xl">
                <nav className="flex flex-col gap-4">
                  <NavLinks />
                  <div className="pt-4 border-t border-gray-700">
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0EYhS5bCiNX-Z1FJsKlhKH8-985FSAgHsn32DFMW-AeSFwJOyDWaGAUa4CrlFmhRtfSxtnbYiNTiaIjbyFjQ8hAGSp5iKeQBZn75pQlQpXuESqmR7cbw4uzCjNWMkL8SJGjeT0NQ6RtMBN8xtTn6p7ltUMvJ-tzlJrqFCeEo297l7_bo_mbtSuTIw-LvmWo39ccfs1aSsr0Om3FqfI5o9W502I-fCWZVrAfxKVwhTwqLrXJE2iR0glRCArmIvTYNnl0oB9pvy0OY")`
            }}
          />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-amber-500/30">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
                  Now Showing
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                Where Nigerian
                <span className={`block ${ACCENT_COLOR}`}>Culture Comes Alive</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience world-class performances at Nigeria's premier cultural landmark. 
                From traditional dance to contemporary theater.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className={`flex items-center gap-3 ${ACCENT_BG} hover:bg-amber-600 text-gray-900 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl`}>
                  <span>Book Your Experience</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                
                <button className="flex items-center gap-3 border-2 border-white/20 hover:border-amber-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm">
                  <span>View Calendar</span>
                  <span className="material-symbols-outlined">calendar_month</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Featured <span className={ACCENT_COLOR}>Events</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover unforgettable performances that celebrate the richness of Nigerian arts and culture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {events.map((event, index) => (
                <div 
                  key={index}
                  className="group bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-gray-900 font-bold px-3 py-1 rounded-full text-sm">
                      {event.date}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {event.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">location_on</span>
                        {event.venue}
                      </span>
                    </div>
                    
                    <button className="w-full bg-gray-700 hover:bg-amber-500 hover:text-gray-900 text-white font-semibold py-3 rounded-lg transition-all duration-300 group-hover:transform group-hover:scale-105">
                      Get Tickets
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  A Legacy of <span className={ACCENT_COLOR}>Cultural Excellence</span>
                </h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    The National Arts Theatre stands as Nigeria's premier center for the performing arts. 
                    Located in Iganmu, Lagos, this iconic monument was completed in <strong>1976</strong> for the 
                    <strong> Festival of Arts and Culture (FESTAC) in 1977</strong>.
                  </p>
                  <p>
                    Today, it continues to serve as the heartbeat of Nigerian creativity, hosting everything 
                    from traditional performances to contemporary arts while housing the National Gallery 
                    of Modern Nigerian Art.
                  </p>
                  <p>
                    More than a building, it's a living testament to Nigeria's rich cultural heritage 
                    and artistic innovation.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <div className="text-2xl font-black text-amber-400">45+</div>
                    <div className="text-gray-400 text-sm">Years of Excellence</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <div className="text-2xl font-black text-amber-400">1000+</div>
                    <div className="text-gray-400 text-sm">Performances</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-xl">
                    <div className="text-2xl font-black text-amber-400">1M+</div>
                    <div className="text-gray-400 text-sm">Visitors</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1503095396549-807759245b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Theater interior"
                    className="rounded-2xl shadow-2xl"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1542327897-d73f4005b533?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Performance"
                    className="rounded-2xl shadow-2xl mt-8"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-amber-500 text-gray-900 p-6 rounded-2xl shadow-2xl">
                  <div className="text-2xl font-black">Since 1976</div>
                  <div className="text-sm font-semibold">Cultural Beacon</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`border-t ${BORDER_COLOR} bg-gray-900`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`size-10 flex items-center justify-center rounded-full ${ACCENT_BG}`}>
                    <span className="material-symbols-outlined text-gray-900 font-bold">
                      theater_comedy
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold">National Theater</h3>
                    <p className="text-amber-400 text-sm">Nigeria</p>
                  </div>
                </div>
                <p className="text-gray-400 max-w-md">
                  Preserving and promoting Nigerian culture through world-class performances 
                  and artistic excellence since 1976.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-amber-400 transition-colors">Upcoming Shows</a>
                  <a href="#" className="block text-gray-400 hover:text-amber-400 transition-colors">Venue Rental</a>
                  <a href="#" className="block text-gray-400 hover:text-amber-400 transition-colors">Gallery</a>
                  <a href="#" className="block text-gray-400 hover:text-amber-400 transition-colors">Support Us</a>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Iganmu, Lagos, Nigeria</p>
                  <p>+234 800 000 0000</p>
                  <p>info@nationaltheater.ng</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} National Theater, Nigeria. All rights reserved.
              </p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <a className="text-gray-400 hover:text-amber-400 transition-colors text-sm" href="#">
                  Privacy Policy
                </a>
                <a className="text-gray-400 hover:text-amber-400 transition-colors text-sm" href="#">
                  Terms of Service
                </a>
                <a className="text-gray-400 hover:text-amber-400 transition-colors text-sm" href="#">
                  FAQs
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}