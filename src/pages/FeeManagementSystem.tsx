import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, IndianRupee, PhoneCall, Receipt, LayoutDashboard, BadgePercent, FileText } from 'lucide-react';

const PRINCIPAL_SIDE = [
  { icon: LayoutDashboard, title: 'Live collection dashboard', body: 'Collected, pending and overdue at a glance, by class, by student, by fee head. No more asking accounts for this month’s position.' },
  { icon: PhoneCall, title: 'Reminder calls, made for you', body: 'Gyanama runs automated voice reminder calls to parents with pending fees. The afternoons your office staff spend dialling defaulters come back.' },
  { icon: BadgePercent, title: 'Concessions handled properly', body: 'Sibling discounts, scholarships and one-off waivers sit inside the fee structure with a record, so nothing is a verbal arrangement.' },
];

const PARENT_SIDE = [
  { icon: IndianRupee, title: 'Pay from the phone', body: 'UPI, cards and net banking from the parent app. No queue at the fee counter, no cheque in the school diary.' },
  { icon: Receipt, title: 'Instant receipts', body: 'A proper PDF invoice lands in the app the moment payment goes through. Fewer “did you receive it?” calls to the office.' },
  { icon: FileText, title: 'Clear dues, no surprises', body: 'Parents see exactly what is due, what was paid and when, term by term. Disputes drop when both sides see the same record.' },
];

const FAQS = [
  {
    question: 'What is a fee management system for schools?',
    answer:
      'A fee management system is software that handles a school’s entire fee cycle: defining fee structures, collecting payments online and offline, issuing receipts, tracking pending dues, and reporting collections. In India that means UPI and card payments, GST-compliant receipts and term-wise dues that parents can see in an app.',
  },
  {
    question: 'How is Gyanama’s fee management different from other school fee software?',
    answer:
      'Most fee software stops at recording who has paid and showing a pending list. Gyanama also does the follow-up: it runs automated voice reminder calls to parents with pending fees and tracks who has paid after each round, so office staff stop spending hours on manual calls. Collection, receipts, dashboard and follow-up in one system.',
  },
  {
    question: 'Does Gyanama support UPI and online fee payment?',
    answer:
      'Yes. Parents pay by UPI, cards and net banking through Razorpay, and schools can also record cash and cheque payments in the same ledger. Every payment generates a PDF invoice automatically, and refunds and partial payments are handled with a full audit trail.',
  },
  {
    question: 'Can we set different fee structures for different classes?',
    answer:
      'Yes. Gyanama supports per-class and per-student fee structures with multiple fee heads, term-wise schedules, discounts and concessions. The collection dashboard then reports against those structures, so you always know the real pending amount, not an estimate.',
  },
];

const FeeManagementSystem = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="Fee Management System" pagePath="/fee-management-system" />
      <FAQPageSchema faqs={FAQS} />

      <section className="gradient-hero py-16 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            Fees, start to finish
          </span>
          <h1 className="text-display mt-6 mb-5">
            A fee management system that <span className="text-gradient-primary">also does the chasing</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Fee software usually stops at a pending list. Gyanama collects online, issues receipts
            instantly, shows you a live dashboard, and then makes the reminder calls your office
            staff make by hand today.
          </p>
          <div className="mt-8">
            <Link to="/book-demo">
              <Button variant="hero" size="lg" className="group">
                See it on your fee structure
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">For the principal and the office</h2>
            <p className="text-muted-foreground text-lg">
              The two questions that matter: how much is pending, and who is following it up.
              Gyanama answers the first live and does the second itself.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRINCIPAL_SIDE.map((item, i) => (
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
            <div className="glass-card rounded-3xl p-3 md:p-4 order-2 md:order-1">
              <img
                src="/product/fee-payment.webp"
                alt="Gyanama parent app fee payment screen with UPI and card options"
                loading="lazy"
                decoding="async"
                className="rounded-2xl w-full h-auto"
              />
              <p className="text-sm text-muted-foreground text-center py-3">
                The parent side: dues, UPI payment and the receipt, all in the app.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">For parents</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-6">
                Parents pay on time when paying is easy
              </h2>
              <div className="space-y-5">
                {PARENT_SIDE.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </span>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-5">
            The part no other fee software does
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            A pending list is not follow-up. In most schools, someone in the office spends hours a
            week calling parents about dues, politely, repeatedly, by hand. Gyanama runs those
            reminder calls automatically: a clear, respectful voice call about the pending amount,
            logged against the student, with the dashboard updating as payments come in.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Your office keeps the judgement calls. Gyanama does the dialling.
          </p>
          <Link to="/voice-agent-for-schools">
            <Button variant="outline" size="lg" className="group">
              How the voice agent works
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
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
              <Link to="/school-erp" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">School ERP: the honest guide</Link>
              <Link to="/vs-school-management-software" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">Gyanama vs school management software</Link>
              <Link to="/book-demo" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">Book a demo</Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FeeManagementSystem;
