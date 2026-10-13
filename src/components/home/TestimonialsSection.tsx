'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '@/lib/mockData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? MOCK_TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === MOCK_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = MOCK_TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 bg-[#111113] border-b border-[#222227] px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
          DELIVERY EXPERIENCES
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
          Customer Stories &amp; Reviews
        </h2>
        <p className="mt-3 text-gray-400 text-sm sm:text-base">
          Trusted by discerning car owners and families across Kozhikode and Kerala
        </p>

        {/* Testimonial Card */}
        <div className="mt-12 bg-[#151515] border border-[#26262B] rounded-2xl p-8 sm:p-12 text-left relative shadow-2xl overflow-hidden">
          {/* Subtle gold line on top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8AD78] to-transparent opacity-50" />

          {/* Quote Icon */}
          <div className="mb-6 text-[#C8AD78]">
            <Quote className="w-12 h-12 rotate-180 opacity-70" />
          </div>

          {/* Star Rating */}
          <div className="flex items-center space-x-1 text-[#C8AD78] mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#C8AD78]" />
            ))}
          </div>

          {/* Quote Text */}
          <p className="text-lg sm:text-xl text-gray-200 font-serif italic leading-relaxed">
            &quot;{current.quote}&quot;
          </p>

          {/* Customer Profile & Slider Controls */}
          <div className="mt-8 pt-6 border-t border-[#222227] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#1C1C22] border border-[#2D2D35] text-[#C8AD78] flex items-center justify-center font-bold text-lg font-serif">
                {current.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white text-base">{current.name}</p>
                <p className="text-xs text-[#C8AD78]">{current.location}</p>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={prevTestimonial}
                aria-label="Previous Testimonial"
                className="w-10 h-10 rounded-full bg-[#111113] border border-[#26262B] text-gray-300 hover:text-white hover:border-[#C8AD78] flex items-center justify-center transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next Testimonial"
                className="w-10 h-10 rounded-full bg-[#111113] border border-[#26262B] text-gray-300 hover:text-white hover:border-[#C8AD78] flex items-center justify-center transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
