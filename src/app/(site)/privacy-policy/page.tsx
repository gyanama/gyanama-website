import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PrivacyPolicyContent } from '@/components/legal/PrivacyPolicyContent';

export const metadata: Metadata = pageMetadata({
  path: '/privacy-policy',
  title: 'Privacy Policy',
  description: 'How GYANAMA collects, uses, stores and protects information across the website, the web dashboard and the Android and iOS apps.',
});

export default function Page() {
  return <PrivacyPolicyContent />;
}
