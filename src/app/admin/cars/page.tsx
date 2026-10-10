'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit3, Trash2, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { Car } from '@/types';
import { getCars, deleteCar, saveCar } from '@/lib/firebase/cars';
import { formatPrice } from '@/lib/utils';

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCars = async () => {
    setLoading(true);
    const data = await getCars();
    setCars(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (confirm('Are you sure you want to delete this vehicle listing permanently?')) {
      await deleteCar(id);
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  const toggleFeatured = async (car: Car) => {
    if (!car.id) return;
    const updated = !car.isFeatured;
    await saveCar({ isFeatured: updated }, car.id);
    setCars(prev => prev.map(c => c.id === car.id ? { ...c, isFeatured: updated } : c));
  };

  const filteredCars = cars.filter(c =>
    `${c.make} ${c.model} ${c.variant}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#222226] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Vehicle Inventory Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Create, edit, publish, or remove car listings for Divine Drive.
          </p>
        </div>

        <Link
          href="/admin/cars/new"
          className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Link>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search by make or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#141417] border border-[#232328] text-white text-xs rounded-xl pl-9 pr-3 py-3 focus:outline-none focus:border-[#E51937]"
        />
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
      </div>

      {/* Inventory Table */}
      <div className="bg-[#141417] rounded-2xl border border-[#232328] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#1C1C22] text-gray-400 uppercase tracking-wider border-b border-[#222226]">
              <tr>
                <th className="p-4">Car Details</th>
                <th className="p-4">Year</th>
                <th className="p-4">Price</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222226]">
              {filteredCars.map((car) => (
                <tr key={car.id || car.slug} className="hover:bg-[#18181D] transition">
                  <td className="p-4 font-semibold text-white">
                    <div>
                      <p className="text-sm">{car.make} {car.model}</p>
                      <p className="text-[11px] text-gray-400">{car.variant}</p>
                    </div>
                  </td>
                  <td className="p-4">{car.year}</td>
                  <td className="p-4 font-bold text-[#E51937]">{formatPrice(car.price)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleFeatured(car)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition ${
                        car.isFeatured ? 'bg-red-950/50 text-[#E51937] border border-red-900/50' : 'bg-[#1C1C22] text-gray-400 border border-[#2A2A32]'
                      }`}
                    >
                      {car.isFeatured ? 'Featured★' : 'Standard'}
                    </button>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-[10px] uppercase font-bold">
                      {car.availability}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/cars/${car.slug}`}
                      target="_blank"
                      className="p-2 rounded bg-[#1C1C22] text-gray-300 hover:text-white inline-block"
                      title="Preview Page"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/cars/${car.id}/edit`}
                      className="p-2 rounded bg-[#1C1C22] text-gray-300 hover:text-white inline-block"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="p-2 rounded bg-red-950/40 text-red-400 hover:text-red-300 inline-block"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
