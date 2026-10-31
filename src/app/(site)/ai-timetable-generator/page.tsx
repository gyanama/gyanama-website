import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { timetable as content } from '@/content/pages/timetable';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function AiTimetableGeneratorPage() {
  return <LandingPage c={content} />;
}
