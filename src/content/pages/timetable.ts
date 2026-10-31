import type { LandingContent } from './types';

export const timetable: LandingContent = {
  path: '/ai-timetable-generator',
  title: 'AI Timetable Generator for Schools',
  description: 'Gyanama drafts a class timetable from rules you write in plain words, checks that no teacher is in two classes at once, and lets you review it before saving.',
  breadcrumb: 'Timetable',
  kicker: 'Timetable',
  h1: 'An AI timetable generator that checks every teacher for clashes.',
  summary:
    'Gyanama keeps a class-wise timetable for Monday to Saturday. The AI timetable generator drafts it from rules the school writes in plain words, up to 2,000 characters, and checks that no teacher is booked in two classes at the same time. The school reviews the draft before saving it, and timetables also import from and export to Excel.',
  heroScreen: '/app/timetable-management.png',
  heroAlt: 'Timetable Management screen in the Gyanama app showing Monday periods for class 10-B with the teacher for each period',
  heroTone: 'rose',
  heroCard: 'timetable',
  facts: [
    { k: 'Mon to Sat', v: 'Class-wise timetable' },
    { k: '2,000 characters', v: 'Of rules in plain words' },
    { k: 'Clash check', v: 'No teacher in two classes at once' },
    { k: 'Excel', v: 'Import and export' },
  ],
  sections: [
    {
      q: 'How does the AI draft a timetable?',
      a: 'The school writes its rules in plain words, for example how many periods each subject needs in a week. Gyanama drafts the timetable from those rules for each class.',
      body: 'The rules can run up to 2,000 characters, so the school can describe its own way of planning the week.',
      screen: '/app/timetable-management.png',
      alt: 'Timetable Management screen in the Gyanama app with edit buttons next to each period',
      tone: 'rose',
      card: 'timetable',
    },
    {
      q: 'How are teacher clashes checked?',
      a: 'Gyanama checks every period so that no teacher is placed in two classes at the same time. A clash is shown before the timetable is saved.',
    },
    {
      q: 'Can we change the timetable after the draft?',
      a: 'Yes. The school reviews the draft before saving it, and any period can be edited or added by hand later.',
    },
    {
      q: 'What do students and teachers see?',
      a: 'Students see their weekly timetable day by day, with the subject, teacher and start time of each period. Teachers see their own schedule and the timetable of the class assigned to them.',
      screen: '/app/timetable-student.png',
      alt: 'Weekly timetable for class 10-A in the Gyanama student app, showing Monday periods and teachers',
      tone: 'sky',
    },
  ],
  faqs: [
    { q: 'Is the AI timetable on every plan?', a: 'No. The AI timetable draft is part of the Automate and Autonomy plans. On Assist, the school builds the timetable by hand or imports it from Excel.' },
    { q: 'Which days does the timetable cover?', a: 'Monday to Saturday, class by class.' },
    { q: 'Can we import our current timetable?', a: 'Yes. Timetables import from Excel and export to Excel.' },
    { q: 'Does the draft go live straight away?', a: 'No. The school reviews the draft and saves it only when it is happy with it.' },
  ],
  related: ['/for-teachers', '/school-web-app', '/plans', '/features'],
  updated: '2026-10-31',
};
