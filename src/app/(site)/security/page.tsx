import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { security as content } from '@/content/pages/security';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function SecurityPage() {
  return <LandingPage c={content} />;
}
