import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupee prices in full Indian currency format matching reference image.
 * Examples:
 * 4800000 -> "₹ 48,00,000"
 * 2275000 -> "₹ 22,75,000"
 * 1850000 -> "₹ 18,50,000"
 */
export function formatPrice(amount: number): string {
  if (!amount || isNaN(amount)) return '₹ 0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('₹', '₹ ');
}

/**
 * Format mileage numbers with comma separators and 'km'.
 * Example: 17400 -> "17,400 km"
 */
export function formatMileage(km: number): string {
  if (km === undefined || km === null) return '0 km';
  return `${new Intl.NumberFormat('en-IN').format(km)} km`;
}

/**
 * Shorten transmission string.
 * Example: "Automatic" -> "A/T", "Manual" -> "M/T"
 */
export function formatTransmission(t: string): string {
  if (!t) return 'A/T';
  if (t.toLowerCase().includes('auto')) return 'A/T';
  if (t.toLowerCase().includes('man')) return 'M/T';
  return t;
}

/**
 * Generate clean URL-friendly slug for vehicle pages.
 * Example: ("Mahindra", "Thar ROXX", "4WD", 2024) -> "mahindra-thar-roxx-4wd-2024"
 */
export function createSlug(make: string, model: string, variant?: string, year?: number): string {
  const parts = [make, model, variant, year].filter(Boolean).join(' ');
  return parts
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-');
}

/**
 * Default fallback dealership configuration
 */
export const DEFAULT_DEALERSHIP_SETTINGS = {
  name: 'Divine Drive',
  phone: '+91 98470 09947',
  whatsapp: '919847009947',
  email: 'info@divinedrive.in',
  address: 'Thiruvannur Mini Bypass, Kozhikode, Kerala (Opposite Kannancheri Temple)',
  plusCode: '6RF2+4G6',
  businessHours: {
    weekdays: 'Mon - Sat: 9:00 AM - 7:00 PM',
    sunday: 'Sunday: By Appointment',
  },
  mapUrl: 'https://maps.google.com/?q=6RF2%2B4G6+Kozhikode',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  heroHeadline: "Kerala's Premier Destination for Luxury Pre-Owned Cars",
  heroSubtitle: 'Unmatched Quality. Certified Excellence. Explore our certified flood-free and non-accidental multi-brand luxury vehicle collection.',
  seoTitle: 'Divine Drive | Premium Pre-Owned & Luxury Cars in Kozhikode, Kerala',
  seoDescription: 'Discover certified, flood-free, and accident-free luxury pre-owned cars at Divine Drive in Kozhikode, Kerala. 100% transparent history and warranty assurance.',
};
