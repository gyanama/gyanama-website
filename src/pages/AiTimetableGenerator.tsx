import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Users, Ban, Layers, RefreshCw, CheckCircle2 } from 'lucide-react';

const CONSTRAINTS = [
  { icon: Users, title: 'Teacher availability', body: 'Who teaches what, who is part-time, who can’t take first period. The generator plans around your staff reality, not an ideal one.' },
  { icon: Ban, title: 'No clashes, by construction', body: 'One teacher can’t be in two rooms. A class can’t have two subjects at once. The engine checks placement and overlap rules on every slot.' },
  { icon: Layers, title: 'Subject loads honoured', body: 'Six periods of maths, four of science, games twice a week. Each class gets its required load spread sensibly across the week.' },
  { icon: RefreshCw, title: 'Regenerate when life happens', body: 'A teacher leaves mid-term, a new section opens. Regenerate around the change instead of redoing the whole grid by hand.' },
];

const OLD_WAY = [
  'A senior teacher loses days of vacation to chart paper and erasers',
  'One late change ripples into a dozen manual fixes',
  'Clashes are found by the students who experience them',
  'The final grid lives in one Excel file only one person understands',
];

const FAQS = [
  {
    question: 'What is an AI timetable generator for schools?',
    answer:
      'An AI timetable generator is software that builds a school’s weekly class schedule automatically. You give it the inputs, classes, subjects, periods per subject, teacher assignments and availability, and it produces a working grid with no teacher clashes and no class overlaps, in minutes instead of days.',
  },
  {
    question: 'How does Gyanama generate a school timetable?',
    answer:
      'Gyanama takes your classes, subject period loads and teacher assignments, then solves the schedule against placement and overlap constraints: no teacher double-booked, no class with two subjects in one slot, required loads met. The result is a complete weekly timetable you can review, adjust and publish to teachers and students in their apps.',
  },
  {
    question: 'Can we edit the generated timetable manually?',
    answer:
      'Yes. The generated grid is a starting point you control. Swap slots, pin a period where you want it, and regenerate around your changes. The engine keeps checking for clashes as you adjust, so a manual tweak never silently breaks another class’s schedule.',
  },
  {
    question: 'What happens when a teacher leaves or a new section is added?',
    answer:
      'You update the inputs, mark the teacher as unavailable or add the section, and regenerate. The engine rebuilds around the change. The days of cascading manual fixes after every staffing change are the exact problem this replaces.',
  },
];

const AiTimetableGenerator = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="AI Timetable Generator" pagePath="/ai-timetable-generator" />
      <FAQPageSchema faqs={FAQS} />

      <section className="gradient-hero py-16 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            <CalendarDays className="w-4 h-4" /> Timetables
          </span>
          <h1 className="text-display mt-6 mb-5">
            The timetable takes <span className="text-gradient-primary">minutes, not the last week of vacation</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Gyanama’s AI timetable generator builds the whole school’s weekly grid around your
            teachers, subjects and rules: no clashes, loads honoured, regenerable when things
            change.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">What it solves for</h2>
            <p className="text-muted-foreground text-lg">
              A school timetable is a constraint puzzle. The generator treats it like one.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {CONSTRAINTS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card rounded-2xl p-7"
              >
                <span className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-white" />
                </span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 gradient-soft">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="glass-card rounded-2xl p-7">
              <h3 className="text-xl font-semibold mb-5">The chart-paper way</h3>
              <ul className="space-y-3.5">
                {OLD_WAY.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <Ban className="w-5 h-5 shrink-0 mt-0.5 text-muted-foreground/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-2xl p-7 border-primary/20">
              <h3 className="text-xl font-semibold mb-5">With the generator</h3>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Inputs once: classes, subjects, loads, teachers</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>A complete clash-free grid, generated in minutes</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Review, tweak and pin what you want by hand</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>Published straight to teacher, student and parent apps</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-10">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.question} className="glass-card rounded-2xl p-6">
                <h3 className="font-semibold mb-2">{f.question}</h3>
                <p className="text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/ai-for-schools" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">All AI systems</Link>
              <Link to="/ai-assignment-generator" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">AI assignment generator</Link>
              <Link to="/features" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">Every feature</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 gradient-soft">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Bring your timetable headache to the demo.
          </h2>
          <p className="text-subtitle mb-8">We’ll generate a sample grid from your real classes and teachers.</p>
          <Link to="/book-demo">
            <Button variant="hero" size="lg" className="group">
              Book a Demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default AiTimetableGenerator;
