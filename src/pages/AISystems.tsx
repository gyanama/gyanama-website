import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Phone,
  Brain,
  Sparkles,
  Activity,
  ArrowRight,
  TrendingDown,
  MessageCircle,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  Heart,
  AlertCircle,
  School,
  GraduationCap,
  Library,
  BookOpen,
  PenTool
} from 'lucide-react';

const aiSystems = [
  {
    id: 'attendance-calling',
    icon: Phone,
    title: 'AI Automated Attendance Calling & Alerts',
    tagline: 'AI that speaks before problems grow',
    description: 'When attendance drops below 60%, GYANAMA doesn\'t wait. It calls. The AI voice communicates current attendance percentages, identifies inconsistency patterns, and delivers polite but clear warnings — all without your staff lifting a finger.',
    features: [
      { icon: TrendingDown, text: 'Detects attendance trends before they become crises' },
      { icon: MessageCircle, text: 'Natural voice calls that feel human, not robotic' },
      { icon: Users, text: 'Personalized messages for each parent' },
    ],
    visual: AttendanceVisual,
    color: 'primary',
  },
  {
    id: 'brain-agent',
    icon: Brain,
    title: 'AI Brain Agent (Student Predictor & Tutor)',
    tagline: 'An AI brain that understands every student',
    description: 'Every student is unique. The AI Brain Agent analyzes attendance patterns, academic marks, test results, and behavioral data to predict which students need help before they fail. It acts as a 24/7 personal tutor and advisor.',
    features: [
      { icon: Target, text: 'Predicts student performance weeks in advance' },
      { icon: Lightbulb, text: 'Personalized learning recommendations' },
      { icon: Heart, text: 'Identifies struggling students early' },
    ],
    visual: BrainAgentVisual,
    color: 'secondary',
  },
  {
    id: 'quiz-system',
    icon: Sparkles,
    title: 'AI Quiz (10-Minute Concept Test)',
    tagline: 'Instant academic intelligence',
    description: 'Need to test if students understood Chapter 7? GYANAMA generates targeted MCQs and oral questions in seconds. Teachers get instant clarity on concept understanding — all in just 10 minutes.',
    features: [
      { icon: Sparkles, text: 'Auto-generated questions from any chapter' },
      { icon: BarChart3, text: 'Instant results and concept gap analysis' },
      { icon: Users, text: 'Works for individuals or entire classes' },
    ],
    visual: QuizVisual,
    color: 'accent',
  },
  {
    id: 'health-score',
    icon: Activity,
    title: 'AI School Health Score',
    tagline: 'A single number that tells you everything',
    description: 'Every morning, GYANAMA calculates your School Health Score — a single number from 0-100 that reflects attendance momentum, academic trends, operational efficiency, and parent satisfaction. One glance. Total clarity.',
    features: [
      { icon: Activity, text: 'Real-time health monitoring' },
      { icon: AlertCircle, text: 'Alerts when score drops unexpectedly' },
      { icon: TrendingDown, text: 'Historical trends and predictions' },
    ],
    visual: HealthScoreVisual,
    color: 'primary',
  },
];

function AttendanceVisual() {
  return (
    <div className="relative h-80 flex items-center justify-center">
      <motion.div
        className="glass-card p-6 rounded-2xl max-w-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">Calling Parent...</p>
            <p className="text-sm text-muted-foreground">Rahul's Mother</p>
          </div>
        </div>

        <motion.div
          className="bg-muted/50 rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-foreground/80 italic">
            "Good morning. This is GYANAMA from Sunrise Academy. Rahul's attendance this month is 58%. We've noticed 3 absences in the past week..."
          </p>
        </motion.div>

        <div className="mt-4 flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute -top-4 -right-4 glass-card px-3 py-2 rounded-xl text-sm"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-destructive font-semibold">58%</span> Attendance
      </motion.div>
    </div>
  );
}

function BrainAgentVisual() {
  const students = [
    { name: 'Priya', score: 92, trend: 'up', risk: 'low' },
    { name: 'Amit', score: 67, trend: 'down', risk: 'medium' },
    { name: 'Sara', score: 45, trend: 'down', risk: 'high' },
  ];

  return (
    <div className="relative h-80 flex items-center justify-center">
      <motion.div
        className="glass-card p-6 rounded-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-secondary" />
          <span className="font-semibold">AI Predictions</span>
        </div>

        <div className="space-y-3">
          {students.map((student, i) => (
            <motion.div
              key={student.name}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-medium">
                  {student.name[0]}
                </div>
                <span className="font-medium">{student.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${student.risk === 'high' ? 'text-destructive' :
                  student.risk === 'medium' ? 'text-orange-500' : 'text-accent'
                  }`}>
                  {student.score}%
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${student.risk === 'high' ? 'bg-destructive/10 text-destructive' :
                  student.risk === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-accent/10 text-accent'
                  }`}>
                  {student.risk} risk
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function QuizVisual() {
  return (
    <div className="relative h-80 flex items-center justify-center">
      <motion.div
        className="glass-card p-6 rounded-2xl max-w-sm"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Chapter 7: Photosynthesis</span>
          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">10 min</span>
        </div>

        <div className="bg-muted/30 rounded-xl p-4 mb-4">
          <p className="text-sm font-medium mb-3">Q1: What is the primary function of chlorophyll?</p>
          <div className="space-y-2">
            {['A) Store water', 'B) Absorb light energy', 'C) Transport nutrients', 'D) Release oxygen'].map((opt, i) => (
              <motion.div
                key={opt}
                className={`text-sm p-2 rounded-lg cursor-pointer transition-all ${i === 1 ? 'bg-accent/20 border border-accent/30' : 'bg-white/50 hover:bg-white/80'
                  }`}
                whileHover={{ x: 4 }}
              >
                {opt}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Question 1 of 15</span>
          <motion.span
            className="text-accent font-semibold"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AI Generated
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

function HealthScoreVisual() {
  return (
    <div className="relative h-80 flex items-center justify-center">
      <motion.div
        className="glass-card p-8 rounded-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Today's School Health</p>
          <motion.div
            className="text-7xl font-bold text-gradient-primary"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            viewport={{ once: true }}
          >
            94
          </motion.div>
          <p className="text-sm text-accent font-medium mt-2">Excellent</p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Attendance', value: '96%' },
            { label: 'Academics', value: '91%' },
            { label: 'Operations', value: '95%' },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-semibold">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Animated rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

const AISystems = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="AI Systems" pagePath="/ai-systems" />
      {/* Hero Section */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        {/* Floating School Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* School Icon (Top Left) */}
          <motion.div
            className="absolute top-20 left-[10%] text-blue-500"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <School className="w-16 h-16 md:w-24 md:h-24 opacity-80 drop-shadow-lg" />
          </motion.div>

          {/* Graduation Cap (Top Right) */}
          <motion.div
            className="absolute top-24 right-[15%] text-indigo-500"
            animate={{ y: [0, 15, 0], rotate: [-10, 10, -10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <GraduationCap className="w-14 h-14 md:w-20 md:h-20 opacity-80 drop-shadow-lg" />
          </motion.div>

          {/* Stack of Books (Bottom Left) */}
          <motion.div
            className="absolute bottom-1/3 left-[5%] md:left-[15%] text-violet-500"
            animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Library className="w-12 h-12 md:w-16 md:h-16 opacity-80 drop-shadow-lg" />
          </motion.div>

          {/* Open Book (Bottom Right) */}
          <motion.div
            className="absolute bottom-10 right-[20%] text-teal-500"
            animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <BookOpen className="w-20 h-20 md:w-28 md:h-28 opacity-80 drop-shadow-lg" />
          </motion.div>

          {/* Floating Pencil/Pen (Center-ish) */}
          <motion.div
            className="absolute top-1/2 right-[5%] text-amber-500"
            animate={{ x: [0, 10, 0], rotate: [15, 0, 15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <PenTool className="w-10 h-10 md:w-14 md:h-14 opacity-80 drop-shadow-lg" />
          </motion.div>
        </div>

        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI-First Technology</span>
            </div>
            <h1 className="text-display mb-6">
              Four AI systems.{' '}
              <span className="text-gradient-primary">Zero chaos.</span>
            </h1>
            <p className="text-subtitle">
              These aren't features. They're intelligent systems that work 24/7 to transform how your school operates.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* AI Systems Deep Dive */}
      <div ref={containerRef}>
        {aiSystems.map((system, index) => (
          <section
            key={system.id}
            className={`section-padding ${index % 2 === 0 ? 'bg-white' : 'gradient-soft'} relative overflow-hidden`}
          >
            <div className="container-wide">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <AnimatedSection direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div className={`max-w-xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className={`w-14 h-14 rounded-2xl bg-${system.color}/10 flex items-center justify-center mb-6`}>
                      <system.icon className={`w-7 h-7 text-${system.color}`} />
                    </div>

                    <h2 className="text-title mb-3">{system.title}</h2>
                    <p className={`text-${system.color} font-semibold mb-4`}>{system.tagline}</p>
                    <p className="text-foreground/80 leading-relaxed mb-8">{system.description}</p>

                    <div className="space-y-4">
                      {system.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                            <feature.icon className="w-5 h-5 text-foreground/70" />
                          </div>
                          <p className="text-foreground/80 pt-2">{feature.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Visual */}
                <AnimatedSection
                  direction={index % 2 === 0 ? 'right' : 'left'}
                  className={index % 2 === 1 ? 'lg:order-1' : ''}
                >
                  <system.visual />
                </AnimatedSection>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <AnimatedSection className="container-narrow text-center">
          <h2 className="text-headline mb-6">
            Ready to see AI in action?
          </h2>
          <p className="text-subtitle mb-10">
            Watch these systems work together in a live demo.
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

export default AISystems;
