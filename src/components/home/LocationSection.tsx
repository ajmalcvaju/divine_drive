import { MapPin, Navigation, ExternalLink, Clock } from 'lucide-react';
import { DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';

export default function LocationSection() {
  return (
    <section className="py-20 bg-[#0B0B0C] border-t border-[#1F1F24] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#E51937] uppercase tracking-[0.2em]">
            VISIT US
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight mt-2">
            Our Location
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Visit our showroom to explore our premium collection of pre-owned vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Dark Google Map Embed matching Screenshots 9 & 10 */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#232328] bg-[#141417] min-h-[350px] relative shadow-2xl">
            <iframe
              title="Divine Drive Location Map"
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

          {/* Right: Address Info Card matching Screenshots 9 & 10 */}
          <div className="lg:col-span-5 bg-[#141417] border border-[#232328] rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#E51937]/10 border border-[#E51937]/30 flex items-center justify-center text-[#E51937] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-serif">{DEFAULT_DEALERSHIP_SETTINGS.name}</h3>
                  <p className="text-sm text-gray-300 mt-1 leading-snug">
                    {DEFAULT_DEALERSHIP_SETTINGS.address}
                  </p>
                </div>
              </div>

              {/* Plus Code Badge */}
              <div className="bg-[#1C1C22] p-4 rounded-xl border border-[#2A2A32]">
                <p className="text-xs text-gray-400 font-medium">Google Plus Code</p>
                <p className="text-sm font-mono font-bold text-white mt-1">{DEFAULT_DEALERSHIP_SETTINGS.plusCode}</p>
              </div>

              {/* Working Hours */}
              <div className="space-y-2 pt-2 border-t border-[#222226]">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Clock className="w-4 h-4 text-[#E51937]" />
                  <span className="font-semibold text-gray-300">Working Hours</span>
                </div>
                <p className="text-sm font-semibold text-white pl-6">
                  {DEFAULT_DEALERSHIP_SETTINGS.businessHours.weekdays}
                </p>
                <p className="text-xs text-gray-400 pl-6">
                  {DEFAULT_DEALERSHIP_SETTINGS.businessHours.sunday}
                </p>
              </div>
            </div>

            {/* Action Buttons matching Screenshot 10 */}
            <div className="mt-8 space-y-3">
              <a
                href={DEFAULT_DEALERSHIP_SETTINGS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <Navigation className="w-4 h-4 fill-white" />
                <span>Get Directions</span>
              </a>

              <a
                href={DEFAULT_DEALERSHIP_SETTINGS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#1C1C22] border border-[#2D2D35] hover:border-gray-500 text-gray-200 font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
