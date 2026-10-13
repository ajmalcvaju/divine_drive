import { MapPin, Navigation, ExternalLink, Clock, Phone } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function LocationSection() {
  return (
    <section className="py-20 bg-[#151515] border-b border-[#222227] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#C8AD78] uppercase tracking-[0.2em] block">
            VISIT OUR SHOWROOM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
            Location &amp; Showroom Details
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Conveniently situated in South Koduvally on the Calicut – Wayanad National Highway route
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Dark Google Map Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#242429] bg-[#111113] min-h-[380px] relative shadow-2xl">
            <iframe
              title="Divine Drives Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.8155507834867!2d75.89675246823698!3d11.348179223745179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6437b1fe9fe0f%3A0x197b5bdca1d8f2c6!2sDivine%20Drive!5e0!3m2!1sen!2sin!4v1791874337732!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Right: Address Info Card */}
          <div className="lg:col-span-5 bg-[#111113] border border-[#242429] rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#C8AD78]/10 border border-[#C8AD78]/30 flex items-center justify-center text-[#C8AD78] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">{DEFAULT_DEALERSHIP_SETTINGS.name}</h3>
                  <p className="text-sm text-gray-300 mt-1 leading-snug">
                    {DEFAULT_DEALERSHIP_SETTINGS.address}
                  </p>
                </div>
              </div>

              {/* Google Plus Code Badge */}
              <div className="bg-[#151515] p-4 rounded-xl border border-[#26262B]">
                <p className="text-xs text-gray-400 font-medium">Google Plus Code</p>
                <p className="text-sm font-mono font-bold text-[#C8AD78] mt-1">{DEFAULT_DEALERSHIP_SETTINGS.plusCode}</p>
              </div>

              {/* Working Hours */}
              <div className="space-y-2 pt-2 border-t border-[#222227]">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Clock className="w-4 h-4 text-[#C8AD78]" />
                  <span className="font-semibold text-gray-200">Showroom Hours</span>
                </div>
                <div className="text-xs text-gray-300 pl-6 space-y-1">
                  <p>{DEFAULT_DEALERSHIP_SETTINGS.businessHours.weekdays}</p>
                  <p className="text-gray-500">{DEFAULT_DEALERSHIP_SETTINGS.businessHours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#222227] grid grid-cols-2 gap-3">
              <a
                href={DEFAULT_DEALERSHIP_SETTINGS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#1C1C22] border border-[#2A2A32] hover:border-[#C8AD78] text-white text-xs font-bold tracking-wide uppercase flex items-center justify-center space-x-1.5 transition"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C8AD78]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] text-xs font-bold tracking-wide uppercase flex items-center justify-center space-x-1.5 transition shadow-md"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#151515]" />
                <span>Contact Sales</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
