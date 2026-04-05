import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Phone, Brain, Sparkles, Activity, ArrowRight, Cpu, Wifi, Zap, BarChart3 } from 'lucide-react';

const aiSystems = [
  {
    icon: Phone,
    title: 'AI Attendance Calling',
    description: 'AI speaks before problems grow',
    detail: 'Automatically calls parents when attendance drops below 60%, communicating trends and gentle warnings.',
    color: 'primary',
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    icon: Brain,
    title: 'AI Brain Agent',
    description: 'An AI that understands every student',
    detail: 'Analyzes attendance, marks, and patterns to predict performance and act as a personal advisor.',
    color: 'secondary',
    gradient: 'from-secondary/20 to-secondary/5',
  },
  {
    icon: Sparkles,
    title: 'AI Quiz System',
    description: 'Instant academic intelligence',
    detail: '10-minute concept tests with auto-generated MCQs and oral questions for any chapter.',
    color: 'accent',
    gradient: 'from-accent/20 to-accent/5',
  },
  {
    icon: Activity,
    title: 'AI School Health Score',
    description: 'One number. Total clarity.',
    detail: 'A daily score that tells you exactly how your school is performing across all metrics.',
    color: 'primary',
    gradient: 'from-primary/20 to-primary/5',
  },
];

export function AISystemsOverview() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-soft" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Floating AI-themed decorative elements - expanded coverage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glassmorphic panels for structure */}
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 md:w-96 md:h-96 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.05) 100%)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
          animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-56 h-56 md:w-80 md:h-80 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(59, 130, 246, 0.04) 100%)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          animate={{ rotate: [0, -3, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Brain icon - top left */}
        <motion.div
          className="absolute top-16 left-[3%] md:top-20 md:left-[8%] p-2.5 md:p-4 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }}
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="w-5 h-5 md:w-7 md:h-7 text-secondary/70" />
        </motion.div>

        {/* Phone icon - top right */}
        <motion.div
          className="absolute top-20 right-[4%] md:top-28 md:right-[10%] p-2.5 md:p-4 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)',
          }}
          animate={{ y: [0, 10, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Phone className="w-5 h-5 md:w-7 md:h-7 text-primary/70" />
        </motion.div>

        {/* Activity/Health Score icon - bottom left */}
        <motion.div
          className="absolute bottom-24 left-[5%] md:bottom-28 md:left-[6%] p-2.5 md:p-4 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.42)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.32)',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
          }}
          animate={{ y: [0, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <BarChart3 className="w-5 h-5 md:w-7 md:h-7 text-accent/70" />
        </motion.div>

        {/* Sparkles/Quiz icon - bottom right */}
        <motion.div
          className="absolute bottom-20 right-[3%] md:bottom-24 md:right-[8%] p-2.5 md:p-4 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.48)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.38)',
            boxShadow: '0 8px 32px rgba(147, 51, 234, 0.1)',
          }}
          animate={{ y: [0, 8, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-primary/70" />
        </motion.div>

        {/* CPU chip - mid left */}
        <motion.div
          className="absolute top-[45%] left-[2%] md:left-[4%] p-2 md:p-3 rounded-lg md:rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
          }}
          animate={{ y: [0, -10, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <Cpu className="w-4 h-4 md:w-5 md:h-5 text-secondary/60" />
        </motion.div>

        {/* Zap icon - mid right */}
        <motion.div
          className="absolute top-[38%] right-[3%] md:right-[5%] p-2 md:p-3 rounded-lg md:rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.38)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.28)',
          }}
          animate={{ y: [0, 10, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Zap className="w-4 h-4 md:w-5 md:h-5 text-accent/60" />
        </motion.div>

        {/* Additional icons for more coverage */}
        {/* Activity pulse - top center */}
        <motion.div
          className="absolute top-12 left-1/2 -translate-x-1/2 md:top-16 p-2 md:p-3 rounded-lg md:rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Activity className="w-4 h-4 md:w-5 md:h-5 text-primary/50" />
        </motion.div>

        {/* Wifi/Connection icon - left mid-bottom */}
        <motion.div
          className="absolute bottom-[40%] left-[8%] md:left-[12%] p-2 md:p-3 rounded-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.32)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
          }}
          animate={{ y: [0, 6, 0], x: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <Wifi className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary/50" />
        </motion.div>

        {/* Additional sparkle - right mid-top */}
        <motion.div
          className="absolute top-[30%] right-[12%] md:right-[15%] p-2 rounded-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.28)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
          animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-accent/40" />
        </motion.div>

        {/* Floating glow orbs - larger and more visible */}
        <motion.div
          className="absolute top-1/4 left-[10%] w-40 h-40 md:w-56 md:h-56 rounded-full bg-primary/8 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[10%] w-48 h-48 md:w-64 md:h-64 rounded-full bg-secondary/8 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Animated connecting lines/dots */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <motion.circle
            cx="15%"
            cy="30%"
            r="2"
            fill="currentColor"
            className="text-primary"
            animate={{ opacity: [0.3, 0.8, 0.3], r: [2, 3, 2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle
            cx="85%"
            cy="25%"
            r="2"
            fill="currentColor"
            className="text-secondary"
            animate={{ opacity: [0.4, 0.9, 0.4], r: [2, 4, 2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="20%"
            cy="70%"
            r="2"
            fill="currentColor"
            className="text-accent"
            animate={{ opacity: [0.3, 0.7, 0.3], r: [2, 3.5, 2] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          />
          <motion.circle
            cx="80%"
            cy="75%"
            r="2"
            fill="currentColor"
            className="text-primary"
            animate={{ opacity: [0.35, 0.85, 0.35], r: [2, 3, 2] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
          />
        </svg>
      </div>

      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-First Technology</span>
          </div>
          <h2 className="text-headline mb-4">
            Four AI systems.{' '}
            <span className="text-gradient-primary">Infinite clarity.</span>
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Not features. Intelligent systems that work 24/7 to keep your school running smoothly.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {aiSystems.map((system, index) => (
            <AnimatedSection key={system.title} delay={index * 0.1}>
              <Link to="/ai-systems" className="block h-full">
                <GlassCard
                  hover
                  className="p-8 h-full group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${system.gradient} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                    <system.icon className={`w-7 h-7 text-${system.color}`} />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{system.title}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{system.description}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{system.detail}</p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground/70 group-hover:text-primary transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassCard>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="text-center mt-12">
          <Link to="/ai-systems">
            <Button variant="heroSecondary" size="lg">
              Explore All AI Systems
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
