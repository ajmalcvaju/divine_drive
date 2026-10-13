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
  ArrowLeft,
  ArrowRight,
  Banknote,
  Wrench
} from 'lucide-react';
import { getCarBySlug, getCars } from '@/lib/firebase/cars';
import { formatPrice, formatMileage, DEFAULT_DEALERSHIP_SETTINGS, isKeralaRegistered, calculateEstimatedEmi } from '@/lib/utils';
import CarCard from '@/components/cars/CarCard';
import CarGalleryViewer from './CarGalleryViewer';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';
import EnquiryModalForm from './EnquiryModalForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const cars = await getCars({ status: 'published' });
    if (cars && cars.length > 0) {
      return cars.map((car) => ({
        slug: car.slug,
      }));
    }
  } catch (e) {
    console.error('Error fetching cars for static params:', e);
  }
  return [{ slug: 'featured' }];
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
              <div className="p-5 rounded-2xl bg-[#151515] border border-[#26262B] flex justify-between items-baseline shadow-lg">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-medium">Selling Price</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#C8AD78] font-serif tracking-tight mt-0.5">
                    {formatPrice(car.price)}
                  </p>
                </div>
                {car.negotiable && (
                  <span className="text-xs text-[#C8AD78] bg-[#C8AD78]/10 border border-[#C8AD78]/25 px-2.5 py-1 rounded-md font-semibold">
                    Negotiable
                  </span>
                )}
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#151515] border border-[#26262B] flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#C8AD78]" />
                  <div>
                    <p className="text-gray-400">Year</p>
                    <p className="font-bold text-white text-sm">{car.year}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#151515] border border-[#26262B] flex items-center space-x-3">
                  <Gauge className="w-5 h-5 text-[#C8AD78]" />
                  <div>
                    <p className="text-gray-400">Mileage</p>
                    <p className="font-bold text-white text-sm">{formatMileage(car.mileage)}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#151515] border border-[#26262B] flex items-center space-x-3">
                  <Fuel className="w-5 h-5 text-[#C8AD78]" />
                  <div>
                    <p className="text-gray-400">Fuel Type</p>
                    <p className="font-bold text-white text-sm">{car.fuelType}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#151515] border border-[#26262B] flex items-center space-x-3">
                  <Settings2 className="w-5 h-5 text-[#C8AD78]" />
                  <div>
                    <p className="text-gray-400">Transmission</p>
                    <p className="font-bold text-white text-sm">{car.transmission}</p>
                  </div>
                </div>
              </div>

              {/* Kerala Registered Vehicle EMI Card */}
              {isKeralaRegistered(car.registrationLocation) ? (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#18181C] via-[#151518] to-[#121215] border border-[#C8AD78]/30 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#C8AD78]/10 border border-[#C8AD78]/30 flex items-center justify-center text-[#C8AD78] shrink-0">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          EMI for Kerala (KL) Registered Cars
                        </p>
                        <p className="text-[10px] text-[#C8AD78] font-medium">Up to 80%–90% bank funding available</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#C8AD78] font-sans bg-[#C8AD78]/10 border border-[#C8AD78]/30 px-2.5 py-1 rounded-lg">
                      Est. ₹{calculateEstimatedEmi(car.price).toLocaleString('en-IN')}/m*
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    Easy used car loan options with major Kerala banks &amp; NBFCs. Low interest rates with flexible 1–5 year tenure.
                  </p>

                  <a
                    href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}?text=${encodeURIComponent(`Hi Divine Drives, I am interested in checking EMI / loan eligibility for the ${car.year} ${car.make} ${car.model} (${car.registrationLocation}) priced at ${formatPrice(car.price)} with estimated EMI of ₹${calculateEstimatedEmi(car.price).toLocaleString('en-IN')}/month.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#1C1C22] hover:bg-[#25252D] border border-[#C8AD78]/40 text-[#C8AD78] text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow"
                  >
                    <span>Check EMI Eligibility via WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#151515] border border-[#26262B] text-xs text-gray-300 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-xs">Easy EMI / Financing Options</p>
                    <p className="text-[11px] text-gray-400">Available across Kerala with flexible tenures</p>
                  </div>
                  <span className="text-xs font-bold text-[#C8AD78] bg-[#C8AD78]/10 border border-[#C8AD78]/30 px-2 py-0.5 rounded">
                    Est. ₹{calculateEstimatedEmi(car.price).toLocaleString('en-IN')}/m*
                  </span>
                </div>
              )}

              {/* 1 Month Engine & Gearbox Warranty Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#18181C] via-[#151518] to-[#121215] border border-[#C8AD78]/30 space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#C8AD78]/10 border border-[#C8AD78]/30 flex items-center justify-center text-[#C8AD78] shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-wider">
                        1-Month Engine &amp; Gearbox Warranty
                      </p>
                      <p className="text-[10px] text-gray-400">Mechanical peace of mind included</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C8AD78] text-[#151515]">
                    Included
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-gray-300 pt-1.5 border-t border-white/5">
                  <ShieldCheck className="w-4 h-4 text-[#C8AD78] shrink-0" />
                  <span>100% Flood-Free &amp; Non-Accidental Certified with Complete Documentation.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3 pt-6 border-t border-[#222227]">
              <a
                href={`https://wa.me/${DEFAULT_DEALERSHIP_SETTINGS.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-xl bg-[#C8AD78] hover:bg-[#B89C67] text-[#151515] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#151515]" />
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
