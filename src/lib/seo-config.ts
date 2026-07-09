export const CANONICAL_DOMAIN = 'https://gyanama.com';

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
}

// Positioning (locked): Gyanama is AI-first — "your school's brain", not a generic
// "school ERP / management system". Titles lead AI-first; descriptions capture the
// high-intent "school management software / ERP" searches via DIFFERENTIATION framing
// ("beyond a school management system"), never by self-identifying as one.
export const SEO_CONFIG: Record<string, SEOData> = {
  '/': {
    title: 'AI School Platform for Indian Schools',
    description:
      'Gyanama is an AI operating system for schools. Beyond a school management system, it understands what’s happening. It auto-calls absent students’ parents, flags at-risk kids, and automates fee reminders.',
    canonical: '/',
  },
  '/ai-systems': {
    title: 'AI Systems for Schools: Attendance, Brain, Quiz',
    description:
      'Gyanama’s AI for schools: automated attendance calls to parents, an AI Brain that flags at-risk students, AI quiz & assignment generation, and daily school health scores.',
    canonical: '/ai-systems',
  },
  '/features': {
    title: 'School Software Features: Attendance, Fees, AI',
    description:
      'Attendance automation, online fee collection (UPI/cards), AI timetables, a parent app, exams & report cards. The school software that acts on your data, not just stores it.',
    canonical: '/features',
  },
  '/use-cases': {
    title: 'How Schools Use Gyanama: Principals & Teachers',
    description:
      'How principals and teachers use Gyanama to retire registers and Excel: automated attendance follow-up, fee reminders, and AI that flags the students who need attention.',
    canonical: '/use-cases',
  },
  '/about': {
    title: 'About Gyanama: Built by Founders Who Saw It',
    description:
      'Gyanama is built by Yash Bhardwaj and Rachit Mittal to give Indian schools an AI brain. They built it after watching teachers drown in paper registers, fee chasing, and Excel sheets.',
    canonical: '/about',
  },
  '/contact-us': {
    title: 'Contact Gyanama: Talk to the Team',
    description:
      'Questions about bringing Gyanama’s AI to your school? Reach the team by email, WhatsApp, or LinkedIn. We reply within 24 hours.',
    canonical: '/contact-us',
  },
  '/book-demo': {
    title: 'Book a Free Gyanama Demo',
    description:
      'Book a free demo and see Gyanama’s AI run a real school: automated attendance calls, online fee collection, and at-risk student alerts, live in one call.',
    canonical: '/book-demo',
  },
  '/blog': {
    title: 'Gyanama Blog: Running Smarter Schools',
    description:
      'Guides and insights on running a modern Indian school with AI: attendance, fees, parent communication, and moving beyond registers and spreadsheets.',
    canonical: '/blog',
  },
  '/vs-school-management-software': {
    title: 'Gyanama vs a School Management System',
    description:
      'Looking for a school management system or ERP? See how Gyanama differs. It doesn’t just record attendance, fees and marks, it acts on them: calls parents, flags risks, collects fees.',
    canonical: '/vs-school-management-software',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description:
      'Gyanama privacy policy: how we collect, use, and protect your data. Committed to safeguarding every student and school record.',
    canonical: '/privacy-policy',
  },
  '/terms-of-service': {
    title: 'Terms of Service',
    description:
      'Gyanama terms of service: the agreement governing use of our AI school platform.',
    canonical: '/terms-of-service',
  },
};
