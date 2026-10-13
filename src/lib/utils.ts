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
 * Check if a vehicle is Kerala registered based on registrationLocation or registration details
 */
export function isKeralaRegistered(registrationLocation?: string): boolean {
  if (!registrationLocation) return false;
  const loc = registrationLocation.toUpperCase();
  return (
    loc.includes('KL') || 
    loc.includes('KERALA') || 
    loc.includes('KOZHIKODE') || 
    loc.includes('CALICUT') || 
    loc.includes('MALAPPURAM') ||
    loc.includes('WAYANAD') ||
    loc.includes('KANNUR')
  );
}

/**
 * Calculate standard estimated monthly EMI for used car loan in Kerala:
 * - Default Down payment: 20% (Loan amount = 80% of vehicle price)
 * - Default Interest rate: ~10.5% per annum
 * - Default Tenure: 5 years (60 months)
 * Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEstimatedEmi(
  price: number,
  tenureMonths: number = 60,
  interestRateAnnual: number = 10.5,
  downPaymentPct: number = 20
): number {
  if (!price || price <= 0) return 0;
  const principal = price * (1 - downPaymentPct / 100);
  const monthlyRate = interestRateAnnual / (12 * 100);
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

/**
 * Check if a URL is an Instagram Post or Reel
 */
export function isInstagramUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('instagram.com/p/') || url.includes('instagram.com/reel/') || url.includes('instagram.com/tv/');
}

/**
 * Convert standard Instagram link (e.g. instagram.com/reel/C2xyz/...) into official embed iframe URL
 */
export function getInstagramEmbedUrl(url: string): string {
  if (!url) return '';
  const clean = url.split('?')[0].replace(/\/+$/, '');
  return `${clean}/embed/`;
}

/**
 * Default fallback dealership configuration
 */
export const DEFAULT_DEALERSHIP_SETTINGS = {
  name: 'Divine Drive',
  phone: '+91 97441 98199',
  whatsapp: '919744198199',
  email: 'info@divinedrive.in',
  address: 'South Koduvally, Kozhikode, Kerala 673572',
  plusCode: '7RH6+X8 Kozhikode',
  businessHours: {
    weekdays: 'Mon - Sat: 9:00 AM - 7:00 PM',
    sunday: 'Sunday: By Appointment',
  },
  mapUrl: 'https://maps.google.com/?cid=1836164222018876102',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  heroHeadline: "Kerala's Premier Destination for Luxury Pre-Owned Cars",
  heroSubtitle: 'Unmatched Quality. Certified Excellence. Explore our certified flood-free and non-accidental multi-brand luxury vehicle collection.',
  seoTitle: 'Divine Drive | Premium Pre-Owned & Luxury Cars in Kozhikode, Kerala',
  seoDescription: 'Discover certified, flood-free, and accident-free luxury pre-owned cars at Divine Drive in South Koduvally, Kozhikode, Kerala 673572. 1-Month Engine & Gearbox Warranty and 100% transparent history.',
};

/**
 * Compress an image file to ~200KB or below using canvas WebP/JPEG encoding
 */
export async function compressImage(file: File, maxSizeBytes: number = 200 * 1024): Promise<File> {
  // If already under target size, return as is
  if (file.size <= maxSizeBytes) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale down max dimensions if huge (e.g. 4000px down to max 1600px width/height)
        const maxDim = 1600;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Iteratively find quality that fits under maxSizeBytes
        let quality = 0.82;
        const step = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }
              if (blob.size <= maxSizeBytes || quality <= 0.3) {
                const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                  type: 'image/webp',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                quality -= 0.15;
                step();
              }
            },
            'image/webp',
            quality
          );
        };

        step();
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

/**
 * Compress an image file directly into a ~50-60KB base64 WebP string.
 * This allows uploading up to 10-12 images per car while staying safely under Firestore's 1MB document limit!
 */
export async function compressImageToBase64(file: File, maxDim: number = 850, targetKb: number = 60): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.72;
        let dataUrl = canvas.toDataURL('image/webp', quality);

        // Reduce quality iteratively until file size is under ~60KB
        while (dataUrl.length * 0.75 > targetKb * 1024 && quality > 0.25) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/webp', quality);
        }

        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

