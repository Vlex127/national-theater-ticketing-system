"use client";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react"; // To manage mobile menu state

// Defining the accent color and some reusable classes for clarity
const ACCENT_COLOR = "text-yellow-400"; // A vibrant accent color
const DARK_BG = "bg-gray-950"; // Deeper dark background
const MID_BG = "bg-gray-900"; // For cards and search
const BORDER_COLOR = "border-gray-800"; // Subtle borders

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const events = [
    {
      title: "FELA! The Musical",
      description: "The electrifying story of a legend.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhtbVFkgv5EwpP9RS3JWVOoi0KZl1BgefXXntLuWO5A8XUA2Yms8ksA5JXYewDBdJA_buf9GsK78Co7gLRKH0HuPeUPRARVy4BTE84KSiiXrNp-_v3m_9x2SLURwRdXXlrYjW7_s253J7NO51a7i11DkQIo8R4WP5BjJK2ZEYUWjRWv-FGvI4WIIf6g5pmhvFJUNii-xOq8RMchdlJBW0LtJxBzIiiFSdiOUb5AQzG1o2x23n4FnDMqBf4MQS8nOzaVwGgDkkBRvc",
      link: "#",
    },
    {
      title: "The Lion and the Jewel",
      description: "A classic Nigerian comedy.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyYxCKkIsziTyLRAA0iQe9Ld9YuljtgZecmTq0Oar-1bS6MwvdbYIFSu3EdRNsgz-w1_4R4DdUkMUUyBXsMeQgJqzh_2iHuemYiHtkC_q0I3dCV6aeqQ2wZzQb8NdjADPUF2FXWkl1JkW-X-I_s3tic_3iP-78sA_lO1c1rEgvK5SZpUfhJc1EcpIORPCC9PEb3xI_I3sUBBU7suwukLqocUU1880O2f_-67qz_UOiMAg-dlr1i8PyTE_OlmXQ1No8q0tNpmtkr8Q",
      link: "#",
    },
    {
      title: "Death and the King's Horseman",
      description: "A timeless tale of honor and sacrifice.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdKrpME_oUJAcdqtjz-V9D6z1nMwq7zKumdtV4s0khPXhXmh7NhGMvhITJ2z0ttRmaN9Gc_icZsBXUcd5_29uu1T6ytKs64O4ZzkI6jqHXcx18OYEiCK6U0cJXsNggF3rgBJlREdmfRALAtMcJsdjm4R27egea6a0C7Uu2cZY-WjGJaz2vWHpj52H0ky3CQLq3sNsjqZzhIYgdwzB6TZ9hPNbTCSENU3a6YEUa_I16cQEKaXG3_1uccI70cM0FHEHjn8lPnA6d-6E",
      link: "#",
    },
    {
      title: "Moremi the Musical",
      description: "A story of courage and sacrifice.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4CAkGxpRXugACeGr2YR4LHYeSjrlvrWN8RWnY6GOcMWKbUWbLxPipV1OvIrZu3p4mtm61JRYt1uxgdMmzoP4oM-nrBGzUd62vTA8ZTIG5BMiRY-JU777PmUoNbTLhFUk2l_5F8_HvkbNdurOcGg2Gtky5r20mPxzmo54XvdlAy8IpKRs701DVf8FEVRWRvga8IrkaTUUh1iAnnJf-uT9nvNDABNxNh2GWFOiSC7v3fIQjNOxOIwMArmmqd6OELjk0nFbhfs4v240",
      link: "#",
    },
  ];

  const NavLinks = () => (
    <>
      <a className="text-gray-300 hover:text-white transition-colors text-base font-medium leading-normal" href="/">
        Home
      </a>
      <a className="text-gray-300 hover:text-white transition-colors text-base font-medium leading-normal" href="#">
        Shows
      </a>
      <a className="text-gray-300 hover:text-white transition-colors text-base font-medium leading-normal" href="#">
        About
      </a>
      <a className="text-gray-300 hover:text-white transition-colors text-base font-medium leading-normal" href="#">
        Contact
      </a>
    </>
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>National Theater, Nigeria | Cultural Hub</title>
        {/* Using a common, modern sans-serif font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </Head>

      {/* Main Wrapper with deeper dark background */}
      <div className={`relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden ${DARK_BG} text-white`}>
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1"> {/* Increased max-width for modern feel */}
              {/* Navigation Header */}
              <header className={`sticky top-0 z-10 w-full ${DARK_BG} bg-opacity-95 backdrop-blur-sm border-b ${BORDER_COLOR}`}>
                <div className="flex items-center justify-between h-16 px-4 md:px-8 lg:px-12">
                  {/* Logo & Title */}
                  <div className="flex items-center gap-2">
                    {/* Simplified Logo appearance */}
                    <div className={`size-8 flex items-center justify-center rounded-full ${ACCENT_COLOR}`}>
                      <span className="material-symbols-outlined font-bold">theater_comedy</span>
                    </div>
                    {/* Site Title - more modern font stack assumed via Inter link */}
                    <h2 className="text-white text-xl font-bold tracking-tight">
                      National Theater
                    </h2>
                  </div>

                  {/* Desktop Navigation Links */}
                  <nav className="hidden md:flex items-center gap-9">
                    <NavLinks />
                  </nav>

                  {/* Search and Mobile Menu Button */}
                  <div className="flex items-center gap-4">
                    {/* Search Bar - hidden on mobile, simplified style */}
                    <label className="hidden lg:flex min-w-40 !h-10 max-w-64">
                      <div className="flex w-full items-stretch rounded-lg h-full overflow-hidden">
                        <div className={`text-gray-400 flex ${MID_BG} items-center justify-center pl-3 pr-1`}>
                          <span className="material-symbols-outlined text-xl">search</span>
                        </div>
                        <input
                          className={`form-input flex w-full min-w-0 flex-1 resize-none text-white focus:outline-0 focus:ring-0 border-none ${MID_BG} placeholder:text-gray-500 px-3 text-sm`}
                          placeholder="Search events..."
                          defaultValue=""
                        />
                      </div>
                    </label>

                    {/* Mobile Menu Button */}
                    <button
                      className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      aria-label="Toggle menu"
                    >
                      <span className="material-symbols-outlined">
                        {isMenuOpen ? "close" : "menu"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                  <nav className={`md:hidden flex flex-col items-center gap-4 py-4 border-t ${BORDER_COLOR}`}>
                    <NavLinks />
                  </nav>
                )}
              </header>

              {/* Main Content Area - better padding consistency */}
              <main className="flex-grow px-4 md:px-8 lg:px-12 py-10">

                {/* Hero Section - Focus on visual impact and contrast */}
                <div className="pb-16">
                  <div
                    className={`flex min-h-[400px] md:min-h-[550px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-2xl p-6 md:p-12 items-center justify-center text-white shadow-xl`}
                    style={{
                      backgroundImage:
                        // Placeholder image URL, suggest using a proper Image component for Next.js
                        `linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0EYhS5bCiNX-Z1FJsKlhKH8-985FSAgHsn32DFMW-AeSFwJOyDWaGAUa4CrlFmhRtfSxtnbYiNTiaIjbyFjQ8hAGSp5iKeQBZn75pQlQpXuESqmR7cbw4uzCjNWMkL8SJGjeT0NQ6RtMBN8xtTn6p7ltUMvJ-tzlJrqFCeEo297l7_bo_mbtSuTIw-LvmWo39ccfs1aSsr0Om3FqfI5o9W502I-fCWZVrAfxKVwhTwqLrXJE2iR0glRCArmIvTYNnl0oB9pvy0OY")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="flex flex-col gap-4 text-center max-w-4xl">
                      <p className={`text-sm md:text-base font-semibold uppercase tracking-widest ${ACCENT_COLOR}`}>
                        Lagos, Nigeria's Cultural Landmark
                      </p>
                      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight">
                        Experience the Magic of Nigerian Theater
                      </h1>
                      <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mt-2">
                        Book your tickets now and witness unforgettable performances at the heart of Nigerian culture and creativity.
                      </p>
                    </div>
                    {/* Call to Action Button - Vibrant Accent Color */}
                    <a href="/Ticket" className="mt-6">
                      <button className={`flex items-center justify-center rounded-full h-14 px-8 ${ACCENT_COLOR.replace('text', 'bg')} text-gray-950 text-lg font-bold tracking-wider transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-2xl`}>
                        <span className="truncate">Book Tickets Now</span>
                      </button>
                    </a>
                  </div>
                </div>

                {/* Upcoming Events - Horizontal Scroll with improved card design */}
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Upcoming Events
                </h2>
                <div className="flex overflow-x-scroll pb-4 -mx-4 md:-mx-8 lg:-mx-12">
                  <div className="flex items-stretch gap-6 px-4 md:px-8 lg:px-12">
                    {events.map((event, index) => (
                      <div key={index} className={`flex flex-col rounded-xl overflow-hidden shadow-lg transition-all duration-300 min-w-[280px] max-w-[300px] h-full ${MID_BG} hover:ring-2 hover:ring-yellow-400/50 hover:shadow-2xl`}>
                        {/* Event Poster - using 'fill' for Next/Image best practice if available */}
                        <a href={event.link} className="block group">
                          <div
                            className="w-full aspect-[3/4] bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url("${event.imageUrl}")` }}
                            role="img"
                            aria-label={`Poster for ${event.title}`}
                          />
                        </a>
                        {/* Event Details */}
                        <div className="flex flex-col flex-1 justify-between p-4 gap-3">
                          <div>
                            <p className="text-xl font-semibold mb-1">{event.title}</p>
                            <p className="text-gray-400 text-sm">{event.description}</p>
                          </div>
                          <a href={event.link}>
                            <button className={`w-full flex items-center justify-center rounded-lg h-10 px-4 bg-gray-800 text-white text-sm font-medium transition-colors hover:bg-yellow-400 hover:text-gray-950`}>
                              <span className="truncate">View Details</span>
                            </button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* About Section - More visual separation */}
                <div className="pt-16">
                  <h2 className="text-3xl font-bold tracking-tight mb-4">
                    About the National Theater
                  </h2>
                  <div className={`p-6 rounded-xl ${MID_BG} shadow-inner`}>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      The National Arts Theatre is the primary centre for the performing arts in Nigeria. The monument is located in Iganmu, Surulere, Lagos. Its construction was completed in **1976** in preparation for the **Festival of Arts and Culture (FESTAC) in 1977**. Housing the National Gallery of Modern Nigerian Art, it stands as a **beacon of Nigerian culture, creativity, and national pride**. It represents a vital part of the nation's heritage.
                    </p>
                  </div>
                </div>
              </main>

              {/* Footer */}
              <footer className={`mt-20 border-t ${BORDER_COLOR}`}>
                <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 md:px-8 lg:px-12">
                  <p className="text-gray-500 text-sm order-2 md:order-1 mt-4 md:mt-0">
                    © {new Date().getFullYear()} National Theater, Nigeria. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6 order-1 md:order-2">
                    <a className="text-gray-400 hover:text-white transition-colors text-sm" href="#">
                      FAQs
                    </a>
                    <a className="text-gray-400 hover:text-white transition-colors text-sm" href="#">
                      Terms of Service
                    </a>
                    <a className="text-gray-400 hover:text-white transition-colors text-sm" href="#">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}