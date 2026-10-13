import { Award, Car, ShieldCheck, Wrench } from 'lucide-react';

export default function ValueProps() {
  const props = [
    {
      icon: Award,
      stat: '9+',
      title: 'Years of Trust',
      subtitle: 'Serving customers across Kozhikode since 2016',
    },
    {
      icon: Wrench,
      stat: '1 Month',
      title: 'Warranty Assured',
      subtitle: 'Engine & Gearbox coverage for peace of mind',
    },
    {
      icon: ShieldCheck,
      stat: '100%',
      title: 'History Verified',
      subtitle: 'Certified flood-free & non-accidental vehicles',
    },
    {
      icon: Car,
      stat: 'Kerala RTO',
      title: 'Transfer Support',
      subtitle: 'Fast registration, NOC, and documentation',
    },
  ];

  return (
    <section className="py-20 bg-[#111113] border-b border-[#222227] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
            THE DIVINE DRIVES ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
            Why Choose Us
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base leading-relaxed">
            Every vehicle in our showroom is held to the highest standard of mechanical integrity and transparent ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#151515] text-center flex flex-col items-center justify-center transition-all duration-300 border border-[#242429] hover:border-[#C8AD78] hover:shadow-xl hover:shadow-black/60 group"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-[#1C1C22] border border-[#2A2A32] group-hover:border-[#C8AD78]/50 flex items-center justify-center mb-5 text-[#C8AD78] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Stat / Headline */}
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
                  {p.stat}
                </h3>

                <p className="text-base font-bold text-gray-200 mt-2">{p.title}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{p.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
