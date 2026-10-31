import { SITE } from '@/lib/site';
import type { LandingContent } from './types';

export const about: LandingContent = {
  path: '/about',
  title: 'About Gyanama: The Team and the Company',
  description: 'Gyanama is a school app built by Yash Bhardwaj and Rachit Mittal at ARCOS Technologies Private Limited in Noida. It is running in a partner school today.',
  breadcrumb: 'About',
  kicker: 'About Gyanama',
  h1: 'About Gyanama and the people who build it.',
  summary:
    'Gyanama is a school app for Indian schools, made by ARCOS Technologies Private Limited in Noida, Uttar Pradesh. Yash Bhardwaj, CEO, and Rachit Mittal, CTO, founded it after watching teachers lose their evenings to paper registers and fee calls. Gyanama is a working product on Android, iOS and the web, running in a partner school today.',
  heroScreen: '/app/principal-dashboard.png',
  heroAlt: 'Principal home screen in the Gyanama app',
  heroTone: 'peri',
  secondary: { label: 'Contact the team', href: '/contact-us' },
  sections: [
    {
      q: 'Why was Gyanama built?',
      a: "Yash and Rachit watched teachers spend their evenings on paper registers, Excel sheets and calls to parents about absences and fees. They built Gyanama so that this follow-up runs from the school's own data.",
    },
    {
      q: 'Where is Gyanama used today?',
      a: 'Gyanama is running in a partner school today. The app is on Google Play and the App Store, and each school also gets its own web address.',
      link: { label: 'See the school app', href: '/school-app' },
    },
    {
      q: 'Where is the company based?',
      a: `${SITE.legalName}, registered office ${SITE.address.streetAddress}, ${SITE.address.addressLocality} ${SITE.address.postalCode}, ${SITE.address.addressRegion}.`,
      link: { label: 'Contact details', href: '/contact-us' },
    },
  ],
  faqs: [
    { q: 'Who founded Gyanama?', a: 'Yash Bhardwaj, co-founder and CEO, and Rachit Mittal, co-founder and CTO.' },
    { q: 'Which company makes Gyanama?', a: `${SITE.legalName}, with its registered office in Noida, Uttar Pradesh.` },
    { q: 'How can we reach the founders?', a: `Call or WhatsApp ${SITE.phone}, email ${SITE.email}, or book a demo.` },
    { q: 'Is Gyanama only for CBSE schools?', a: 'No. Gyanama supports CBSE, ICSE and State Board schools, from playgroup to Class 12.' },
  ],
  related: ['/features', '/security', '/use-cases', '/book-demo'],
  updated: '2026-10-31',
};
