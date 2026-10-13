'use client';

import { usePathname } from 'next/navigation';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function FloatingWhatsapp() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}?text=${encodeURIComponent(
    'Hi Divine Drive, I am interested in purchasing a pre-owned car from your inventory.'
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Divine Drive on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#E51937] text-white flex items-center justify-center shadow-xl shadow-red-950/50 hover:bg-[#C4122C] hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-[#E51937]/20 group"
    >
      <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-white transform group-hover:rotate-12 transition-transform duration-300" />
      <span className="absolute right-16 bg-[#141417] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#232328] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Instant WhatsApp Chat
      </span>
    </a>
  );
}
