export const CANONICAL_DOMAIN = 'https://gyanama.com';

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
}

export const SEO_CONFIG: Record<string, SEOData> = {
  '/': {
    title: 'AI-Powered School Management System',
    description:
      'GYANAMA is an AI-powered school management platform for Indian K-12 schools. Automate attendance, fees, timetables, and parent communication from one dashboard.',
    canonical: '/',
  },
  '/ai-systems': {
    title: 'AI Systems for Schools — Smart Automation',
    description:
      'Explore GYANAMA AI systems: automated attendance calling, AI Brain Agent for student insights, AI quiz generation, and school health scoring for Indian schools.',
    canonical: '/ai-systems',
  },
  '/features': {
    title: 'Features — School ERP, Attendance & Fee Management',
    description:
      'GYANAMA offers 50+ features: attendance automation, fee collection, timetable management, parent communication app, academic analytics, and more for CBSE/ICSE schools.',
    canonical: '/features',
  },
  '/use-cases': {
    title: 'Use Cases — How Schools Use GYANAMA',
    description:
      'See how principals, teachers, and parents use GYANAMA to simplify school operations, improve parent trust, and boost academic outcomes across Indian schools.',
    canonical: '/use-cases',
  },
  '/about': {
    title: 'About GYANAMA — Our Mission for Indian Education',
    description:
      'Learn about the team behind GYANAMA — building AI-first school management software to transform how Indian K-12 schools operate and communicate with parents.',
    canonical: '/about',
  },
  '/contact-us': {
    title: 'Contact GYANAMA — Get in Touch',
    description:
      'Have questions about GYANAMA school management system? Contact our team via email, WhatsApp, or LinkedIn. We respond within 24 hours.',
    canonical: '/contact-us',
  },
  '/book-demo': {
    title: 'Book a Free Demo — GYANAMA School Management',
    description:
      'Book a free demo of GYANAMA and see how AI-powered school management can save your staff hours every week. Setup takes less than a day.',
    canonical: '/book-demo',
  },
  '/blog': {
    title: 'Blog — School Management Insights & Updates',
    description:
      'Insights, guides, and updates from GYANAMA on AI-powered school management, attendance, fees, and running modern Indian K-12 schools.',
    canonical: '/blog',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description:
      'GYANAMA privacy policy — how we collect, use, and protect your data. Committed to safeguarding student and school information.',
    canonical: '/privacy-policy',
  },
  '/terms-of-service': {
    title: 'Terms of Service',
    description:
      'GYANAMA terms of service — the agreement governing use of our AI-powered school management platform.',
    canonical: '/terms-of-service',
  },
};
