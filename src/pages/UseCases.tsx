import { motion } from 'framer-motion';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, GraduationCap, Users } from 'lucide-react';

const ROLES = [
  {
    icon: Building2,
    who: 'Principals & management',
    headline: 'Walk in already knowing what needs your attention.',
    body: 'Instead of opening ten reports, you open Gyanama and it has already surfaced the classes slipping, the fees pending, and the students to worry about. You spend your day acting, not hunting for the problem.',
    scenarios: ['See the school’s health at a glance', 'Know which fees and students need action today', 'Let attendance calls and reminders run themselves'],
    img: '/product/principal-dashboard.webp',
    alt: 'Gyanama — principal dashboard',
  },
  {
    icon: GraduationCap,
    who: 'Teachers',
    headline: 'Get your evenings back.',
    body: 'Mark attendance in seconds. Turn your syllabus into assignments in minutes. And when a student starts slipping, Gyanama flags them for you — instead of you finding out at exam time.',
    scenarios: ['Attendance in seconds, not a register', 'AI-generated assignments & quizzes', 'Struggling students surfaced early'],
    img: '/product/mark-attendance.webp',
    alt: 'Gyanama — marking attendance',
  },
  {
    icon: Users,
    who: 'Parents',
    headline: 'Hear from the school before you have to ask.',
    body: 'When your child’s attendance drops, you get a call — automatically. Fees, updates and meetings come to you. You stay connected without chasing the school office.',
    scenarios: ['Automatic calls when attendance drops', 'Fee reminders and updates', 'Parent–teacher meetings, organised'],
    img: '/product/ptm.webp',
    alt: 'Gyanama — parent-teacher meeting scheduling',
  },
];

const UseCases = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="Use Cases" pagePath="/use-cases" />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-display mb-5">
            One operating layer.{' '}
            <span className="text-gradient-primary">Every role, lighter.</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Gyanama doesn’t just digitise your school — it takes work off everyone’s plate. Here’s
            what a normal week looks like for the people who run it.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 space-y-20 max-w-5xl">
          {ROLES.map((r, i) => (
            <motion.div
              key={r.who}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-14`}
            >
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary-soft rounded-full px-3 py-1 mb-4">
                  <r.icon className="w-4 h-4" /> {r.who}
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{r.headline}</h2>
                <p className="text-muted-foreground text-lg mb-5">{r.body}</p>
                <ul className="space-y-2">
                  {r.scenarios.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <PhoneFrame src={r.img} alt={r.alt} width={220} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            See it for your school.
          </h2>
          <p className="text-subtitle mb-8">
            Book a demo and we’ll tailor it to how your school actually runs.
          </p>
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

export default UseCases;
