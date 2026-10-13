import { ShieldCheck, Award, CheckCircle2, Users, Trophy, Wrench } from 'lucide-react';
import Link from 'next/link';
import WhyTrustUsSection from '@/components/home/WhyTrustUsSection';

export const metadata = {
  title: 'About Us | Divine Drive Kozhikode',
  description: 'Learn about Divine Drive - Kozhikode’s premier pre-owned luxury car dealership established in 2016. Certified pre-owned vehicles with complete history verification.',
};

export default function AboutPage() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Certified 150+ Point Check',
      desc: 'Every vehicle undergoes comprehensive mechanical, electrical, and structural evaluation before entering our inventory.',
    },
    {
      icon: Award,
      title: 'Complete History Verification',
      desc: 'We strictly verify vehicle ownership history, service logs, and registration records to guarantee complete transparency.',
    },
    {
      icon: Trophy,
      title: '9+ Years of Excellence',
      desc: 'Serving hundreds of happy car owners across Kerala since 2016 with complete transparency and fair market pricing.',
    },
    {
      icon: Wrench,
      title: '1-Month Engine & Gearbox Warranty',
      desc: 'Drive away with complete confidence thanks to our dedicated 1-month warranty coverage on critical engine and gearbox components.',
    },
  ];

  const highlights = [
    '1-Month Engine & Gearbox Warranty on certified vehicles',
    'Certified pre-owned vehicles with complete history verification',
    'Detailed technical inspection & service history logs',
    'Multi-brand premium luxury selection (BMW, Audi, Skoda, Thar ROXX, Toyota)',
    'Verified RTO documentation and instant ownership transfer support',
    'Flexible EMI & up to 80%–90% vehicle financing on Kerala registered cars',
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0C] py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#E51937] uppercase tracking-[0.2em]">
            OUR STORY & VALUES
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-serif tracking-tight">
            About <span className="text-[#E51937]">Divine Drive</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Established in 2016 in Kozhikode, Kerala, Divine Drive has redefined pre-owned car buying by combining luxury vehicle selection with absolute transparency and uncompromised trust.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-8 rounded-2xl bg-[#141417] border border-[#232328] hover:border-[#E51937]/50 transition-all duration-300 space-y-3 shadow-xl flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 rounded-xl bg-red-950/30 border border-red-900/40 flex items-center justify-center text-[#E51937]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-serif pt-2">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Detailed Narrative & Stats Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-[#1F1F24]">
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <span className="text-xs font-bold text-[#E51937] uppercase tracking-[0.2em]">
              OUR COMMITMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight leading-snug">
              Your Trusted Destination for Premium Pre-Owned Vehicles
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              At Divine Drive, we believe that purchasing a pre-owned car should feel every bit as exciting and rewarding as buying brand new. Our showroom in Kozhikode presents handpicked, high-grade vehicles from top Indian and international manufacturers.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Every single vehicle on our floor undergoes thorough inspection, background verification, and legal clearance to ensure our customers drive home with total confidence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 w-full max-w-md lg:max-w-none text-left">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#E51937] shrink-0" />
                  <span className="text-xs font-semibold text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:block">
            <div className="w-full max-w-md lg:max-w-none bg-[#141417] p-8 rounded-2xl border border-[#232328] space-y-6 shadow-2xl relative overflow-hidden flex flex-col items-center sm:items-start text-center sm:text-left">
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

              <div className="pt-4 w-full">
                <Link
                  href="/contact"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition"
                >
                  <span>Get In Touch With Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OUR GUARANTEE - Why Trust Us Section */}
      <WhyTrustUsSection />
    </div>
  );
}
