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
    <section className="py-20 bg-[#0B0B0C] border-t border-[#1F1F24] px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
          What Our Customers Say
        </h2>
        <p className="mt-3 text-gray-400 text-sm sm:text-base">
          Trusted by hundreds of satisfied customers across Kerala
        </p>

        {/* Testimonial Card matching Screenshot 11 */}
        <div className="mt-12 bg-[#141417] border border-[#232328] rounded-2xl p-8 sm:p-12 text-left relative shadow-2xl overflow-hidden">
          {/* Quote Icon */}
          <div className="mb-6 text-[#E51937]">
            <Quote className="w-12 h-12 rotate-180 opacity-80" />
          </div>

          {/* Star Rating */}
          <div className="flex items-center space-x-1 text-[#E51937] mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#E51937]" />
            ))}
          </div>

          {/* Quote Text */}
          <p className="text-lg sm:text-xl text-gray-200 font-serif italic leading-relaxed">
            &quot;{current.quote}&quot;
          </p>

          {/* Customer Profile */}
          <div className="mt-8 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#1C1C22] border border-[#2D2D35] text-[#E51937] flex items-center justify-center font-bold text-lg font-serif">
              {current.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-white text-base">{current.name}</p>
              <p className="text-xs text-gray-400">{current.location}</p>
            </div>
          </div>
        </div>

        {/* Navigation Slider Controls matching Screenshot 11 */}
        <div className="mt-8 flex items-center justify-between max-w-5xl mx-auto px-2">
          {/* Arrow Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-[#141417] border border-[#232328] hover:border-[#E51937] text-white flex items-center justify-center transition"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-[#141417] border border-[#232328] hover:border-[#E51937] text-white flex items-center justify-center transition"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="flex items-center space-x-2">
            {MOCK_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-[#E51937]' : 'w-2 bg-[#27272A]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
