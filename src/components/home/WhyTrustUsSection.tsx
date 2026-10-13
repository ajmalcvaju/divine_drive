import { Award, FileCheck, CheckCircle2 } from 'lucide-react';

export default function WhyTrustUsSection() {
  return (
    <section className="py-20 bg-[#0B0B0C] border-t border-[#1F1F24] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center">
          <span className="text-xs font-bold text-[#E51937] uppercase tracking-[0.2em]">
            VEHICLE ASSURANCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
            Why Trust Us
          </h2>
        </div>

        {/* 2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Quality Certification */}
          <div className="bg-[#141417] p-8 sm:p-10 rounded-2xl border border-[#232328] hover:border-[#E51937]/50 transition-all duration-300 space-y-6 shadow-2xl relative overflow-hidden group flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#E51937]/30 group-hover:bg-[#E51937] transition-all duration-300" />

            <div className="w-12 h-12 rounded-xl bg-[#E51937]/10 border border-[#E51937]/30 flex items-center justify-center text-[#E51937] shrink-0">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#E51937] uppercase tracking-wider block">
                Quality Certification
              </span>
              <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
                Verified Quality Standard
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed pt-1 max-w-lg">
                Comprehensive professional vehicle assessment verifying physical condition, mechanical health, and documentation before listing.
              </p>
            </div>

            <ul className="space-y-3 pt-2 text-xs text-gray-300 text-left w-full max-w-md sm:max-w-none">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span className="font-semibold text-white">1-Month Engine &amp; Gearbox Warranty on certified pre-owned vehicles</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span>Full technical, mechanical, and aesthetic condition evaluation</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span>Verified ownership records, RTO status, and service history logs</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span>Transparent pricing based on current market evaluation</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span>Seamless documentation and hassle-free transfer assistance</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Pre-Purchase Inspection */}
          <div className="bg-[#141417] p-8 sm:p-10 rounded-2xl border border-[#232328] hover:border-[#E51937]/50 transition-all duration-300 space-y-6 shadow-2xl relative overflow-hidden group flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#E51937]/30 group-hover:bg-[#E51937] transition-all duration-300" />

            <div className="w-12 h-12 rounded-xl bg-[#E51937]/10 border border-[#E51937]/30 flex items-center justify-center text-[#E51937] shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#E51937] uppercase tracking-wider block">
                Pre-Purchase Inspection
              </span>
              <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
                Complete Technical Verification
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed pt-1 max-w-lg">
                Detailed technical evaluation by experienced automotive professionals ensuring complete clarity on vehicle history and overall health.
              </p>
            </div>

            <ul className="space-y-3 pt-2 text-xs text-gray-300 text-left w-full max-w-md sm:max-w-none">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span>Multi-point technical check covering engine, transmission, and chassis</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span>Independent evaluation by qualified automotive technicians</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span>Verification of insurance validity and registration details</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#E51937] shrink-0 mt-0.5" />
                <span>Detailed vehicle status report for confident buying decisions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
