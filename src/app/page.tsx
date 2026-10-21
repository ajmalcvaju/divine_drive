import HeroSection from '@/components/home/HeroSection';
import DealershipOverviewSection from '@/components/home/DealershipOverviewSection';
import BrandLogoSlider from '@/components/home/BrandLogoSlider';
import SellCarBanner from '@/components/home/SellCarBanner';
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

      {/* 2. Leading Car Seller in Calicut & 300+ Cars Sold - Dealership Overview */}
      <DealershipOverviewSection />

      {/* 3. Prestige Brand Logos Slider (15 Luxury Marques) */}
      <BrandLogoSlider />

      {/* 4. Buy With No Tension Banner with Rotating Tyre Animation */}
      <SellCarBanner />

      {/* 4. How Buying Works - A Transparent 4-Step Process */}
      <BuyingStepsSection />

      {/* 5. Featured Curated Collection */}
      <FeaturedVehicles cars={cars} />

      {/* 5. Find Your Perfect Car - Interactive Discovery Filter Bar */}
      <VehicleDiscovery />

      {/* 6. Why Divine Drives - Core Value Propositions */}
      <ValueProps />

      {/* 7. Vehicle Confidence & Transparency - Quality & Verification */}
      <WhyTrustUsSection />

      {/* 8. Customer Reviews & Delivery Stories */}
      <TestimonialsSection />

      {/* 9. Consultation & Test Drives - Conversion Action */}
      <ConsultationCtaSection />

      {/* 10. Showroom Location & Contact */}
      <LocationSection />
    </div>
  );
}
