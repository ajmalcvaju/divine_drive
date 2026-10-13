import Link from 'next/link';
import { Phone, Calendar, ArrowRight, MessageSquare } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function ConsultationCtaSection() {
  return (
    <section className="py-20 bg-[#111113] border-b border-[#222227] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8AD78]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto bg-[#151515] border border-[#26262B] rounded-3xl p-8 sm:p-14 text-center relative shadow-2xl overflow-hidden">
        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8AD78] to-transparent" />

        <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
          LET’S CONNECT
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-3">
          Your Next Car Starts Here.
        </h2>
        <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Whether you are looking for an executive sedan, a rugged Kerala-ready SUV, or seeking a specific model, our advisors are here to guide you with zero sales pressure.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}?text=${encodeURIComponent('Hi Divine Drives, I would like to book a consultation and schedule a vehicle viewing.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center justify-center space-x-2"
          >
            <WhatsAppIcon className="w-4 h-4 fill-[#151515]" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${DEFAULT_DEALERSHIP_SETTINGS.phone}`}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1C1C22] border border-[#2A2A32] hover:border-[#C8AD78] text-white hover:text-[#C8AD78] font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4 text-[#C8AD78]" />
            <span>Call +91 97441 98199</span>
          </a>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-white/20 hover:border-white text-gray-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation Form</span>
          </Link>
        </div>

        {/* Guarantee text */}
        <p className="mt-8 text-[11px] text-gray-500 font-medium">
          Showroom visits open Monday to Saturday, 9:00 AM – 7:30 PM • South Koduvally, Kozhikode
        </p>
      </div>
    </section>
  );
}
