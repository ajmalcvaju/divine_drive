import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  FileText, 
  MessageCircle, 
  Phone, 
  CheckCircle, 
  ArrowLeft 
} from 'lucide-react';
import { getCarBySlug, getCars } from '@/lib/firebase/cars';
import { formatPrice, formatMileage, DEFAULT_DEALERSHIP_SETTINGS } from '@/lib/utils';
import CarCard from '@/components/cars/CarCard';
import CarGalleryViewer from './CarGalleryViewer';
import EnquiryModalForm from './EnquiryModalForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) {
    return { title: 'Vehicle Not Found | Divine Drive' };
  }

  const title = `${car.year} ${car.make} ${car.model} ${car.variant} | Divine Drive Kozhikode`;
  const description = `Certified pre-owned ${car.make} ${car.model} (${car.year}) available at Divine Drive. Price: ${formatPrice(car.price)}, Mileage: ${formatMileage(car.mileage)}. Certified flood-free.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: car.primaryImage || car.imageUrls[0] }],
    },
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const allCars = await getCars({ status: 'published' });
  const similarCars = allCars.filter(c => c.slug !== car.slug && (c.make === car.make || c.bodyType === car.bodyType)).slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hi Divine Drive, I am interested in the ${car.year} ${car.make} ${car.model} ${car.variant} listed for ${formatPrice(car.price)}. Please share more details and test drive availability.`
  );

  // JSON-LD Vehicle Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${car.year} ${car.make} ${car.model} ${car.variant}`,
    image: car.imageUrls,
    description: car.description,
    vehicleConfiguration: car.variant,
    brand: { '@type': 'Brand', name: car.make },
    model: car.model,
    modelDate: car.year,
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.mileage,
      unitCode: 'KMT',
    },
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'INR',
      availability: car.availability === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'Divine Drive',
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] py-10 px-4 sm:px-6 lg:px-8">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Back navigation */}
        <Link
          href="/cars"
          className="inline-flex items-center text-xs font-semibold text-gray-400 hover:text-[#E51937] transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Inventory
        </Link>

        {/* Top Header & Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Interactive Multi-Photo Gallery */}
          <div className="lg:col-span-7">
            <CarGalleryViewer images={car.imageUrls} carTitle={`${car.make} ${car.model}`} />
          </div>

          {/* Right Column: Title, Price & Quick Contact Actions */}
          <div className="lg:col-span-5 bg-[#141417] p-8 rounded-2xl border border-[#232328] flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E51937]/10 text-[#E51937] text-[11px] font-bold uppercase tracking-wider">
                    {car.availability}
                  </span>
                  <span className="text-xs text-gray-400">• Certified Pre-Owned</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight mt-2">
                  {car.make} {car.model}
                </h1>
                <p className="text-gray-400 text-sm mt-1">{car.variant}</p>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-xl bg-[#1C1C22] border border-[#2A2A32] flex justify-between items-baseline">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Selling Price</p>
                  <p className="text-3xl font-extrabold text-[#E51937] font-serif">
                    {formatPrice(car.price)}
                  </p>
                </div>
                {car.negotiable && (
                  <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md font-semibold">
                    Negotiable
                  </span>
                )}
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-[#18181C] border border-[#222228] flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#E51937]" />
                  <div>
                    <p className="text-gray-400">Year</p>
                    <p className="font-bold text-white text-sm">{car.year}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#18181C] border border-[#222228] flex items-center space-x-3">
                  <Gauge className="w-5 h-5 text-[#E51937]" />
                  <div>
                    <p className="text-gray-400">Mileage</p>
                    <p className="font-bold text-white text-sm">{formatMileage(car.mileage)}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#18181C] border border-[#222228] flex items-center space-x-3">
                  <Fuel className="w-5 h-5 text-[#E51937]" />
                  <div>
                    <p className="text-gray-400">Fuel Type</p>
                    <p className="font-bold text-white text-sm">{car.fuelType}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#18181C] border border-[#222228] flex items-center space-x-3">
                  <Settings2 className="w-5 h-5 text-[#E51937]" />
                  <div>
                    <p className="text-gray-400">Transmission</p>
                    <p className="font-bold text-white text-sm">{car.transmission}</p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 flex items-center space-x-3 text-xs text-red-200">
                <ShieldCheck className="w-6 h-6 text-[#E51937] shrink-0" />
                <span>Verified 100% Flood-Free & Non-Accidental Vehicle with Complete Documentation.</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3 pt-6 border-t border-[#222226]">
              <a
                href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#E51937] hover:bg-[#C4122C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Enquire via WhatsApp</span>
              </a>

              <a
                href={`tel:${DEFAULT_DEALERSHIP_SETTINGS.phone}`}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1C1C22] border border-[#2D2D35] hover:border-gray-500 text-gray-200 font-semibold text-xs tracking-wide flex items-center justify-center space-x-2 transition"
              >
                <Phone className="w-4 h-4 text-gray-400" />
                <span>Call Dealership ({DEFAULT_DEALERSHIP_SETTINGS.phone})</span>
              </a>

              <EnquiryModalForm carId={car.id || ''} carName={`${car.year} ${car.make} ${car.model}`} />
            </div>
          </div>
        </div>

        {/* Detailed Specs & Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview / Specs Table */}
            <div className="bg-[#141417] p-8 rounded-2xl border border-[#232328] space-y-6">
              <h2 className="text-xl font-bold text-white font-serif border-b border-[#222226] pb-4">
                Vehicle Specifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex justify-between py-2 border-b border-[#1E1E22]">
                  <span className="text-gray-400">Make</span>
                  <span className="font-semibold text-white">{car.make}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-[#1E1E22]">
                  <span className="text-gray-400">Model</span>
                  <span className="font-semibold text-white">{car.model}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-[#1E1E22]">
                  <span className="text-gray-400">Manufacturing Year</span>
                  <span className="font-semibold text-white">{car.year}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-[#1E1E22]">
                  <span className="text-gray-400">Registration Location</span>
                  <span className="font-semibold text-white">{car.registrationLocation}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-[#1E1E22]">
                  <span className="text-gray-400">Ownership</span>
                  <span className="font-semibold text-white">{car.ownershipCount} Owner</span>
                </div>

                <div className="flex justify-between py-2 border-b border-[#1E1E22]">
                  <span className="text-gray-400">Body Type</span>
                  <span className="font-semibold text-white">{car.bodyType}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-[#1E1E22]">
                  <span className="text-gray-400">Exterior Color</span>
                  <span className="font-semibold text-white">{car.colour}</span>
                </div>

                {car.engineCapacity && (
                  <div className="flex justify-between py-2 border-b border-[#1E1E22]">
                    <span className="text-gray-400">Engine</span>
                    <span className="font-semibold text-white">{car.engineCapacity}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features & Options */}
            {car.features && car.features.length > 0 && (
              <div className="bg-[#141417] p-8 rounded-2xl border border-[#232328] space-y-6">
                <h2 className="text-xl font-bold text-white font-serif border-b border-[#222226] pb-4">
                  Key Features & Equipment
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {car.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-sm text-gray-200">
                      <CheckCircle className="w-4 h-4 text-[#E51937] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-[#141417] p-8 rounded-2xl border border-[#232328] space-y-4">
              <h2 className="text-xl font-bold text-white font-serif border-b border-[#222226] pb-4">
                Vehicle Overview
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {car.description}
              </p>
            </div>
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarCars.length > 0 && (
          <div className="pt-12 border-t border-[#1F1F24] space-y-6">
            <h2 className="text-2xl font-bold text-white font-serif">Similar Vehicles You May Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarCars.map((simCar) => (
                <CarCard key={simCar.id || simCar.slug} car={simCar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
