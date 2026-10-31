import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { forParents as content } from '@/content/pages/roles';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function ForParentsPage() {
  return <LandingPage c={content} />;
}
