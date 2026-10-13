'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, X, SlidersHorizontal, RefreshCw, Calendar, ArrowRight } from 'lucide-react';
import { Car, FuelType, TransmissionType, BodyType } from '@/types';
import { getCars } from '@/lib/firebase/cars';
import CarCard from '@/components/cars/CarCard';

function InventoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [make, setMake] = useState(searchParams.get('make') || 'All');
  const [bodyType, setBodyType] = useState(searchParams.get('bodyType') || 'All');
  const [fuelType, setFuelType] = useState(searchParams.get('fuelType') || 'All');
  const [transmission, setTransmission] = useState(searchParams.get('transmission') || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('maxPrice')) || 6000000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'year-desc'>(
    (searchParams.get('sortBy') as any) || 'newest'
  );

  const makes = ['All', 'Mahindra', 'Audi', 'Skoda', 'BMW', 'Mercedes-Benz', 'Toyota'];
  const bodyTypes: (BodyType | 'All')[] = ['All', 'SUV', 'Sedan', 'Luxury', 'Hatchback', 'MUV'];
  const fuelTypes: (FuelType | 'All')[] = ['All', 'Diesel', 'Petrol', 'Hybrid', 'CNG'];
  const transmissions: (TransmissionType | 'All')[] = ['All', 'Automatic', 'Manual'];

  useEffect(() => {
    async function fetchInventory() {
      setLoading(true);
      const data = await getCars({
        make,
        bodyType,
        fuelType,
        transmission,
        maxPrice,
        search,
        sortBy,
        status: 'published',
      });
      setCars(data);
      setLoading(false);
    }
    fetchInventory();
  }, [make, bodyType, fuelType, transmission, maxPrice, search, sortBy]);

  const handleClearFilters = () => {
    setSearch('');
    setMake('All');
    setBodyType('All');
    setFuelType('All');
    setTransmission('All');
    setMaxPrice(6000000);
    setSortBy('newest');
    router.push('/cars');
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Title with Action Buttons matching reference image */}
        <div className="border-b border-[#1F1F24] pb-8 mb-8 flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-auto">
            <span className="text-xs font-bold text-[#E51937] uppercase tracking-[0.2em] text-center lg:text-left">
              PRE-OWNED INVENTORY
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2 text-center lg:text-left">
              Browse Vehicles
            </h1>
            <p className="text-gray-400 text-sm mt-2 text-center lg:text-left max-w-lg lg:max-w-none">
              Showing {cars.length} certified pre-owned luxury vehicles available in Kozhikode
            </p>
          </div>

          {/* Action CTAs & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#141417] border border-[#2D2D35] hover:border-[#E51937] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#E51937]" />
              <span>Book a Consultation</span>
            </Link>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center px-4 py-3 rounded-xl bg-[#141417] border border-[#232328] text-white text-xs font-semibold"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2 text-[#E51937]" />
                Filters
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#141417] border border-[#232328] text-white text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-[#E51937]"
                >
                  <option value="newest">Newest Listed</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Year: Newest First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Filter Sidebar + Right Car Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-[#141417] p-6 rounded-2xl border border-[#232328] h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-[#222226]">
              <h2 className="text-white font-serif font-bold text-lg flex items-center">
                <Filter className="w-4 h-4 mr-2 text-[#E51937]" />
                Filter Search
              </h2>
              <button
                onClick={handleClearFilters}
                className="text-xs text-[#E51937] hover:underline flex items-center"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Reset
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Search Model
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Thar, Q3, Kodiaq"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#E51937]"
                />
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Brand / Make */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Make / Brand
              </label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E51937]"
              >
                {makes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Body Type
              </label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E51937]"
              >
                {bodyTypes.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E51937]"
              >
                {fuelTypes.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Transmission
              </label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full bg-[#1C1C22] border border-[#2A2A32] text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#E51937]"
              >
                {transmissions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Max Budget
                </label>
                <span className="text-xs font-bold text-[#E51937]">
                  ₹{(maxPrice / 100000).toFixed(1)} Lakh
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="6000000"
                step="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#E51937] bg-[#222226]"
              />
            </div>
          </aside>

          {/* Right Inventory Grid */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 rounded-2xl bg-[#141417] border border-[#232328] animate-pulse" />
                ))}
              </div>
            ) : cars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id || car.slug} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#141417] rounded-2xl border border-[#232328] space-y-4">
                <Search className="w-12 h-12 text-gray-500 mx-auto" />
                <h3 className="text-xl font-bold text-white font-serif">No vehicles match your criteria</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Try adjusting your filters or search query to find available pre-owned vehicles.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-lg bg-[#E51937] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-[#141417] h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#222226]">
              <h2 className="text-white font-serif font-bold text-lg">Filters</h2>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <button
              onClick={() => {
                handleClearFilters();
                setMobileFilterOpen(false);
              }}
              className="w-full py-2 bg-[#1C1C22] border border-[#2A2A32] text-xs text-white rounded-lg"
            >
              Reset All Filters
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-[#E51937] text-white font-bold text-xs uppercase rounded-lg"
            >
              Apply & View ({cars.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrowseCarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0C] p-8 text-white">Loading inventory...</div>}>
      <InventoryContent />
    </Suspense>
  );
}
