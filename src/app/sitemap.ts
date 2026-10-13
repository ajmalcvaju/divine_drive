import { MetadataRoute } from 'next';
import { getCars } from '@/lib/firebase/cars';

export const dynamic = 'force-static';

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
    const carUrls: MetadataRoute.Sitemap = publishedCars
      .filter((car) => Boolean(car.slug))
      .map((car) => {
        let validDate = new Date();
        const rawDate = car.updatedAt || car.createdAt;
        if (rawDate) {
          const parsed = new Date(rawDate);
          if (!isNaN(parsed.getTime())) {
            validDate = parsed;
          }
        }

        return {
          url: `${baseUrl}/cars/${car.slug}`,
          lastModified: validDate,
          changeFrequency: 'weekly',
          priority: 0.8,
        };
      });

    return [...staticPages, ...carUrls];
  } catch (err) {
    return staticPages;
  }
}
