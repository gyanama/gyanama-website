import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, WebSiteSchema, SoftwareApplicationSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { faqData } from '@/lib/faq-data';
import { HeroSection } from '@/components/home/HeroSection';
import { RoleSection } from '@/components/home/RoleSection';
import { DashboardSection } from '@/components/home/DashboardSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { AISystemsOverview } from '@/components/home/AISystemsOverview';
import { CapabilitiesSection } from '@/components/home/CapabilitiesSection';
import { WhySection } from '@/components/home/WhySection';
import { SecuritySection } from '@/components/home/SecuritySection';
import { PricingSection } from '@/components/home/PricingSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';
import { MobileAppSection } from '@/components/home/MobileAppSection';

const Index = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <FAQPageSchema faqs={faqData} />
      <HeroSection />
      <RoleSection />
      <MobileAppSection />
      <DashboardSection />
      <ProblemSection />
      <AISystemsOverview />
      <CapabilitiesSection />
      <WhySection />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </PageLayout>
  );
};

export default Index;
