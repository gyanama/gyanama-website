import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const PrivacyPolicy = () => {
  useDocumentTitle('Privacy Policy');

  return (
    <PageLayout>
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-display mb-6">Privacy Policy</h1>
            <p className="text-subtitle">
              Your privacy matters to us. Learn how GYANAMA handles your data.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
            <p className="text-muted-foreground mb-6">
              We collect only the information necessary to provide our services: name, email address, phone number, and school details when you request a demo. We do not sell or share your personal data with third parties.
            </p>

            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-6">
              Your information is used solely to respond to your demo requests, communicate about our services, and improve the GYANAMA platform experience.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We implement industry-standard security measures to protect your personal information. All data transmissions are encrypted and stored securely.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              If you have questions about this privacy policy or your data, please contact us at{' '}
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

export default PrivacyPolicy;
