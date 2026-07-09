import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema, SoftwareApplicationSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, Brain, FileQuestion, CalendarDays, Activity, MessageSquare } from 'lucide-react';

const SYSTEMS = [
  { icon: PhoneCall, title: 'Voice agent', body: 'Calls parents about absences and pending fees, from the school’s live data, and logs every outcome.', link: '/voice-agent-for-schools' },
  { icon: Brain, title: 'The Brain', body: 'Reads attendance and marks together to flag students slipping behind, weeks before the report card shows it.', link: '/at-risk-student-detection' },
  { icon: FileQuestion, title: 'Assignment generation', body: 'Turns your own textbooks into syllabus-aligned assignments and quizzes with marking schemes, in minutes.', link: '/ai-assignment-generator' },
  { icon: CalendarDays, title: 'Timetable generation', body: 'Builds a working school timetable around teacher availability, subject loads and clash rules.', link: '/ai-timetable-generator' },
  { icon: Activity, title: 'Health scores', body: 'A daily score for every student, class and the school, so the morning starts with what needs attention.', link: '/ai-systems' },
  { icon: MessageSquare, title: 'School chatbot', body: 'Answers natural questions about attendance, marks, homework, exams and timetables, for every role.', link: '/ai-systems' },
];

const FAQS = [
  {
    question: 'What can AI actually do for a school?',
    answer:
      'The useful version of AI for schools is not a chatbot bolted onto old software. It is automation of the follow-up work schools never have time for: calling parents when a child is absent, reminding about pending fees, flagging students whose marks are slipping, generating assignments from the school’s own books, and building timetables. Gyanama does each of these today, in one system.',
  },
  {
    question: 'Is AI automation practical for a mid-sized Indian private school?',
    answer:
      'Yes, if it lives inside the school’s daily operations rather than as a separate tool. Gyanama runs on the data the school already produces: attendance, fees, marks. There is nothing extra to feed it. The school marks attendance as usual, and the AI takes over the follow-up: the calls, the flags, the reminders.',
  },
  {
    question: 'Will AI replace teachers or office staff?',
    answer:
      'No. Gyanama automates the repetitive follow-up: dialling numbers, scanning registers, cross-checking marks. Teachers get hours back and better information: which student needs attention, which parent has been informed. Decisions and relationships stay with people.',
  },
  {
    question: 'How is Gyanama different from other AI school software?',
    answer:
      'Most school software with an AI label adds a chatbot or a report generator to a system of record. Gyanama is built the other way around: the AI is the operating layer. It understands what is happening across the school, identifies what needs attention, and takes action itself, calling, flagging, generating, reminding. The software does the work, not just the filing.',
  },
];

const AiForSchools = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      <BreadcrumbSchema pageName="AI for Schools" pagePath="/ai-for-schools" />
      <FAQPageSchema faqs={FAQS} />

      <section className="gradient-hero py-16 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            AI that acts, not a chatbot bolted on
          </span>
          <h1 className="text-display mt-6 mb-5">
            AI for schools, <span className="text-gradient-primary">measured in work it takes off your staff</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Your school already produces the data. Gyanama’s AI reads it and does the follow-up:
            calls the parent, flags the slipping student, drafts the assignment, builds the
            timetable. Here is everything it automates today.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {SYSTEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card rounded-2xl p-7 flex flex-col"
              >
                <span className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-white" />
                </span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{item.body}</p>
                <Link to={item.link} className="text-sm font-medium text-primary inline-flex items-center gap-1.5 group">
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 gradient-soft">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="glass-card rounded-3xl p-3 md:p-4 order-2 md:order-1">
              <img
                src="/product/brain.webp"
                alt="Gyanama Brain view surfacing students and classes that need attention"
                loading="lazy"
                decoding="async"
                className="rounded-2xl w-full h-auto"
              />
              <p className="text-sm text-muted-foreground text-center py-3">
                The Brain: one view of what needs attention across the school.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Why it works</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-5">
                One brain, not six tools
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Point tools exist for each of these jobs: a calling service, a quiz maker, a
                timetable app. Each needs its own exports, uploads and logins, which is why they
                go unused by March.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In Gyanama the AI sits on the school’s live data, so every system feeds the next:
                the attendance that triggers a call is the same data that moves the health score
                and flags the at-risk student. Mark attendance once; everything downstream just
                happens.
              </p>
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
              <Link to="/ai-systems" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">The AI systems in depth</Link>
              <Link to="/school-erp" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">School ERP: the honest guide</Link>
              <Link to="/use-cases" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">How schools use Gyanama</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 gradient-soft">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            See the AI run a real school.
          </h2>
          <p className="text-subtitle mb-8">A 20-minute walkthrough on real screens, not slides.</p>
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

export default AiForSchools;
