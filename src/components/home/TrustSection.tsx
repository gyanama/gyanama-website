import { motion } from 'framer-motion';
import { Smartphone, ShieldCheck, Lock, MapPin } from 'lucide-react';

const CHIPS = [
  { icon: Smartphone, label: 'Real product — web, Android & iOS' },
  { icon: ShieldCheck, label: 'Secure infrastructure' },
  { icon: Lock, label: 'DPDP-aligned data handling' },
  { icon: MapPin, label: 'Built for Indian schools' },
];

export function TrustSection() {
  return (
    <section className="py-24 gradient-soft">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Why trust Gyanama</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-4">
            Built by people who watched schools run on registers and Excel.
          </h2>
          <p className="text-muted-foreground text-lg">
            Gyanama was built by Yash Bhardwaj and Rachit Mittal after watching teachers lose their
            evenings to paper registers, hand-built assignments, and fee-chasing calls. It’s a real,
            working product — already live in a school — designed around India’s DPDP data-protection
            rules and built to be trusted with student data.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHIPS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <c.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
