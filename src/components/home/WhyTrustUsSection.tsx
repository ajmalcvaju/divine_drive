import { Award, FileCheck, CheckCircle2, ShieldAlert, Sparkles, FileText } from 'lucide-react';

export default function WhyTrustUsSection() {
  return (
    <section className="py-20 bg-[#151515] border-b border-[#222227] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
            INTEGRITY &amp; REASSURANCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
            Vehicle Confidence &amp; Transparency
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            We operate with strict quality controls so you can purchase your next vehicle with complete certainty.
          </p>
        </div>

        {/* 2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: 150+ Point Evaluation */}
          <div className="bg-[#111113] p-8 sm:p-10 rounded-2xl border border-[#242429] hover:border-[#C8AD78]/50 transition-all duration-300 space-y-6 shadow-2xl relative overflow-hidden group flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8AD78]/30 group-hover:bg-[#C8AD78] transition-all duration-300" />

            <div className="w-12 h-12 rounded-xl bg-[#C8AD78]/10 border border-[#C8AD78]/30 flex items-center justify-center text-[#C8AD78] shrink-0">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-wider block">
                Quality Certification
              </span>
              <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
                Verified Quality Standard
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed pt-1 max-w-lg">
                Comprehensive professional assessment verifying physical condition, mechanical health, and electronic systems before any vehicle is cataloged.
              </p>
            </div>

            <ul className="space-y-3 pt-2 text-xs text-gray-300 text-left w-full max-w-md sm:max-w-none">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                <span className="font-semibold text-white">1-Month Engine &amp; Gearbox Warranty on certified pre-owned vehicles</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                <span>Multi-point mechanical, steering, brake, and aesthetic evaluation</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                <span>Verified genuine odometer readings and brand authorized service history</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                <span>Fair transparent pricing aligned with live Kerala market value</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Transparency & Verification */}
          <div className="bg-[#111113] p-8 sm:p-10 rounded-2xl border border-[#242429] hover:border-[#C8AD78]/50 transition-all duration-300 space-y-6 shadow-2xl relative overflow-hidden group flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#C8AD78]/30 group-hover:bg-[#C8AD78] transition-all duration-300" />

            <div className="w-12 h-12 rounded-xl bg-[#C8AD78]/10 border border-[#C8AD78]/30 flex items-center justify-center text-[#C8AD78] shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-wider block">
                Verification Guarantee
              </span>
              <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
                Flood-Free &amp; Non-Accidental
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed pt-1 max-w-lg">
                Complete peace of mind knowing all structural chassis points and documentation have been rigorously audited.
              </p>
            </div>

            <ul className="space-y-3 pt-2 text-xs text-gray-300 text-left w-full max-w-md sm:max-w-none">
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                <span className="font-semibold text-white">100% Certified Flood-Free and Major-Accident-Free</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                <span>Full RTO hypothecation clearance, tax receipt validation, and NOC support</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                <span>Assisted Kerala ownership transfer directly to your name within days</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#C8AD78] shrink-0 mt-0.5" />
                <span>Financing assistance with up to 80%–90% funding on Kerala registered cars</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
