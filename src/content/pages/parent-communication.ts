import type { LandingContent } from './types';

export const parentCommunication: LandingContent = {
  path: '/parent-teacher-communication',
  title: 'Parent Teacher Communication App',
  description: 'Announcements, teacher to family chat, PTM requests, forms and the school calendar in one app, plus AI calls when attendance or fees need follow-up.',
  breadcrumb: 'Parent communication',
  kicker: 'Parent communication',
  h1: 'One place for school messages, PTMs and forms.',
  summary:
    "Gyanama gives the school one channel to families. Announcements go to the whole school or one class with a push notification. Teachers and families chat one to one in the app. Families request a PTM time, fill in school forms and see the calendar. When attendance or fees need follow-up, Gyanama also calls the family.",
  heroScreen: '/app/messages.png',
  heroAlt: 'Messages screen in the Gyanama app',
  heroTone: 'sea',
  facts: [
    { k: 'Class or school', v: 'Announcements with push' },
    { k: '1:1 chat', v: 'Teacher and family' },
    { k: '8 field types', v: 'In school forms' },
    { k: '5 languages', v: 'In the family AI chat' },
  ],
  sections: [
    {
      q: 'How do announcements reach families?',
      a: 'The school posts an announcement to everyone or to one class, with attachments. Families get a push notification on the app.',
      screen: '/app/announcements.png',
      alt: 'Announcements screen in the Gyanama app',
      tone: 'peri',
    },
    {
      q: 'Can teachers and families chat?',
      a: 'Yes. Teachers and families message one to one in the app, with attachments and search.',
      screen: '/app/messages.png',
      alt: 'Messages screen in the Gyanama app',
      tone: 'sea',
    },
    {
      q: 'How do PTMs work?',
      a: 'A family requests a PTM date and time. The teacher accepts or declines and can add notes.',
      screen: '/app/ptm.png',
      alt: 'PTM screen in the Gyanama app',
      tone: 'apricot',
      card: 'ptm',
    },
    {
      q: 'Can the school collect information from families?',
      a: 'Yes. Forms have 8 field types, can go to selected classes, close on a deadline and show a summary of responses.',
      screen: '/app/calendar.png',
      alt: 'School calendar screen in the Gyanama app',
      tone: 'lilac',
    },
    {
      q: 'What languages do families get?',
      a: 'The AI calls are in Hindi, Hinglish or English. The family AI chat in the app also handles Marathi and Tamil.',
      screen: '/app/absentee-logged.png',
      alt: 'Absentee Call Logs screen in the Gyanama app',
      tone: 'sky',
      card: 'logged',
    },
  ],
  faqs: [
    { q: 'Do parents need their own account?', a: "No. Families use the student's login in the Gyanama app." },
    { q: 'Can we send an announcement to one class?', a: 'Yes. Announcements go to the whole school or to selected classes.' },
    { q: 'How do families ask for a PTM?', a: 'The family requests a date and time in the app, and the teacher accepts or rejects the request.' },
    { q: 'Does Gyanama replace WhatsApp groups?', a: 'Gyanama gives the school announcements, one to one chat, PTM requests and forms inside its own app, tied to each student.' },
  ],
  related: ['/for-parents', '/voice-agent-for-schools', '/school-app', '/homework-app'],
  updated: '2026-10-31',
};
