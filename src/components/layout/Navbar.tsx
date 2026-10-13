'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide public navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cars', label: 'Inventory' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#111113]/95 backdrop-blur-md border-b border-[#222227]">
      {/* Top Banner Row matching reference screenshot 2 */}
      <div className="bg-[#151515] border-b border-[#222227] text-xs text-gray-400 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-[#C8AD78] font-medium bg-[#C8AD78]/10 border border-[#C8AD78]/20 px-2 py-0.5 rounded-full text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8AD78] mr-1.5 animate-pulse" />
              Since 2016 • Kozhikode, Kerala
            </span>
            <span className="text-gray-500">|</span>
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#C8AD78]" />
              Certified Pre-Owned Vehicles with Complete History Verification
            </span>
          </div>

          <div className="flex items-center space-x-6 text-gray-300">
            <a href={`tel:${DEFAULT_DEALERSHIP_SETTINGS.phone}`} className="flex items-center hover:text-[#C8AD78] transition">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#C8AD78]" />
              {DEFAULT_DEALERSHIP_SETTINGS.phone}
            </a>
            <div className="flex items-center space-x-3 text-gray-400">
              <a href={DEFAULT_DEALERSHIP_SETTINGS.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={DEFAULT_DEALERSHIP_SETTINGS.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center py-1 group shrink-0">
          <div className="relative h-11 md:h-12 w-36 sm:w-44 flex items-center">
            <Image
              src="/logo-white.png"
              alt="Divine Drive - Premium Pre-Owned Cars"
              fill
              sizes="(max-width: 768px) 150px, 180px"
              className="object-contain object-left transition-transform duration-200 group-hover:scale-105"
              priority
              unoptimized
            />
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-[#C8AD78] font-semibold' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}?text=${encodeURIComponent('Hi Divine Drives, I am looking for a certified pre-owned car.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 rounded-lg bg-[#C8AD78] text-[#151515] font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-[#B89C67] transition"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2 fill-[#151515]" />
            WhatsApp Us
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#141417] transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#151515] border-b border-[#222227] px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2.5 px-3 rounded-lg text-base font-medium ${
                pathname === link.href ? 'bg-[#C8AD78]/10 text-[#C8AD78]' : 'text-gray-300 hover:bg-[#1E1E23]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#222227]">
            <a
              href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 rounded-lg bg-[#C8AD78] text-[#151515] font-bold text-sm shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2 fill-[#151515]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
