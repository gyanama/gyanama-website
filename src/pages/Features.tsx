import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  MessageSquare,
  BookOpen,
  Settings,
  ClipboardCheck,
  ArrowRight,
  Clock,
  Bell,
  Calendar,
  FileText,
  Users,
  BarChart3,
  Smartphone,
  HelpCircle,
  CheckCircle
} from 'lucide-react';

const featureBlocks = [
  {
    icon: UserCheck,
    title: 'Attendance & Automation',
    description: 'Complete attendance management with smart tracking.',
    color: 'primary',
    features: [
      { icon: CheckCircle, text: 'Smart attendance tracking' },
      { icon: Clock, text: 'Leave management system' },
      { icon: Users, text: 'Substitute teacher management' },
      { icon: Bell, text: 'Automated parent alerts' },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Parent Communication',
    description: 'Seamless multi-channel communication that builds trust.',
    color: 'secondary',
    features: [
      { icon: Smartphone, text: 'Direct messaging & chat' },
      { icon: Calendar, text: 'Scheduled announcements' },
      { icon: FileText, text: 'Forms & surveys' },
      { icon: Bell, text: 'Push notifications' },
    ],
  },
  {
    icon: BookOpen,
    title: 'Academics & Classroom',
    description: 'Modern tools for teaching and learning.',
    color: 'accent',
    features: [
      { icon: FileText, text: 'Homework management' },
      { icon: Calendar, text: 'Timetable scheduling' },
      { icon: HelpCircle, text: 'Doubt resolution system' },
      { icon: BarChart3, text: 'Performance dashboards' },
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Exams & Grading',
    description: 'End-to-end exam management and report cards.',
    color: 'secondary',
    features: [
      { icon: Calendar, text: 'Exam scheduling' },
      { icon: CheckCircle, text: 'Marks entry & grading' },
      { icon: FileText, text: 'Report card generation' },
      { icon: BarChart3, text: 'Grade analytics' },
    ],
  },
  {
    icon: Settings,
    title: 'Administration & Control',
    description: 'Streamlined operations for maximum efficiency.',
    color: 'primary',
    features: [
      { icon: Users, text: 'Staff & student management' },
      { icon: BookOpen, text: 'Class & section organization' },
      { icon: BarChart3, text: 'School-wide analytics' },
      { icon: FileText, text: 'Audit logging' },
    ],
  },
];

const Features = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="Features" pagePath="/features" />
      {/* Hero Section */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Everything you need.{' '}
              <span className="text-gradient-primary">Nothing you don't.</span>
            </h1>
            <p className="text-subtitle">
              Six capability blocks. Complete school control. Each feature designed to save time and build trust.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="space-y-24">
            {featureBlocks.map((block, index) => (
              <AnimatedSection key={block.title}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Side */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className={`w-14 h-14 rounded-2xl bg-${block.color}/10 flex items-center justify-center mb-6`}>
                      <block.icon className={`w-7 h-7 text-${block.color}`} />
                    </div>

                    <h2 className="text-title mb-4">{block.title}</h2>
                    <p className="text-muted-foreground mb-8">{block.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      {block.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <feature.icon className="w-4 h-4 text-foreground/70" />
                          </div>
                          <span className="text-sm text-foreground/80 pt-1">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-6 text-sm text-muted-foreground italic">And more...</p>
                  </div>

                  {/* Visual Side */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <GlassCard className="p-8 aspect-square flex items-center justify-center">
                      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        {block.features.map((feature, i) => (
                          <div
                            key={i}
                            className={`aspect-square rounded-2xl bg-${block.color}/5 flex items-center justify-center transition-transform hover:scale-105`}
                          >
                            <feature.icon className={`w-8 h-8 text-${block.color}/70`} />
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-soft">
        <AnimatedSection className="container-narrow text-center">
          <h2 className="text-headline mb-6">
            See it all in action
          </h2>
          <p className="text-subtitle mb-10">
            Book a demo and explore every feature with our team.
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

export default Features;
