"use client";
import 'material-icons/iconfont/material-icons.css';
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
      venue: "Main Hall",
      category: "Musical"
    },
    {
      title: "The Lion and the Jewel",
      description: "A classic Nigerian comedy.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyYxCKkIsziTyLRAA0iQe9Ld9YuljtgZecmTq0Oar-1bS6MwvdbYIFSu3EdRNsgz-w1_4R4DdUkMUUyBXsMeQgJqzh_2iHuemYiHtkC_q0I3dCV6aeqQ2wZzQb8NdjADPUF2FXWkl1JkW-X-I_s3tic_3iP-78sA_lO1c1rEgvK5SZpUfhJc1EcpIORPCC9PEb3xI_I3sUBBU7suwukLqocUU1880O2f_-67qz_UOiMAg-dlr1i8PyTE_OlmXQ1No8q0tNpmtkr8Q",
      link: "#",
      date: "Jan 20, 2025",
      venue: "Drama Studio",
      category: "Drama"
    },
    {
      title: "Death and the King's Horseman",
      description: "A timeless tale of honor and sacrifice.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdKrpME_oUJAcdqtjz-V9D6z1nMwq7zKumdtV4s0khPXhXmh7NhGMvhITJ2z0ttRmaN9Gc_icZsBXUcd5_29uu1T6ytKs64O4ZzkI6jqHXcx18OYEiCK6U0cJXsNggF3rgBJlREdmfRALAtMcJsdjm4R27egea6a0C7Uu2cZY-WjGJaz2vWHpj52H0ky3CQLq3sNsjqZzhIYgdwzB6TZ9hPNbTCSENU3a6YEUa_I16cQEKaXG3_1uccI70cM0FHEHjn8lPnA6d-6E",
      link: "#",
      date: "Feb 5, 2025",
      venue: "Main Hall",
      category: "Tragedy"
    },
    {
      title: "Moremi the Musical",
      description: "A story of courage and sacrifice.",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4CAkGxpRXugACeGr2YR4LHYeSjrlvrWN8RWnY6GOcMWKbUWbLxPipV1OvIrZu3p4mtm61JRYt1uxgdMmzoP4oM-nrBGzUd62vTA8ZTIG5BMiRY-JU777PmUoNbTLhFUk2l_5F8_HvkbNdurOcGg2Gtky5r20mPxzmo54XvdlAy8IpKRs701DVf8FEVRWRvga8IrkaTUUh1iAnnJf-uT9nvNDABNxNh2GWFOiSC7v3fIQjNOxOIwMArmmqd6OELjk0nFbhfs4v240",
      link: "#",
      date: "Mar 12, 2025",
      venue: "Amphitheater",
      category: "Musical"
    },
  ];

  const NavLinks = () => (
    <>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-3 flex items-center gap-2" href="/" onClick={() => setIsMenuOpen(false)}>
        <span className="material-icons text-lg">home</span>
        Home
      </a>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-3 flex items-center gap-2" href="/Shows" onClick={() => setIsMenuOpen(false)}>
        <span className="material-icons text-lg">theater_comedy</span>
        Shows
      </a>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-3 flex items-center gap-2" href="#" onClick={() => setIsMenuOpen(false)}>
        <span className="material-icons text-lg">contact_support</span>
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
      </Head>

      <div className={`min-h-screen ${DARK_BG} text-white font-sans`}>
        {/* Navigation */}
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
                  <p className="text-amber-400 text-xs">Nigeria</p>
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
                  <button className="text-gray-400 hover:text-amber-400 transition-colors p-2">
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

      </div>
    </>
  );
}