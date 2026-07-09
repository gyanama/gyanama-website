import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Minus } from 'lucide-react';

const ROWS = [
  ['Attendance', 'Stores who was absent', 'Detects the pattern and calls the parent automatically'],
  ['Fees', 'Records what’s pending', 'Runs reminder calls and tracks who has paid'],
  ['Academics', 'Holds marks and reports', 'Surfaces the students who need attention, early'],
  ['Assignments', 'A place to upload homework', 'Generates syllabus-aligned assignments in minutes'],
  ['Management view', 'A dashboard to open and read', 'Tells you what deserves attention today'],
  ['Default behaviour', 'Waits for a human to act', 'Acts on what’s happening'],
];

const FAQS = [
  {
    question: 'Is Gyanama a school management system?',
    answer:
      'Gyanama does everything a school management system does — attendance, fees, academics, communication — but it goes further. It is an AI operating system for schools: instead of only storing data and waiting, it understands what is happening, flags what needs attention, and takes action automatically.',
  },
  {
    question: 'What is the difference between a school ERP and Gyanama?',
    answer:
      'A school ERP is a system of record: it stores attendance, fees and marks and shows dashboards. Gyanama is a system of action: it notices attendance problems and calls parents, follows up on pending fees, and surfaces at-risk students without a staff member having to check first.',
  },
  {
    question: 'Can Gyanama replace our current school software?',
    answer:
      'Yes. Gyanama covers the full operations of a school — attendance, fees, exams, timetables, communication and more — on web, Android and iOS, with an AI layer that acts on the data instead of just storing it.',
  },
];

const Vs = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="Gyanama vs School Management Software" pagePath="/vs-school-management-software" />
      <FAQPageSchema faqs={FAQS} />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            Gyanama vs a school management system
          </span>
          <h1 className="text-display mt-6 mb-5">
            Looking for school management software?{' '}
            <span className="text-gradient-primary">Here’s what to look for instead.</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Most school management systems and ERPs are systems of record — they store your data and
            wait. Gyanama does the same job, then acts on it. Same attendance, fees and marks; a
            completely different result.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="rounded-3xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-semibold">
              <div className="p-4 bg-muted text-muted-foreground">Area</div>
              <div className="p-4 bg-muted text-muted-foreground">Traditional school software</div>
              <div className="p-4 gradient-primary text-white">Gyanama</div>
            </div>
            {ROWS.map(([area, passive, active], i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="grid grid-cols-3 border-t border-border text-sm"
              >
                <div className="p-4 font-medium">{area}</div>
                <div className="p-4 text-muted-foreground bg-muted/40 flex items-start gap-2">
                  <Minus className="w-4 h-4 shrink-0 mt-0.5" /> {passive}
                </div>
                <div className="p-4 flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {active}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6">
            We don’t think traditional school software is bad — it just stops at storing the data.
            Gyanama is built for what happens next.
          </p>
        </div>
      </section>

      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-10">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold mb-2">{f.question}</h3>
                <p className="text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            See the difference on your own school’s data.
          </h2>
          <p className="text-subtitle mb-8">Book a 20-minute demo on real screens.</p>
          <Link to="/book-demo">
            <Button variant="hero" size="lg" className="group">
              Book a Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default Vs;
