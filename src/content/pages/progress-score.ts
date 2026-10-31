import type { LandingContent } from './types';

export const progressScore: LandingContent = {
  path: '/at-risk-student-detection',
  title: 'At-Risk Student Detection for Schools',
  description: 'Gyanama scores every student each night from attendance, marks, homework and behaviour, lists the reasons and projects the final result, so teachers act early.',
  breadcrumb: 'Student Progress Score',
  kicker: 'Student Progress Score',
  h1: 'At-risk student detection with a nightly Student Progress Score.',
  summary:
    'Gyanama gives every student a Student Progress Score each night. It is shown as Health Score in the app. The score weighs attendance at 35%, academics at 30%, homework at 20% and behaviour at 15%, and lists the reasons behind it. Teachers get a list of students at risk, and each student gets a projected final result.',
  heroScreen: '/app/health-score.png',
  heroAlt: 'AI Health Score screen in the Gyanama app with the overall score, a performance breakdown and insights by class',
  heroTone: 'sky',
  heroCard: 'pillars',
  facts: [
    { k: '35, 30, 20, 15', v: 'Attendance, academics, homework, behaviour' },
    { k: 'Nightly', v: 'Recomputed at 00:30' },
    { k: '3 bands', v: 'Good, Watch and At risk' },
    { k: 'Projected', v: 'Final percentage and grade' },
  ],
  sections: [
    {
      q: 'How is the Student Progress Score worked out?',
      a: 'Gyanama combines four parts: attendance (35%), academics (30%), homework (20%) and behaviour (15%). The score is recomputed every night at 00:30 for each student, each class and the whole school.',
      body: 'The app shows this score as Health Score. It is the same score.',
      screen: '/app/health-score.png',
      alt: 'Health Score screen in the Gyanama app with academics and behaviour shown separately',
      tone: 'sky',
      card: 'pillars',
    },
    {
      q: 'How does Gyanama show why a student is slipping?',
      a: 'Next to each score Gyanama lists what is pulling it down or lifting it, such as days missed this month or homework handed in late. Students are grouped as Good, Watch or At risk.',
      points: ['Reasons in plain words, per student', 'Good, Watch and At risk bands', 'A list of students at risk for teachers'],
    },
    {
      q: "Can Gyanama predict a student's final result?",
      a: "Yes. Gyanama projects each student's final percentage and grade from marks, attendance and homework so far this term, and shows the factors moving it up or down.",
      screen: '/app/brain.png',
      alt: 'AI Brain Analysis screen in the Gyanama app with a projected score of 88%, Grade A, and the factors moving it',
      tone: 'lilac',
      card: 'reasons',
    },
    {
      q: 'Who sees the at-risk list?',
      a: 'Teachers see the students at risk in their classes. The principal sees the score for every class and for the whole school, recomputed every night.',
      link: { label: 'What a principal sees', href: '/for-principals' },
    },
  ],
  faqs: [
    { q: 'Why is it called Health Score in the app?', a: 'The app shows the Student Progress Score as AI Health Score. It is the same score, with the same four parts.' },
    { q: 'How often does the score change?', a: 'Gyanama recomputes it every night at 00:30 from the latest attendance, marks, homework and behaviour records.' },
    { q: 'Which plans include the Student Progress Score?', a: 'Automate and Autonomy. Both include the score and the projected result.' },
    { q: 'What data does the score need?', a: 'Attendance, marks, homework and behaviour records that teachers already enter in Gyanama. Nothing extra is entered for the score.' },
  ],
  related: ['/for-principals', '/student-attendance-management', '/report-card-generator', '/ai-systems'],
  updated: '2026-10-31',
};
