import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { parentCommunication as content } from '@/content/pages/parent-communication';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function ParentTeacherCommunicationPage() {
  return <LandingPage c={content} />;
}
