import { ShieldCheck, Banknote, Award, FileCheck } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      title: 'Certified Sales',
      desc: 'Flood-free, non-accidental, multi-brand vehicles with verified history.',
      icon: ShieldCheck,
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'EMI & Easy Financing',
      desc: 'Flexible EMI and up to 80%–90% funding available on Kerala registered cars with fast approvals and minimal paperwork.',
      icon: Banknote,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Engine & Gearbox Warranty',
      desc: '1-Month Engine and Gearbox Warranty on certified pre-owned vehicles for complete peace of mind (T&C Apply).',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Hassle-Free RTO',
      desc: 'Complete ownership transfer, NOC, and full documentation support.',
      icon: FileCheck,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-20 bg-[#0B0B0C] border-t border-[#1F1F24] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
            Premium Services
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Experience excellence at every step of your car buying journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-[#141417] border border-[#232328] hover:border-[#E51937] hover:shadow-xl hover:shadow-red-950/20 transition-all duration-300 min-h-[220px] flex flex-col justify-end p-8"
            >
              {/* Darkened background car image overlay matching screenshots 5-7 */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-15 filter grayscale group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url('${s.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-[#141417]/90 to-transparent" />

              <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
                <h3 className="text-2xl font-bold font-serif mb-2.5 text-white group-hover:text-[#E51937] transition-colors">
                  {s.title}
                </h3>

                {/* Accent red underline below heading */}
                <div className="w-8 h-0.5 bg-[#E51937] mb-3 rounded-full group-hover:w-12 transition-all duration-300" />

                <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
