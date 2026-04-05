import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  UserCheck,
  MessageSquare,
  BookOpen,
  Settings,
  Shield,
  ChevronRight,
  Layers,
  Pencil,
  GraduationCap,
  School,
  BookMarked,
  PenTool,
  Ruler,
  Users
} from 'lucide-react';

const capabilities = [
  {
    icon: UserCheck,
    title: 'Attendance & Automation',
    points: [
      'Real-time biometric tracking',
      'AI-powered absence alerts',
      'Automated parent notifications',
    ],
    color: 'primary',
  },
  {
    icon: MessageSquare,
    title: 'Parent Communication',
    points: [
      'Multi-channel messaging',
      'Scheduled announcements',
      'Two-way feedback system',
    ],
    color: 'secondary',
  },
  {
    icon: BookOpen,
    title: 'Academics & Classroom',
    points: [
      'Digital gradebooks',
      'Assignment tracking',
      'Performance analytics',
    ],
    color: 'accent',
  },
  {
    icon: Settings,
    title: 'Administration & Control',
    points: [
      'Staff management',
      'Fee collection',
      'Resource allocation',
    ],
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'Operations & Safety',
    points: [
      'Transport tracking',
      'Visitor management',
      'Emergency protocols',
    ],
    color: 'secondary',
  },
  {
    icon: Layers,
    title: '50+ Features & Growing',
    points: [
      'Fully customizable modules',
      'Regular feature updates',
      'Built for your school\'s needs',
    ],
    color: 'accent',
    isSpecial: true,
  },
];

// Title words for staggered animation
const titleWords = ['Everything', 'you', 'need.'];
const subtitleWords = ['Nothing', 'you', 'don\'t.'];

export function CapabilitiesSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f0fdf4 50%, #fefce8 75%, #fdf4ff 100%)'
    }}>
      {/* School-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large glassmorphic shapes with colors */}
        <motion.div
          className="absolute -top-32 -right-32 w-72 h-72 md:w-96 md:h-96 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 100%)',
            backdropFilter: 'blur(40px)',
          }}
          animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-56 h-56 md:w-80 md:h-80 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
            backdropFilter: 'blur(30px)',
          }}
          animate={{ rotate: [0, -3, 0], scale: [1, 1.03, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Additional colorful orbs */}
        <motion.div
          className="absolute top-1/2 right-[20%] w-40 h-40 md:w-56 md:h-56 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(251, 191, 36, 0.06) 100%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-[25%] w-32 h-32 md:w-48 md:h-48 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Book icon - top left */}
        <motion.div
          className="absolute top-16 left-[4%] md:top-20 md:left-[8%] p-3 md:p-5 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)',
          }}
          animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookMarked className="w-6 h-6 md:w-8 md:h-8 text-primary/70" />
        </motion.div>

        {/* Pencil icon - top right */}
        <motion.div
          className="absolute top-24 right-[5%] md:top-28 md:right-[10%] p-3 md:p-5 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '0 8px 32px rgba(147, 51, 234, 0.1)',
          }}
          animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Pencil className="w-6 h-6 md:w-8 md:h-8 text-secondary/70" />
        </motion.div>

        {/* School icon - mid left */}
        <motion.div
          className="absolute top-[40%] left-[3%] md:left-[5%] p-3 md:p-4 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.48)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 6px 24px rgba(16, 185, 129, 0.1)',
          }}
          animate={{ y: [0, -10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <School className="w-6 h-6 md:w-7 md:h-7 text-accent/70" />
        </motion.div>

        {/* Graduation cap - mid right */}
        <motion.div
          className="absolute top-[35%] right-[4%] md:right-[6%] p-3 md:p-4 rounded-xl md:rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.52)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.32)',
            boxShadow: '0 6px 24px rgba(59, 130, 246, 0.1)',
          }}
          animate={{ y: [0, 12, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary/70" />
        </motion.div>

        {/* Ruler icon - bottom left */}
        <motion.div
          className="absolute bottom-28 left-[6%] md:bottom-32 md:left-[8%] p-3 md:p-4 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.28)',
            boxShadow: '0 6px 24px rgba(147, 51, 234, 0.08)',
          }}
          animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <Ruler className="w-5 h-5 md:w-6 md:h-6 text-secondary/60" />
        </motion.div>

        {/* Pen icon - bottom right */}
        <motion.div
          className="absolute bottom-24 right-[5%] md:bottom-28 md:right-[9%] p-3 md:p-4 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.48)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 6px 24px rgba(16, 185, 129, 0.08)',
          }}
          animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <PenTool className="w-5 h-5 md:w-6 md:h-6 text-accent/60" />
        </motion.div>

        {/* Users icon - bottom center */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 md:bottom-20 p-2 md:p-3 rounded-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Users className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/50" />
        </motion.div>

        {/* BookOpen - top center */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 md:top-14 p-2 rounded-lg"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
          animate={{ y: [0, -5, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent/40" />
        </motion.div>

        {/* Floating glow orbs */}
        <motion.div
          className="absolute top-1/3 left-[15%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-[15%] w-40 h-40 md:w-56 md:h-56 rounded-full bg-secondary/5 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Animated Title with Glassmorphic Container */}
        <div className="text-center mb-12 md:mb-16">
          {/* Glassmorphic title container */}
          <motion.div
            className="inline-block px-8 py-6 md:px-12 md:py-8 rounded-3xl mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 8px 40px rgba(59, 130, 246, 0.08), 0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-headline mb-0">
              {/* Main title with bullet train animation - colorful gradient */}
              <span className="block md:inline-flex flex-wrap justify-center gap-x-2 md:gap-x-3">
                {titleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="inline-block bg-gradient-to-r from-blue-600 via-primary to-indigo-600 bg-clip-text text-transparent"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>{' '}
              {/* Subtitle with delayed bullet train - accent gradient */}
              <span className="block md:inline-flex flex-wrap justify-center gap-x-2 md:gap-x-3">
                {subtitleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.4,
                      delay: 0.35 + index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    className="inline-block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h2>
          </motion.div>
          <motion.p
            className="text-subtitle max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: false }}
          >
            Six powerful capability blocks. Complete school control.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {capabilities.map((cap, index) => (
            <AnimatedSection
              key={cap.title}
              delay={index * 0.08}
            >
              <motion.div
                className={`relative p-5 md:p-6 h-full rounded-2xl cursor-pointer ${cap.isSpecial ? 'bg-gradient-to-br from-accent/10 to-primary/10' : 'bg-white/70'}`}
                style={{
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(16, 185, 129, 0.15), 0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
                whileTap={{
                  scale: 1.02,
                  boxShadow: '0 0 40px rgba(16, 185, 129, 0.38), 0 0 60px rgba(16, 185, 129, 0.22)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Green glow effect layer */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 -z-10"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.22) 0%, transparent 70%)',
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-${cap.color}/20 to-${cap.color}/10 flex items-center justify-center mb-4 md:mb-5 shadow-sm`}>
                  <cap.icon className={`w-5 h-5 md:w-6 md:h-6 text-${cap.color}`} />
                </div>

                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{cap.title}</h3>

                <ul className="space-y-2 md:space-y-2.5 mb-3 md:mb-4">
                  {cap.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-600">
                      <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                {cap.isSpecial ? (
                  <p className="text-xs text-accent font-semibold">Constantly evolving platform</p>
                ) : (
                  <p className="text-xs text-slate-400 italic">And more...</p>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
