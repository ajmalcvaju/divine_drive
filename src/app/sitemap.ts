import { MetadataRoute } from 'next';
import { getCars } from '@/lib/firebase/cars';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://divinedrive.in';

  // Static Public Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Published Vehicle Dynamic URLs
  try {
    const publishedCars = await getCars({ status: 'published' });
    const carUrls: MetadataRoute.Sitemap = publishedCars.map((car) => ({
      url: `${baseUrl}/cars/${car.slug}`,
      lastModified: new Date(car.updatedAt || car.createdAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticPages, ...carUrls];
  } catch (err) {
    return staticPages;
  }
}
