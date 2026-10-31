import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { testPapers as content } from '@/content/pages/test-papers';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function AiAssignmentGeneratorPage() {
  return <LandingPage c={content} />;
}
