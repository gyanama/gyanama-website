import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CalPopupButton } from '@/components/scheduling';

export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />

      {/* Animated Mesh Gradient */}
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          backgroundSize: '100% 100%'
        }}
      />

      {/* Floating Glass Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/10 backdrop-blur-3xl border border-white/20"
          animate={{ x: [-20, 20], y: [-20, 20] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500/20 backdrop-blur-3xl border border-white/10"
          animate={{ x: [20, -20], y: [20, -20] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />
      </div>

      <div className="container-narrow relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden group">

          {/* Shine Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Main Headline - Split animation from Left and Right */}
          <div className="overflow-hidden mb-6 pt-12">
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              Ready to transform
            </motion.h2>
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: false }}
            >
              your school?
            </motion.h2>
          </div>

          {/* Subtext - From Bottom */}
          <motion.p
            className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }}
          >
            Stay ahead digitally. You can't afford to lose this opportunity to modernize your institution.
          </motion.p>

          {/* CTA Button - Zoom In */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
            viewport={{ once: false }}
          >
            <CalPopupButton size="xl" className="bg-white text-blue-600 hover:bg-blue-50 border-none px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
              Book a Demo
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </CalPopupButton>
          </motion.div>

          <motion.p
            className="mt-8 text-sm text-blue-200/80 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: false }}
          >
            <Sparkles size={14} /> Join forward-thinking principals today
          </motion.p>
        </div>
      </div>
    </section>
  );
}
