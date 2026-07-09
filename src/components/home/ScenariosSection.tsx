import { motion } from 'framer-motion';
import { PhoneFrame } from '@/components/ui/PhoneFrame';

const SCENARIOS = [
  {
    outcome: 'When a student’s attendance drops, no one has to notice first.',
    workflow: 'Gyanama spots the pattern and automatically calls the parent in your school’s voice and the parent’s language, then logs the outcome.',
    tag: 'AI attendance calling',
    img: '/product/absentee-calls.webp',
    alt: 'Gyanama app: a log of automated absentee calls made to parents',
  },
  {
    outcome: 'Know which students need attention before it’s obvious.',
    workflow: 'Every student, class and the whole school gets a live health score from academics, attendance and engagement. The ones slipping surface early.',
    tag: 'Student & school intelligence',
    img: '/product/health-score.webp',
    alt: 'Gyanama app: an AI health score for an individual student',
  },
  {
    outcome: 'Teachers turn their syllabus and books into assignments in minutes.',
    workflow: 'Point Gyanama at the syllabus; it generates aligned assignments and quizzes, ready to assign. It replaces an evening of manual work.',
    tag: 'AI assignment generation',
    img: '/product/assign-homework.webp',
    alt: 'Gyanama app: a teacher assigning AI-generated homework',
  },
  {
    outcome: 'Fees follow up on themselves.',
    workflow: 'Gyanama runs the reminder calls and tracks who has paid, so staff stop chasing payments one call at a time.',
    tag: 'Automated fee reminders',
    img: '/product/fee-payment.webp',
    alt: 'Gyanama app: a fee payment and status screen',
  },
];

export function ScenariosSection() {
  return (
    <section className="py-24 gradient-soft">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">In practice</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">
            What Gyanama notices and does in a normal school week.
          </h2>
        </div>

        <div className="space-y-20 max-w-5xl mx-auto">
          {SCENARIOS.map((s, i) => (
            <motion.div
              key={s.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-14`}
            >
              <div className="flex-1">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary-soft rounded-full px-3 py-1 mb-4">
                  {s.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{s.outcome}</h3>
                <p className="text-muted-foreground text-lg">{s.workflow}</p>
              </div>
              <div className="shrink-0">
                <PhoneFrame src={s.img} alt={s.alt} width={220} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
