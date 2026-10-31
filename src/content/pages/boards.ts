import type { LandingContent } from './types';

export const cbse: LandingContent = {
  path: '/cbse-school-software',
  title: 'School Software for CBSE Schools',
  description: 'Gyanama for CBSE schools: A1 to E grading on report cards, test papers from NCERT books, a 75% attendance limit if you want it, and AI calls to parents.',
  breadcrumb: 'CBSE schools',
  kicker: 'For CBSE schools',
  h1: 'School software that fits how a CBSE school runs.',
  summary:
    'Gyanama grades marks on the A1 to E scale used on CBSE report cards, drafts test papers from NCERT books, and lets the school set its attendance limit to 75%. When a student stays below that limit, Gyanama messages the family and then calls, and logs the reason for the class teacher.',
  heroScreen: '/app/score-cards.png',
  heroAlt: 'Score cards screen in the Gyanama app',
  heroTone: 'sky',
  facts: [
    { k: 'A1 to E', v: 'Grade scale' },
    { k: 'NCERT', v: 'Book library for test papers' },
    { k: '75%', v: 'Attendance limit you can set' },
    { k: 'Playgroup to 12', v: 'Classes supported' },
  ],
  sections: [
    {
      q: 'Does Gyanama use the CBSE grading scale?',
      a: 'Yes. Marks are graded A1, A2, B1, B2, C1, C2, D and E, and report cards download as PDFs for a student, a class or the school.',
      screen: '/app/score-cards.png',
      alt: 'Score cards screen in the Gyanama app',
      tone: 'sky',
    },
    {
      q: 'Can teachers make papers from NCERT books?',
      a: 'Yes. Teachers pick a book from the NCERT library, or upload their own textbook PDF, choose up to 5 chapters and the question types, and edit every question.',
      screen: '/app/ai-test.png',
      alt: 'Teacher reviewing AI test questions in the Gyanama app',
      tone: 'marigold',
      card: 'quizOutput',
    },
    {
      q: 'Can we follow up at 75% attendance?',
      a: 'Yes. Each school sets its own attendance limits. Below the limit the family gets messages and reminders, then a call. Below 40% the call goes out straight away.',
      screen: '/app/absentee-logged.png',
      alt: 'Absentee Call Logs screen in the Gyanama app',
      tone: 'peri',
      card: 'register',
    },
  ],
  faqs: [
    { q: 'Does Gyanama make CBSE board pattern papers?', a: 'Gyanama writes MCQ, true or false, fill in the blank, short answer and long answer questions from your chapters. Teachers arrange and edit them before use.' },
    { q: 'Which classes are supported?', a: 'Playgroup, pre-nursery, nursery, LKG and UKG through Class 12.' },
    { q: 'Is the syllabus loaded in?', a: 'Gyanama has NCERT books with chapters for test papers and syllabus views.' },
  ],
  related: ['/report-card-generator', '/ai-assignment-generator', '/boards', '/student-attendance-management'],
  updated: '2026-10-31',
};

export const boardsPage: LandingContent = {
  path: '/boards',
  title: 'For CBSE, ICSE and State Board Schools',
  description: 'Gyanama works for CBSE, ICSE and State Board schools from playgroup to Class 12. Here is what each board gets, from grading to test papers and AI calls.',
  breadcrumb: 'Boards',
  kicker: 'Boards',
  h1: 'Gyanama for CBSE, ICSE and State Board schools.',
  summary:
    'Gyanama works for CBSE, ICSE and State Board schools, from playgroup to Class 12. Attendance, fees, homework, exams, report cards and the AI calls work the same way for every board. CBSE schools also get the A1 to E grade scale and NCERT books for test papers.',
  heroScreen: '/app/principal-dashboard.png',
  heroAlt: 'Principal home screen in the Gyanama app',
  heroTone: 'peri',
  sections: [
    {
      q: 'What works the same for every board?',
      a: 'Attendance and the AI calls to families, fee management, homework, doubts, PTMs, announcements, timetables, the Student Progress Score and report cards.',
      screen: '/app/attendance-summary.png',
      alt: 'Attendance summary screen in the Gyanama app',
      tone: 'sky',
    },
    {
      q: 'What is specific to CBSE?',
      a: 'The A1 to E grade scale on marks and report cards, and the NCERT book library for test papers.',
      screen: '/app/score-cards.png',
      alt: 'Score cards screen in the Gyanama app',
      tone: 'apricot',
    },
    {
      q: 'How do ICSE and State Board schools make test papers?',
      a: 'Teachers upload their own textbook PDF, choose up to 5 chapters and the question types, and edit every question before use.',
      screen: '/app/ai-test.png',
      alt: 'Teacher reviewing AI test questions in the Gyanama app',
      tone: 'marigold',
    },
  ],
  faqs: [
    { q: 'Does Gyanama support IB?', a: 'No. Gyanama supports CBSE, ICSE and State Boards.' },
    { q: 'Can we use our own report card template?', a: "Yes. Report cards use the school's own template and logo." },
  ],
  related: ['/cbse-school-software', '/report-card-generator', '/ai-assignment-generator', '/features'],
  updated: '2026-10-31',
};
