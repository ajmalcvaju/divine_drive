'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Car, Inbox, Image as ImageIcon, Plus, CheckCircle, Tag, Eye } from 'lucide-react';
import { getCars } from '@/lib/firebase/cars';
import { getGalleryItems } from '@/lib/firebase/gallery';
import { getEnquiries } from '@/lib/firebase/enquiries';
import { Car as CarType, Enquiry, GalleryItem } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [cData, gData, eData] = await Promise.all([
        getCars({ status: 'published' }),
        getGalleryItems(),
        getEnquiries(),
      ]);
      setCars(cData);
      setGallery(gData);
      setEnquiries(eData);
      setLoading(false);
    }
    loadData();
  }, []);

  const totalCars = cars.length;
  const availableCars = cars.filter(c => c.availability === 'available').length;
  const reservedCars = cars.filter(c => c.availability === 'reserved').length;
  const soldCars = cars.filter(c => c.availability === 'sold').length;
  const featuredCars = cars.filter(c => c.isFeatured).length;
  const newEnquiries = enquiries.filter(e => e.status === 'new').length;

  return (
    <div className="space-y-8">
      {/* Top Welcome & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#222226] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time analytics and inventory status for Divine Drive Kozhikode
          </p>
        </div>

        <Link
          href="/admin/cars/new"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2.5 rounded-xl bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Vehicle
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#141417] p-5 rounded-2xl border border-[#232328] space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-semibold">Total Cars</span>
            <Car className="w-4 h-4 text-[#E51937]" />
          </div>
          <p className="text-3xl font-extrabold text-white font-serif">{totalCars}</p>
          <p className="text-[11px] text-gray-500">{availableCars} Available</p>
        </div>

        <div className="bg-[#141417] p-5 rounded-2xl border border-[#232328] space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-semibold">Featured Listings</span>
            <Tag className="w-4 h-4 text-[#E51937]" />
          </div>
          <p className="text-3xl font-extrabold text-white font-serif">{featuredCars}</p>
          <p className="text-[11px] text-gray-500">Homepage Collection</p>
        </div>

        <div className="bg-[#141417] p-5 rounded-2xl border border-[#232328] space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-semibold">New Enquiries</span>
            <Inbox className="w-4 h-4 text-[#E51937]" />
          </div>
          <p className="text-3xl font-extrabold text-[#E51937] font-serif">{newEnquiries}</p>
          <p className="text-[11px] text-gray-500">{enquiries.length} Total Leads</p>
        </div>

        <div className="bg-[#141417] p-5 rounded-2xl border border-[#232328] space-y-2">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-semibold">Gallery Items</span>
            <ImageIcon className="w-4 h-4 text-[#E51937]" />
          </div>
          <p className="text-3xl font-extrabold text-white font-serif">{gallery.length}</p>
          <p className="text-[11px] text-gray-500">Photos & Videos</p>
        </div>
      </div>

      {/* Recent Inventory Table */}
      <div className="bg-[#141417] rounded-2xl border border-[#232328] overflow-hidden p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-[#222226] pb-4">
          <h2 className="text-lg font-bold text-white font-serif">Recent Inventory Listings</h2>
          <Link href="/admin/cars" className="text-xs text-[#E51937] hover:underline">
            Manage All Inventory →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#1C1C22] text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Year</th>
                <th className="p-3">Price</th>
                <th className="p-3">Availability</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222226]">
              {cars.slice(0, 5).map((car) => (
                <tr key={car.id || car.slug} className="hover:bg-[#18181D]">
                  <td className="p-3 font-semibold text-white">
                    {car.make} {car.model} {car.variant}
                  </td>
                  <td className="p-3">{car.year}</td>
                  <td className="p-3 font-bold text-[#E51937]">{formatPrice(car.price)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-[10px] uppercase font-bold">
                      {car.availability}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href={`/admin/cars/${car.id}/edit`}
                      className="px-3 py-1 bg-[#1C1C22] border border-[#2A2A32] text-gray-200 rounded hover:border-[#E51937] transition"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Customer Enquiries */}
      <div className="bg-[#141417] rounded-2xl border border-[#232328] overflow-hidden p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-[#222226] pb-4">
          <h2 className="text-lg font-bold text-white font-serif">Recent Leads & Enquiries</h2>
          <Link href="/admin/enquiries" className="text-xs text-[#E51937] hover:underline">
            View All CRM Enquiries →
          </Link>
        </div>

        <div className="space-y-3">
          {enquiries.slice(0, 3).map((enq) => (
            <div key={enq.id} className="p-4 rounded-xl bg-[#1C1C22] border border-[#222228] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <p className="font-bold text-white text-sm">{enq.customerName} ({enq.phone})</p>
                <p className="text-xs text-[#E51937] mt-0.5">{enq.carName || 'General Enquiry'}</p>
                {enq.message && <p className="text-xs text-gray-400 mt-1">&quot;{enq.message}&quot;</p>}
              </div>
              <span className="px-3 py-1 rounded-full bg-red-950/30 border border-red-900/40 text-[#E51937] text-[10px] font-bold uppercase self-start sm:self-auto">
                {enq.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
