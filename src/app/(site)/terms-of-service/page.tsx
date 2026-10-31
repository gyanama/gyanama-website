import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { TermsOfServiceContent } from '@/components/legal/TermsOfServiceContent';

export const metadata: Metadata = pageMetadata({
  path: '/terms-of-service',
  title: 'Terms of Service',
  description: 'The terms that apply when schools, staff, students and families use the GYANAMA website, web dashboard and Android and iOS apps.',
});

export default function Page() {
  return <TermsOfServiceContent />;
}
