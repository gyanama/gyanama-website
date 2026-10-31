import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { cbse as content } from '@/content/pages/boards';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function CbseSchoolSoftwarePage() {
  return <LandingPage c={content} />;
}
