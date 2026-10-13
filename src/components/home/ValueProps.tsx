import { Award, Car, ShieldCheck, Wrench } from 'lucide-react';

export default function ValueProps() {
  const props = [
    {
      icon: Award,
      stat: '9+',
      title: 'Years of Excellence',
      subtitle: 'Trusted since 2016 in Kozhikode',
    },
    {
      icon: Wrench,
      stat: '1 Month',
      title: 'Engine & Gearbox Warranty',
      subtitle: 'Assured mechanical peace of mind',
    },
    {
      icon: Car,
      stat: 'Multi-Brand',
      title: 'Certified Pre-Owned',
      subtitle: 'Curated luxury & utility cars',
    },
    {
      icon: ShieldCheck,
      stat: '100%',
      title: 'Transparent History',
      subtitle: 'Verified flood-free & non-accidental',
    },
  ];

  return (
    <section className="py-12 bg-[#0B0B0C] border-y border-[#1F1F24] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {props.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-8 rounded-xl bg-[#141417] text-center flex flex-col items-center justify-center transition-all duration-300 border border-[#232328] hover:border-[#E51937] hover:shadow-lg hover:shadow-red-950/20 group"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-[#1C1C22] border border-[#2A2A32] group-hover:border-[#E51937]/50 flex items-center justify-center mb-4 text-[#E51937] transition-colors">
                <Icon className="w-6 h-6" />
              </div>

              {/* Stat / Headline */}
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
                {p.stat}
              </h3>

              <p className="text-base font-bold text-gray-200 mt-1">{p.title}</p>
              <p className="text-xs text-gray-400 mt-1">{p.subtitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
