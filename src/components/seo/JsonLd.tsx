import { Helmet } from 'react-helmet-async';
import { CANONICAL_DOMAIN } from '@/lib/seo-config';
import { SITE_CONFIG } from '@/lib/constants';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${CANONICAL_DOMAIN}/#organization`,
    name: 'GYANAMA',
    url: CANONICAL_DOMAIN,
    logo: {
      '@type': 'ImageObject',
      url: `${CANONICAL_DOMAIN}/gyanama-logo.png`,
    },
    description: 'AI-powered school management system for Indian K-12 schools',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phoneRaw,
      contactType: 'sales',
      email: SITE_CONFIG.email,
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [SITE_CONFIG.linkedIn],
  };
  return <JsonLd data={data} />;
}

export function WebSiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${CANONICAL_DOMAIN}/#website`,
    name: 'GYANAMA',
    url: CANONICAL_DOMAIN,
    description: 'AI-powered school management platform for modern education',
    inLanguage: 'en-IN',
    publisher: { '@id': `${CANONICAL_DOMAIN}/#organization` },
  };
  return <JsonLd data={data} />;
}

export function SoftwareApplicationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${CANONICAL_DOMAIN}/#software`,
    name: 'GYANAMA',
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'School Management System',
    operatingSystem: 'Web, Android, iOS',
    description:
      'AI-powered school management platform covering attendance, fees, timetable, parent communication, and academic analytics for Indian K-12 schools',
    featureList: [
      'AI-powered attendance tracking',
      'Automated fee management',
      'Parent communication portal',
      'Smart timetable generation',
      'Student performance analytics',
      'Mobile apps for all roles',
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${CANONICAL_DOMAIN}/book-demo`,
    },
    publisher: { '@id': `${CANONICAL_DOMAIN}/#organization` },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['school administrator', 'teacher', 'parent', 'student'],
    },
  };
  return <JsonLd data={data} />;
}

export function FAQPageSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbSchema({ pageName, pagePath }: { pageName: string; pagePath: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: CANONICAL_DOMAIN,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: `${CANONICAL_DOMAIN}${pagePath}`,
      },
    ],
  };
  return <JsonLd data={data} />;
}
