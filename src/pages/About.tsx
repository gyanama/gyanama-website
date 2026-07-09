import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const BELIEFS = [
  { title: 'Software should act, not just store', body: 'A school already has the data. The job worth doing is acting on it. That conviction is the whole product.' },
  { title: 'AI with a purpose', body: 'No AI for marketing’s sake. Every AI feature does something a human can’t do at a school’s scale. Like calling every absent child’s parent, every day.' },
  { title: 'Built from real classrooms', body: 'We started from what we actually saw teachers and principals doing by hand. Not from a feature list.' },
];

const About = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="About" pagePath="/about" />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-display mb-5">
            We watched teachers lose their evenings.{' '}
            <span className="text-gradient-primary">So we built Gyanama.</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Gyanama is an AI operating system for schools. Built by two founders who saw, up close,
            how much of a school runs on registers, spreadsheets, and manual phone calls.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="prose-lg space-y-5 text-lg text-foreground/85 leading-relaxed">
            <p>
              It started with a teacher we knew: a friend’s mother. Every evening she’d sit with a
              paper register, squinting to tally attendance, then hand-build the next day’s
              assignments, then call the parents of the children who’d been absent for too long. One
              by one.
            </p>
            <p>
              We saw the same thing in a family member’s school: a principal running the entire place
              out of Excel, with a separate sheet for student details, marks, exams, and fees. The
              data was all there. But acting on it was completely manual, and things slipped through.
            </p>
            <p>
              We’re young. We were still in college when we started. Maybe that’s why the whole thing
              looked so obviously broken to us. The school already knew who was slipping and who
              hadn’t paid. The software just sat on it and waited for a human to notice.
            </p>
            <p className="font-medium text-foreground">
              So we built the thing that doesn’t wait. Gyanama understands what’s happening across a
              school, flags what needs attention, and takes action. So the people running the school
              can get back to running the school.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-10">What we believe</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-muted-foreground">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Come see what we built.
          </h2>
          <p className="text-subtitle mb-8">Book a demo and we’ll show you Gyanama on real screens.</p>
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

export default About;
