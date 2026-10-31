import type { LandingContent } from './types';

export const security: LandingContent = {
  path: '/security',
  title: 'School Data Security: Servers in India',
  description: 'How Gyanama protects school data: servers in India, backups three times a day, OTP login, five roles with their own access and an audit log of every request.',
  breadcrumb: 'Security',
  kicker: 'Security',
  h1: 'School data security, with servers in India.',
  summary:
    'Gyanama keeps school data on servers in India and backs up the database three times a day. Everyone signs in with a phone number and a one-time code that expires in 5 minutes and allows 3 tries. Five roles each get their own access, every request is written to an audit log, and the school decides which numbers are never called.',
  heroScreen: '/app/login.png',
  heroAlt: 'Gyanama sign-in screen asking for a name and mobile number, with a Verify Using OTP button',
  heroTone: 'sea',
  facts: [
    { k: 'India', v: 'Where the servers are' },
    { k: '3 a day', v: 'Database backups' },
    { k: '5 minutes', v: 'OTP expiry, with 3 tries' },
    { k: '5 roles', v: 'Each with its own access' },
  ],
  sections: [
    {
      q: 'Where is school data stored?',
      a: "On Gyanama's servers in India. The database is backed up three times every day.",
    },
    {
      q: 'How do people sign in?',
      a: 'With a phone number and a one-time code. The code expires after 5 minutes and allows 3 tries. Several accounts can be added on one phone, for example for two children in the same school.',
      screen: '/app/login.png',
      alt: 'Gyanama sign-in screen with name and mobile number fields',
      tone: 'sea',
    },
    {
      q: 'Who can see what?',
      a: "Gyanama has five roles: principal, coordinator, manager, teacher and student. Each role has its own access. Families use the student login, so a parent sees their own child's account.",
      screen: '/app/student-info.png',
      alt: 'Student information screen in the Gyanama app',
      tone: 'sky',
    },
    {
      q: 'Is there a record of who did what?',
      a: 'Yes. Every request to Gyanama is written to an audit log, so the system keeps a trail of actions.',
    },
    {
      q: 'Who decides which families are called?',
      a: 'The school. It sets its own attendance limits, numbers on its Do Not Call list are never called, and calls only run between 10 am and 6 pm.',
      screen: '/app/absentee-logged.png',
      alt: 'Absentee Call Logs screen in the Gyanama app',
      tone: 'peri',
      card: 'logged',
    },
    {
      q: 'What other protections are in place?',
      a: 'Gyanama uses secure HTTP headers, protection against cross-site request forgery and limits on how many requests can be made in a short time.',
    },
    {
      q: 'How are calls and personal data handled?',
      a: 'The Privacy Policy explains what Gyanama collects, how calls and data are handled and how long they are kept.',
      link: { label: 'Read the Privacy Policy', href: '/privacy-policy' },
    },
  ],
  faqs: [
    { q: 'Is Gyanama data stored in India?', a: "Yes. Gyanama's servers are in India." },
    { q: 'How often is data backed up?', a: 'Three times a day.' },
    { q: 'How long is a login code valid?', a: 'Five minutes, with 3 tries.' },
    { q: 'Where can I read the Privacy Policy?', a: 'On the Privacy Policy page at gyanama.com/privacy-policy. It covers how calls and data are handled and how long they are kept.' },
  ],
  related: ['/for-parents', '/for-principals', '/school-app', '/about'],
  updated: '2026-10-31',
};
