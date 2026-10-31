import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { homework as content } from '@/content/pages/homework';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function HomeworkAppPage() {
  return <LandingPage c={content} />;
}
