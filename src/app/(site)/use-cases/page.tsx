import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { useCases as content } from '@/content/pages/use-cases';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function UseCasesPage() {
  return <LandingPage c={content} />;
}
