'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Calendar, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/cars');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-12 pb-12 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
          className="w-full h-full object-cover filter brightness-[0.55] contrast-110"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-black-luxury-car-driving-in-a-garage-41484-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto text-left pt-10 sm:pt-16">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E51937] animate-pulse" />
          <span className="text-xs font-semibold text-gray-200 tracking-wide">
            1-Month Engine &amp; Gearbox Warranty • Est. 2016 Kozhikode
          </span>
        </div>

        {/* Standard Professional Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl font-sans">
          Explore Certified Pre-Owned{' '}
          <span className="text-[#E51937]">Luxury Vehicles</span>
        </h1>

        <p className="mt-5 text-base sm:text-xl text-gray-300 max-w-2xl font-normal leading-relaxed">
          Premium multi-brand pre-owned cars in Kozhikode with verified history, technical inspection reports, and 1-month engine &amp; gearbox warranty assurance.
        </p>

        {/* Dual CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/cars"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E51937] text-white font-bold text-sm tracking-wide shadow-lg shadow-red-950/50 hover:bg-[#C4122C] transition-all duration-300 text-center flex items-center justify-center space-x-2"
          >
            <span>View Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/50 border border-white/40 hover:border-[#E51937] text-white font-bold text-sm tracking-wide backdrop-blur-md transition-all duration-300 text-center flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-[#E51937]" />
            <span>Book a Consultation</span>
          </Link>
        </div>

        {/* Standard Search Bar */}
        <div className="mt-10 max-w-xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, or variant..."
              className="w-full bg-black/50 backdrop-blur-md border border-white/30 text-white text-sm sm:text-base rounded-full pl-12 pr-32 py-4 focus:outline-none focus:border-[#E51937] focus:ring-2 focus:ring-[#E51937]/30 transition placeholder-gray-400 shadow-2xl"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-[#E51937] hover:bg-[#C4122C] text-white text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center space-x-1"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 text-center pt-8 text-xs text-gray-400 flex flex-col items-center">
        <span className="tracking-widest uppercase font-semibold text-[10px]">SCROLL</span>
        <ChevronDown className="w-4 h-4 text-[#E51937] animate-bounce mt-1" />
      </div>
    </section>
  );
}
