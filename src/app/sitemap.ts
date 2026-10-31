import type { MetadataRoute } from 'next';
import { STATIC_ROUTES } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';
import { cacheLife, cacheTag } from 'next/cache';
import { getPublishedSlugs } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  'use cache';
  cacheLife('days');
  cacheTag('posts');
  const today = new Date().toISOString().slice(0, 10);
  const posts = await getPublishedSlugs();
  return [
    ...STATIC_ROUTES.map((r) => ({
      url: r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}`,
      lastModified: today,
      changeFrequency: r.changefreq,
      priority: r.priority,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: (p.updated_at || p.published_at || today).slice(0, 10),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
