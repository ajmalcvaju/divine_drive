import { Search, Calendar, FileCheck, KeyRound } from 'lucide-react';

export default function BuyingStepsSection() {
  const steps = [
    {
      num: '01',
      title: 'Explore & Select',
      desc: 'Browse our curated, verified pre-owned car inventory online or visit our Kozhikode showroom.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Schedule a Viewing',
      desc: 'Take an extensive test drive and examine technical inspection reports with our automotive advisors.',
      icon: Calendar,
    },
    {
      num: '03',
      title: 'Review Documents & EMI',
      desc: 'Enjoy full transparency on service records, ownership history, and customized Kerala financing plans.',
      icon: FileCheck,
    },
    {
      num: '04',
      title: 'Drive Away with Assurance',
      desc: 'Receive immediate delivery backed by our 1-Month Engine & Gearbox Warranty and completed RTO transfer.',
      icon: KeyRound,
    },
  ];

  return (
    <section className="py-20 bg-[#151515] border-b border-[#222227] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
            HOW BUYING WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
            A Transparent 4-Step Process
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            From your first inquiry to driving home, we make every stage seamless and dependable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-[#111113] p-8 rounded-2xl border border-[#242429] hover:border-[#C8AD78] transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-[#C8AD78]/30 font-serif group-hover:text-[#C8AD78] transition-colors">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#1C1C22] border border-[#2A2A32] group-hover:border-[#C8AD78]/40 flex items-center justify-center text-[#C8AD78] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-serif tracking-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#222227] flex items-center text-[11px] font-semibold text-[#C8AD78] opacity-80 group-hover:opacity-100 transition-opacity">
                  Step {s.num} of 04
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
