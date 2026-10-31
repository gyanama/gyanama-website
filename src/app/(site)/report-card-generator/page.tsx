import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { reportCards as content } from '@/content/pages/report-cards';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function ReportCardGeneratorPage() {
  return <LandingPage c={content} />;
}
