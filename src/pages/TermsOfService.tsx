import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

const TermsOfService = () => {
  return (
    <PageLayout>
      <SEOHead />
      <BreadcrumbSchema pageName="Terms of Service" pagePath="/terms-of-service" />
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-display mb-6">Terms of Service</h1>
            <p className="text-subtitle">
              Please review the terms and conditions for using GYANAMA services.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing and using the GYANAMA platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
            <p className="text-muted-foreground mb-6">
              GYANAMA provides AI-powered school management tools designed for educational institutions. You agree to use the service only for its intended purpose and in compliance with all applicable laws.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground mb-6">
              All content, features, and functionality of the GYANAMA platform are owned by GYANAMA and are protected by intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground mb-6">
              GYANAMA shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-muted-foreground mb-6">
              For questions about these terms, contact us at{' '}
              <a href="mailto:gyanamaedu@gmail.com" className="text-primary hover:underline">
                gyanamaedu@gmail.com
              </a>
            </p>

            <p className="text-sm text-muted-foreground/60 mt-12">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfService;
