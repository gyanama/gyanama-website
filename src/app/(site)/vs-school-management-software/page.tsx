import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { vsSoftware as content, comparisonRows } from '@/content/pages/erp';
import { LandingPage } from '@/components/landing/LandingPage';
import { Block } from '@/components/landing/Block';
import { Comparison } from '@/components/landing/Comparison';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function VsSchoolManagementSoftwarePage() {
  return (
    <LandingPage c={content}>
      <Block q="What is the difference between Gyanama and school management software?" a="Both keep the records. Gyanama also follows up on them: it calls families, chases overdue fees and flags students who are slipping, and logs every outcome for the teacher.">
        <Comparison rows={comparisonRows} otherLabel="Records-only software" oursLabel="Gyanama" />
      </Block>
    </LandingPage>
  );
}
