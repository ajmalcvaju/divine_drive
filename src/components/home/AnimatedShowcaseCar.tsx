'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

export default function AnimatedShowcaseCar() {
  const [hasDrivenIn, setHasDrivenIn] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger driving entrance when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasDrivenIn) {
          // Slight delay for dramatic anticipation
          const driveTimer = setTimeout(() => {
            setHasDrivenIn(true);
          }, 200);

          // Headlights and wheel ignition burst when the car halts
          const lightsTimer = setTimeout(() => {
            setHeadlightsOn(true);
          }, 1100);

          return () => {
            clearTimeout(driveTimer);
            clearTimeout(lightsTimer);
          };
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasDrivenIn]);

  // Replay animation on click
  const triggerReplay = () => {
    setHasDrivenIn(false);
    setHeadlightsOn(false);
    setTimeout(() => {
      setHasDrivenIn(true);
      setTimeout(() => setHeadlightsOn(true), 1100);
    }, 150);
  };

  return (
    <div 
      ref={containerRef}
      className="lg:col-span-5 relative flex flex-col items-center justify-center group order-2 lg:order-1 pt-6 lg:pt-0 overflow-hidden sm:overflow-visible"
    >
      {/* Dynamic Laser LED Headlight Beam (Powers on after stopping) */}
      <div 
        className={`absolute -right-20 top-1/2 -translate-y-1/2 w-72 h-40 bg-gradient-to-r from-amber-100/30 via-[#C8AD78]/20 to-transparent blur-2xl rounded-full pointer-events-none transition-all duration-700 ease-out hidden sm:block ${
          headlightsOn ? 'opacity-100 animate-headlight-pulse scale-100' : 'opacity-0 scale-75'
        }`} 
      />

      {/* Rear Red BBS Wheel Ambient Glow */}
      <div 
        className={`absolute left-[18%] bottom-6 w-28 h-28 bg-[#E53E3E]/30 blur-2xl rounded-full pointer-events-none transition-opacity duration-1000 ${
          headlightsOn ? 'opacity-100 animate-pulse' : 'opacity-0'
        }`} 
      />

      {/* Front Red BBS Wheel Ambient Glow */}
      <div 
        className={`absolute right-[18%] bottom-6 w-28 h-28 bg-[#E53E3E]/30 blur-2xl rounded-full pointer-events-none transition-opacity duration-1000 ${
          headlightsOn ? 'opacity-100 animate-pulse' : 'opacity-0'
        }`} 
      />

      {/* Realistic Contact Patch Shadows Under Tyres */}
      <div 
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-6 bg-black/95 blur-md rounded-full pointer-events-none transition-opacity duration-1000 ${
          hasDrivenIn ? 'opacity-100' : 'opacity-0'
        }`} 
      />
      <div 
        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/80 blur-2xl rounded-full pointer-events-none transition-opacity duration-1000 ${
          hasDrivenIn ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Shimmering Asphalt Road Surface Line */}
      <div 
        className={`absolute bottom-3 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8AD78]/40 to-transparent blur-[0.5px] pointer-events-none transition-opacity duration-1000 ${
          hasDrivenIn ? 'opacity-100 animate-road-shine' : 'opacity-0'
        }`} 
      />

      {/* THE CAR CONTAINER (STARTS OFF-SCREEN TO THE LEFT, DRIVES IN SMOOTHLY) */}
      <div 
        onClick={triggerReplay}
        title="Click to replay drive-in animation"
        className={`relative w-full max-w-[600px] aspect-[613/205] cursor-pointer transition-all duration-[1200ms] ${
          hasDrivenIn
            ? 'opacity-100 translate-x-0 scale-100 ease-[cubic-bezier(0.16,1,0.3,1)]'
            : 'opacity-0 -translate-x-[120%] scale-90 pointer-events-none'
        }`}
      >
        {/* Subtle idle suspension motion once parked */}
        <div className={`relative w-full h-full transition-transform duration-700 ease-out group-hover:translate-x-4 group-hover:scale-[1.03] ${
          hasDrivenIn && headlightsOn ? 'animate-car-float' : ''
        }`}>
          <Image
            src="/porsche-gt3rs-2x.png"
            alt="Porsche 911 GT3 RS Driving In"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
            priority
          />
        </div>
      </div>

      {/* Verified Badge & Interactive Replay Indicator */}
      <div 
        className={`mt-5 flex items-center gap-3 transition-all duration-700 delay-500 ${
          hasDrivenIn && headlightsOn 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#16161C]/90 backdrop-blur-md border border-[#2B2B36] shadow-xl group-hover:border-[#C8AD78]/50 transition-colors">
          <span className="w-2 h-2 rounded-full bg-[#E53E3E] animate-ping" />
          <span className="text-[11px] font-bold text-gray-200 tracking-wider uppercase font-sans">
            Porsche 911 GT3 RS • Verified Collection
          </span>
        </div>

        <button
          onClick={triggerReplay}
          type="button"
          aria-label="Replay drive-in animation"
          className="p-1.5 rounded-full bg-[#181820] border border-[#2B2B36] text-gray-400 hover:text-[#C8AD78] hover:border-[#C8AD78]/40 transition-colors shadow-md"
          title="Replay drive-in animation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
