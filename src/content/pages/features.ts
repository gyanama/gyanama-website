import { PRODUCT_GROUPS } from '@/lib/nav';
import type { LandingContent } from './types';

const hrefs = (title: string) => PRODUCT_GROUPS.find((g) => g.title === title)?.links.map((l) => l.href) ?? [];

export const features: LandingContent = {
  path: '/features',
  title: 'School Software Features: Attendance, Fees, AI',
  description: 'Every Gyanama feature on one page: AI calls to parents, attendance, fees, the Student Progress Score, report cards, homework, test papers, timetable and apps.',
  breadcrumb: 'All features',
  kicker: 'All features',
  h1: 'Gyanama school software features, all on one page.',
  summary:
    'Gyanama is a school app for principals, teachers, students and families on Android, iOS and the web. Its features fall into four groups: follow-up with families, everyday school work, the apps themselves, and pages for each role. Each feature below links to its own page with the details, real app screens and answers to common questions.',
  heroScreen: '/app/principal-dashboard.png',
  heroAlt: 'Principal home screen in the Gyanama app with attendance, absentee calls and staff present',
  heroTone: 'peri',
  heroCard: 'callLog',
  sections: [],
  faqs: [
    { q: 'Does Gyanama work on phones and computers?', a: "Yes. The app runs on Android 7.0 or later and iOS 13 or later, and on the web at each school's own address." },
    { q: 'Which features need the Automate or Autonomy plan?', a: 'The AI features: calls to families, fee reminder calls, the Student Progress Score, test papers, the AI assistant and the AI timetable draft.' },
    { q: 'Which boards does Gyanama support?', a: 'CBSE, ICSE and State Boards, from playgroup to Class 12.' },
    { q: 'How do we move our data in?', a: 'Send us your students, staff, classes and timetable in Excel. We import it for you.' },
  ],
  related: ['/plans', '/use-cases', '/school-app', '/ai-systems'],
  updated: '2026-10-31',
  schema: 'software',
};

export const featureGroups: { title: string; q: string; a: string; links: string[] }[] = [
  {
    title: 'Follow-up',
    q: 'Which features follow up with families?',
    a: 'AI calls to parents, student attendance, fee management and the Student Progress Score. These are the parts of Gyanama that act when attendance, fees or marks slip.',
    links: hrefs('Follow-up'),
  },
  {
    title: 'School work',
    q: 'Which features run everyday school work?',
    a: 'Exams and report cards, homework and doubts, parent communication, the timetable and test papers. Teachers use these every day in the app.',
    links: hrefs('School work'),
  },
  {
    title: 'Apps',
    q: 'Which apps does Gyanama have?',
    a: "An Android and iOS app for every role, and a web app on the school's own address for fees, registers, report cards and transfer certificates.",
    links: hrefs('Apps'),
  },
  {
    title: 'For',
    q: 'Which pages are written for each role?',
    a: 'Principals, teachers and parents each have a page that explains what Gyanama does for them. CBSE schools have one too.',
    links: hrefs('For'),
  },
  {
    title: 'More',
    q: 'Where can I read more about how Gyanama works?',
    a: 'These pages explain the daily checks and nightly score, where AI is used, how Gyanama compares with an ERP, a normal week, the plans, security and the team.',
    links: ['/ai-systems', '/ai-for-schools', '/school-erp', '/vs-school-management-software', '/use-cases', '/boards', '/plans', '/security', '/about'],
  },
];
