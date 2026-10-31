import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { schoolApp as content } from '@/content/pages/school-app';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function SchoolAppPage() {
  return <LandingPage c={content} />;
}
