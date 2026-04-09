export interface FAQItem {
  question: string;
  answer: string;
  iconName: string;
}

export const faqData: FAQItem[] = [
  {
    question: 'Is this CBSE/ICSE compatible?',
    answer:
      'Yes, 100%. Our platform is designed to adapt to all major boards including CBSE, ICSE, IB, and State Boards with full compliance.',
    iconName: 'BookOpen',
  },
  {
    question: 'Is training required to use the platform?',
    answer:
      "No, not at all. configuring GYANAMA is very simple. We've designed it to be intuitive - if you can use WhatsApp, you can use our platform.",
    iconName: 'CheckCircle2',
  },
  {
    question: 'Does it work on mobile devices?',
    answer:
      '100% mobile compatible. We have dedicated, native apps for Teachers, Parents, and Admins covering iOS and Android devices seamlessly.',
    iconName: 'Smartphone',
  },
  {
    question: 'How safe is our data?',
    answer:
      'Data safety is our top most priority. We employ banking-grade encryption and strict access controls. Your data belongs to you, and we ensure it stays that way.',
    iconName: 'Database',
  },
  {
    question: 'Do you provide language support?',
    answer:
      'Yes. GYANAMA is available in multiple regional languages to ensure every staff member and parent feels comfortable using the system.',
    iconName: 'Globe',
  },
  {
    question: 'Is there customer support available?',
    answer:
      'Absolutely. We provide dedicated account managers and 24/7 support to help you whenever you need it.',
    iconName: 'Phone',
  },
];
