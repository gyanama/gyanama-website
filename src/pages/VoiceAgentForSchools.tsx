import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Radar, PhoneCall, ClipboardCheck, UserX, IndianRupee } from 'lucide-react';

const STEPS = [
  { icon: Radar, step: '1', title: 'It notices', body: 'The agent watches the school’s own data. A student marked absent again this week. A fee instalment past its due date. No one has to trigger anything.' },
  { icon: PhoneCall, step: '2', title: 'It calls', body: 'It places a natural voice call to the parent: polite, in the school’s name, about that specific child and that specific issue. Not a robocall blast, a follow-up.' },
  { icon: ClipboardCheck, step: '3', title: 'It logs', body: 'The outcome lands back in the student’s record: call made, parent informed, escalation raised if no one picked up. Your staff see the trail, not the workload.' },
];

const USE_CASES = [
  {
    icon: UserX,
    title: 'Attendance follow-up calls',
    body: 'When a child’s attendance drops, the agent calls the parent the same day. The pattern that used to sit unnoticed in a register becomes a conversation with the parent while it still matters. Repeated absence escalates to the class teacher automatically.',
    link: '/ai-systems',
    linkText: 'See all AI systems',
  },
  {
    icon: IndianRupee,
    title: 'Fee reminder calls',
    body: 'Pending fees get a respectful voice reminder with the amount and due date, and the collection dashboard updates as parents pay. The hours your office spends dialling defaulters go back to actual office work.',
    link: '/fee-management-system',
    linkText: 'Explore fee management',
  },
];

const FAQS = [
  {
    question: 'What is a voice agent for schools?',
    answer:
      'A voice agent for schools is an AI system that makes phone calls to parents on the school’s behalf: attendance alerts, fee reminders and follow-ups. Instead of staff dialling numbers by hand, the agent places natural voice calls, has a short conversation, and logs the outcome against the student record.',
  },
  {
    question: 'How is Gyanama’s voice agent different from standalone AI calling tools?',
    answer:
      'Standalone calling tools need to be fed lists: someone exports numbers, uploads them, writes the script. Gyanama’s voice agent lives inside the school’s operating system, so it already knows who was absent today and whose fees are pending. It decides who to call from live school data, calls, and writes the result back. No exports, no separate vendor.',
  },
  {
    question: 'What do parents hear when the agent calls?',
    answer:
      'A clear, polite voice call in the school’s name about their child: for example, that their child was absent today and the school wanted to make sure everything is alright, or a reminder that a fee instalment is due. Calls are specific to the child and situation, not recorded blasts.',
  },
  {
    question: 'Does automated calling replace teachers talking to parents?',
    answer:
      'No. The agent handles the routine volume, the daily absence checks and payment reminders that eat staff hours. Anything sensitive stays with people. Teachers and the office get the time back for the conversations that actually need a human.',
  },
];

const VoiceAgentForSchools = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="Voice Agent for Schools" pagePath="/voice-agent-for-schools" />
      <FAQPageSchema faqs={FAQS} />

      <section className="gradient-hero py-16 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            <PhoneCall className="w-4 h-4" /> The school that calls
          </span>
          <h1 className="text-display mt-6 mb-5">
            A voice agent that <span className="text-gradient-primary">already knows your school</span>
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Gyanama’s AI voice agent calls parents about the things schools never find time to
            call about: today’s absence, the pending fee, the follow-up. It works from your
            school’s live data, so nobody uploads a list or writes a script.
          </p>
          <div className="mt-8">
            <Link to="/book-demo">
              <Button variant="hero" size="lg" className="group">
                Hear it in a demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg">
              Three steps, none of them yours.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-7 relative"
              >
                <span className="absolute top-6 right-6 text-4xl font-semibold text-primary/10">{item.step}</span>
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
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">In the product</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-5">
                Every call, on the record
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Calls aren’t a black box. The absentee-call log shows who was called, when, and
                what happened, student by student. Escalations surface when a parent can’t be
                reached, so nothing quietly falls through.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                This is the difference between a calling tool and an operating system: the call is
                one step in a loop the school can see.
              </p>
            </div>
            <div className="glass-card rounded-3xl p-3 md:p-4">
              <img
                src="/product/absentee-calls.webp"
                alt="Gyanama absentee call log showing automated parent calls and outcomes"
                loading="lazy"
                decoding="async"
                className="rounded-2xl w-full h-auto"
              />
              <p className="text-sm text-muted-foreground text-center py-3">
                The real absentee-call screen: calls placed and outcomes, per student.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Two jobs it does today</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-7 flex flex-col"
              >
                <span className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-white" />
                </span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-5 flex-1">{item.body}</p>
                <Link to={item.link} className="text-sm font-medium text-primary inline-flex items-center gap-1.5 group">
                  {item.linkText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
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
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Hear a call in your demo.
          </h2>
          <p className="text-subtitle mb-8">20 minutes, real screens, and the voice agent live.</p>
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

export default VoiceAgentForSchools;
