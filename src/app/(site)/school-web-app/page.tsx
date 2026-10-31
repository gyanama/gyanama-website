import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { schoolWebApp as content } from '@/content/pages/school-web-app';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function SchoolWebAppPage() {
  return <LandingPage c={content} />;
}
