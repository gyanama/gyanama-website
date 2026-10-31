import type { LandingContent } from './types';

export const testPapers: LandingContent = {
  path: '/ai-assignment-generator',
  title: 'AI Test Paper Generator for Schools',
  description: 'Teachers pick a textbook PDF or an NCERT book and up to 5 chapters. Gyanama drafts a question paper and answer key in English or Hindi for the teacher to edit.',
  breadcrumb: 'Test papers',
  kicker: 'Test papers',
  h1: 'An AI test paper generator that works from your own textbook.',
  summary:
    'Gyanama drafts test papers from the book a class actually uses. A teacher uploads a textbook PDF or picks a book from the NCERT library, chooses 1 to 5 chapters, the question types, the difficulty and English or Hindi. Gyanama writes a question paper and an answer key, and the teacher edits every question before the paper is used.',
  heroScreen: '/app/ai-test.png',
  heroAlt: 'AI Test screen in the Gyanama app with questions drafted from a Physics chapter, each with buttons to mark, remove or redo it',
  heroTone: 'marigold',
  heroCard: 'quizSource',
  facts: [
    { k: '1 to 5', v: 'Chapters per paper' },
    { k: '5 question types', v: 'From MCQ to long answer' },
    { k: 'English or Hindi', v: 'Language of the paper' },
    { k: 'Answer key', v: 'With every paper' },
  ],
  sections: [
    {
      q: 'Where do the questions come from?',
      a: "From the school's own textbook PDF or from a book in the NCERT library. The teacher picks 1 to 5 chapters, and Gyanama writes the questions from those chapters.",
      screen: '/app/exams-ai.png',
      alt: 'Exams and Reports screen in the Gyanama app with the AI Test Generator button above the exam list',
      tone: 'sky',
      card: 'quizSource',
    },
    {
      q: 'Which question types can a paper have?',
      a: "MCQ, true or false, fill in the blank, short answer and long answer. The teacher also sets the difficulty, from easy to hard, and the Bloom's levels.",
      points: ['MCQ', 'True or false', 'Fill in the blank', 'Short answer and long answer'],
    },
    {
      q: 'Does the teacher check the questions?',
      a: 'Yes. Every question can be edited before the paper is used. The teacher can also remove a question or ask Gyanama to write it again.',
      screen: '/app/ai-test.png',
      alt: 'AI Test screen in the Gyanama app with a note that the teacher can edit or remove any question',
      tone: 'marigold',
      card: 'quizOutput',
    },
    {
      q: 'What does the teacher get at the end?',
      a: 'A question paper as a PDF and an answer key, in English or Hindi.',
    },
  ],
  faqs: [
    { q: 'Does it work for ICSE and State Board books?', a: 'Yes. Teachers upload their own textbook PDF. CBSE schools can also pick books from the NCERT library.' },
    { q: 'How many chapters can one paper cover?', a: 'Between 1 and 5 chapters.' },
    { q: 'Which plans include test papers?', a: 'Automate and Autonomy. Test papers are not part of Assist.' },
    { q: 'Can the teacher change a question?', a: 'Yes. Every question is editable, and the teacher decides what goes into the final paper.' },
  ],
  related: ['/for-teachers', '/cbse-school-software', '/report-card-generator', '/homework-app'],
  updated: '2026-10-31',
};
