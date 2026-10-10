export type VehicleAvailability = 'available' | 'reserved' | 'sold';
export type ListingStatus = 'draft' | 'published';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
export type TransmissionType = 'Manual' | 'Automatic';
export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'Luxury' | 'MUV' | 'Coupe';

export interface Car {
  id?: string;
  make: string;
  model: string;
  variant: string;
  slug: string;
  year: number;
  registrationYear: number;
  price: number; // in INR (Rupees)
  comparePrice?: number;
  negotiable: boolean;
  mileage: number; // in km
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  colour: string;
  engineCapacity?: string; // e.g. "2.0L Turbo" or "1997 cc"
  ownershipCount: number; // 1, 2, 3, etc.
  registrationLocation: string; // e.g. "KL-11 Kozhikode"
  insuranceExpiry?: string;
  serviceHistory?: string; // e.g. "Company Serviced"
  description: string;
  features: string[]; // e.g. ["Sunroof", "Leather Seats", "360 Camera"]
  imageUrls: string[];
  imageStoragePaths?: string[];
  primaryImage: string;
  videoUrl?: string;
  availability: VehicleAvailability;
  isFeatured: boolean;
  status: ListingStatus;
  createdAt: string | number; // ISO string or timestamp
  updatedAt: string | number;
}

export type MediaCategory = 'Showroom' | 'Deliveries' | 'Walkaround' | 'Events';
export type MediaType = 'image' | 'video';

export interface GalleryItem {
  id?: string;
  title: string;
  description?: string;
  mediaType: MediaType;
  mediaUrl: string;
  storagePath?: string;
  thumbnailUrl?: string;
  category: MediaCategory;
  isFeatured: boolean;
  displayOrder: number;
  status: ListingStatus;
  createdAt: string | number;
  updatedAt: string | number;
}

export type EnquiryStatus = 'new' | 'contacted' | 'closed';

export interface Enquiry {
  id?: string;
  customerName: string;
  phone: string;
  email?: string;
  message?: string;
  carId?: string;
  carName?: string;
  status: EnquiryStatus;
  createdAt: string | number;
}

export interface DealershipSettings {
  name: string;
  logoUrl?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  plusCode: string;
  businessHours: {
    weekdays: string;
    sunday: string;
  };
  mapUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  heroHeadline: string;
  heroSubtitle: string;
  seoTitle: string;
  seoDescription: string;
}

export interface AdminUser {
  uid: string;
  displayName: string;
  email: string;
  role: 'superadmin' | 'admin';
  active: boolean;
}
