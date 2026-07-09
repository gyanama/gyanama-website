import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema, FAQPageSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileQuestion, ScanSearch, FileCheck2 } from 'lucide-react';

const STEPS = [
  { icon: BookOpen, step: '1', title: 'Your books go in', body: 'Upload the textbooks your school actually teaches from. The AI detects chapters and extracts the concepts inside each one.' },
  { icon: ScanSearch, step: '2', title: 'Pick class, subject, chapter', body: 'A teacher chooses what the assignment should cover, Class 8 Science, chapter 4, and how hard it should be.' },
  { icon: FileCheck2, step: '3', title: 'A ready paper comes out', body: 'Questions, instructions and a marking scheme, aligned to the chapter you picked, as a clean PDF. Review, edit if you like, assign.' },
];

const WHY_IT_MATTERS = [
  'Assignments come from your syllabus and your books, not a random question bank',
  'A full paper with marking scheme in minutes, not an evening of hand-picking questions',
  'Difficulty is a choice, so the same chapter can produce practice for every level',
  'Teachers review and edit before anything reaches students; the teacher stays the author',
];

const FAQS = [
  {
    question: 'What is an AI assignment generator?',
    answer:
      'An AI assignment generator creates assignments, quizzes and question papers automatically from source material. Gyanama’s version works from the school’s own textbooks: it detects chapters, extracts concepts, and generates questions with instructions and a marking scheme as a ready-to-use PDF.',
  },
  {
    question: 'Are the generated questions aligned to our syllabus?',
    answer:
      'Yes, because the source is your own books. Gyanama does not pull from a generic question bank. Teachers upload the textbooks the school teaches from, the AI maps chapters and concepts, and every generated question traces back to that material. If it is not in your book, it is not in the paper.',
  },
  {
    question: 'Do teachers still control what students receive?',
    answer:
      'Completely. The AI produces a draft paper, questions, instructions, marking scheme, and the teacher reviews it before assigning. Edit questions, swap them, change marks. It removes the hours of manual question-hunting, not the teacher’s judgement.',
  },
  {
    question: 'What subjects and classes does it work for?',
    answer:
      'It works from whatever textbooks you upload, so it follows your curriculum rather than prescribing one. Schools use it across subjects and grade levels; the quality tracks the source book, which is exactly the point, it teaches from what you teach.',
  },
];

const AiAssignmentGenerator = () => {
  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="AI Assignment Generator" pagePath="/ai-assignment-generator" />
      <FAQPageSchema faqs={FAQS} />

      <section className="gradient-hero py-16 md:py-28">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-1.5 text-sm font-medium text-primary">
            <FileQuestion className="w-4 h-4" /> For teachers
          </span>
          <h1 className="text-display mt-6 mb-5">
            Assignments from <span className="text-gradient-primary">your own books</span>, in minutes
          </h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Teachers spend evenings hunting questions and building papers by hand. Gyanama
            generates syllabus-aligned assignments and quizzes from the textbooks your school
            already teaches, complete with instructions and a marking scheme.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Book to paper, three steps</h2>
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
            <div className="glass-card rounded-3xl p-3 md:p-4 order-2 md:order-1">
              <img
                src="/product/assign-homework.webp"
                alt="Gyanama teacher app assigning generated homework to a class"
                loading="lazy"
                decoding="async"
                className="rounded-2xl w-full h-auto"
              />
              <p className="text-sm text-muted-foreground text-center py-3">
                Assigning work in the real teacher app.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Why teachers keep using it</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3 mb-6">
                Built around the syllabus, not instead of it
              </h2>
              <ul className="space-y-3.5">
                {WHY_IT_MATTERS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FileCheck2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
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
              <Link to="/ai-timetable-generator" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">AI timetable generator</Link>
              <Link to="/use-cases" className="glass-card rounded-full px-4 py-2 text-sm text-primary hover:opacity-80 transition-opacity">How schools use Gyanama</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 gradient-soft">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Bring a chapter. Leave with a paper.
          </h2>
          <p className="text-subtitle mb-8">In the demo, we generate an assignment from your own book, live.</p>
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

export default AiAssignmentGenerator;
