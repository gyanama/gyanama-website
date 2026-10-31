import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { boardsPage as content } from '@/content/pages/boards';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function BoardsPage() {
  return <LandingPage c={content} />;
}
