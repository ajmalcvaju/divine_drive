import { CheckCircle2 } from 'lucide-react';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function AboutSection() {
  const highlights = [
    '1-Month Engine & Gearbox Warranty',
    'Certified pre-owned vehicles with verified history',
    'Detailed technical & background inspection',
    'Verified documentation & instant transfer support',
  ];

  return (
    <section className="py-20 bg-[#0B0B0C] border-t border-[#1F1F24] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <span className="text-xs font-bold text-[#E51937] uppercase tracking-[0.2em]">
            ABOUT US
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
            Your Trusted Destination for{' '}
            <span className="text-[#E51937]">Premium</span> Pre-Owned Vehicles
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Divine Drive has been a trusted destination for premium pre-owned vehicles in Kozhikode since 2016. With a commitment to transparency, quality, and customer satisfaction, we specialize in certified pre-owned cars with complete history verification across multiple top brands.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-full max-w-md lg:max-w-none text-left">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#E51937] shrink-0" />
                <span className="text-sm font-semibold text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Stat Box */}
        <div className="lg:col-span-5 flex justify-center lg:block">
          <div className="w-full max-w-md lg:max-w-none bg-[#141417] p-8 rounded-2xl border border-[#232328] relative shadow-2xl space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-xl bg-[#1C1C22] border border-[#2A2A32]">
              <span className="text-3xl font-extrabold text-[#E51937] font-serif">2016</span>
              <div className="text-xs text-gray-400 border-l border-[#333] pl-3 text-left">
                <p className="font-semibold text-gray-200">Established</p>
                <p>Kozhikode, Kerala</p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#222226] grid grid-cols-2 gap-6 w-full text-center sm:text-left">
              <div>
                <p className="text-3xl font-extrabold text-white font-serif">9+</p>
                <p className="text-xs text-gray-400 mt-1">Years Experience</p>
              </div>

              <div>
                <p className="text-3xl font-extrabold text-white font-serif">100%</p>
                <p className="text-xs text-gray-400 mt-1">Transparency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
