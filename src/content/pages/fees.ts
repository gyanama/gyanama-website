import type { LandingContent } from './types';

export const feeManagement: LandingContent = {
  path: '/fee-management-system',
  title: 'Fee Management System for Schools',
  description: 'A school fee management system with fee structures, invoices, discounts and numbered PDF receipts, plus a reminder call to families the day after the due date.',
  breadcrumb: 'Fee management',
  kicker: 'Fee management',
  h1: 'A fee management system that reminds families for you.',
  summary:
    "Gyanama's fee management system runs on the school web app. The office sets up fee structures and terms, raises invoices, adds discounts and records cash, cheque or UPI payments, and each payment gets a numbered PDF receipt. When a fee is still unpaid the day after its due date, Gyanama calls the family with a short reminder.",
  heroScreen: '/app/fee-payment.png',
  heroAlt: 'Fee Payment screen in the Gyanama app with the quarter 4 fees, the due date and the payment history',
  heroTone: 'apricot',
  heroCard: 'feeReminder',
  facts: [
    { k: '1 day', v: 'After the due date, a reminder call' },
    { k: 'PDF receipts', v: 'Numbered, for every payment' },
    { k: 'Cash, cheque, UPI', v: 'Entered by the office' },
    { k: 'Your Razorpay', v: 'Connected by the school' },
  ],
  sections: [
    {
      q: 'How does the office set up fees?',
      a: 'The office creates fee structures with terms, such as quarters, and raises an invoice for each student. It can add one-off charges and give a flat or percentage discount.',
      points: ['Fee structures and terms for each class', 'Ad hoc charges on an invoice', 'Flat or percentage discounts', 'Bulk fee slips for a class'],
      screen: '/app/fee-payment.png',
      alt: 'Fee Payment screen in the Gyanama app showing tuition, transport and activity charges for one quarter',
      tone: 'apricot',
      card: 'receipt',
    },
    {
      q: 'When does the fee reminder call go out?',
      a: 'The day after the due date, between 10 am and 6 pm. The call lasts up to 3 minutes and is in Hindi, Hinglish or English.',
      body: 'It only reminds the family that a fee is due. It never takes a payment, quotes an amount or sends a link.',
      link: { label: 'How the AI call works', href: '/voice-agent-for-schools' },
    },
    {
      q: 'How does the office enter payments?',
      a: 'Staff record cash, cheque or UPI payments against the invoice, and Gyanama makes a numbered PDF receipt for each one. Receipts carry the school name and logo.',
      screen: '/app/fee-payment.png',
      alt: 'Payment history in the Gyanama app with paid quarters and downloadable receipts',
      tone: 'marigold',
      card: 'feeReminder',
    },
    {
      q: 'Can families pay fees online?',
      a: 'Yes. Families can pay online in the app, through the Razorpay account that the school connects to Gyanama.',
    },
    {
      q: 'What does the principal see?',
      a: 'A fee dashboard with the amount collected and the amount still due, so the principal knows where collection stands without asking the office.',
    },
  ],
  faqs: [
    { q: 'Does the reminder call ask for money?', a: 'No. It reminds the family that a fee is overdue. It never takes a payment, quotes an amount or sends a link.' },
    { q: 'Is the fee reminder call on every plan?', a: 'No. Fee reminder calls are part of the Automate and Autonomy plans. They are off on Assist.' },
    { q: 'Can we give discounts?', a: 'Yes. A discount can be a flat amount or a percentage.' },
    { q: 'Where does the office manage fees?', a: "On the Gyanama web app, at the school's own web address." },
  ],
  related: ['/school-web-app', '/voice-agent-for-schools', '/for-principals', '/plans'],
  updated: '2026-10-31',
};
