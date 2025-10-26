"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from "next/image";
import 'material-icons/iconfont/material-icons.css';
import NavLinks from '../../components/NavLinks';

const ACCENT_COLOR = "text-amber-500";
const ACCENT_BG = "bg-amber-500";
const DARK_BG = "bg-gray-900";
const MID_BG = "bg-gray-800";

const BORDER_COLOR = "border-gray-700";
export default function ShowsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shows = [
    {
      id: 1,
      imageUrl: "/images/show1.jpg",
      title: "Nigerian Cultural Dance",
      description: "Experience traditional dance performances that celebrate Nigerian heritage.",
      date: "Oct 10",
      category: "Dance",
      venue: "Main Auditorium",
    },
    {
      id: 2,
      imageUrl: "/images/show2.jpg",
      title: "Contemporary Nigerian Theater", 
      description: "Modern Nigerian plays and theatrical performances.",
      date: "Oct 15",
      category: "Theater",
      venue: "Open Stage",
    },
    {
      id: 3,
      imageUrl: "/images/show3.jpg",
      title: "Music Fest Nigeria",
      description: "An exciting festival featuring Nigerian music artists.",
      date: "Oct 20",
      category: "Music",
      venue: "Main Arena",
    },
  ];
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // or any threshold you prefer
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </Head>
      <div className="bg-gray-900 text-white min-h-screen font-body">
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
                  <p className="text-amber-400 text-xs">Nigeria</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                <NavLinks setIsMenuOpen={setIsMenuOpen} />
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
                  <NavLinks setIsMenuOpen={setIsMenuOpen} />
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

        {/* Banner */}
        <section className="relative bg-gray-800 py-16 px-4 text-center">
         <p></p> <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Upcoming Shows & Movies</h1>
          <p className="max-w-2xl mx-auto text-gray-300 text-base md:text-lg">
            Book your tickets now and experience Nigerian culture like never before.
          </p>
        </section>

        {/* Shows Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {shows.map((show) => (
              <div
                key={show.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition-transform duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image src={show.imageUrl} alt={show.title} layout="fill" objectFit="cover" className="rounded-t-xl"/>
                </div>
                
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-white text-lg font-display font-bold">{show.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{show.description}</p>
                    <div className="flex items-center justify-between text-gray-500 text-xs mt-2">
                      <div className="flex items-center gap-1">
                        <span className="material-icons text-xs">schedule</span>
                        {show.date}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <span className="material-icons text-xs">category</span>
                        {show.category}
                      </div>
                      
                    </div>
                    <a href="/Details">
            <button className="w-full bg-gray-700 hover:bg-amber-500 hover:text-gray-900 text-white font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 group-hover:transform group-hover:scale-105 flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base">
              <span className="material-icons text-base">confirmation_number</span>
              Get Tickets
            </button>
            </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </section>

        {/* Pagination */}
        <div className="flex items-center justify-center p-4 font-body">
          <a href="#" className="flex items-center justify-center text-gray-400 hover:text-white">
            <span className="material-icons">chevron_left</span>
          </a>
          {[1, 2, 3, '...', 8].map((page, index) => (
            <a
              key={index}
              href="#"
              className={`mx-2 px-3 py-1 rounded-full text-sm font-semibold ${
                page === 1 ? "bg-secondary text-black" : "text-white hover:bg-white/10"
              }`}
            >
              {page}
            </a>
          ))}
          <a href="#" className="flex items-center justify-center text-gray-400 hover:text-white">
            <span className="material-icons">chevron_right</span>
          </a>
        </div>

        {/* Footer */}
<footer className={`border-t ${BORDER_COLOR} bg-gray-900`}>
  <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      <div className="sm:col-span-2">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className={`size-6 sm:size-8 lg:size-10 flex items-center justify-center rounded-full ${ACCENT_BG}`}>
            <span className="material-icons text-gray-900 font-bold text-sm sm:text-base lg:text-lg">
              theater_comedy
            </span>
          </div>
          <div>
            <h3 className="text-white text-base sm:text-lg lg:text-xl font-bold">National Theater</h3>
            <p className="text-amber-400 text-xs">Nigeria</p>
          </div>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm lg:text-base max-w-md">
          Preserving and promoting Nigerian culture through world-class performances 
          and artistic excellence since 1976.
        </p>
<div className="flex gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4">
  {['facebook', 'instagram', 'twitter', 'youtube'].map((platform) => (
    <a
      key={platform}
      href="#"
      className="text-gray-400 hover:text-amber-400 transition-colors"
    >
      <i className={`fab fa-${platform} text-base sm:text-lg lg:text-xl`}></i>
    </a>
  ))}
</div>

      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-2 sm:mb-3 lg:mb-4 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base">
          <span className="material-icons text-amber-400 text-base sm:text-lg">link</span>
          Quick Links
        </h4>
        <div className="space-y-1 sm:space-y-2">
          {[
            { icon: 'event', text: 'Upcoming Shows' },
            { icon: 'business_center', text: 'Venue Rental' },
            { icon: 'photo_library', text: 'Gallery' },
            { icon: 'volunteer_activism', text: 'Support Us' }
          ].map((link) => (
            <a key={link.text} href="/Shows" className="block text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base py-1">
              <span className="material-icons text-sm sm:text-base">{link.icon}</span>
              {link.text}
            </a>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-2 sm:mb-3 lg:mb-4 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base">
          <span className="material-icons text-amber-400 text-base sm:text-lg">contact_page</span>
          Contact
        </h4>
        <div className="space-y-1 sm:space-y-2 lg:space-y-3 text-gray-400 text-xs sm:text-sm lg:text-base">
          <p className="flex items-center gap-1 sm:gap-2">
            <span className="material-icons text-sm sm:text-base">location_on</span>
            Iganmu, Lagos, Nigeria
          </p>
          <p className="flex items-center gap-1 sm:gap-2">
            <span className="material-icons text-sm sm:text-base">call</span>
            +234 800 000 0000
          </p>
          <p className="flex items-center gap-1 sm:gap-2">
            <span className="material-icons text-sm sm:text-base">email</span>
            info@nationaltheater.ng
          </p>
        </div>
      </div>
    </div>
    
    <div className="border-t border-gray-800 mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8 flex flex-col sm:flex-row justify-between items-center">
      <p className="text-gray-500 text-xs flex items-center gap-1 sm:gap-2 mb-3 sm:mb-0 text-center sm:text-left">
        <span className="material-icons text-xs">copyright</span>
        © {new Date().getFullYear()} National Theater, Nigeria. All rights reserved.
      </p>
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap justify-center">
        {[
          { icon: 'privacy_tip', text: 'Privacy' },
          { icon: 'gavel', text: 'Terms' },
          { icon: 'help', text: 'FAQs' }
        ].map((link) => (
          <a key={link.text} className="text-gray-400 hover:text-amber-400 transition-colors text-xs flex items-center gap-1" href="/Privacy">
            <span className="material-icons text-xs">{link.icon}</span>
            {link.text}
          </a>
        ))}
      </div>
    </div>
  </div>
</footer> 
      </div>
    </>
  );
}