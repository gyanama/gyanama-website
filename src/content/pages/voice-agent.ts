import { voice } from '@/content/voice';
import { parentFaqs } from '@/content/home';
import type { LandingContent } from './types';

export const voiceAgent: LandingContent = {
  path: '/voice-agent-for-schools',
  title: 'Voice Agent for Schools: AI Calls to Parents',
  description: "Gyanama's voice agent for schools calls parents about low attendance and overdue fees from school data, in Hindi, Hinglish or English, and logs every call.",
  breadcrumb: 'AI calls to parents',
  kicker: voice.eyebrow,
  h1: 'A voice agent for schools that calls parents about absences and fees.',
  summary:
    "Gyanama's voice agent calls parents when a child's monthly attendance keeps falling or a fee is overdue. It works from the school's own records, so nobody uploads call lists or writes scripts. Calls run from 10 am to 6 pm in Hindi, Hinglish or English, and the reason, the parent's response and any follow-up are logged for the class teacher.",
  heroScreen: '/app/absentee-logged.png',
  heroAlt: 'Absentee Call Logs screen in the Gyanama app listing calls made to families',
  heroTone: 'peri',
  heroCard: 'logged',
  secondary: { label: 'Read a real call', href: '#call' },
  facts: [
    { k: '10 am to 6 pm', v: 'Call hours' },
    { k: '4 minutes', v: 'Longest attendance call' },
    { k: '50 a day', v: 'Calls per school by default' },
    { k: 'Do Not Call', v: 'Numbers you add are never called' },
  ],
  sections: [
    {
      q: 'How do fee reminder calls work?',
      a: "The day after a fee's due date, Gyanama calls the family between 10 am and 6 pm. The call lasts up to 3 minutes and only reminds them that the fee is due.",
      body: 'It never takes a payment, quotes an amount or sends a link.',
      screen: '/app/fee-payment.png',
      alt: 'Fee Payment screen in the Gyanama app with the due date for the quarter',
      tone: 'apricot',
      card: 'feeReminder',
      link: { label: 'Fee management', href: '/fee-management-system' },
    },
  ],
  faqs: [
    ...voice.faqs,
    ...parentFaqs,
    { q: 'Which plans include the calls?', a: 'Automate and Autonomy. Calls are off on Assist.' },
  ],
  related: ['/for-parents', '/student-attendance-management', '/fee-management-system', '/ai-systems'],
  updated: '2026-10-31',
};
