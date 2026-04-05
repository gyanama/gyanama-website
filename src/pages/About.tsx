import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Target, Lightbulb, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Student First',
    description: 'Every feature exists because it helps a child learn better, stay safer, or thrive more fully.',
  },
  {
    icon: Target,
    title: 'Clarity Over Complexity',
    description: 'We believe powerful software should feel simple. If it\'s confusing, we haven\'t finished building it.',
  },
  {
    icon: Lightbulb,
    title: 'AI With Purpose',
    description: 'We don\'t add AI for marketing. Every AI feature solves a real problem that humans alone can\'t solve at scale.',
  },
  {
    icon: Users,
    title: 'Partnership, Not Sales',
    description: 'We succeed when your school succeeds. That\'s why we measure our impact by outcomes, not invoices.',
  },
];

const About = () => {
  useDocumentTitle('About');
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-display mb-6 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Because every child's day matters.
            </h1>
            <p className="text-subtitle">
              GYANAMA exists to give schools the intelligent infrastructure they need to focus on what matters most: education.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-headline mb-6 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Schools today are drowning in administration. Principals spend more time on paperwork than on pedagogy. Teachers are exhausted by tasks that have nothing to do with teaching. And parents feel disconnected from their children's education.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                We built GYANAMA to change that. By bringing intelligent automation to every corner of school operations, we free educators to do what they do best: educate.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding gradient-soft">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-headline mb-4 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">What we believe</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <GlassCard hover className="p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-white">
        <AnimatedSection className="container-narrow text-center">
          <h2 className="text-headline mb-8 bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Our Vision</h2>
          <p className="text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            We envision a world where every school — regardless of size, budget, or location — has access to the same intelligent infrastructure as the world's best institutions. Where principals lead with clarity, teachers teach with joy, and every parent feels connected to their child's educational journey.
          </p>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-hero">
        <AnimatedSection className="container-narrow text-center">
          <h2 className="text-headline mb-6">
            Let's build the future of education together.
          </h2>
          <p className="text-subtitle mb-10">
            Book a demo and see how GYANAMA can transform your school.
          </p>
          <Link to="/book-demo">
            <Button variant="hero" size="xl" className="group">
              Book a Demo
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedSection>
      </section>
    </PageLayout>
  );
};

export default About;
