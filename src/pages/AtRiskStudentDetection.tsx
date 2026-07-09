import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingDown, Eye, BellRing, HeartPulse } from 'lucide-react';

const SIGNS = [
  'Attendance dipping in small, easy-to-miss steps',
  'Marks sliding across more than one subject at once',
  'A strong student suddenly performing below their own baseline',
  'A class whose overall health score keeps drifting down',
];

const HOW = [
  { icon: Eye, title: 'It watches the whole record', body: 'The Brain reads attendance and academic performance together, per student, every day. Not one exam in isolation, the trend.' },
  { icon: TrendingDown, title: 'It catches the slide early', body: 'A dip that a busy teacher can’t see across 40 students and 6 subjects stands out to a system that compares every student to their own history.' },
  { icon: BellRing, title: 'It tells the right person', body: 'Flags land with the class teacher and the principal’s morning view, with the reason attached: what changed, since when, and how much.' },
];

const FAQS = [
  {
    question: 'What is at-risk student detection?',
    answer:
      'At-risk student detection is an early-warning system that identifies students who are starting to struggle, before it shows up as a failed exam or a dropout risk. It works by monitoring attendance and academic trends per student and flagging meaningful declines to teachers and school leadership early enough to intervene.',
  },
  {
    question: 'How does Gyanama detect at-risk students?',
    answer:
      'Gyanama’s Brain analyses each student’s attendance and marks against their own history and their class. When the pattern turns, repeated absences, a slide across subjects, a drop below the student’s usual level, it raises a flag with the evidence attached. Detection runs on the school’s live data automatically.',
  },
  {
    question: 'What do teachers see when a student is flagged?',
    answer:
      'The flag, the reason and the trend: which signals moved, since when, and how far. A class teacher sees their own students; the principal sees the school-wide picture in daily health scores. From there the school decides the human response, a conversation, a parent call, extra attention.',
  },
  {
    question: 'Why do schools miss struggling students without this?',
    answer:
      'Because each signal lives in a different place. The attendance register shows absences, mark sheets show one exam at a time, and no one has time to cross-reference 40 students weekly. The pattern only becomes obvious at the report card, months after it started. Software that reads everything together catches it in week two, not month three.',
  },
];

const AtRiskStudentDetection = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="At-Risk Student Detection" pagePath="/at-risk-student-detection" />
      <FAQPageSchema faqs={FAQS} />

      <section className="gradient-hero py-16 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            <HeartPulse className="w-4 h-4" /> The Brain
          </span>
          <h1 className="text-display mt-6 mb-5">
            The school that <span className="text-gradient-primary">never misses a kid</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Every struggling student sends signals long before the report card: a few absences, a
            slide in two subjects, a dip below their own usual level. Gyanama reads those signals
            daily and flags who needs attention, while there’s still time to act.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">How the Brain catches it</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
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
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">The signals</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-5">
                What it notices that people can’t
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                None of these are dramatic on their own. That’s exactly why they get missed in a
                school of hundreds of students:
              </p>
              <ul className="space-y-3.5">
                {SIGNS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-3xl p-3 md:p-4">
              <img
                src="/product/health-score.webp"
                alt="Gyanama student health score screen showing attendance and performance trends"
                loading="lazy"
                decoding="async"
                className="rounded-2xl w-full h-auto"
              />
              <p className="text-sm text-muted-foreground text-center py-3">
                Health scores in the real app: every student, every class, scored daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
            Detection is step one. Gyanama also acts.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            A flag no one follows up on is just another report. Because the Brain lives in the
            same system as the voice agent, an attendance slide doesn’t only get flagged, the
            parent gets a call. The loop closes on the same day the pattern is caught.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/voice-agent-for-schools">
              <Button variant="outline" size="lg">How the voice agent works</Button>
            </Link>
            <Link to="/book-demo">
              <Button variant="hero" size="lg" className="group">
                Book a Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 gradient-soft">
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
              <Link to="/ai-systems" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">The AI systems in depth</Link>
              <Link to="/use-cases" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">How schools use Gyanama</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AtRiskStudentDetection;
