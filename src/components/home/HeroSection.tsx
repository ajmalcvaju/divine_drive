'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Calendar, ChevronLeft, ChevronRight, ChevronDown, ShieldCheck, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
    icon: typeof ArrowRight;
  };
  secondaryCta: {
    label: string;
    href: string;
    icon: typeof Calendar;
    isExternal?: boolean;
  };
  image: string;
  imageAlt: string;
  trustItems: string[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: '1-MONTH WARRANTY • EST. 2016 KOZHIKODE',
    title: 'Exceptional Cars.',
    highlight: 'Extraordinary Journeys.',
    subtitle: "Kerala's premier destination for certified pre-owned luxury vehicles. Selected for pedigree, performance, and uncompromising quality.",
    primaryCta: {
      label: 'BROWSE INVENTORY',
      href: '/cars',
      icon: ArrowRight,
    },
    secondaryCta: {
      label: 'BOOK A CONSULTATION',
      href: '/contact',
      icon: Calendar,
    },
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Luxury sports car in premium atmospheric lighting',
    trustItems: [
      'Quality-Inspected Fleet',
      '1-Month Engine & Gearbox Warranty',
      'Transparent Pricing',
      'Doorstep Delivery Across Kerala',
    ],
  },
  {
    id: 2,
    badge: '150+ CHECKPOINT CERTIFICATION',
    title: 'Precision Engineered.',
    highlight: 'Unrivalled Confidence.',
    subtitle: 'Every luxury sedan & SUV undergoes 150+ rigorous engineering diagnostics with verified service provenance, 100% flood-free guarantee, and zero odometer tampering.',
    primaryCta: {
      label: 'VIEW CERTIFIED SUVS & SEDANS',
      href: '/cars?type=Luxury',
      icon: ShieldCheck,
    },
    secondaryCta: {
      label: 'CALCULATE EMI & FINANCE',
      href: '/contact#finance',
      icon: Sparkles,
    },
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Certified executive sedan with precision engineering',
    trustItems: [
      '150+ Multi-Point Inspection',
      '100% Flood-Free Assurance',
      'Zero Odometer Tampering',
      'Instant RTO & Paperwork Support',
    ],
  },
  {
    id: 3,
    badge: 'SELL • TRADE-IN • SPOT PAYMENT',
    title: 'Sell & Upgrade.',
    highlight: 'With Zero Tension.',
    subtitle: 'Upgrade to your next dream machine at peak market value. Enjoy instant spot valuation, doorstep inspection anywhere in Kerala, and same-day bank settlement.',
    primaryCta: {
      label: 'SELL YOUR CAR INSTANTLY',
      href: '/sell',
      icon: RefreshCw,
    },
    secondaryCta: {
      label: 'CHAT ON WHATSAPP',
      href: 'https://wa.me/919744198199?text=Hello%20Divine%20Drives%2C%20I%20would%20like%20to%20sell%20or%20exchange%20my%20luxury%20car',
      icon: MessageSquare,
      isExternal: true,
    },
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Prestige luxury car for trade-in and sale at Divine Drives',
    trustItems: [
      'Instant Spot Valuation',
      'Doorstep Car Inspection',
      'Same-Day Direct Payment',
      'Effortless RC Transfer',
    ],
  },
];

const AUTO_SLIDE_DURATION = 6500; // 6.5 seconds per slide

export default function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const touchStartXRef = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/cars');
    }
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-between pt-12 pb-8 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Divine Drives Hero Carousel"
    >
      {/* 3 Background Images with Smooth Cross-Fade & Ken Burns */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                quality={85}
                sizes="100vw"
                className={`w-full h-full object-cover filter brightness-[0.45] contrast-110 ${
                  isActive ? 'animate-hero-ken-burns' : ''
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic Vignette Overlays for Maximum Readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0B0B0C] via-black/40 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/90 via-black/50 to-transparent hidden sm:block pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-black/55 sm:hidden block pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Content Area - Centered on Mobile, Left-Aligned on Desktop */}
      <div className="relative z-30 max-w-7xl mx-auto w-full my-auto text-center sm:text-left pt-6 sm:pt-10 flex flex-col items-center sm:items-start">
        {/* Established Badge */}
        <div className="inline-flex items-center justify-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C8AD78]/40 mb-6 shadow-lg shadow-black/40 text-center">
          <span className="w-2 h-2 rounded-full bg-[#C8AD78] animate-pulse" />
          <span className="text-xs font-semibold text-[#F7F5F0] tracking-wider uppercase">
            {activeSlide.badge}
          </span>
        </div>

        {/* Master Luxury Headline with Keyed Animation */}
        <div
          key={`title-${currentSlide}`}
          className="w-full transition-all duration-700 ease-out flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl font-serif drop-shadow-md text-center sm:text-left">
            {activeSlide.title}{' '}
            <span className="text-[#C8AD78] drop-shadow-[0_2px_12px_rgba(200,173,120,0.35)] block sm:inline mt-1 sm:mt-0">
              {activeSlide.highlight}
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-[#F7F5F0]/85 max-w-2xl font-normal leading-relaxed drop-shadow text-center sm:text-left mx-auto sm:mx-0">
            {activeSlide.subtitle}
          </p>
        </div>

        {/* Dual CTA Buttons */}
        <div
          key={`cta-${currentSlide}`}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto transition-all duration-700"
        >
          <Link
            href={activeSlide.primaryCta.href}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] font-extrabold text-sm tracking-wider uppercase transition-all duration-300 text-center flex items-center justify-center space-x-2.5 shadow-xl shadow-black/60 hover:shadow-[#C8AD78]/30 hover:scale-[1.02]"
          >
            <span>{activeSlide.primaryCta.label}</span>
            <activeSlide.primaryCta.icon className="w-4 h-4" />
          </Link>

          {activeSlide.secondaryCta.isExternal ? (
            <a
              href={activeSlide.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/60 border border-white/30 hover:border-[#C8AD78] text-[#F7F5F0] hover:text-[#C8AD78] font-bold text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 text-center flex items-center justify-center space-x-2.5 shadow-lg"
            >
              <activeSlide.secondaryCta.icon className="w-4 h-4 text-[#C8AD78]" />
              <span>{activeSlide.secondaryCta.label}</span>
            </a>
          ) : (
            <Link
              href={activeSlide.secondaryCta.href}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-black/60 border border-white/30 hover:border-[#C8AD78] text-[#F7F5F0] hover:text-[#C8AD78] font-bold text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-300 text-center flex items-center justify-center space-x-2.5 shadow-lg"
            >
              <activeSlide.secondaryCta.icon className="w-4 h-4 text-[#C8AD78]" />
              <span>{activeSlide.secondaryCta.label}</span>
            </Link>
          )}
        </div>

        {/* Search Bar - Horizontally Centered on Mobile */}
        <div className="mt-9 max-w-xl w-full mx-auto sm:mx-0">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, or variant..."
              className="w-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-sm sm:text-base rounded-full pl-12 pr-32 py-4 focus:outline-none focus:border-[#C8AD78] focus:ring-2 focus:ring-[#C8AD78]/40 transition placeholder-gray-400 shadow-2xl text-left"
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

        {/* Trust Indicators Dynamically Keyed to Slide - Centered on Mobile */}
        <div
          key={`trust-${currentSlide}`}
          className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full"
        >
          {activeSlide.trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center sm:justify-start space-x-2 text-center sm:text-left"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8AD78] shrink-0" />
              <span className="text-[11px] sm:text-sm font-medium text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Navigation Controls & Interactive Indicators */}
      <div className="relative z-30 max-w-7xl mx-auto w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
        {/* Left / Right Controls & Slide Count - Centered on Mobile */}
        <div className="flex items-center justify-center space-x-4 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#C8AD78] border border-white/20 hover:border-[#C8AD78] text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-200 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-[#C8AD78] border border-white/20 hover:border-[#C8AD78] text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all duration-200 group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="text-xs tracking-widest text-gray-400 font-mono">
            <span className="text-[#C8AD78] font-bold text-sm">0{currentSlide + 1}</span>
            <span className="mx-1 text-gray-600">/</span>
            <span>0{totalSlides}</span>
          </div>
        </div>

        {/* 3 Interactive Slide Tab Bars */}
        <div className="flex items-center justify-center space-x-3 w-full sm:w-auto">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`group flex-1 sm:flex-initial text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-white/10 border border-[#C8AD78]/40' : 'bg-black/30 hover:bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex items-center justify-between space-x-2">
                  <span className={`text-[11px] font-bold tracking-wider font-mono ${isActive ? 'text-[#C8AD78]' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    0{index + 1}
                  </span>
                  <span className="hidden md:inline text-[10px] text-gray-300 font-medium truncate max-w-[120px]">
                    {index === 0 ? 'Exotics & Luxury' : index === 1 ? 'Certified Fleet' : 'Sell & Exchange'}
                  </span>
                </div>
                {/* Progress track */}
                <div className="mt-1.5 w-full sm:w-28 h-1 bg-white/15 rounded-full overflow-hidden">
                  {isActive ? (
                    <div
                      key={`progress-${currentSlide}`}
                      className={`h-full bg-[#C8AD78] rounded-full ${isPaused ? '' : 'animate-hero-progress'}`}
                      style={{ animationDuration: `${AUTO_SLIDE_DURATION}ms` }}
                    />
                  ) : (
                    <div className="h-full bg-transparent" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Scroll Down Indicator */}
        <div className="hidden lg:flex items-center space-x-2 text-xs text-gray-400">
          <span className="tracking-widest uppercase font-semibold text-[10px] text-gray-400">SCROLL</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#C8AD78] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
