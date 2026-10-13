import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Car } from '@/types';
import CarCard from '../cars/CarCard';

interface FeaturedVehiclesProps {
  cars: Car[];
}

export default function FeaturedVehicles({ cars }: FeaturedVehiclesProps) {
  const featured = cars.filter(c => c.isFeatured).slice(0, 4);

  return (
    <section className="py-20 bg-[#0B0B0C] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-end md:text-left justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
              FEATURED VEHICLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
              Our <span className="text-[#C8AD78]">Curated</span> Collection
            </h2>
          </div>

          <Link
            href="/cars"
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg bg-[#151515] border border-[#26262B] hover:border-[#C8AD78] hover:text-[#C8AD78] text-gray-200 text-xs font-semibold tracking-wide transition-all mt-2 md:mt-0 shrink-0"
          >
            <span>View All Vehicles</span>
            <ArrowRight className="w-4 h-4 text-[#C8AD78]" />
          </Link>
        </div>

        {/* 4-Column Product Grid matching reference screenshot */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((car) => (
              <CarCard key={car.id || car.slug} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#141417] rounded-xl border border-[#232328]">
            <p className="text-gray-400 text-sm">No featured inventory available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
