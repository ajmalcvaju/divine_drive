'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, Play, X } from 'lucide-react';
import { GalleryItem, MediaCategory } from '@/types';
import { getGalleryItems } from '@/lib/firebase/gallery';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Deliveries', 'Showroom', 'Walkaround', 'Events'];

  useEffect(() => {
    async function loadGallery() {
      const data = await getGalleryItems(activeCategory);
      setItems(data);
    }
    loadGallery();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#0B0B0C] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#E51937] uppercase tracking-[0.2em]">
            SHOWROOM & DELIVERIES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
            Our Gallery
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Explore moments of joy, customer vehicle handovers, and inside tours of our Kozhikode showroom.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat
                  ? 'bg-[#E51937] text-white shadow-lg shadow-red-950/30'
                  : 'bg-[#141417] text-gray-400 border border-[#232328] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#141417] border border-[#232328] cursor-pointer hover:border-[#E51937]/50 transition-all duration-300 shadow-xl"
              >
                <Image
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Badge Icon */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase border border-white/10 flex items-center space-x-1">
                    {item.mediaType === 'video' ? (
                      <Play className="w-3 h-3 text-[#E51937] fill-[#E51937]" />
                    ) : (
                      <Camera className="w-3 h-3 text-[#E51937]" />
                    )}
                    <span>{item.category}</span>
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="text-white font-serif font-bold text-base line-clamp-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-gray-300 mt-1 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#141417] rounded-2xl border border-[#232328]">
            <p className="text-gray-400 text-sm">No media items in this category yet.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-3 text-white hover:text-[#E51937] transition"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="max-w-4xl w-full space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#141417] border border-[#232328]">
                <Image src={selectedItem.mediaUrl} alt={selectedItem.title} fill className="object-contain" />
              </div>
              <div className="text-left bg-[#141417] p-4 rounded-xl border border-[#232328]">
                <h3 className="text-xl font-serif font-bold text-white">{selectedItem.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
