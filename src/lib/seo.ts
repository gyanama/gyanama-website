import type { Metadata } from 'next';
import { SITE, SITE_URL } from '@/lib/site';

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
};

export function pageMetadata({ path, title, description, ogImage = '/og-image.png', noindex, type = 'website' }: PageSeo): Metadata {
  const fullTitle = `${title} | ${SITE.name}`;
  const image = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type,
      siteName: SITE.name,
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitterHandle,
      creator: SITE.twitterHandle,
      title: fullTitle,
      description,
      images: [{ url: image, alt: `${title}: ${SITE.name}` }],
    },
  };
}
