import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, PhoneCall, Activity, Sparkles } from 'lucide-react';

const PHONES = [
  { src: '/product/dashboard.webp', alt: 'Gyanama app — a teacher’s dashboard showing today’s classes, quick actions and alerts', className: 'z-20' },
  { src: '/product/health-score.webp', alt: 'Gyanama app — an AI health score for a student', className: 'z-10' },
];

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-[2rem] border border-white/60 bg-white shadow-glass-lg p-1.5 w-[240px]">
      <div className="rounded-[1.6rem] overflow-hidden bg-muted">
        <img src={src} alt={alt} width={468} height={1012} loading="eager" className="w-full h-auto block" />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="container mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="w-4 h-4" />
            AI Operating System for Schools
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-display mt-6 mb-5"
          >
            Give your school a{' '}
            <span className="text-gradient-primary">brain.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-subtitle max-w-2xl mx-auto"
          >
            Your school already produces the data — attendance, fees, academics. Gyanama is the
            layer that understands what’s happening, flags what needs attention, and takes action.
            It doesn’t just store your data. It acts on it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/book-demo">
              <Button variant="hero" size="lg" className="group">
                Book a Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#problem">
              <Button variant="outline" size="lg">See how it works</Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5"><PhoneCall className="w-4 h-4 text-primary" /> Auto parent calls</span>
            <span className="inline-flex items-center gap-1.5"><Activity className="w-4 h-4 text-accent" /> Student health scores</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-secondary" /> Assignments in minutes</span>
          </motion.div>
        </div>

        {/* Real product UI — the app's actual screens */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex items-end justify-center gap-4 md:gap-6"
        >
          <div className="hidden sm:block translate-y-6 -rotate-3">
            <PhoneFrame {...PHONES[1]} />
          </div>
          <div className="relative">
            <PhoneFrame {...PHONES[0]} />
          </div>
          <div className="hidden md:block translate-y-6 rotate-3">
            <PhoneFrame src="/product/mark-attendance.webp" alt="Gyanama app — marking class attendance" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
