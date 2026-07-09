import { motion } from 'framer-motion';
import { ClipboardCheck, IndianRupee, GraduationCap, ArrowRight } from 'lucide-react';

const ROWS = [
  { icon: ClipboardCheck, stored: 'Attendance is marked', gap: 'but no one calls the parent until a teacher notices the pattern. Days later.' },
  { icon: IndianRupee, stored: 'Fees are recorded', gap: 'but staff still chase every pending payment by hand, one call at a time.' },
  { icon: GraduationCap, stored: 'Marks are entered', gap: 'but the student who’s slipping is often found too late to help.' },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">The real problem</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-4">
            Your software records everything. Then it waits.
          </h2>
          <p className="text-muted-foreground text-lg">
            Your school already captures the data: who’s absent, who hasn’t paid, who’s falling
            behind. But traditional school software is passive. It stores the information and waits
            for a human to notice, interpret, and act. The data is there. Acting on it is still
            entirely manual. Things slip through.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {ROWS.map((r, i) => (
            <motion.div
              key={r.stored}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex items-center gap-3 sm:w-56 shrink-0">
                <span className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center">
                  <r.icon className="w-5 h-5 text-primary" />
                </span>
                <span className="font-medium">{r.stored}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/50 hidden sm:block shrink-0" />
              <p className="text-muted-foreground">{r.gap}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-lg font-medium mt-12">
          The problem was never collecting the data. It’s that nothing <span className="text-primary">acts</span> on it.
        </p>
      </div>
    </section>
  );
}
