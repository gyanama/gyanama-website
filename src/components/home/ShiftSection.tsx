import { motion } from 'framer-motion';
import { Eye, Radar, Zap } from 'lucide-react';

const PILLARS = [
  { icon: Eye, title: 'It understands', body: 'Gyanama reads what’s happening across attendance, academics, fees and communication. Not as separate reports, but as one live picture of your school.' },
  { icon: Radar, title: 'It identifies', body: 'It surfaces what actually needs attention today: the student slipping, the fees overdue, the class falling behind. All before it becomes a problem.' },
  { icon: Zap, title: 'It acts', body: 'Then it takes action: calling the parent, sending the reminder, generating the assignment. Automatically, so your staff don’t have to.' },
];

export function ShiftSection() {
  return (
    <section className="py-24 gradient-soft">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">The shift</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-4">
            Gyanama doesn’t just store your school’s data. It understands it.
          </h2>
          <p className="text-muted-foreground text-lg">
            Think of it as an operating layer over everything your school already does. One
            intelligence connecting management, teachers, students and parents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-7"
            >
              <span className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-5">
                <p.icon className="w-6 h-6 text-white" />
              </span>
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
