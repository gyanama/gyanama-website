import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Shield, Zap, Heart, Layers, Clock, Rocket, Star, Award, CheckCircle, Users, BookOpen, Globe } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Built for Trust',
    description: 'Every feature is designed to strengthen the relationship between your school and parents.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Zap,
    title: 'AI That Works',
    description: 'Not buzzwords. Real AI systems that save hours every day and prevent problems before they happen.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Heart,
    title: 'Made for Schools',
    description: 'We understand your challenges. GYANAMA is built by people who care about education.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Layers,
    title: '50+ Powerful Features',
    description: 'Attendance, fees, reports, communication — everything in one unified platform.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Clock,
    title: '24/7 Reliability',
    description: 'Your school never sleeps, neither do we. Cloud-based, secure, and always accessible.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Rocket,
    title: 'Easy Onboarding',
    description: 'Get started in days, not months. We handle the setup while you focus on education.',
    color: 'from-cyan-500 to-blue-500',
  },
];

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative text-center p-5 md:p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 cursor-pointer overflow-hidden"
      style={{ minHeight: isHovered ? 'auto' : '140px' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsHovered(!isHovered)}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: '0 0 25px rgba(16, 185, 129, 0.25), 0 15px 35px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Icon with bounce animation */}
      <motion.div
        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${reason.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
      >
        <reason.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
      </motion.div>

      {/* Title - always visible */}
      <h3 className="text-base md:text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
        {reason.title}
      </h3>

      {/* Description - appears on hover/tap */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              className="p-3 rounded-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/60 shadow-inner"
            >
              <p className="text-sm text-slate-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap hint for mobile */}
      <motion.div
        className="mt-3 text-xs text-slate-400 md:hidden"
        animate={{ opacity: isHovered ? 0 : [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap to learn more
      </motion.div>
    </motion.div>
  );
}

export function WhySection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f0fdf4 50%, #fefce8 75%, #fdf4ff 100%)'
    }}>
      {/* Themed floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glassmorphic shapes */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 md:w-80 md:h-80 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 100%)',
            backdropFilter: 'blur(40px)',
          }}
          animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 w-56 h-56 md:w-72 md:h-72 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.06) 100%)',
            backdropFilter: 'blur(30px)',
          }}
          animate={{ rotate: [0, -3, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Shield icon - Trust themed */}
        <motion.div
          className="absolute top-16 left-[5%] md:top-20 md:left-[8%] p-3 md:p-4 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.12)',
          }}
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-500/70" />
        </motion.div>

        {/* Heart icon - Care themed */}
        <motion.div
          className="absolute top-24 right-[6%] md:top-28 md:right-[10%] p-3 md:p-4 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.12)',
          }}
          animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-500/70" />
        </motion.div>

        {/* Star icon - Excellence */}
        <motion.div
          className="absolute top-[35%] left-[3%] md:left-[5%] p-3 md:p-4 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.48)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 6px 24px rgba(251, 191, 36, 0.12)',
          }}
          animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Star className="w-5 h-5 md:w-7 md:h-7 text-amber-500/70" />
        </motion.div>

        {/* Award icon - Quality */}
        <motion.div
          className="absolute top-[40%] right-[4%] md:right-[6%] p-3 md:p-4 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.52)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.32)',
            boxShadow: '0 6px 24px rgba(139, 92, 246, 0.12)',
          }}
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Award className="w-5 h-5 md:w-7 md:h-7 text-violet-500/70" />
        </motion.div>

        {/* Rocket icon - Growth */}
        <motion.div
          className="absolute bottom-28 left-[6%] md:bottom-32 md:left-[8%] p-3 md:p-4 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.28)',
            boxShadow: '0 6px 24px rgba(6, 182, 212, 0.12)',
          }}
          animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <Rocket className="w-5 h-5 md:w-7 md:h-7 text-cyan-500/70" />
        </motion.div>

        {/* CheckCircle icon - Reliability */}
        <motion.div
          className="absolute bottom-24 right-[5%] md:bottom-28 md:right-[9%] p-3 md:p-4 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.32)',
            boxShadow: '0 6px 24px rgba(16, 185, 129, 0.12)',
          }}
          animate={{ y: [0, 8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <CheckCircle className="w-5 h-5 md:w-7 md:h-7 text-emerald-500/70" />
        </motion.div>

        {/* Users icon - Community */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 md:bottom-20 p-2 md:p-3 rounded-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Users className="w-5 h-5 md:w-6 md:h-6 text-indigo-500/60" />
        </motion.div>

        {/* Globe icon - Accessibility */}
        <motion.div
          className="absolute top-12 left-1/2 -translate-x-1/2 md:top-16 p-2 md:p-3 rounded-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.38)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          animate={{ y: [0, -5, 0], rotate: [0, 360] }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <Globe className="w-5 h-5 md:w-6 md:h-6 text-teal-500/60" />
        </motion.div>

        {/* Floating glow orbs */}
        <motion.div
          className="absolute top-1/3 left-[15%] w-40 h-40 md:w-56 md:h-56 rounded-full bg-blue-500/8 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-[15%] w-48 h-48 md:w-64 md:h-64 rounded-full bg-emerald-500/8 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-80 md:h-80 rounded-full bg-violet-500/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container-wide relative z-10">
        <AnimatedSection className="text-center mb-10 md:mb-14">
          <h2 className="text-headline mb-4">
            Why principals choose{' '}
            <span className="text-gradient-primary">GYANAMA</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">Hover or tap to learn more</p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <AnimatedSection key={reason.title} delay={index * 0.08}>
              <ReasonCard reason={reason} index={index} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
