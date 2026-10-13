import HeroSection from '@/components/home/HeroSection';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import VehicleDiscovery from '@/components/home/VehicleDiscovery';
import ValueProps from '@/components/home/ValueProps';
import WhyTrustUsSection from '@/components/home/WhyTrustUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BuyingStepsSection from '@/components/home/BuyingStepsSection';
import ConsultationCtaSection from '@/components/home/ConsultationCtaSection';
import LocationSection from '@/components/home/LocationSection';
import { getCars } from '@/lib/firebase/cars';

export default async function HomePage() {
  const cars = await getCars({ status: 'published' });

  return (
    <div className="space-y-0 overflow-x-hidden">
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Featured Curated Collection */}
      <FeaturedVehicles cars={cars} />

      {/* 3. Find Your Perfect Car - Interactive Discovery Filter Bar */}
      <VehicleDiscovery />

      {/* 4. Why Divine Drives - Core Value Propositions */}
      <ValueProps />

      {/* 5. Vehicle Confidence & Transparency - Quality & Verification */}
      <WhyTrustUsSection />

      {/* 6. Customer Reviews & Delivery Stories */}
      <TestimonialsSection />

      {/* 7. How Buying Works - 4 Steps */}
      <BuyingStepsSection />

      {/* 8. Consultation & Test Drives - Conversion Action */}
      <ConsultationCtaSection />

      {/* 9. Showroom Location & Contact */}
      <LocationSection />
    </div>
  );
}
