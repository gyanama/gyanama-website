import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, IndianRupee, PenTool, Activity, MessageSquare, Settings } from 'lucide-react';

const BLOCKS = [
  {
    icon: Phone,
    title: 'Attendance that acts',
    lead: 'Mark attendance in seconds — then let Gyanama do what a register never could.',
    items: ['Fast daily attendance & registers', 'Auto AI calls to parents when attendance drops', 'Absentee-call logs & follow-up', 'Leave & substitute management'],
    img: '/product/mark-attendance.webp',
    alt: 'Gyanama — marking class attendance',
  },
  {
    icon: IndianRupee,
    title: 'Fees, collected and chased for you',
    lead: 'Online collection with automated follow-up, so staff stop chasing payments.',
    items: ['Online payments (UPI, cards, cash)', 'Fee structures, discounts & invoices', 'Automated fee-reminder calls', 'Collection dashboard'],
    img: '/product/fee-payment.webp',
    alt: 'Gyanama — fee payment screen',
  },
  {
    icon: PenTool,
    title: 'Academics, minus the busywork',
    lead: 'From syllabus to report card — with AI doing the heavy lifting.',
    items: ['AI assignment & quiz generation', 'Homework, exams & marks', 'PDF report cards', 'Timetable generation'],
    img: '/product/assign-homework.webp',
    alt: 'Gyanama — assigning homework',
  },
  {
    icon: Activity,
    title: 'Intelligence that surfaces what matters',
    lead: 'A live health score for every student, class and the whole school.',
    items: ['Student, class & school health scores', 'At-risk & weak-spot detection', 'Weekly insights for management', 'Performance analytics'],
    img: '/product/health-score.webp',
    alt: 'Gyanama — student health score',
  },
  {
    icon: MessageSquare,
    title: 'Everyone on the same page',
    lead: 'Management, teachers, parents and students, connected in one place.',
    items: ['Real-time chat & notifications', 'Announcements & forms', 'Parent–teacher meetings (PTM)', 'Anonymous bully reporting'],
    img: '/product/ptm.webp',
    alt: 'Gyanama — parent-teacher meeting scheduling',
  },
  {
    icon: Settings,
    title: 'The whole school, handled',
    lead: 'The everyday operations a school runs on — in one operating layer.',
    items: ['Calendar & events', 'Gate passes & transfer certificates', 'Role-based access (principal, teacher, parent, student)', 'Web, Android & iOS apps'],
    img: '/product/principal-dashboard.webp',
    alt: 'Gyanama — principal dashboard',
  },
];

const Features = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="Features" pagePath="/features" />

      <section className="gradient-hero py-20 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-display mb-5">
            Everything a school runs on —{' '}
            <span className="text-gradient-primary">and an AI that acts on it.</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Gyanama covers the full operations of a school. But unlike a school management system that
            just stores the data, Gyanama acts on it — calling parents, flagging students, collecting
            fees. Here’s what’s inside.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 space-y-20 max-w-5xl">
          {BLOCKS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-14`}
            >
              <div className="flex-1">
                <span className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-5">
                  <b.icon className="w-6 h-6 text-white" />
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">{b.title}</h2>
                <p className="text-muted-foreground text-lg mb-5">{b.lead}</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {b.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <div className="rounded-[2rem] border border-white/60 bg-white shadow-glass-lg p-1.5 w-[220px]">
                  <div className="rounded-[1.6rem] overflow-hidden bg-muted">
                    <img src={b.img} alt={b.alt} width={468} height={1012} loading="lazy" className="w-full h-auto block" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 gradient-soft">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">See it all in action.</h2>
          <p className="text-subtitle mb-8">Book a demo and we’ll walk your team through it on real screens.</p>
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

export default Features;
