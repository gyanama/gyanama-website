import { Helmet } from 'react-helmet-async';
import { CANONICAL_DOMAIN } from '@/lib/seo-config';
import { SITE_CONFIG } from '@/lib/constants';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  // XSS-safe: escape `<` so a stray </script> in data can't break out of the tag.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  );
}

const FOUNDERS = [
  {
    '@type': 'Person',
    name: 'Yash Bhardwaj',
    jobTitle: 'Co-founder, Director & CEO',
    worksFor: { '@id': `${CANONICAL_DOMAIN}/#organization` },
  },
  {
    '@type': 'Person',
    name: 'Rachit Mittal',
    jobTitle: 'Co-founder, Director & CTO',
    worksFor: { '@id': `${CANONICAL_DOMAIN}/#organization` },
  },
];

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
    description:
      'Gyanama is the AI platform that runs Indian K-12 schools — it does not just record attendance, fees and marks, it acts on them: calling parents, flagging at-risk students, and collecting fees.',
    founder: FOUNDERS,
    foundingDate: '2025',
    areaServed: 'IN',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phoneRaw,
      contactType: 'sales',
      email: SITE_CONFIG.email,
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [SITE_CONFIG.linkedIn, SITE_CONFIG.instagram],
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
    description:
      'The AI platform that runs Indian schools — beyond a school management system.',
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
    applicationSubCategory: 'AI School Operations Platform',
    operatingSystem: 'Web, Android, iOS',
    description:
      'Gyanama is the AI platform for Indian K-12 schools. Beyond a school management system, it acts on school data: automated attendance calls to parents, an AI Brain that flags at-risk students, AI quiz & assignment generation, timetable generation, online fee collection, and daily health scores.',
    featureList: [
      'Automated AI attendance calls to parents',
      'AI Brain — at-risk student and weak-spot detection',
      'AI quiz & assignment generation from books',
      'AI timetable generation',
      'Online fee collection (UPI, cards, cash) with invoices',
      'Daily school, class and student health scores',
      'Real-time parent–teacher chat and notifications',
      'Exams, marks and PDF report cards',
      'Mobile apps for principals, teachers, parents and students',
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

export function ArticleSchema({
  title,
  description,
  slug,
  coverImage,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  slug: string;
  coverImage?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  author?: string | null;
}) {
  const url = `${CANONICAL_DOMAIN}/blog/${slug}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: title,
    description,
    image: coverImage || `${CANONICAL_DOMAIN}/og-image.png`,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: { '@type': author ? 'Person' : 'Organization', name: author || 'GYANAMA' },
    publisher: { '@id': `${CANONICAL_DOMAIN}/#organization` },
    url,
  };
  return <JsonLd data={data} />;
}

export function BlogListingSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${CANONICAL_DOMAIN}/blog#blog`,
    name: 'GYANAMA Blog',
    description:
      'Insights and guides on running a modern Indian school with AI — attendance, fees, parent communication, and moving beyond registers and spreadsheets.',
    url: `${CANONICAL_DOMAIN}/blog`,
    publisher: { '@id': `${CANONICAL_DOMAIN}/#organization` },
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
