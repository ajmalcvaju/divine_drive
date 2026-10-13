'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveCar } from '@/lib/firebase/cars';
import { Car } from '@/types';
import { CheckCircle2, Sparkles, Loader2, ArrowRight, Car as CarIcon } from 'lucide-react';

const QUEUED_CARS: Array<{ id: string; title: string; subtitle: string; data: Partial<Car> }> = [
  {
    id: 'innova-g-2014-grey',
    title: 'Toyota Innova 2.5 G (KL 71 M 9699)',
    subtitle: '2014 • Manual • 220,000 km • 2nd Owner • Re-Registration • Grey • ₹ 7.25 Lakh',
    data: {
      make: 'Toyota',
      model: 'Innova',
      variant: '2.5 G Manual (Facelift)',
      slug: 'toyota-innova-2-5-g-2014-grey-kl71',
      year: 2014,
      registrationYear: 2014,
      price: 725000, // 7.25 Lakh
      comparePrice: 760000,
      negotiable: true,
      mileage: 220000,
      fuelType: 'Diesel',
      transmission: 'Manual',
      bodyType: 'MUV',
      colour: 'Grey Metallic',
      engineCapacity: '2.5L D-4D Turbo Diesel',
      ownershipCount: 2, // 2nd Owner
      registrationLocation: 'KL-71 Nilambur / Kerala (Re-registration done)',
      insuranceExpiry: 'Valid',
      serviceHistory: 'Well Maintained with Periodic Service, Detailed History',
      description: '2014 Toyota Innova 2.5 G facelift in striking Grey Metallic. Kerala registration (KL 71 M 9699) with re-registration completed. Driven 2,20,000 km by 2nd owner. Excellent exterior styling with chrome grille, fog lamps, body side mouldings, and immaculate interior. Legendary 2.5L D-4D diesel engine known for effortless million-kilometer durability. Certified 100% flood-free and non-accidental.',
      features: [
        'KL 71 M 9699 Registration',
        'Re-Registration Done',
        'Chrome Front Facelift Grille',
        'Fog Lamps with Chrome Surrounds',
        'Dual AC with Individual Roof Vents',
        'Power Windows & Central Locking',
        'Power Steering & Tilt Adjust',
        'Legendary D-4D Diesel Engine',
        'Spacious 7/8 Seater Comfort'
      ],
      imageUrls: [],
      primaryImage: '',
      availability: 'available',
      isFeatured: true,
      status: 'published',
    }
  },
  {
    id: 'innova-g4-2013',
    title: 'Toyota Innova 2.5 G4',
    subtitle: '2013 • Manual • 240,000 km • Single Owner • Showroom Service • ₹ 7.10 Lakh (with Reg)',
    data: {
      make: 'Toyota',
      model: 'Innova',
      variant: '2.5 G4 (7/8-STR Manual)',
      slug: 'toyota-innova-2-5-g4-2013',
      year: 2013,
      registrationYear: 2013,
      price: 710000, // 7.10 Lakh
      comparePrice: 740000,
      negotiable: true,
      mileage: 240000,
      fuelType: 'Diesel',
      transmission: 'Manual',
      bodyType: 'MUV',
      colour: 'Silky Silver / White',
      engineCapacity: '2.5L D-4D Diesel',
      ownershipCount: 1, // Single Owner
      registrationLocation: 'Kerala (with Registration included)',
      insuranceExpiry: 'Valid',
      serviceHistory: 'Full Toyota Showroom Authorized Service History, Single Owner Driven',
      description: '2013 Toyota Innova 2.5 G4 in exceptional mechanical condition. Genuine single-owner vehicle with 100% authorized showroom service record. Renowned indestructible 2.5L D-4D diesel engine. Price of ₹ 7.10 Lakh includes registration transfer. Certified flood-free and non-accidental.',
      features: [
        'Single Owner',
        'Complete Showroom Service History',
        'Registration Included in Price',
        'Legendary D-4D Bulletproof Engine',
        'Dual AC with Rear Air Vents',
        'Power Windows all 4 Doors',
        'Central Locking',
        'Power Steering',
        'Spacious Family Comfort'
      ],
      imageUrls: [],
      primaryImage: '',
      availability: 'available',
      isFeatured: true,
      status: 'published',
    }
  },
  {
    id: 'innova-crysta-v-2019',
    title: 'Toyota Innova Crysta 2.4 V',
    subtitle: '2019 • Manual • 145,000 km • Single Owner • Original Kerala Reg • ₹ 19.85 Lakh',
    data: {
      make: 'Toyota',
      model: 'Innova Crysta',
      variant: '2.4 V 7-STR Manual',
      slug: 'toyota-innova-crysta-2-4-v-manual-2019',
      year: 2019,
      registrationYear: 2019,
      price: 1985000, // 19.85 Lakh
      comparePrice: 2050000,
      negotiable: true,
      mileage: 145000,
      fuelType: 'Diesel',
      transmission: 'Manual',
      bodyType: 'MUV',
      colour: 'Garnet Red / Pearl White',
      engineCapacity: '2.4L GD Diesel',
      ownershipCount: 1, // Single Owner
      registrationLocation: 'Original Kerala Registration (KL)',
      insuranceExpiry: 'Valid',
      serviceHistory: 'Single Owner, Authorized Toyota Dealer Maintained, Comprehensive History',
      description: '2019 Toyota Innova Crysta 2.4 V Manual in pristine condition. Single owner vehicle with original Kerala registration, driven 1,45,000 km. Top specification V trim with premium interior, touch display, push button start, and certified flood-free assurance.',
      features: [
        'Single Owner',
        'Original Kerala Registration (KL)',
        'Top V Trim with Push Button Start',
        'Automatic Climate Control',
        'Touchscreen Infotainment with Bluetooth',
        'Captain Seat Comfort Layout',
        'Alloy Wheels',
        'Dual Airbags, Side Airbags & ABS with EBD',
        'Power Folding Mirrors & Central Locking'
      ],
      imageUrls: [],
      primaryImage: '',
      availability: 'available',
      isFeatured: true,
      status: 'published',
    }
  },
  {
    id: 'innova-v-2013',
    title: 'Toyota Innova 2.5 V',
    subtitle: '2013 • Manual • 133,000 km • 3rd Owner • Kerala Reg • ₹ 7.15 Lakh',
    data: {
      make: 'Toyota',
      model: 'Innova',
      variant: '2.5 V (Top End)',
      slug: 'toyota-innova-2-5-v-2013',
      year: 2013,
      registrationYear: 2013,
      price: 715000, // 7.15 Lakh
      comparePrice: 750000,
      negotiable: true,
      mileage: 133000,
      fuelType: 'Diesel',
      transmission: 'Manual',
      bodyType: 'MUV',
      colour: 'Silver / Grey',
      engineCapacity: '2.5L D-4D Diesel',
      ownershipCount: 3,
      registrationLocation: 'KL Kerala Registration',
      insuranceExpiry: 'Valid',
      serviceHistory: 'Serviced with Complete Record',
      description: '2013 Toyota Innova 2.5 V top-end variant with Kerala registration. Driven 1,33,000 km. Known for legendary D-4D diesel reliability, excellent comfort, and durability. Certified non-accidental and flood-free.',
      features: [
        'Top End V Variant',
        'Kerala Registration',
        'Automatic Climate Control AC',
        'Captain Seats / 7-Seater',
        'Alloy Wheels',
        'Dual Airbags & ABS',
        'Power Windows & Central Locking',
        'Touchscreen Audio System'
      ],
      imageUrls: [],
      primaryImage: '',
      availability: 'available',
      isFeatured: true,
      status: 'published',
    }
  },
  {
    id: 'innova-crysta-2018',
    title: 'Toyota Innova Crysta G',
    subtitle: '2018 • Manual • 129,000 km • Single Owner • New Tyres • ₹ 11.90 Lakh (with NOC)',
    data: {
      make: 'Toyota',
      model: 'Innova Crysta',
      variant: '2.4 G 7-STR Manual',
      slug: 'toyota-innova-crysta-g-manual-2018',
      year: 2018,
      registrationYear: 2018,
      price: 1190000, // 11.90 Lakh
      comparePrice: 1250000,
      negotiable: true,
      mileage: 129000,
      fuelType: 'Diesel',
      transmission: 'Manual',
      bodyType: 'MUV',
      colour: 'Super White',
      engineCapacity: '2.4L GD Diesel',
      ownershipCount: 1, // Single Owner
      registrationLocation: 'Kerala (with NOC)',
      insuranceExpiry: 'Valid',
      serviceHistory: 'Single Owner, Regular Authorized Service, Complete History',
      description: '2018 Toyota Innova Crysta G Manual in exceptionally neat and clean condition. Single owner vehicle driven 1,29,000 km. Equipped with brand new tyres all around. Available at ₹ 11.90 Lakh with NOC provided. Flood-free and non-accidental verified.',
      features: [
        'Single Owner',
        'NOC Included',
        'Brand New Tyres Installed',
        'Super Neat & Clean Interior',
        'Dual Front Airbags & ABS with EBD',
        'Rear Air Conditioning Vents',
        'Power Windows & Central Locking',
        'Eco & Power Drive Modes',
        '7-Seater Comfort Layout'
      ],
      imageUrls: [],
      primaryImage: '',
      availability: 'available',
      isFeatured: true,
      status: 'published',
    }
  },
  {
    id: 'swift-vxi-2018',
    title: 'Maruti Suzuki Swift VXI',
    subtitle: '2018 • Automatic • 83,000 km • Single Owner • No Replacement • ₹ 5.45 Lakh',
    data: {
      make: 'Maruti Suzuki',
      model: 'Swift',
      variant: 'VXI Automatic',
      slug: 'maruti-suzuki-swift-vxi-automatic-2018',
      year: 2018,
      registrationYear: 2018,
      price: 545000, // 5.45 Lakh
      comparePrice: 575000,
      negotiable: true,
      mileage: 83000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Hatchback',
      colour: 'Silver White',
      engineCapacity: '1.2L K-Series Petrol',
      ownershipCount: 1,
      registrationLocation: 'Kerala',
      insuranceExpiry: 'Valid',
      serviceHistory: 'Single Ownership, No Replacement Certified, Full Company Service Record',
      description: '2018 Maruti Suzuki Swift VXI Automatic in immaculate condition. Single owner driven with verified 83,000 km. 100% non-accidental with zero body parts replacement. Certified flood-free and ready for delivery.',
      features: [
        'Single Ownership',
        'No Replacement Certified',
        'Automatic Transmission (AMT)',
        'Power Windows',
        'Central Locking',
        'Dual Airbags & ABS with EBD',
        'Power Steering',
        'Chilled AC'
      ],
      imageUrls: [],
      primaryImage: '',
      availability: 'available',
      isFeatured: true,
      status: 'published',
    }
  }
];

export default function AutoAddPage() {
  const router = useRouter();
  const [loadingCarId, setLoadingCarId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleAddCar = async (carEntry: typeof QUEUED_CARS[0]) => {
    setLoadingCarId(carEntry.id);
    setError('');
    try {
      await saveCar(carEntry.data);
      setAddedIds(prev => [...prev, carEntry.id]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || `Failed to add ${carEntry.title}`);
    } finally {
      setLoadingCarId(null);
    }
  };

  const handleAddAll = async () => {
    setError('');
    for (const carEntry of QUEUED_CARS) {
      if (!addedIds.includes(carEntry.id)) {
        setLoadingCarId(carEntry.id);
        try {
          await saveCar(carEntry.data);
          setAddedIds(prev => [...prev, carEntry.id]);
        } catch (err: any) {
          setError(err?.message || `Failed to add ${carEntry.title}`);
          break;
        }
      }
    }
    setLoadingCarId(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#E51937]/10 border border-[#E51937]/30 flex items-center justify-center text-[#E51937]">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold font-serif text-white">Prompt-to-Firebase Auto Adder</h1>
        <p className="text-xs text-gray-400">
          Click below to push these formatted vehicles directly to your Cloud Firestore database.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Car Cards to Add */}
      <div className="space-y-4">
        {QUEUED_CARS.map((carEntry) => {
          const isAdded = addedIds.includes(carEntry.id);
          const isLoading = loadingCarId === carEntry.id;

          return (
            <div
              key={carEntry.id}
              className="bg-[#141417] border border-[#232328] hover:border-[#33333d] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <CarIcon className="w-4 h-4 text-[#E51937]" />
                  <h3 className="font-bold text-white text-base font-serif">{carEntry.title}</h3>
                </div>
                <p className="text-xs text-gray-400">{carEntry.subtitle}</p>
              </div>

              <div>
                {isAdded ? (
                  <span className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-green-950/40 border border-green-800 text-green-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Firebase</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddCar(carEntry)}
                    disabled={Boolean(loadingCarId)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E51937] hover:bg-[#C4122C] text-white text-xs font-bold uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg shadow-red-950/30"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <span>Add into Firebase</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#232328]">
        <button
          onClick={handleAddAll}
          disabled={Boolean(loadingCarId) || addedIds.length === QUEUED_CARS.length}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-extrabold uppercase tracking-wider transition disabled:opacity-30"
        >
          Add All to Firebase
        </button>

        <button
          onClick={() => router.push('/cars')}
          className="text-xs text-gray-400 hover:text-white transition flex items-center space-x-1.5"
        >
          <span>View Public Inventory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
