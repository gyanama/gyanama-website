import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { feeManagement as content } from '@/content/pages/fees';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function FeeManagementSystemPage() {
  return <LandingPage c={content} />;
}
