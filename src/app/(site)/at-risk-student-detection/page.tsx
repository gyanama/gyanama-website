import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { progressScore as content } from '@/content/pages/progress-score';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function AtRiskStudentDetectionPage() {
  return <LandingPage c={content} />;
}
