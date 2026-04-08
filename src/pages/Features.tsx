import { PageLayout } from '@/components/layout/PageLayout';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  MessageSquare,
  BookOpen,
  Settings,
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  Bell,
  Calendar,
  FileText,
  CreditCard,
  Users,
  BarChart3,
  Smartphone
} from 'lucide-react';

const featureBlocks = [
  {
    icon: UserCheck,
    title: 'Attendance & Automation',
    description: 'Complete attendance management with AI-powered insights.',
    color: 'primary',
    features: [
      { icon: CheckCircle, text: 'Biometric & RFID tracking' },
      { icon: Clock, text: 'Real-time absence detection' },
      { icon: Bell, text: 'Automated parent alerts' },
      { icon: BarChart3, text: 'Attendance analytics & trends' },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Parent Communication',
    description: 'Seamless multi-channel communication that builds trust.',
    color: 'secondary',
    features: [
      { icon: Smartphone, text: 'Mobile app & SMS notifications' },
      { icon: Calendar, text: 'Scheduled announcements' },
      { icon: MessageSquare, text: 'Two-way messaging' },
      { icon: FileText, text: 'Digital circulars & notices' },
    ],
  },
  {
    icon: BookOpen,
    title: 'Academics & Classroom',
    description: 'Modern tools for teaching and learning.',
    color: 'accent',
    features: [
      { icon: FileText, text: 'Digital gradebooks' },
      { icon: Calendar, text: 'Assignment management' },
      { icon: BarChart3, text: 'Performance dashboards' },
      { icon: BookOpen, text: 'Curriculum planning' },
    ],
  },
  {
    icon: Settings,
    title: 'Administration & Control',
    description: 'Streamlined operations for maximum efficiency.',
    color: 'primary',
    features: [
      { icon: Users, text: 'Staff management' },
      { icon: CreditCard, text: 'Fee collection & tracking' },
      { icon: FileText, text: 'Document management' },
      { icon: BarChart3, text: 'Custom reports' },
    ],
  },
  {
    icon: Shield,
    title: 'Operations & Safety',
    description: 'Keep your campus safe and running smoothly.',
    color: 'secondary',
    features: [
      { icon: Users, text: 'Visitor management' },
      { icon: Bell, text: 'Emergency alerts' },
      { icon: Shield, text: 'Security protocols' },
    ],
  },
];

const Features = () => {
  useDocumentTitle('Features');
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-display mb-6">
              Everything you need.{' '}
              <span className="text-gradient-primary">Nothing you don't.</span>
            </h1>
            <p className="text-subtitle">
              Five capability blocks. Complete school control. Each feature designed to save time and build trust.
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
