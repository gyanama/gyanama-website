import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ROWS = [
  ['Stores attendance', 'Notices attendance problems and calls the parent'],
  ['Records fees', 'Follows up on pending fees automatically'],
  ['Holds marks', 'Surfaces the students who need attention, early'],
  ['Shows a dashboard', 'Tells you what deserves attention today'],
  ['Waits for a command', 'Acts on what’s happening'],
];

export function DifferentiationSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Not another school ERP</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-4">
            The difference is what happens after the data.
          </h2>
          <p className="text-muted-foreground text-lg">
            Same attendance, same fees, same marks. A completely different job.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl border border-border overflow-hidden">
          <div className="grid grid-cols-2 text-sm font-semibold">
            <div className="p-4 bg-muted text-muted-foreground">Traditional school software</div>
            <div className="p-4 gradient-primary text-white">Gyanama</div>
          </div>
          {ROWS.map(([passive, active], i) => (
            <motion.div
              key={passive}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="grid grid-cols-2 border-t border-border"
            >
              <div className="p-4 text-muted-foreground bg-muted/40">{passive}</div>
              <div className="p-4 font-medium flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                {active}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
