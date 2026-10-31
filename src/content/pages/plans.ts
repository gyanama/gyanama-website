import type { LandingContent } from './types';

export const plans: LandingContent = {
  path: '/plans',
  title: 'Gyanama Plans: Assist, Automate, Autonomy',
  description: 'Compare the Gyanama plans for schools. Assist runs the school app, Automate adds the AI calls and progress score, and Autonomy adds your own branded app.',
  breadcrumb: 'Plans',
  kicker: 'Plans',
  h1: 'Gyanama plans: Assist, Automate and Autonomy.',
  summary:
    'Gyanama has three plans. Assist is the school app on Android, iOS and the web, with attendance, fees, homework, exams, report cards and communication. Automate adds the AI: calls to families, fee reminder calls, the Student Progress Score, test papers and the AI timetable. Autonomy adds a fully white-labelled app and a dedicated team. We share pricing on a short call.',
  heroScreen: '/app/principal-dashboard.png',
  heroAlt: 'Principal home screen in the Gyanama app with attendance, absentee calls and staff present',
  heroTone: 'peri',
  secondary: { label: 'Talk to us for pricing', href: '/book-demo' },
  sections: [
    {
      q: 'What does Automate add to Assist?',
      a: 'The AI features. Automate adds calls to families about attendance, fee reminder calls, the Student Progress Score with a projected result, test papers from your textbook, the AI assistant and the AI timetable draft, with 3,000 AI calls a year.',
      link: { label: 'How the AI call works', href: '/voice-agent-for-schools' },
    },
    {
      q: 'What does Autonomy add to Automate?',
      a: "Your school's own app. Autonomy puts your name, logo, colours and splash screen on the app, with its own App Store and Play Store listing and your own domain and email branding.",
      body: 'It also includes 5,000 AI calls a year, a dedicated developer and AI engineer, priority infrastructure and an uptime guarantee backed by an SLA.',
    },
  ],
  faqs: [
    { q: 'How much does Gyanama cost?', a: 'We share pricing on a short call. Book a demo or message us on WhatsApp.' },
    { q: 'Are the AI features on the Assist plan?', a: 'No. Assist is the school app without the AI features. AI calls, fee reminder calls, the Student Progress Score, test papers, the AI assistant and the AI timetable start on Automate.' },
    { q: 'Is the app included in every plan?', a: 'Yes. Every plan includes the Android, iOS and web app for principals, teachers, students and families.' },
    { q: "Can the app carry our school's own name?", a: 'Yes, on Autonomy. Your school gets its own App Store and Play Store listing with its name, logo and colours.' },
    { q: 'Who moves our data in?', a: 'Our team. Send us your students, staff, classes and timetable in Excel and we import them.' },
  ],
  related: ['/features', '/voice-agent-for-schools', '/ai-timetable-generator', '/book-demo'],
  cta: { title: 'Talk to us for pricing.', body: 'A 20-minute call with real screens. We share pricing for your school on the call.' },
  updated: '2026-10-31',
};

const CORE = [
  'Android, iOS and web app',
  'Attendance with monthly registers',
  'Fees, invoices and PDF receipts',
  'Homework and doubts',
  'Exams, marks and report cards',
  'Announcements and chat with families',
  'PTM requests, leave and gate pass',
  'Class timetable with Excel import',
];

const AUTOMATE = [
  'AI calls to families about attendance',
  'Fee reminder calls',
  'Student Progress Score, every night',
  'Projected final result',
  'Test papers from your textbook or NCERT',
  'AI assistant in the app',
  'AI timetable draft',
  '3,000 AI calls a year',
  'Semi white-label app',
];

const AUTONOMY = [
  'Full white-label app with your name, logo, colours and splash screen',
  'Your own App Store and Play Store listing',
  'Your own domain and email branding',
  '5,000 AI calls a year',
  'A dedicated developer and AI engineer',
  'Priority infrastructure',
  'Uptime guarantee backed by an SLA',
];

export const planTiers = [
  { name: 'Assist', line: 'The school app for everyday school work.', groups: [{ title: 'School app', items: CORE }] },
  { name: 'Automate', line: 'Everything in Assist, plus the AI features.', groups: [{ title: 'Added on Automate', items: AUTOMATE }] },
  { name: 'Autonomy', line: 'Everything in Automate, plus your own branded app and a dedicated team.', groups: [{ title: 'Added on Autonomy', items: AUTONOMY }] },
];
