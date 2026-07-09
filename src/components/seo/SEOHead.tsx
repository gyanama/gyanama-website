import { Helmet } from 'react-helmet-async';
import { CANONICAL_DOMAIN, SEO_CONFIG } from '@/lib/seo-config';
import { SITE_CONFIG } from '@/lib/constants';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  children,
}: SEOHeadProps) {
  const location = useLocation();
  const path = location.pathname;
  const config = SEO_CONFIG[path];

  const pageTitle = title ?? config?.title ?? 'GYANAMA';
  const pageDesc = description ?? config?.description ?? 'Gyanama is the AI that runs your school. Beyond a school management system.';
  const pageCanonical = canonical ?? config?.canonical ?? path;
  const pageOgImage = ogImage ?? '/og-image.png';
  const fullTitle = `${pageTitle} | GYANAMA`;
  const fullCanonical = `${CANONICAL_DOMAIN}${pageCanonical}`;
  const fullOgImage = pageOgImage.startsWith('http') ? pageOgImage : `${CANONICAL_DOMAIN}${pageOgImage}`;
  const shouldNoindex = noindex || config?.noindex;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={fullCanonical} />

      {shouldNoindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GYANAMA" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:creator" content={SITE_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={`${pageTitle}: GYANAMA`} />

      {children}
    </Helmet>
  );
}
