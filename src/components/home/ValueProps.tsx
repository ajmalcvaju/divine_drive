import { Award, Car, ShieldCheck } from 'lucide-react';

export default function ValueProps() {
  const props = [
    {
      icon: Award,
      stat: '9+',
      title: 'Years of Excellence',
      subtitle: 'Trusted since 2016',
      highlight: false,
    },
    {
      icon: Car,
      stat: 'Wide Range',
      title: 'Multi-Brand Vehicles',
      subtitle: 'Premium selection',
      highlight: false,
    },
    {
      icon: ShieldCheck,
      stat: '100%',
      title: 'Transparent History',
      subtitle: 'Verified documentation',
      highlight: true, // Red glow outline matching Screenshot 3
    },
  ];

  return (
    <section className="py-12 bg-[#0B0B0C] border-y border-[#1F1F24] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {props.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className={`p-8 rounded-xl bg-[#141417] text-center flex flex-col items-center justify-center transition-all duration-300 ${
                p.highlight
                  ? 'border-2 border-[#E51937] shadow-lg shadow-red-950/20 relative overflow-hidden'
                  : 'border border-[#232328] hover:border-[#383840]'
              }`}
            >
              {/* Highlight subtle top line */}
              {p.highlight && (
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-[#E51937]" />
              )}

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-[#1C1C22] border border-[#2A2A32] flex items-center justify-center mb-4 text-[#E51937]">
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
