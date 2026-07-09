import { motion } from 'framer-motion';

const SHOTS = [
  { src: '/product/brain.webp', alt: 'Gyanama app — the Brain view surfacing school insights' },
  { src: '/product/performance.webp', alt: 'Gyanama app — class and school performance intelligence' },
  { src: '/product/score-cards.webp', alt: 'Gyanama app — student score cards' },
];

export function IntelligenceSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">The intelligence</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-4">
            A live picture of your school’s health — student, class, and school-wide.
          </h2>
          <p className="text-muted-foreground text-lg">
            Gyanama continuously scores academics, attendance and engagement into a health signal
            for every student, every class, and the school as a whole — so management sees what
            deserves attention without reading ten separate reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {SHOTS.map((s, i) => (
            <motion.div
              key={s.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[2rem] border border-white/60 bg-white shadow-glass-lg p-1.5 w-[210px]"
            >
              <div className="rounded-[1.6rem] overflow-hidden bg-muted">
                <img src={s.src} alt={s.alt} width={468} height={1012} loading="lazy" className="w-full h-auto block" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
