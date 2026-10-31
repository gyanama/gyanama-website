import { SITE, SITE_URL } from '@/lib/site';

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

const ORG_ID = `${SITE_URL}/#organization`;

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/gyanama-logo.png` },
        description:
          'Gyanama is a school app for Indian K-12 schools. It runs attendance, fees, homework and exams, and its AI calls parents when attendance keeps slipping.',
        address: { '@type': 'PostalAddress', ...SITE.address },
        founder: SITE.founders.map((f) => ({ '@type': 'Person', name: f.name, jobTitle: f.jobTitle, worksFor: { '@id': ORG_ID } })),
        foundingDate: '2025',
        areaServed: 'IN',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE.phoneRaw,
          contactType: 'sales',
          email: SITE.email,
          availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [SITE.linkedIn, SITE.instagram, SITE.twitter, SITE.facebook],
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE.name,
        url: SITE_URL,
        description: 'Gyanama, the school app for Indian K-12 schools.',
        inLanguage: 'en-IN',
        publisher: { '@id': ORG_ID },
      }}
    />
  );
}

export const FEATURE_LIST = [
  'AI calls to parents when attendance keeps slipping',
  'Reminder calls for overdue fees',
  'Nightly Student Progress Score with reasons',
  'Projected final result for every student',
  'Test papers and answer keys from the school textbook or NCERT',
  'Clash-free timetable drafts',
  'Attendance register with PDF and Excel export',
  'Exams, marks and PDF report cards',
  'Homework, doubts, PTM requests, leave and gate pass',
  'Announcements and teacher to family chat',
];

export function SoftwareApplicationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: SITE.name,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web, Android, iOS',
        description: 'A school app for Indian K-12 schools: attendance, fees, homework, exams and AI follow-up calls to parents.',
        featureList: FEATURE_LIST,
        publisher: { '@id': ORG_ID },
        audience: { '@type': 'EducationalAudience', educationalRole: ['school administrator', 'teacher', 'parent', 'student'] },
      }}
    />
  );
}

export function MobileApplicationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        '@id': `${SITE_URL}/school-app#app`,
        name: SITE.name,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Android 7.0 or later, iOS 13 or later',
        installUrl: [SITE.playStore, SITE.appStore],
        downloadUrl: [SITE.playStore, SITE.appStore],
        featureList: FEATURE_LIST,
        publisher: { '@id': ORG_ID },
      }}
    />
  );
}

export type Faq = { q: string; a: string };

export function FAQPageSchema({ faqs }: { faqs: Faq[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          item: it.path === '/' ? SITE_URL : `${SITE_URL}${it.path}`,
        })),
      }}
    />
  );
}

export function WebPageSchema({ path, name, description, dateModified }: { path: string; name: string; description: string; dateModified: string }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${SITE_URL}${path}#webpage`,
        url: `${SITE_URL}${path}`,
        name,
        description,
        inLanguage: 'en-IN',
        dateModified,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        publisher: { '@id': ORG_ID },
      }}
    />
  );
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
  const url = `${SITE_URL}/blog/${slug}`;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: title,
        description,
        image: coverImage || `${SITE_URL}/og-image.png`,
        datePublished: datePublished || undefined,
        dateModified: dateModified || datePublished || undefined,
        author: { '@type': author ? 'Person' : 'Organization', name: author || SITE.name },
        publisher: { '@id': ORG_ID },
        url,
      }}
    />
  );
}

export function BlogListingSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: 'GYANAMA Blog',
        description: 'Guides for running an Indian school: attendance, fees, parent communication and moving off registers and spreadsheets.',
        url: `${SITE_URL}/blog`,
        publisher: { '@id': ORG_ID },
      }}
    />
  );
}
