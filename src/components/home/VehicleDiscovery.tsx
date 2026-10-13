'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

const MAKES = ['All Makes', 'Toyota', 'Mercedes-Benz', 'BMW', 'Audi', 'Mahindra', 'Hyundai', 'Honda', 'Kia'];
const BUDGETS = [
  { label: 'Any Budget', max: '' },
  { label: 'Under ₹10 Lakhs', max: '1000000' },
  { label: '₹10L - ₹25 Lakhs', max: '2500000' },
  { label: '₹25L - ₹50 Lakhs', max: '5000000' },
  { label: 'Above ₹50 Lakhs', max: '10000000' },
];
const FUELS = ['All Fuels', 'Petrol', 'Diesel', 'Hybrid', 'Electric'];
const TRANSMISSIONS = ['All Transmissions', 'Automatic', 'Manual'];

export default function VehicleDiscovery() {
  const router = useRouter();
  const [selectedMake, setSelectedMake] = useState('All Makes');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('All Fuels');
  const [selectedTransmission, setSelectedTransmission] = useState('All Transmissions');
  const [searchQuery, setSearchQuery] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (selectedMake !== 'All Makes') params.set('make', selectedMake);
    if (selectedBudget) params.set('maxPrice', selectedBudget);
    if (selectedFuel !== 'All Fuels') params.set('fuelType', selectedFuel);
    if (selectedTransmission !== 'All Transmissions') params.set('transmission', selectedTransmission);

    router.push(`/cars?${params.toString()}`);
  };

  const handleReset = () => {
    setSelectedMake('All Makes');
    setSelectedBudget('');
    setSelectedFuel('All Fuels');
    setSelectedTransmission('All Transmissions');
    setSearchQuery('');
  };

  return (
    <section className="py-16 bg-[#111113] border-b border-[#222227] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#151515] border border-[#26262B] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle gold line on top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8AD78] to-transparent opacity-60" />

          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#222227] gap-4">
            <div>
              <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
                INVENTORY SEARCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mt-1">
                Find Your Perfect Car
              </h2>
            </div>
            <p className="text-xs text-gray-400 max-w-sm">
              Filter by make, budget, transmission, or fuel to discover verified vehicles ready for immediate delivery in Kerala.
            </p>
          </div>

          <form onSubmit={handleApply} className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Keyword / Make Model Search */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Keyword</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Fortuner, Thar, C-Class"
                    className="w-full bg-[#111113] border border-[#2A2A30] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C8AD78] focus:ring-1 focus:ring-[#C8AD78]/30 transition"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Make Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Make</label>
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-[#111113] border border-[#2A2A30] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C8AD78] focus:ring-1 focus:ring-[#C8AD78]/30 transition"
                >
                  {MAKES.map((m) => (
                    <option key={m} value={m} className="bg-[#151515] text-white">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Budget Range</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full bg-[#111113] border border-[#2A2A30] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C8AD78] focus:ring-1 focus:ring-[#C8AD78]/30 transition"
                >
                  {BUDGETS.map((b) => (
                    <option key={b.label} value={b.max} className="bg-[#151515] text-white">
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Fuel Type</label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full bg-[#111113] border border-[#2A2A30] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C8AD78] focus:ring-1 focus:ring-[#C8AD78]/30 transition"
                >
                  {FUELS.map((f) => (
                    <option key={f} value={f} className="bg-[#151515] text-white">
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Transmission</label>
                <select
                  value={selectedTransmission}
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                  className="w-full bg-[#111113] border border-[#2A2A30] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C8AD78] focus:ring-1 focus:ring-[#C8AD78]/30 transition"
                >
                  {TRANSMISSIONS.map((t) => (
                    <option key={t} value={t} className="bg-[#151515] text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-wrap items-center justify-between pt-2 gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] font-extrabold text-xs tracking-wider uppercase transition shadow-lg flex items-center justify-center space-x-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>SEARCH VEHICLES</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
