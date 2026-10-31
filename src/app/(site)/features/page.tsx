import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { features as content, featureGroups } from '@/content/pages/features';
import { LandingPage } from '@/components/landing/LandingPage';
import { FeatureHub } from '@/components/landing/FeatureHub';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function FeaturesPage() {
  return (
    <LandingPage c={content}>
      <FeatureHub groups={featureGroups} />
    </LandingPage>
  );
}
