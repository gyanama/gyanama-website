import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Heart,
  CheckCircle,
  BookOpen,
  Feather,
  Coffee
} from 'lucide-react';

const painPoints = [
  {
    title: 'Before GYANAMA',
    items: [
      'Constant parent complaints about communication gaps',
      'Hours spent on manual attendance tracking',
      'No early warning system for struggling students',
      'Staff overwhelmed with administrative work',
      'Reactive problem-solving instead of prevention',
    ],
  },
  {
    title: 'After GYANAMA',
    items: [
      'AI handles parent communication proactively',
      'Automated attendance with instant insights',
      'Predictive AI identifies at-risk students early',
      'Staff focuses on education, not paperwork',
      'Problems prevented before they escalate',
    ],
  },
];

const benefits = [
  {
    icon: Clock,
    title: '5+ Hours Saved Daily',
    description: 'AI automates attendance calls, report generation, and routine communications.',
  },
  {
    icon: Users,
    title: '90% Parent Satisfaction',
    description: 'Proactive communication builds trust and reduces complaints.',
  },
  {
    icon: TrendingUp,
    title: 'Early Intervention',
    description: 'Identify struggling students weeks before grades drop.',
  },
  {
    icon: Shield,
    title: 'Complete Visibility',
    description: 'One dashboard shows your entire school\'s health at a glance.',
  },
];

const dayInLife = [
  { time: '7:30 AM', event: 'Check School Health Score — 94. Great start.' },
  { time: '8:15 AM', event: 'AI already sent 3 attendance alerts to parents.' },
  { time: '10:00 AM', event: 'Review AI Brain\'s predictions for at-risk students.' },
  { time: '11:30 AM', event: 'Generate 10-minute concept quiz for Grade 8 Science.' },
  { time: '2:00 PM', event: 'Parent feedback automatically collected and analyzed.' },
  { time: '4:00 PM', event: 'Daily report auto-generated. Ready for tomorrow.' },
];

const UseCases = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="Use Cases" pagePath="/use-cases" />
      {/* Hero Section */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        {/* Floating Calm Elements */}
        {/* Floating Calm Elements - Bold & Bright */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Soft Cloud 1 - Brighter */}
          <motion.div
            className="absolute top-20 left-[10%] text-blue-300"
            animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-32 h-20 bg-blue-300/30 rounded-full blur-xl" />
          </motion.div>

          {/* Floating Book 1 (Left) - Bold Indigo */}
          <motion.div
            className="absolute top-1/3 left-[5%] md:left-[15%] text-indigo-500"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <BookOpen className="w-16 h-16 md:w-24 md:h-24 opacity-80 drop-shadow-lg" />
          </motion.div>

          {/* Floating Feather (Zen) - Bright Teal */}
          <motion.div
            className="absolute top-1/4 right-[10%] md:right-[20%] text-teal-500"
            animate={{ y: [0, 20, 0], rotate: [10, -10, 10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Feather className="w-12 h-12 md:w-16 md:h-16 opacity-90 drop-shadow-lg" />
          </motion.div>

          {/* Floating Coffee (Relaxation) - Warm Amber */}
          <motion.div
            className="absolute bottom-1/3 right-[5%] md:right-[15%] text-amber-500"
            animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Coffee className="w-10 h-10 md:w-14 md:h-14 opacity-90 drop-shadow-lg" />
          </motion.div>

          {/* Floating Book 2 (Right Bottom) - Deep Violet */}
          <motion.div
            className="absolute bottom-10 left-[20%] text-violet-500"
            animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <BookOpen className="w-20 h-20 md:w-28 md:h-28 opacity-80 drop-shadow-lg" />
          </motion.div>
        </div>

        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <span className="text-sm font-medium">Built for Schools</span>
            </div>
            <h1 className="text-display mb-6">
              Your calmest year starts here.
            </h1>
            <p className="text-subtitle">
              See how principals like you use GYANAMA to transform daily chaos into effortless control.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-50/50 rounded-full blur-3xl -z-10 mix-blend-multiply" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl -z-10 mix-blend-multiply" />

        <div className="container-wide relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-headline">The transformation</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {painPoints.map((column, colIndex) => (
              <AnimatedSection key={column.title} delay={colIndex * 0.2}>
                <div
                  className={`p-8 h-full rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:shadow-lg ${colIndex === 0
                    ? 'bg-red-50/30 border-red-100 shadow-red-100/20'
                    : 'bg-emerald-50/30 border-emerald-100 shadow-emerald-100/20'
                    }`}
                >
                  <h3 className={`text-xl font-bold mb-6 ${colIndex === 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                    {column.title}
                  </h3>
                  <ul className="space-y-4">
                    {column.items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: colIndex === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${colIndex === 0 ? 'bg-red-400' : 'bg-emerald-400'}`} />
                        <span className="text-slate-700 font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div className="container-wide">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-headline mb-4">Real results for real schools</h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              // Assign different themes based on index
              const themes = [
                'bg-blue-50/40 border-blue-100 hover:bg-blue-50/60',
                'bg-violet-50/40 border-violet-100 hover:bg-violet-50/60',
                'bg-amber-50/40 border-amber-100 hover:bg-amber-50/60',
                'bg-cyan-50/40 border-cyan-100 hover:bg-cyan-50/60',
              ];
              const iconColors = [
                'text-blue-600 bg-blue-100',
                'text-violet-600 bg-violet-100',
                'text-amber-600 bg-amber-100',
                'text-cyan-600 bg-cyan-100',
              ];

              return (
                <AnimatedSection key={benefit.title} delay={index * 0.1}>
                  <div className={`p-6 h-full text-center rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${themes[index % 4]}`}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${iconColors[index % 4]}`}>
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-600">{benefit.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* A Day in Your Life Section */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

        <div className="container-wide relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-headline mb-4">A day in your life with GYANAMA</h2>
            <p className="text-subtitle">From the moment you arrive until you leave.</p>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200" />

              <div className="space-y-6">
                {dayInLife.map((item, index) => (
                  <AnimatedSection key={index} delay={index * 0.1}>
                    <div className="flex items-start gap-6 pl-8 relative group">
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute left-2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm z-10"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />

                      <div className="p-5 rounded-2xl flex-1 bg-white/60 border border-slate-100 shadow-sm backdrop-blur-sm hover:shadow-md transition-all duration-300 group-hover:bg-blue-50/30 group-hover:border-blue-100/50">
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{item.time}</span>
                        <p className="text-slate-700 mt-2 font-medium">{item.event}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Quote Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />

        <AnimatedSection className="container-narrow text-center relative z-10 text-white">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-8 border border-white/20">
            <Heart className="w-8 h-8 text-rose-300" />
          </div>
          <blockquote className="text-2xl md:text-4xl font-medium leading-relaxed mb-8 max-w-4xl mx-auto font-serif italic">
            "For the first time, all these features have been made to take your school journey to the next level."
          </blockquote>
          <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
            <p className="text-blue-200 font-semibold tracking-wide">GYANAMA PROMISE</p>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <AnimatedSection className="container-narrow text-center">
          <h2 className="text-headline mb-6">
            Ready to reclaim your time?
          </h2>
          <p className="text-subtitle mb-10">
            See how GYANAMA works for schools like yours.
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

export default UseCases;
