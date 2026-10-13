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
      aria-label="Chat with Divine Drives on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#C8AD78] text-[#151515] flex items-center justify-center shadow-xl shadow-black/60 hover:bg-[#B89C67] hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-[#C8AD78]/25 group"
    >
      <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-[#151515] text-[#151515] transform group-hover:rotate-12 transition-transform duration-300" />
      <span className="absolute right-16 bg-[#151515] text-[#F7F5F0] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#26262B] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Instant WhatsApp Chat
      </span>
    </a>
  );
}
