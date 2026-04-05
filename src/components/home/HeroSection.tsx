import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, GraduationCap, School, Pencil, Calculator, Globe, Lightbulb, Users } from 'lucide-react';

export function HeroSection() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        {/* Enhanced Glassmorphic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large Glassmorphic Panels */}
          <motion.div
            className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.08) 100%)',
              backdropFilter: 'blur(60px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
            animate={{
              y: [0, 25, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Floating Glass Cards */}
          <motion.div
            className="absolute top-[15%] left-[8%] w-32 h-32 rounded-3xl"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-[20%] right-[12%] w-24 h-24 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            }}
            animate={{
              y: [0, 15, 0],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Floating Educational Elements */}
          <motion.div
            className="absolute top-[25%] right-[15%] p-4 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <BookOpen className="w-8 h-8 text-primary/70" />
          </motion.div>

          <motion.div
            className="absolute top-[40%] left-[5%] p-4 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.45)',
              boxShadow: '0 8px 32px rgba(147, 51, 234, 0.12)',
            }}
            animate={{
              y: [0, 20, 0],
              x: [0, -8, 0],
              rotate: [0, -10, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            <GraduationCap className="w-8 h-8 text-secondary/70" />
          </motion.div>

          <motion.div
            className="absolute bottom-[35%] left-[18%] p-3 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.28)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 6px 24px rgba(16, 185, 129, 0.1)',
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <School className="w-6 h-6 text-accent/70" />
          </motion.div>

          <motion.div
            className="absolute top-[60%] right-[8%] p-3 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.32)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.45)',
              boxShadow: '0 6px 24px rgba(59, 130, 246, 0.12)',
            }}
            animate={{
              y: [0, 18, 0],
              x: [0, -5, 0],
              rotate: [0, -6, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
          >
            <Pencil className="w-6 h-6 text-primary/60" />
          </motion.div>

          <motion.div
            className="absolute top-[12%] left-[25%] p-3 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              boxShadow: '0 6px 24px rgba(147, 51, 234, 0.1)',
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          >
            <Calculator className="w-5 h-5 text-secondary/60" />
          </motion.div>

          <motion.div
            className="absolute bottom-[25%] right-[25%] p-4 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.12)',
            }}
            animate={{
              y: [0, 22, 0],
              x: [0, 8, 0],
              rotate: [0, 7, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Globe className="w-7 h-7 text-accent/65" />
          </motion.div>

          <motion.div
            className="absolute top-[70%] left-[12%] p-3 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.28)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.38)',
              boxShadow: '0 6px 24px rgba(59, 130, 246, 0.1)',
            }}
            animate={{
              y: [0, -18, 0],
              rotate: [0, 12, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <Lightbulb className="w-5 h-5 text-primary/55" />
          </motion.div>

          <motion.div
            className="absolute top-[50%] right-[30%] p-3 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 6px 24px rgba(147, 51, 234, 0.08)',
            }}
            animate={{
              y: [0, 14, 0],
              x: [0, -6, 0],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            <Users className="w-5 h-5 text-secondary/55" />
          </motion.div>

          {/* Floating orbs with enhanced glow */}
          <motion.div
            className="absolute top-20 right-[20%] w-72 h-72 rounded-full bg-primary/10 blur-3xl"
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-[10%] w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-[5%] w-48 h-48 rounded-full bg-accent/10 blur-3xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>

        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                AI-Powered School Management
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-display mb-6"
            >
              Everything Your School Needs.{' '}
              <span className="text-gradient-primary">
                One Powerful Platform.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-subtitle max-w-2xl mx-auto mb-10"
            >
              An AI-powered system that runs your entire school from one clean dashboard — faster, simpler, smarter.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/book-demo">
                <Button variant="hero" size="lg" className="group">
                  Book a Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-sm text-muted-foreground italic"
            >
            </motion.p>
          </div>
        </div>
      </section>
    </>
  );
}

