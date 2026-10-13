import HeroSection from '@/components/home/HeroSection';
import ValueProps from '@/components/home/ValueProps';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import ServicesSection from '@/components/home/ServicesSection';
import WhyTrustUsSection from '@/components/home/WhyTrustUsSection';
import AboutSection from '@/components/home/AboutSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LocationSection from '@/components/home/LocationSection';
import { getCars } from '@/lib/firebase/cars';

export const revalidate = 60; // Revalidate every 60s for performance

export default async function HomePage() {
  const cars = await getCars({ status: 'published' });

  return (
    <div className="space-y-0 overflow-x-hidden">
      <HeroSection />
      <FeaturedVehicles cars={cars} />
      <ValueProps />
      <ServicesSection />
      <WhyTrustUsSection />
      <AboutSection />
      <TestimonialsSection />
      <LocationSection />
    </div>
  );
}
