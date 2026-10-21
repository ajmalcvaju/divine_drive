import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Banknote,
  FileCheck,
  Car,
  Wrench
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function SellCarBanner() {
  const buyWhatsappMessage = encodeURIComponent(
    'Hi Divine Drives, I am interested in buying a certified pre-owned car with Divine Drives Certification. Please share your available inventory and warranty details.'
  );

  return (
    <section className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#0B0B0C] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Banner Card */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#121215] via-[#16161B] to-[#121215] border border-[#26262D] shadow-2xl shadow-black/80">
          
          {/* Subtle Ambient Golden Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#EEB000]/5 blur-3xl pointer-events-none" />

          {/* LEFT ROTATING WHEEL WITH GOLDEN CRESCENT ARC */}
          <div 
            className="absolute -left-16 sm:-left-12 md:-left-8 lg:left-0 top-1/2 -translate-y-1/2 w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-68 lg:h-68 pointer-events-none select-none flex items-center justify-center z-10 opacity-70 sm:opacity-90 lg:opacity-100"
            aria-hidden="true"
          >
            {/* Golden Arc Ring */}
            <div className="absolute inset-0 rounded-full border-[8px] sm:border-[10px] lg:border-[12px] border-[#EEB000] shadow-[0_0_24px_rgba(238,176,0,0.35)]" />
            
            {/* Inner Dark Rim Margin */}
            <div className="absolute inset-2 sm:inset-3 rounded-full bg-[#0E0E11]/80 backdrop-blur-sm" />

            {/* Rotating BBS Alloy Wheel */}
            <div className="relative w-4/5 h-4/5 animate-tyre-spin">
              <Image
                src="/wheel-rim-2x.png"
                alt="Rotating BBS Wheel Left"
                fill
                sizes="(max-width: 768px) 180px, 260px"
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </div>

          {/* RIGHT ROTATING WHEEL WITH GOLDEN CRESCENT ARC */}
          <div 
            className="absolute -right-16 sm:-right-12 md:-right-8 lg:right-0 top-1/2 -translate-y-1/2 w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-68 lg:h-68 pointer-events-none select-none flex items-center justify-center z-10 opacity-70 sm:opacity-90 lg:opacity-100"
            aria-hidden="true"
          >
            {/* Golden Arc Ring */}
            <div className="absolute inset-0 rounded-full border-[8px] sm:border-[10px] lg:border-[12px] border-[#EEB000] shadow-[0_0_24px_rgba(238,176,0,0.35)]" />
            
            {/* Inner Dark Rim Margin */}
            <div className="absolute inset-2 sm:inset-3 rounded-full bg-[#0E0E11]/80 backdrop-blur-sm" />

            {/* Rotating BBS Alloy Wheel (Reverse rotation for dynamic car motion) */}
            <div className="relative w-4/5 h-4/5 animate-tyre-spin-reverse">
              <Image
                src="/wheel-rim-2x.png"
                alt="Rotating BBS Wheel Right"
                fill
                sizes="(max-width: 768px) 180px, 260px"
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="relative z-20 px-6 sm:px-14 md:px-24 lg:px-36 py-8 sm:py-10 md:py-12 flex flex-col items-center text-center">
            
            {/* Certification Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF2CF] text-[#151515] shadow-md border border-[#E8C87A] mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#D48806] fill-[#D48806]/20" />
              <span className="text-xs sm:text-sm font-black tracking-wide uppercase font-sans">
                Divine Drives Certification
              </span>
            </div>

            {/* Main Punchy Buying Headline */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight max-w-3xl">
              Buy With No Tension With{' '}
              <span className="text-[#EEB000] drop-shadow-[0_0_15px_rgba(238,176,0,0.3)]">
                Divine Drives Certification
              </span>
            </h3>

            {/* Tension-Free Buying Benefits Grid / Highlights */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-gray-300">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A20] border border-[#2B2B33]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EEB000]" />
                <span className="font-medium">1-Month Engine & Gearbox Warranty</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A20] border border-[#2B2B33]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EEB000]" />
                <span className="font-medium">150+ Multi-Point Quality Checks</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A20] border border-[#2B2B33]">
                <FileCheck className="w-3.5 h-3.5 text-[#EEB000]" />
                <span className="font-medium">100% Non-Accidental & Flood-Free</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A20] border border-[#2B2B33]">
                <Banknote className="w-3.5 h-3.5 text-[#EEB000]" />
                <span className="font-medium">Easy EMI & Up to 90% Bank Loans</span>
              </div>
            </div>

            {/* CTA Buttons Matching Reference */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/cars"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#EEB000] hover:bg-[#FFC01E] text-black font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-[#EEB000]/25 transition-all transform hover:scale-105 active:scale-95"
              >
                <Car className="w-5 h-5 text-black" />
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <a
                href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}?text=${buyWhatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1A22] hover:bg-[#23232D] text-gray-200 hover:text-white border border-[#33333F] text-sm font-semibold transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>Enquire to Buy</span>
              </a>

              <a
                href={`tel:${DEFAULT_DEALERSHIP_SETTINGS.phone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1A22] hover:bg-[#23232D] text-gray-200 hover:text-white border border-[#33333F] text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4 text-[#EEB000]" />
                <span>Call {DEFAULT_DEALERSHIP_SETTINGS.phone}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
