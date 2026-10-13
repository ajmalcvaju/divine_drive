'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarGalleryViewerProps {
  images: string[];
  carTitle: string;
}

export default function CarGalleryViewer({ images, carTitle }: CarGalleryViewerProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/10] bg-[#141417] rounded-2xl border border-[#232328] flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  const prevImage = () => {
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Active Image Display */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#141417] border border-[#232328] group shadow-2xl">
        <Image
          src={images[activeIdx]}
          alt={`${carTitle} photo ${activeIdx + 1}`}
          fill
          className="object-cover transition-all duration-300"
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Fullscreen Expand Trigger */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-white hover:bg-[#C8AD78] hover:text-[#151515] transition opacity-80 group-hover:opacity-100"
          aria-label="View Fullscreen Lightbox"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Previous / Next Overlay Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[#C8AD78] hover:text-[#151515] transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-[#C8AD78] hover:text-[#151515] transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                activeIdx === idx ? 'border-[#C8AD78] ring-2 ring-[#C8AD78]/40' : 'border-[#26262B] opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white hover:text-[#C8AD78] transition"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full max-w-5xl aspect-[16/10]">
            <Image src={images[activeIdx]} alt="Full view" fill className="object-contain" />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white hover:text-[#C8AD78] transition"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white hover:text-[#C8AD78] transition"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
