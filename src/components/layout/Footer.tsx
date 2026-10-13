'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Clock } from 'lucide-react';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#0D0D0F] text-gray-400 border-t border-[#222227] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1E1E24]">
          {/* Brand & Description Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <div className="relative h-11 w-40 flex items-center">
                <Image
                  src="/logo-white.png"
                  alt="Divine Drives - Premium Pre-Owned Cars"
                  fill
                  sizes="160px"
                  className="object-contain object-left transition-transform group-hover:scale-105"
                  unoptimized
                />
              </div>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Your trusted destination for premium pre-owned vehicles in Kozhikode since 2016. Certified flood-free and non-accidental cars backed by engine &amp; gearbox warranty assurance and transparent ownership transfer.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={DEFAULT_DEALERSHIP_SETTINGS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#151515] border border-[#26262B] flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C8AD78] hover:bg-[#C8AD78]/10 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={DEFAULT_DEALERSHIP_SETTINGS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#151515] border border-[#26262B] flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C8AD78] hover:bg-[#C8AD78]/10 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            {/* Google Plus Code Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#151515] border border-[#26262B] text-xs text-gray-300">
                <span className="text-gray-500">Google Plus Code:</span>
                <span className="font-mono font-semibold text-[#C8AD78]">{DEFAULT_DEALERSHIP_SETTINGS.plusCode}</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-white font-serif text-lg font-bold tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#C8AD78] transition">Home</Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-[#C8AD78] transition">Inventory</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C8AD78] transition">Gallery</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C8AD78] transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C8AD78] transition">Contact Us</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-[#C8AD78] transition text-xs text-gray-500 pt-2 block">Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-white font-serif text-lg font-bold tracking-wide">Contact Us</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#C8AD78] mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-300 leading-snug">
                  {DEFAULT_DEALERSHIP_SETTINGS.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[#C8AD78] mr-3 shrink-0" />
                <a href={`tel:${DEFAULT_DEALERSHIP_SETTINGS.phone}`} className="text-gray-300 hover:text-[#C8AD78] transition font-medium">
                  {DEFAULT_DEALERSHIP_SETTINGS.phone}
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="w-5 h-5 text-[#C8AD78] mr-3 mt-0.5 shrink-0" />
                <div className="text-gray-300">
                  <p>{DEFAULT_DEALERSHIP_SETTINGS.businessHours.weekdays}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{DEFAULT_DEALERSHIP_SETTINGS.businessHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Divine Drives. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
