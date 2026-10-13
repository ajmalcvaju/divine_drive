'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Car } from '@/types';
import { formatPrice, formatMileage, formatTransmission, isKeralaRegistered, calculateEstimatedEmi } from '@/lib/utils';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  // Format brand tag for top left badge
  const brandTag = car.make.toUpperCase();

  return (
    <div className="group bg-[#151515] rounded-[22px] p-3.5 border border-[#242429] hover:border-[#C8AD78]/60 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Top Image Container */}
      <div>
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#101012] flex items-center justify-center">
          {(car.primaryImage || (car.imageUrls && car.imageUrls.length > 0)) ? (
            <Image
              src={car.primaryImage || car.imageUrls[0]}
              alt={`${car.make} ${car.model} ${car.variant}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-[#1C1C22] border border-[#2A2A32] flex items-center justify-center p-2 mb-2">
                <Image
                  src="/logo-icon.png"
                  alt="Divine Drives"
                  width={24}
                  height={24}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-[11px] font-semibold text-gray-400">Photos Coming Soon</span>
            </div>
          )}

          {/* Top Left Brand Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 text-[10px] font-extrabold text-white uppercase tracking-wider rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-md">
              {brandTag}
            </span>
          </div>

          {/* Top Right Heart Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            aria-label="Add to favorites"
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? 'fill-[#C8AD78] text-[#C8AD78]' : 'text-gray-800'
              }`}
            />
          </button>

          {/* Availability overlay if reserved/sold */}
          {car.availability !== 'available' && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-10">
              <span className="px-4 py-1.5 rounded-md bg-[#C8AD78] text-[#151515] font-extrabold uppercase tracking-wider text-xs shadow-lg">
                {car.availability}
              </span>
            </div>
          )}
        </div>

        {/* Content Info Section */}
        <div className="px-1 pt-3.5 space-y-2">
          {/* Price & EMI Row */}
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-2xl font-extrabold text-white tracking-tight font-serif">
              {formatPrice(car.price)}
            </p>
            {isKeralaRegistered(car.registrationLocation) && (
              <span className="text-[11px] font-bold text-[#C8AD78] bg-[#C8AD78]/10 border border-[#C8AD78]/25 px-2 py-0.5 rounded-md whitespace-nowrap" title="Estimated EMI for Kerala Registered Vehicle">
                EMI ₹{calculateEstimatedEmi(car.price).toLocaleString('en-IN')}/m*
              </span>
            )}
          </div>

          {/* Title: Make, Model, Variant */}
          <h3 className="text-sm font-bold text-gray-100 tracking-tight line-clamp-1 font-sans">
            {car.make}, {car.model}{car.variant ? `, ${car.variant}` : ''}
          </h3>

          {/* Dark Pill Badges Specs Row */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-[#0D0D0F] border border-[#202025] text-[11px] font-bold text-gray-300">
              {formatMileage(car.mileage)}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#0D0D0F] border border-[#202025] text-[11px] font-bold text-gray-300">
              {car.fuelType}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#0D0D0F] border border-[#202025] text-[11px] font-bold text-gray-300">
              {formatTransmission(car.transmission)}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#0D0D0F] border border-[#202025] text-[11px] font-bold text-gray-300">
              {car.year}
            </span>
            {isKeralaRegistered(car.registrationLocation) && (
              <span className="px-2 py-1 rounded-md bg-[#C8AD78]/10 border border-[#C8AD78]/20 text-[10px] font-bold text-[#C8AD78]">
                KL Reg • EMI
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Action Button */}
      <div className="pt-4">
        <Link
          href={`/cars/${car.slug}`}
          className="w-full py-3 rounded-xl bg-[#0D0D0F] border border-[#26262B] text-gray-200 font-bold text-xs uppercase tracking-wider hover:bg-[#C8AD78] hover:text-[#151515] hover:border-[#C8AD78] transition-all duration-300 text-center block shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
