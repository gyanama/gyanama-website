import type { LandingContent } from './types';

export const homework: LandingContent = {
  path: '/homework-app',
  title: 'Homework App for Schools',
  description: 'Teachers set homework with a deadline, students submit files in the app, and the teacher sees who submitted and who opened it. Doubts are answered there too.',
  breadcrumb: 'Homework and doubts',
  kicker: 'Homework and doubts',
  h1: 'Set homework, see who submitted, answer doubts.',
  summary:
    'In Gyanama a teacher sets homework with a deadline and attachments. Students submit files and a note from the app, and the teacher sees who submitted, who opened it and how often. Students ask doubts by subject, and teachers reply with text and attachments in the same app.',
  heroScreen: '/app/homework.png',
  heroAlt: 'Homework screen in the Gyanama app',
  heroTone: 'marigold',
  facts: [
    { k: '10 files', v: 'Per upload' },
    { k: '50 MB', v: 'Per file' },
    { k: 'Opened by', v: 'Teachers see who opened it' },
    { k: 'Reminders', v: 'For pending homework' },
  ],
  sections: [
    {
      q: 'How does a teacher set homework?',
      a: 'The teacher writes the task, sets a deadline and attaches up to 10 files of up to 50 MB each.',
      screen: '/app/homework.png',
      alt: 'Homework screen in the Gyanama app',
      tone: 'marigold',
    },
    {
      q: 'How do students submit?',
      a: 'Students open the subject in the app, add their files and a note, and submit. The teacher sees who submitted and who has not.',
      screen: '/app/student-dashboard.png',
      alt: 'Student home screen in the Gyanama app',
      tone: 'apricot',
    },
    {
      q: 'How are doubts handled?',
      a: 'A student asks a doubt under a subject, with attachments if needed. The teacher replies in the app and the doubt is marked as answered.',
      screen: '/app/doubts.png',
      alt: 'Student doubts screen in the Gyanama app',
      tone: 'sea',
      card: 'doubt',
    },
    {
      q: 'Does homework count towards the Student Progress Score?',
      a: "Yes. Homework is 20% of each student's nightly score, next to attendance at 35%, marks at 30% and behaviour at 15%.",
      screen: '/app/health-score.png',
      alt: 'Score screen in the Gyanama app',
      tone: 'sky',
      card: 'pillars',
    },
  ],
  faqs: [
    { q: 'Can teachers grade homework in the app?', a: 'Not yet. Teachers see who submitted and who opened the homework. Marks for exams are entered separately.' },
    { q: 'Do students get reminders?', a: 'Yes. Students get reminders for pending homework, forms and upcoming exams.' },
    { q: 'How big can attachments be?', a: 'Up to 10 files per upload, up to 50 MB each.' },
  ],
  related: ['/for-teachers', '/school-app', '/at-risk-student-detection', '/parent-teacher-communication'],
  updated: '2026-10-31',
};
