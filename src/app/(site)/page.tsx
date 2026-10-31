import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { faqs, parentFaqs } from '@/content/home';
import { SoftwareApplicationSchema, WebPageSchema, WebSiteSchema } from '@/components/seo/JsonLd';
import { Hero } from '@/components/site/home/Hero';
import { RolesStrip } from '@/components/site/home/RolesStrip';
import { UspShowcase } from '@/components/site/home/UspShowcase';
import { RouteMap } from '@/components/site/home/RouteMap';
import { FeatureExplorer } from '@/components/site/home/FeatureExplorer';
import { FilmAndEcosystem } from '@/components/site/home/Ecosystem';
import { Security } from '@/components/site/home/Security';
import { TrustSection } from '@/components/site/home/Trust';
import { FaqSection } from '@/components/site/FaqSection';
import { CtaBand } from '@/components/site/CtaBand';
import { Reveal } from '@/components/site/Reveal';
import { Kicker, SectionHead, WRAP } from '@/components/site/ui';

const SEO = {
  path: '/',
  title: 'School App With AI Calls to Parents',
  description: 'Gyanama is a school app for Indian schools. It runs attendance, fees, homework and exams, and its AI calls parents when attendance keeps slipping.',
};

export const metadata: Metadata = pageMetadata(SEO);

export default function HomePage() {
  return (
    <>
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <WebPageSchema path={SEO.path} name={SEO.title} description={SEO.description} dateModified="2026-10-31" />
      <Hero />
      <RolesStrip />
      <UspShowcase />
      <section id="how" className="bg-white py-10 md:py-16">
        <div className={WRAP}>
          <Reveal>
            <RouteMap
              heading={
                <div className="max-w-xl">
                  <Kicker>Not another school ERP</Kicker>
                  <h2 className="mt-4 font-fraunces text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.8rem]">Your software records it. Gyanama acts on it.</h2>
                  <p className="mt-3 font-inter text-[15px] text-ink/65 md:text-lg">What happens after attendance, fees and marks are entered.</p>
                </div>
              }
            />
          </Reveal>
        </div>
      </section>
      <section id="features" className="bg-white py-14 md:py-24">
        <div className={WRAP}>
          <Reveal className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            <SectionHead kicker="Everyday school work" title="And the rest of the school day." />
            <p className="max-w-md font-inter text-[15px] leading-relaxed text-ink/60 md:text-lg lg:pb-1.5">Fees, timetable, attendance, leave, PTMs and doubts, in the same app.</p>
          </Reveal>
          <div className="mt-12 md:mt-16">
            <FeatureExplorer exclude={['absence', 'score', 'quiz']} />
          </div>
        </div>
      </section>
      <FilmAndEcosystem />
      <Security />
      <TrustSection />
      <FaqSection items={[...faqs, ...parentFaqs]} />
      <CtaBand />
    </>
  );
}
