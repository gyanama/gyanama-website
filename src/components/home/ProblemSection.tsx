import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { AlertTriangle, CheckCircle, Phone, Clock, Users, TrendingDown, MessageSquare, Bell, Shield, Heart, Smile, Sparkles, XCircle, AlertOctagon, PhoneOff } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f0fdf4 50%, #fefce8 75%, #fdf4ff 100%)'
    }}>
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="container-wide relative z-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-headline mb-6">
            The real problem isn't managing tasks.
            <br />
            <span className="text-muted-foreground">It's losing parent trust.</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Chaos Side - Without GYANAMA */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-destructive/5 rounded-3xl blur-xl" />
              <div className="relative glass-card p-6 md:p-10 rounded-3xl border-destructive/20">
                {/* Stress Illustration */}
                <div className="relative h-40 md:h-48 mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-destructive/5 to-destructive/10">
                  {/* Chaotic background elements */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="absolute top-4 left-6 w-2 h-2 bg-destructive rounded-full" />
                    <div className="absolute top-8 right-10 w-3 h-3 bg-destructive/60 rounded-full" />
                    <div className="absolute bottom-6 left-12 w-2 h-2 bg-destructive/80 rounded-full" />
                    <div className="absolute bottom-10 right-8 w-1.5 h-1.5 bg-destructive rounded-full" />
                  </motion.div>

                  {/* Central stressed figure */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Head with stress expression */}
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shadow-lg border-4 border-white"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-destructive/20 to-destructive/30 flex items-center justify-center">
                        <Users className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
                      </div>
                    </motion.div>

                    {/* Body */}
                    <div className="w-12 h-16 md:w-14 md:h-20 bg-gradient-to-b from-slate-400 to-slate-500 rounded-t-lg mt-1 relative">
                      {/* Arms raised in stress */}
                      <motion.div
                        className="absolute -left-4 top-2 w-8 h-2 bg-slate-400 rounded-full origin-right"
                        animate={{ rotate: [-20, -10, -20] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -right-4 top-2 w-8 h-2 bg-slate-400 rounded-full origin-left"
                        animate={{ rotate: [20, 10, 20] }}
                        transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
                      />
                    </div>
                  </div>

                  {/* Floating stress icons */}
                  <motion.div
                    className="absolute top-4 left-4 md:left-8 p-2 rounded-full bg-destructive/20"
                    animate={{ y: [0, -5, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <PhoneOff className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                  </motion.div>

                  <motion.div
                    className="absolute top-6 right-4 md:right-8 p-2 rounded-full bg-orange-500/20"
                    animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                  >
                    <AlertOctagon className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 left-6 md:left-10 p-2 rounded-full bg-red-500/20"
                    animate={{ y: [0, 5, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-8 right-6 md:right-10 p-2 rounded-full bg-destructive/20"
                    animate={{ y: [0, -4, 0], rotate: [0, -8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 0.7 }}
                  >
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Without GYANAMA</h3>
                    <p className="text-sm text-muted-foreground">Daily chaos</p>
                  </div>
                </div>

                <ul className="space-y-3 md:space-y-4">
                  {[
                    'Parents call repeatedly asking about attendance',
                    'Missed follow-ups lead to complaints',
                    'No visibility into student struggles',
                    'Manual work drains your staff',
                    'Trust erodes slowly, invisibly',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-foreground/80 text-sm md:text-base"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Calm Side - With GYANAMA */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-xl" />
              <div className="relative glass-card p-6 md:p-10 rounded-3xl border-accent/20">
                {/* Relief/Joy Illustration */}
                <div className="relative h-40 md:h-48 mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10">
                  {/* Peaceful background elements */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="absolute top-6 left-8 w-2 h-2 bg-accent/40 rounded-full" />
                    <div className="absolute top-10 right-12 w-3 h-3 bg-accent/30 rounded-full" />
                    <div className="absolute bottom-8 left-14 w-2 h-2 bg-accent/50 rounded-full" />
                  </motion.div>

                  {/* Central happy figure */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Head with happy expression */}
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shadow-lg border-4 border-white"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/30 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                      </div>
                    </motion.div>

                    {/* Body - relaxed pose */}
                    <div className="w-12 h-16 md:w-14 md:h-20 bg-gradient-to-b from-emerald-400 to-emerald-500 rounded-t-lg mt-1 relative">
                      {/* Arms down/relaxed */}
                      <div className="absolute -left-3 top-4 w-6 h-2 bg-emerald-400 rounded-full" />
                      <div className="absolute -right-3 top-4 w-6 h-2 bg-emerald-400 rounded-full" />
                    </div>
                  </div>

                  {/* Floating positive icons */}
                  <motion.div
                    className="absolute top-4 left-4 md:left-8 p-2 rounded-full bg-accent/20"
                    animate={{ y: [0, -3, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                  </motion.div>

                  <motion.div
                    className="absolute top-6 right-4 md:right-8 p-2 rounded-full bg-green-500/20"
                    animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 left-6 md:left-10 p-2 rounded-full bg-pink-500/20"
                    animate={{ y: [0, 3, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-500" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-8 right-6 md:right-10 p-2 rounded-full bg-amber-500/20"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
                  >
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
                  </motion.div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">With GYANAMA</h3>
                    <p className="text-sm text-muted-foreground">Calm control</p>
                  </div>
                </div>

                <ul className="space-y-3 md:space-y-4">
                  {[
                    'AI calls parents before they call you',
                    'Every follow-up automated and tracked',
                    'Early warnings on struggling students',
                    'Staff focuses on education, not admin',
                    'Trust built through transparency',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-foreground/80 text-sm md:text-base"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
