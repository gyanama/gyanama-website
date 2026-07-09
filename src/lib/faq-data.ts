export interface FAQItem {
  question: string;
  answer: string;
  iconName: string;
}

export const faqData: FAQItem[] = [
  {
    question: 'Is Gyanama just another school ERP?',
    answer:
      'No. Traditional school software stores data — attendance, fees, marks — and waits for a staff member to open a dashboard and act. Gyanama is an AI operating system for schools: it understands what’s happening, flags what needs attention, and takes action automatically, like calling a parent when a student’s attendance drops.',
    iconName: 'CheckCircle2',
  },
  {
    question: 'How does the AI attendance calling work?',
    answer:
      'When a student’s attendance drops, Gyanama detects the pattern and automatically places a call to the parent in your school’s voice and the parent’s language, then logs the outcome. No staff member has to notice the problem or make the call first.',
    iconName: 'Phone',
  },
  {
    question: 'Which boards does Gyanama support?',
    answer:
      'Gyanama works across CBSE, ICSE, IB and State Boards. It adapts to your school’s structure, subjects and grading rather than forcing a fixed template.',
    iconName: 'BookOpen',
  },
  {
    question: 'Do we need training to use it?',
    answer:
      'No heavy training. Gyanama is built to be as simple as the apps your staff already use, with dedicated apps for principals, teachers, parents and students on web, Android and iOS.',
    iconName: 'Smartphone',
  },
  {
    question: 'Is our student data safe?',
    answer:
      'Yes. Gyanama runs on secure infrastructure with strict access controls and is designed around India’s DPDP Act, 2023. Your school’s data belongs to your school.',
    iconName: 'Database',
  },
  {
    question: 'How do we get started?',
    answer:
      'Book a 20-minute demo. We’ll walk your team through the attendance calling, the student and school health scores, and AI assignment generation on real screens — then help you set up.',
    iconName: 'Globe',
  },
];
