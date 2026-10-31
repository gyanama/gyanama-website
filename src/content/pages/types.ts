import type { ToneKey } from '@/components/site/ui';
import type { Faq } from '@/components/seo/JsonLd';

export type CardKey = 'register' | 'callLog' | 'logged' | 'receipt' | 'feeReminder' | 'pillars' | 'reasons' | 'quizSource' | 'quizOutput' | 'timetable' | 'teacherCheck' | 'marked' | 'leave' | 'ptm' | 'doubt';

export type Section = {
  q: string;
  a: string;
  body?: string;
  points?: string[];
  screen?: string;
  alt?: string;
  tone?: ToneKey;
  card?: CardKey;
  link?: { label: string; href: string };
};

export type LandingContent = {
  path: string;
  title: string;
  description: string;
  breadcrumb: string;
  kicker: string;
  h1: string;
  summary: string;
  heroScreen: string;
  heroAlt: string;
  heroTone: ToneKey;
  heroCard?: CardKey;
  secondary?: { label: string; href: string };
  sections: Section[];
  facts?: { k: string; v: string }[];
  faqs: Faq[];
  related: string[];
  cta?: { title: string; body: string };
  updated: string;
  schema?: 'mobile' | 'software';
};
