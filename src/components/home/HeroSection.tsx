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
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto text-left pt-8 sm:pt-14">
        {/* Established Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C8AD78]/30 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C8AD78] animate-pulse" />
          <span className="text-xs font-semibold text-gray-200 tracking-wide">
            1-Month Engine &amp; Gearbox Warranty • Est. 2016 Kozhikode
          </span>
        </div>

        {/* Master Luxury Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl font-serif">
          Exceptional Cars.{' '}
          <span className="text-[#C8AD78]">Extraordinary Journeys.</span>
        </h1>

        <p className="mt-5 text-base sm:text-xl text-[#F7F5F0]/80 max-w-2xl font-normal leading-relaxed">
          Discover a carefully curated collection of premium pre-owned cars, selected for quality, confidence, and the joy of driving.
        </p>

        {/* Dual CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/cars"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] font-extrabold text-sm tracking-wider uppercase transition-all duration-300 text-center flex items-center justify-center space-x-2 shadow-xl shadow-black/50"
          >
            <span>BROWSE CARS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/50 border border-white/30 hover:border-[#C8AD78] text-[#F7F5F0] hover:text-[#C8AD78] font-bold text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 text-center flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-[#C8AD78]" />
            <span>BOOK A CONSULTATION</span>
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
              className="w-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-sm sm:text-base rounded-full pl-12 pr-32 py-4 focus:outline-none focus:border-[#C8AD78] focus:ring-2 focus:ring-[#C8AD78]/30 transition placeholder-gray-400 shadow-2xl"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center space-x-1"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Trust Indicators Required in Phase 3 */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          <div className="flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-[#C8AD78] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Quality-Inspected Vehicles</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-[#C8AD78] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Transparent Pricing</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-[#C8AD78] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Vehicle Documentation Assistance</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-[#C8AD78] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Dedicated Buying Support</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative z-10 text-center pt-6 text-xs text-gray-400 flex flex-col items-center">
        <span className="tracking-widest uppercase font-semibold text-[10px] text-gray-400">SCROLL</span>
        <ChevronDown className="w-4 h-4 text-[#C8AD78] animate-bounce mt-1" />
      </div>
    </section>
  );
}
