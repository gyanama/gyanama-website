import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { plans as content, planTiers } from '@/content/pages/plans';
import { LandingPage } from '@/components/landing/LandingPage';
import { Block } from '@/components/landing/Block';
import { PlanCards } from '@/components/landing/PlanCards';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function PlansPage() {
  return (
    <LandingPage c={content}>
      <Block q="What does each plan include?" a="Assist is the school app for everyday school work. Automate adds the AI features, and Autonomy adds a fully white-labelled app and a dedicated team. Prices are shared on a call.">
        <PlanCards tiers={planTiers} />
      </Block>
    </LandingPage>
  );
}
