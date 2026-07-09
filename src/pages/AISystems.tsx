import { motion } from 'framer-motion';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Activity, PenTool, IndianRupee, ArrowRight } from 'lucide-react';

const SYSTEMS = [
  {
    icon: Phone,
    eyebrow: 'AI attendance calling',
    outcome: 'When attendance drops, no one has to notice first.',
    body: 'Gyanama watches attendance patterns and, when a student starts slipping, automatically calls the parent — in your school’s voice and the parent’s language — then logs how the call went. No staff member has to spot the trend or pick up the phone.',
    points: ['Detects the pattern automatically', 'Calls parents in their language', 'Logs every outcome for follow-up'],
    img: '/product/absentee-calls.webp',
    alt: 'Gyanama — a log of automated absentee calls to parents',
  },
  {
    icon: Activity,
    eyebrow: 'Student & school intelligence',
    outcome: 'Know which students need attention — before it’s obvious.',
    body: 'The Brain turns academics, attendance and engagement into a live health score for every student, every class, and the whole school. Instead of reading ten reports, management sees who and what needs attention today.',
    points: ['Health scores for student, class & school', 'Surfaces at-risk students early', 'One live picture, not scattered reports'],
    img: '/product/health-score.webp',
    alt: 'Gyanama — an AI health score for a student',
  },
  {
    icon: PenTool,
    eyebrow: 'AI assignment generation',
    outcome: 'Teachers turn syllabus and books into assignments in minutes.',
    body: 'Point Gyanama at the syllabus or a book, and it generates aligned assignments and quizzes ready to assign — replacing an evening of manual work with a few minutes.',
    points: ['Syllabus- and book-aligned', 'Assignments and quizzes', 'Ready to assign in minutes'],
    img: '/product/assign-homework.webp',
    alt: 'Gyanama — a teacher assigning AI-generated homework',
  },
  {
    icon: IndianRupee,
    eyebrow: 'Automated fee reminders',
    outcome: 'Fees follow up on themselves.',
    body: 'Gyanama runs the reminder calls and tracks who has paid — so your staff stop chasing pending fees one call at a time.',
    points: ['Automated reminder calls', 'Tracks who has paid', 'Frees staff from chasing'],
    img: '/product/fee-payment.webp',
    alt: 'Gyanama — a fee payment and status screen',
  },
];

const AISystems = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="AI Systems" pagePath="/ai-systems" />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            The intelligence inside Gyanama
          </span>
          <h1 className="text-display mt-6 mb-5">
            The AI that <span className="text-gradient-primary">acts</span> on your school’s data.
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Most school software stores information and waits. Gyanama’s AI reads what’s happening,
            decides what needs attention, and takes action — calling parents, scoring students,
            generating assignments. Here’s how each part works.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 space-y-20 max-w-5xl">
          {SYSTEMS.map((s, i) => (
            <motion.div
              key={s.eyebrow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-14`}
            >
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary-soft rounded-full px-3 py-1 mb-4">
                  <s.icon className="w-4 h-4" /> {s.eyebrow}
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">{s.outcome}</h2>
                <p className="text-muted-foreground text-lg mb-5">{s.body}</p>
                <ul className="space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <PhoneFrame src={s.img} alt={s.alt} width={230} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            See the AI working on real school data.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Book a 20-minute demo and watch the attendance calling, health scores and assignment
            generation on real screens.
          </p>
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

export default AISystems;
