import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, WebSiteSchema, SoftwareApplicationSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { faqData } from '@/lib/faq-data';
import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { ShiftSection } from '@/components/home/ShiftSection';
import { DifferentiationSection } from '@/components/home/DifferentiationSection';
import { ScenariosSection } from '@/components/home/ScenariosSection';
import { IntelligenceSection } from '@/components/home/IntelligenceSection';
import { RoleSection } from '@/components/home/RoleSection';
import { TrustSection } from '@/components/home/TrustSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <FAQPageSchema faqs={faqData} />

      {/* 1 What is Gyanama + 5-sec */}
      <HeroSection />
      {/* 3 Do you understand my problems — the passive-software problem */}
      <ProblemSection />
      {/* 2 Why care — the shift to an operating layer */}
      <ShiftSection />
      {/* 4 How is this different — passive vs Gyanama */}
      <DifferentiationSection />
      {/* 5 + 6 What it does + how the AI works — outcome scenarios */}
      <ScenariosSection />
      {/* 7 Can I see it — the intelligence layer, real screens */}
      <IntelligenceSection />
      {/* Who it's for */}
      <RoleSection />
      {/* Trust at pre-customer stage */}
      <TrustSection />
      {/* Objections + GEO */}
      <FAQSection />
      {/* 8 Why book a demo */}
      <CTASection />
    </PageLayout>
  );
};

export default Index;
