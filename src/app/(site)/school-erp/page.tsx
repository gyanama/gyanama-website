import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { schoolErp as content } from '@/content/pages/erp';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function SchoolErpPage() {
  return <LandingPage c={content} />;
}
