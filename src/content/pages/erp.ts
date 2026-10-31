import type { LandingContent } from './types';

export const schoolErp: LandingContent = {
  path: '/school-erp',
  title: 'School ERP: What It Does and What It Misses',
  description: 'A plain guide to school ERP software in India: what an ERP records well, the follow-up work it leaves to staff, and how Gyanama covers both in one app.',
  breadcrumb: 'School ERP',
  kicker: 'School ERP',
  h1: 'School ERP software: what it records, and the follow-up it leaves to staff.',
  summary:
    'A school ERP keeps the records: students, attendance, fees, exams, report cards and timetables. In most schools, the work that follows is still done by hand, such as calling the parent of a child who keeps missing school or chasing an overdue fee. Gyanama keeps the same records and does that follow-up with AI calls, reminders and a nightly score for every student.',
  heroScreen: '/app/principal-dashboard.png',
  heroAlt: 'Principal home screen in the Gyanama app with attendance, absentee calls and staff present',
  heroTone: 'peri',
  heroCard: 'callLog',
  sections: [
    {
      q: 'What does a school ERP do?',
      a: "It stores the school's records in one system: student details, attendance, fees and receipts, exams and marks, report cards, timetables and staff. Staff and families look things up there.",
    },
    {
      q: 'What does an ERP usually leave to staff?',
      a: 'The follow-up. Someone has to notice that a student has missed too many days, call the family, chase overdue fees and spot a student whose marks are sliding. In a busy week that work slips.',
    },
    {
      q: 'Which ERP records does Gyanama keep?',
      a: 'Gyanama keeps the records a school expects from an ERP, on Android, iOS and the web.',
      points: [
        'Daily attendance with monthly registers in PDF or Excel',
        'Fee structures, invoices and numbered PDF receipts',
        'Exam schedules, marks graded A1 to E and report cards',
        'Transfer certificates, timetables, homework, leave and gate passes',
      ],
      screen: '/app/attendance-summary.png',
      alt: 'Attendance summary screen in the Gyanama app with percentages by class',
      tone: 'sky',
      card: 'register',
    },
    {
      q: 'What does Gyanama add on top of the records?',
      a: 'It calls families when attendance keeps falling or a fee is overdue, scores every student every night with the reasons, projects final results, and drafts test papers and timetables for staff to review.',
      screen: '/app/absentee-logged.png',
      alt: 'Absentee Call Logs screen in the Gyanama app listing calls made to families',
      tone: 'peri',
      card: 'logged',
    },
    {
      q: 'What should a school check before choosing an ERP?',
      a: 'Whether teachers and families get an Android and iOS app, who moves your data in, where the servers are, how people sign in and what happens after attendance is marked.',
      body: 'For Gyanama: the apps run on Android 7.0 or later and iOS 13 or later, our team imports your Excel sheets, the servers are in India, and every sign in uses a one-time code.',
      link: { label: 'Gyanama vs school software', href: '/vs-school-management-software' },
    },
  ],
  faqs: [
    { q: 'Is Gyanama a school ERP?', a: 'It keeps the same records an ERP keeps, and it also follows up with families and flags students who are slipping.' },
    { q: 'Can we move from our current ERP?', a: 'Yes. Export your students, staff, classes and timetable to Excel and our team imports them.' },
    { q: 'Does Gyanama have a web version?', a: "Yes. Each school gets its own web address, such as yourschool.gyanama.in, with the school's name and logo." },
    { q: 'Which boards does Gyanama support?', a: 'CBSE, ICSE and State Boards, from playgroup to Class 12.' },
  ],
  related: ['/vs-school-management-software', '/features', '/school-web-app', '/fee-management-system'],
  updated: '2026-10-31',
};

export const vsSoftware: LandingContent = {
  path: '/vs-school-management-software',
  title: 'Gyanama vs School Management Software',
  description: 'An honest comparison of Gyanama and typical school management software. Both keep the records. Gyanama also calls families, chases fees and flags students.',
  breadcrumb: 'Gyanama vs school software',
  kicker: 'Comparison',
  h1: 'Gyanama vs school management software: records and follow-up.',
  summary:
    'Typical school management software stores attendance, fees and marks, and staff do the follow-up by hand. Gyanama keeps the same records and then acts on them. It messages and calls families when attendance keeps falling, calls about overdue fees, scores every student each night and tells teachers who is slipping. The table below compares the two, task by task.',
  heroScreen: '/app/absentee-logged.png',
  heroAlt: 'Absentee Call Logs screen in the Gyanama app listing calls made to families',
  heroTone: 'peri',
  heroCard: 'logged',
  sections: [
    {
      q: 'When is a records-only system enough?',
      a: 'If your staff already have time to call every absent family and chase every overdue fee, a records-only system may be enough. Gyanama is for schools where that follow-up keeps slipping.',
    },
    {
      q: 'Can we switch from our current software?',
      a: 'Yes. Send your students, staff, classes and timetable in Excel and our team imports them. Attendance, fees and exams then start in Gyanama.',
      screen: '/app/principal-dashboard.png',
      alt: 'Principal home screen in the Gyanama app',
      tone: 'sky',
    },
  ],
  faqs: [
    { q: 'Does Gyanama replace our school management software?', a: 'It can. Gyanama covers attendance, fees, exams, report cards, timetables, homework and communication with families.' },
    { q: 'Do we have to use the AI calls?', a: 'No. Calls are off on the Assist plan. On the other plans the school sets the attendance limits and the Do Not Call list.' },
    { q: 'Do families need another app?', a: "No. Families use the student's login in the Gyanama app." },
  ],
  related: ['/school-erp', '/features', '/ai-systems', '/plans'],
  updated: '2026-10-31',
};

export const comparisonRows = [
  { task: 'Daily attendance', other: 'Marked and stored', ours: 'Marked in a few taps, with live percentages for every class and section' },
  { task: 'A student keeps missing school', other: 'Someone notices later and calls from a personal phone', ours: 'Below 60%, an app message and up to 3 reminders, then a call. Below 40%, a call straight away' },
  { task: 'Overdue fees', other: 'Office staff call families one by one', ours: 'A reminder call the day after the due date, logged against the student' },
  { task: 'Students slipping in marks', other: 'Usually seen on the report card', ours: 'A nightly Student Progress Score with the reasons, and a projected final result' },
  { task: 'Test papers', other: 'Typed by the teacher', ours: 'Drafted from your textbook or an NCERT book, then edited by the teacher' },
  { task: 'Timetable', other: 'Built by hand', ours: 'Drafted from your rules and checked for teacher clashes, then reviewed' },
  { task: 'Report cards', other: 'Usually included', ours: "PDF report cards graded A1 to E, on the school's own template and logo" },
  { task: 'Moving your data in', other: 'Depends on the vendor', ours: 'Our team imports your Excel sheets' },
];
