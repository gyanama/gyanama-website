import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { aiForSchools as content } from '@/content/pages/ai';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function AiForSchoolsPage() {
  return <LandingPage c={content} />;
}
