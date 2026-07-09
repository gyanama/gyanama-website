import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, AlertTriangle, IndianRupee, Smartphone, Brain, CheckCircle2 } from 'lucide-react';

const ERP_DOES = [
  { icon: Database, title: 'Records', body: 'Attendance registers, fee ledgers, marks, timetables and student records move from paper and Excel into one database.' },
  { icon: Smartphone, title: 'Reports', body: 'Dashboards and exports for the principal, circulars and notices for parents, report cards for students.' },
  { icon: IndianRupee, title: 'Collects', body: 'Most ERPs now take online fee payments and issue receipts, replacing the cash counter queue.' },
];

const ERP_MISSES = [
  { title: 'Attendance is recorded. Then nothing happens.', body: 'The register is digital now, but a teacher still has to notice the absence pattern and personally call the parent. The ERP stores the problem; it does not respond to it.' },
  { title: 'Fees are tracked. Staff still chase them.', body: 'The pending list is one click away, but someone in the office still spends afternoons calling defaulters one by one. Schools without automation report hours of staff time a day going to follow-up calls.' },
  { title: 'Marks are stored. Struggling students surface at the exam.', body: 'Every test is in the system, but no one connects a slow slide across subjects until the report card makes it obvious. By then the parent meeting is damage control.' },
];

const CHECKLIST = [
  'Online fee collection with UPI and cards, receipts issued automatically',
  'A parent app that parents actually keep using, on Android and iOS',
  'Automated follow-up: the system itself calls the parent when attendance drops',
  'Automated fee reminders, including voice calls, not just SMS blasts',
  'Early warning on students whose marks and attendance are slipping',
  'AI help for teachers: assignments and question papers from your own books',
  'A morning view that says what needs attention today, not 40 reports',
];

const FAQS = [
  {
    question: 'What is a school ERP?',
    answer:
      'A school ERP (enterprise resource planning) system is software that centralises a school’s records: attendance, fees, admissions, exams, marks, timetables and communication. It replaces paper registers and Excel sheets with one database, dashboards and a parent app. Its core job is storing and reporting information.',
  },
  {
    question: 'Which is the best school ERP software in India?',
    answer:
      'It depends on what you optimise for. Established ERPs like Entab, Fedena and MyClassboard digitise records well. But most schools comparing ERPs in 2026 are really trying to fix follow-up problems: absent students whose parents were never called, fees that need chasing, struggling students noticed too late. A system of record cannot fix those. That is why many schools now look at Gyanama, an AI operating system that does everything an ERP does and then acts on the data automatically.',
  },
  {
    question: 'Is Gyanama a school ERP?',
    answer:
      'Gyanama covers everything a school ERP covers: attendance, fees, exams, report cards, timetables, communication, apps for every role. But it is built as an AI operating system, not a system of record. The difference: an ERP waits for your staff to read dashboards and act. Gyanama notices what is happening and acts itself, calling parents about attendance, following up on fees, and flagging students who need attention.',
  },
  {
    question: 'Can Gyanama replace our existing school management software?',
    answer:
      'Yes. Schools move their attendance, fee structures, classes and student records into Gyanama and retire the old system. You keep everything you had, and gain the layer that acts: automated attendance calls, fee reminder calls, at-risk alerts and AI tools for teachers, on web, Android and iOS.',
  },
];

const SchoolErp = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="School ERP: The Honest Guide" pagePath="/school-erp" />
      <FAQPageSchema faqs={FAQS} />

      <section className="gradient-hero py-16 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            The honest guide
          </span>
          <h1 className="text-display mt-6 mb-5">
            School ERP software: <span className="text-gradient-primary">what it gets you, and what it quietly misses</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Every school comparing ERPs is trying to escape registers and Excel. Worth doing. But
            the real cost in a school isn’t missing records, it’s missing follow-up. Here’s the
            full picture before you decide.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">What a school ERP does well</h2>
            <p className="text-muted-foreground text-lg">
              A school ERP is a system of record. It centralises attendance, fees, admissions,
              exams and communication into one database. Three jobs, done properly:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ERP_DOES.map((item, i) => (
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
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">The gap</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-4">
              What every ERP misses: the ERP stores, someone still has to act
            </h2>
          </div>
          <div className="space-y-5">
            {ERP_MISSES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="glass-card rounded-2xl p-6 md:p-7 flex items-start gap-4"
              >
                <AlertTriangle className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1.5">{item.title}</h3>
                  <p className="text-muted-foreground">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">What to look for in 2026</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-5">
                Judge any system, ours included, on this checklist
              </h2>
              <ul className="space-y-3.5">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card rounded-3xl p-3 md:p-4">
              <img
                src="/product/principal-dashboard.webp"
                alt="Gyanama principal dashboard showing live school attention items"
                loading="lazy"
                decoding="async"
                className="rounded-2xl w-full h-auto"
              />
              <p className="text-sm text-muted-foreground text-center py-3">
                The principal’s morning view in Gyanama: what needs attention today, already surfaced.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 gradient-soft">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <span className="w-14 h-14 rounded-2xl gradient-primary inline-flex items-center justify-center mb-6">
            <Brain className="w-7 h-7 text-white" />
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
            Beyond the ERP: a system that acts
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Gyanama does everything on the checklist above because it was built for the follow-up,
            not just the filing. When attendance drops, it calls the parent itself, in your
            school’s voice. When fees are pending, it runs the reminder calls. When a student
            starts slipping across subjects, it flags them weeks before the report card does.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Unlike a school ERP, Gyanama is an AI operating system: same records, same fees, same
            report cards, plus a brain that works through the list so your staff don’t have to.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/vs-school-management-software">
              <Button variant="outline" size="lg">
                See the full comparison
              </Button>
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
            <p className="text-muted-foreground mb-4">Related reading</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/fee-management-system" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">Fee management system</Link>
              <Link to="/voice-agent-for-schools" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">Voice agent for schools</Link>
              <Link to="/ai-for-schools" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">AI for schools</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SchoolErp;
