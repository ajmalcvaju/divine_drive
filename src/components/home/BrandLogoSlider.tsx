'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Brand {
  name: string;
  queryMake?: string;
  logo: string;
  category: string;
}

const BRANDS: Brand[] = [
  { name: 'Porsche', queryMake: 'Porsche', logo: '/brands/porsche.png', category: 'Supercar' },
  { name: 'Ferrari', queryMake: 'Ferrari', logo: '/brands/ferrari.png', category: 'Exotic' },
  { name: 'Rolls-Royce', queryMake: 'Rolls-Royce', logo: '/brands/rolls-royce.png', category: 'Ultra Luxury' },
  { name: 'Bentley', queryMake: 'Bentley', logo: '/brands/bentley.png', category: 'Prestige' },
  { name: 'Aston Martin', queryMake: 'Aston Martin', logo: '/brands/aston-martin.png', category: 'Grand Tourer' },
  { name: 'Mercedes-Benz', queryMake: 'Mercedes-Benz', logo: '/brands/mercedes-benz.png', category: 'Luxury' },
  { name: 'BMW', queryMake: 'BMW', logo: '/brands/bmw.png', category: 'Performance' },
  { name: 'Audi', queryMake: 'Audi', logo: '/brands/audi.png', category: 'Luxury' },
  { name: 'Land Rover', queryMake: 'Land Rover', logo: '/brands/land-rover.png', category: 'Luxury SUV' },
  { name: 'Jaguar', queryMake: 'Jaguar', logo: '/brands/jaguar.png', category: 'Prestige' },
  { name: 'Maserati', queryMake: 'Maserati', logo: '/brands/maserati.png', category: 'Italian Luxury' },
  { name: 'Lexus', queryMake: 'Lexus', logo: '/brands/lexus.png', category: 'Hybrid Luxury' },
  { name: 'Volvo', queryMake: 'Volvo', logo: '/brands/volvo.png', category: 'Swedish Luxury' },
  { name: 'Mini', queryMake: 'Mini', logo: '/brands/mini.png', category: 'Premium Compact' },
  { name: 'Harley-Davidson', queryMake: 'Harley-Davidson', logo: '/brands/harley-davidson.png', category: 'Exotic Cruiser' },
];

export default function BrandLogoSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-14 sm:py-20 bg-[#0B0B0D] border-b border-[#202026] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-48 bg-[#C8AD78]/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181F] border border-[#2B2B36] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C8AD78]" />
              <span className="text-[11px] font-bold text-[#C8AD78] uppercase tracking-[0.2em]">
                Multi-Brand Marque Showcase
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
              Prestige Brands <span className="text-[#C8AD78]">We Curate</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl">
              From flagship German luxury sedans to British grand tourers and iconic Italian exotics, explore verified pre-owned vehicles from the world&apos;s most celebrated automotive manufacturers.
            </p>
          </div>

          {/* Manual Scroll Controls for desktop */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={scrollLeft}
              type="button"
              aria-label="Scroll logos left"
              className="w-10 h-10 rounded-full bg-[#15151B] border border-[#272733] hover:border-[#C8AD78] text-gray-400 hover:text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              type="button"
              aria-label="Scroll logos right"
              className="w-10 h-10 rounded-full bg-[#15151B] border border-[#272733] hover:border-[#C8AD78] text-gray-400 hover:text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* INFINITE SMOOTH SLIDER WITH DUAL-EDGE FADE OVERLAYS */}
      <div className="relative w-full">
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent z-10 pointer-events-none" />
        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track Container */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none py-3"
        >
          {/* Continuous Loop Marquee (Repeated 2x for infinite seamless scroll) */}
          <div className="animate-brand-marquee flex items-center gap-4 sm:gap-6 px-4">
            {[...BRANDS, ...BRANDS].map((brand, idx) => (
              <Link
                key={`${brand.name}-${idx}`}
                href={brand.queryMake ? `/cars?make=${encodeURIComponent(brand.queryMake)}` : '/cars'}
                className="group flex-shrink-0 flex flex-col items-center justify-center w-36 sm:w-44 h-32 sm:h-36 rounded-2xl bg-gradient-to-b from-[#15151A] to-[#101013] border border-[#24242C] hover:border-[#C8AD78]/70 hover:bg-[#1A1A22] p-4 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/70 cursor-pointer"
              >
                {/* Brand Logo Container */}
                <div className="relative w-full h-16 sm:h-20 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={130}
                    height={75}
                    className="max-h-12 sm:max-h-14 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Brand Label & Subtext */}
                <div className="mt-2 text-center">
                  <span className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-[#C8AD78] transition-colors block font-serif">
                    {brand.name}
                  </span>
                  <span className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider block">
                    {brand.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
