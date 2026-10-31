import type { LandingContent } from './types';

export const attendance: LandingContent = {
  path: '/student-attendance-management',
  title: 'Student Attendance Management App',
  description: 'Mark student attendance in a few taps, see live percentages for every class and export the monthly register, with AI calls to parents when it keeps falling.',
  breadcrumb: 'Student attendance',
  kicker: 'Student attendance',
  h1: 'Student attendance that the school follows up on.',
  summary:
    'Teachers mark daily attendance in the Gyanama app as Present, Absent, Leave or Half-day. The principal sees live percentages for the school, each class and each section, including sections not marked yet. When a student falls below the school limit this month, Gyanama messages the family and then calls.',
  heroScreen: '/app/mark-attendance.png',
  heroAlt: 'Mark Attendance screen in the Gyanama app',
  heroTone: 'lilac',
  heroCard: 'register',
  facts: [
    { k: '4 statuses', v: 'Present, Absent, Leave, Half-day' },
    { k: 'Live %', v: 'School, class and section' },
    { k: 'PDF or Excel', v: 'Monthly register, A4 or A3' },
    { k: '60% and 40%', v: 'Default follow-up limits' },
  ],
  sections: [
    {
      q: 'How do teachers mark attendance?',
      a: 'The class teacher opens the class in the app and marks each student in a few taps. Approved leave changes an absence to Leave on its own, and a gate pass marks the student as Half-day.',
      screen: '/app/mark-attendance.png',
      alt: 'Mark Attendance screen in the Gyanama app',
      tone: 'lilac',
      card: 'marked',
    },
    {
      q: 'What does the principal see each day?',
      a: "Today's attendance for the school, for every class and for every section, with a flag on sections that have not been marked yet.",
      screen: '/app/attendance-summary.png',
      alt: 'Attendance summary screen in the Gyanama app',
      tone: 'sky',
    },
    {
      q: 'What happens when a student keeps missing school?',
      a: 'Gyanama checks monthly attendance every day. Below 60%, the family gets an app message and up to 3 reminders, then a call. Below 40%, the call goes out straight away.',
      body: 'Calls run between 10 am and 6 pm in Hindi, Hinglish or English. Approved leave, weekends and holidays are skipped, and each school sets its own limits.',
      screen: '/app/absentee-logged.png',
      alt: 'Absentee Call Logs screen in the Gyanama app',
      tone: 'peri',
      card: 'logged',
    },
    {
      q: 'Can we export the attendance register?',
      a: 'Yes. The monthly register for a section or a class downloads as PDF or Excel in A4 or A3, and all sections can be downloaded together as one ZIP file.',
      screen: '/app/attendance-summary.png',
      alt: 'Attendance summary screen in the Gyanama app',
      tone: 'sea',
      card: 'register',
    },
  ],
  faqs: [
    { q: 'Can we set the attendance limit to 75%?', a: 'Yes. 60% and 40% are the starting limits. Each school sets its own limits, so a CBSE school can use 75%.' },
    { q: 'Does approved leave count as an absence?', a: 'No. Approved leave is marked as Leave and never triggers a call.' },
    { q: 'Who can mark attendance?', a: 'The class teacher and any alternate teachers the school assigns to that class.' },
    { q: 'How often is attendance taken?', a: 'Once a day for each section, with Present, Absent, Leave or Half-day for every student.' },
  ],
  related: ['/voice-agent-for-schools', '/for-teachers', '/school-web-app', '/at-risk-student-detection'],
  updated: '2026-10-31',
};
