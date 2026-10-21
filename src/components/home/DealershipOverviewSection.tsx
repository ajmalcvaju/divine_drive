import Link from 'next/link';
import Image from 'next/image';
import AnimatedShowcaseCar from './AnimatedShowcaseCar';
import { 
  Award, 
  Car, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  FileCheck, 
  Sparkles,
  Banknote,
  Wrench,
  Navigation,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  Check,
  Star,
  Fuel,
  Settings2,
  CalendarCheck
} from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function DealershipOverviewSection() {
  const stats = [
    {
      stat: '300+',
      label: 'Cars Sold & Delivered',
      subtext: 'Across Kozhikode & Kerala',
      icon: Car,
    },
    {
      stat: '#1',
      label: 'Leading Seller in Calicut',
      subtext: 'Trusted pre-owned car hub',
      icon: Award,
    },
    {
      stat: '9+',
      label: 'Years in Business',
      subtext: 'Established 2016 in Koduvally',
      icon: ShieldCheck,
    },
    {
      stat: '100%',
      label: 'Clean Title & Verified',
      subtext: 'Non-accidental & flood-free',
      icon: FileCheck,
    },
  ];

  const services = [
    {
      title: 'Certified Pre-Owned Cars',
      desc: 'Carefully curated multi-brand cars including SUVs, luxury sedans, family cars, and everyday hatchbacks from top brands.',
      icon: Car,
    },
    {
      title: '1-Month Engine & Gearbox Warranty',
      desc: 'Assured mechanical peace of mind covering vital drivetrain components on eligible certified vehicles (T&C apply).',
      icon: Wrench,
    },
    {
      title: '150+ Technical Quality Checks',
      desc: 'Comprehensive multi-point assessment verifying chassis, engine compression, suspension, transmission, and electronics.',
      icon: ShieldCheck,
    },
    {
      title: 'Easy EMI & 80%–90% Bank Loans',
      desc: 'Fast financing with minimal paperwork through leading Kerala banks and NBFCs for KL-registered vehicles.',
      icon: Banknote,
    },
    {
      title: 'Complete Kerala RTO Transfer',
      desc: '100% legal ownership transfer assistance, NOC, clearance of hypothecation, and prompt doorstep RC delivery.',
      icon: FileCheck,
    },
    {
      title: 'Fair Exchange & Buyback Options',
      desc: 'Transparent valuation when you want to upgrade or trade in your existing car with instant settlement.',
      icon: TrendingUp,
    },
  ];

  const faqs = [
    {
      q: 'Are all vehicles at Divine Drives flood-free and non-accidental?',
      a: 'Yes, 100%. Every car is physically evaluated for flood damage, watermarks, rust, and chassis integrity. We reject accidental or flood-affected cars.',
    },
    {
      q: 'Do you provide loans and EMI options for buyers across Kerala?',
      a: 'Yes, we provide up to 80% to 90% vehicle funding on Kerala-registered cars with flexible repayment tenures from 1 to 5 years.',
    },
    {
      q: 'Where is the Divine Drives shop located in Calicut?',
      a: 'We are situated in South Koduvally on the Calicut – Wayanad National Highway route, easily accessible from Kozhikode city, Malappuram, and Wayanad.',
    },
    {
      q: 'Can I test drive a car before making a decision?',
      a: 'Absolutely. We encourage extensive test drives and offer full access to technical inspection records and service history before purchase.',
    },
  ];

  return (
    <section className="relative py-20 bg-[#0E0E10] border-y border-[#222227] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C8AD78]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#C8AD78]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* ABOUT DIVINE DRIVES - FEATURED SHOWCASE WITH CAR FROM LEFT SIDE */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#121215] via-[#15151A] to-[#101013] border border-[#26262E] p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl shadow-black/80">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C8AD78]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E53E3E]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Heading Section - Always at the top, centered on mobile */}
          <div className="space-y-2 mb-6 sm:mb-8 text-center sm:text-left flex flex-col items-center sm:items-start">
            {/* Category Header & Tagline */}
            <div className="space-y-1.5 flex flex-col items-center sm:items-start">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8AD78] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-[0.2em] block">
                  About Divine Drives
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                We want to add to your power.
              </p>
            </div>

            {/* Big Display Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight leading-[1.15] text-center sm:text-left">
              Become a luxury car owner with{' '}
              <span className="text-[#C8AD78] drop-shadow-[0_0_25px_rgba(200,173,120,0.35)] block sm:inline">
                Divine Drives!
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* PORSCHE GT3 RS DRIVING IN: DIRECTLY BELOW HEADING */}
            <AnimatedShowcaseCar className="order-1 lg:order-1" />

            {/* BRAND NARRATIVE & STATS (MATCHING REFERENCE IMAGE 1) */}
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-2 flex flex-col items-center sm:items-start text-center sm:text-left">
              
              {/* Brand Narrative Paragraph */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
                We are Divine Drives, the first choice pre-owned luxury and certified multi-brand automobile dealer in Calicut. Situated in South Koduvally on the Calicut – Wayanad National Highway route, our curated showroom brings you hand-inspected family cars, SUVs, and luxury sedans with 100% verified documentation, non-accidental guarantee, and transparent pricing.
              </p>

              {/* STATS STRIP WITH THIN VERTICAL DIVIDERS (IMAGE 1 LAYOUT) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 pt-6 pb-6 my-6 border-y border-white/10 w-full text-center sm:text-left">
                
                {/* Stat 1: 9+ Years */}
                <div className="sm:pr-5 sm:border-r border-white/15 group/stat flex flex-col items-center sm:items-start">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight group-hover/stat:text-[#C8AD78] transition-colors">
                    9 +
                  </div>
                  <div className="text-xs font-bold text-gray-200 mt-1 uppercase tracking-wider">
                    Years In Business
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Established 2016
                  </div>
                </div>

                {/* Stat 2: 300+ Sold */}
                <div className="sm:px-5 sm:border-r border-white/15 group/stat flex flex-col items-center sm:items-start">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight group-hover/stat:text-[#C8AD78] transition-colors">
                    300 +
                  </div>
                  <div className="text-xs font-bold text-gray-200 mt-1 uppercase tracking-wider">
                    Cars Delivered
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Across Kerala
                  </div>
                </div>

                {/* Stat 3: #1 Leading Seller */}
                <div className="sm:px-5 sm:border-r border-white/15 group/stat flex flex-col items-center sm:items-start">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight group-hover/stat:text-[#C8AD78] transition-colors">
                    #1
                  </div>
                  <div className="text-xs font-bold text-gray-200 mt-1 uppercase tracking-wider">
                    Leading Seller
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    In Calicut Region
                  </div>
                </div>

                {/* Stat 4: 100% Clean Title */}
                <div className="sm:pl-5 group/stat flex flex-col items-center sm:items-start">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight group-hover/stat:text-[#C8AD78] transition-colors">
                    100%
                  </div>
                  <div className="text-xs font-bold text-gray-200 mt-1 uppercase tracking-wider">
                    Clean Title
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Non-Accidental
                  </div>
                </div>

              </div>

              {/* ACTION BUTTONS (HORIZONTALLY CENTERED ON MOBILE) */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-1 w-full">
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-gray-100 text-[#121215] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-black/50 transition-all transform hover:scale-105 active:scale-95 text-center"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 text-[#121215]" />
                </Link>

                <a
                  href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}?text=${encodeURIComponent('Hi Divine Drives, I would like to visit your showroom in South Koduvally, Calicut and inspect your available cars.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#18181D] hover:bg-[#222228] text-gray-200 hover:text-white border border-[#2E2E38] text-xs font-bold uppercase tracking-wider transition-all text-center"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  <span>Contact Showroom</span>
                </a>

                <a
                  href={`tel:${DEFAULT_DEALERSHIP_SETTINGS.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-transparent hover:bg-white/5 text-gray-300 hover:text-white text-xs font-semibold transition-all text-center"
                >
                  <Phone className="w-4 h-4 text-[#C8AD78]" />
                  <span>{DEFAULT_DEALERSHIP_SETTINGS.phone}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION 3: 6 Services & Shop Offerings Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
              COMPLETE AUTOMOTIVE SERVICES
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight mt-1.5">
              What We Offer at Our Calicut Showroom
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Everything under one roof: from multi-brand vehicle sourcing to loans, warranty, and documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {services.map((s, idx) => {
              const SIcon = s.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-[#151515] border border-[#242429] hover:border-[#C8AD78]/60 transition-all duration-300 flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1C1C22] border border-[#2A2A32] group-hover:border-[#C8AD78]/40 flex items-center justify-center text-[#C8AD78] shrink-0 transition-colors">
                      <SIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-serif leading-snug">{s.title}</h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: Showroom Details & Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Why Buy From Us in Calicut */}
          <div className="lg:col-span-7 bg-[#151515] border border-[#242429] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-wider block">
                  SHOP VALUES & TRANSPARENCY
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight mt-1">
                  Why Customers Choose Divine Drives
                </h3>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                We know that trust is everything when choosing a pre-owned car. At Divine Drives, every listed vehicle has its genuine service records verified, odometer readings validated, and history certified with no hidden surprises.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#C8AD78] mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-200">100% Non-Accidental Guarantee</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#C8AD78] mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-200">Verified Flood-Free Certification</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#C8AD78] mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-200">Genuine Odometer &amp; Service History</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#C8AD78] mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-200">On-Spot Valuation for Car Exchange</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#C8AD78] mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-200">Up to 80%–90% Car Loans Available</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-[#C8AD78] mt-0.5 shrink-0" />
                  <span className="text-xs text-gray-200">Full Kerala RTO Transfer Completed</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#222227] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-400">
              <span className="text-gray-300 font-medium">
                Established 2016 • Serving Calicut, Malappuram, Wayanad &amp; all Kerala
              </span>
              <Link 
                href="/about" 
                className="text-[#C8AD78] hover:text-[#B89C67] font-semibold flex items-center space-x-1 shrink-0"
              >
                <span>More About Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Complete Showroom Details, Address, Hours */}
          <div className="lg:col-span-5 bg-[#151515] border border-[#242429] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#C8AD78]/10 border border-[#C8AD78]/30 flex items-center justify-center text-[#C8AD78] shrink-0 mt-0.5">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#C8AD78] uppercase tracking-wider block">
                    SHOWROOM LOCATION
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif">{DEFAULT_DEALERSHIP_SETTINGS.name}</h3>
                  <p className="text-xs text-gray-300 mt-1 leading-snug">
                    {DEFAULT_DEALERSHIP_SETTINGS.address}
                  </p>
                </div>
              </div>

              {/* Showroom Location Codes */}
              <div className="p-4 rounded-xl bg-[#111113] border border-[#222227] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Google Plus Code:</span>
                  <span className="font-mono font-bold text-[#C8AD78]">{DEFAULT_DEALERSHIP_SETTINGS.plusCode}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-[#1C1C22]">
                  <span className="text-gray-400">Highway Landmark:</span>
                  <span className="text-gray-200 font-medium">South Koduvally, Calicut – Wayanad Route</span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-300 font-semibold">
                  <Clock className="w-4 h-4 text-[#C8AD78]" />
                  <span>Showroom Visiting Hours</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#111113] border border-[#222227] text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monday – Saturday:</span>
                    <span className="text-white font-medium">9:00 AM – 7:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sunday:</span>
                    <span className="text-[#C8AD78] font-medium">Open by Prior Appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Shop Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#222227]">
              <a
                href={DEFAULT_DEALERSHIP_SETTINGS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl bg-[#1C1C22] hover:bg-[#25252D] border border-[#2A2A32] hover:border-[#C8AD78] text-white text-xs font-bold tracking-wide uppercase flex items-center justify-center space-x-1.5 transition text-center"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C8AD78]" />
                <span>Get Directions</span>
              </a>

              <Link
                href="/contact"
                className="py-3 px-3 rounded-xl bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] text-xs font-bold tracking-wide uppercase flex items-center justify-center space-x-1.5 transition text-center shadow"
              >
                <span>Book a Visit</span>
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 5: Frequently Asked Questions About the Shop */}
        <div className="space-y-6 pt-4 border-t border-[#222227]">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
              BUYER QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mt-1">
              Common Questions About Divine Drives
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {faqs.map((f, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-[#151515] border border-[#242429] space-y-2 hover:border-[#C8AD78]/40 transition"
              >
                <div className="flex items-start space-x-2.5">
                  <HelpCircle className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                  <h4 className="text-sm font-bold text-white font-serif">{f.q}</h4>
                </div>
                <p className="text-xs text-gray-300 pl-6 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
