import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { attendance as content } from '@/content/pages/attendance';
import { LandingPage } from '@/components/landing/LandingPage';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function StudentAttendanceManagementPage() {
  return <LandingPage c={content} />;
}
