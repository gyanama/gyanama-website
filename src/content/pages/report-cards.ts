import type { LandingContent } from './types';

export const reportCards: LandingContent = {
  path: '/report-card-generator',
  title: 'Report Card Generator for Schools',
  description: 'Enter marks once and Gyanama grades them from A1 to E and makes report card PDFs for a student, a class or the whole school, on your own template.',
  breadcrumb: 'Exams and report cards',
  kicker: 'Exams and report cards',
  h1: 'Exam schedules, marks and report cards in one place.',
  summary:
    "In Gyanama the school publishes an exam schedule with dates, times and maximum marks, teachers upload marks, and every mark is graded from A1 to E. Report cards download as PDFs for one student, a class or the whole school, in term and session versions, on the school's own template and logo.",
  heroScreen: '/app/marks-upload.png',
  heroAlt: 'Marks upload screen in the Gyanama app',
  heroTone: 'sky',
  facts: [
    { k: 'A1 to E', v: 'Grades applied to every mark' },
    { k: 'PDF', v: 'Student, class or whole school' },
    { k: 'Term and session', v: 'Both report card versions' },
    { k: 'Your template', v: "With the school's logo" },
  ],
  sections: [
    {
      q: 'How is an exam scheduled?',
      a: 'The school sets the date, time and maximum marks for each subject. Publishing the schedule sends a notification and makes a printable exam timetable.',
      screen: '/app/exam-details.png',
      alt: 'Exam details screen in the Gyanama app',
      tone: 'peri',
    },
    {
      q: 'How are marks entered and graded?',
      a: 'Teachers upload marks for their class and subject. Gyanama grades each mark on the A1, A2, B1, B2, C1, C2, D and E scale.',
      screen: '/app/marks-upload.png',
      alt: 'Marks upload screen in the Gyanama app',
      tone: 'lilac',
    },
    {
      q: 'What report cards can we download?',
      a: "A report card for one student, for a whole class, or for every student in the school as a ZIP file. Term and session-cumulative versions use the school's own template and logo.",
      screen: '/app/score-cards.png',
      alt: 'Score cards screen in the Gyanama app',
      tone: 'apricot',
    },
    {
      q: 'Can we issue transfer certificates?',
      a: 'Yes. Gyanama makes a numbered transfer certificate as a PDF, with dates also written in words.',
      screen: '/app/student-info.png',
      alt: 'Student information screen in the Gyanama app',
      tone: 'sea',
    },
  ],
  faqs: [
    { q: 'Which grading scale does Gyanama use?', a: 'Marks are graded A1, A2, B1, B2, C1, C2, D and E.' },
    { q: 'Can students see their results?', a: 'Yes. Students and families see exam dates and results in the app, and can view report cards.' },
    { q: 'Do report cards carry our school logo?', a: "Yes. Report cards, receipts, registers and transfer certificates carry the school's name and logo." },
    { q: 'Where are report cards downloaded?', a: 'On the web app. Single, class and whole-school PDFs are made there.' },
  ],
  related: ['/cbse-school-software', '/school-web-app', '/at-risk-student-detection', '/ai-assignment-generator'],
  updated: '2026-10-31',
};
