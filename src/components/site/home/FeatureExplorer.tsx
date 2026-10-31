'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react';
import { Crafted, Device, ICONS, Icon, TONES, type ToneKey } from '@/components/site/ui';
import {
  CallLogCard,
  DoubtCard,
  FeeReminderCard,
  ReceiptCard,
  LeaveCard,
  LoggedCard,
  MarkedCard,
  PillarsCard,
  PtmCard,
  QuizOutputCard,
  QuizSourceCard,
  ReasonsCard,
  TeacherCheckCard,
  TimetableCard,
} from '@/components/site/cards';

type Feature = {
  key: string;
  icon: string;
  title: string;
  line: string;
  tone: ToneKey;
  screen: string;
  alt: string;
  a: ComponentType;
  b: ComponentType;
  note?: string;
  detail: string;
};

const ALL_FEATURES: Feature[] = [
  {
    key: 'absence',
    icon: ICONS.call,
    title: 'Absence follow-up',
    line: 'Messages, then a call if attendance keeps falling.',
    detail: 'Below 60% this month, the family gets an app message and up to 3 reminders. If attendance keeps dropping, or falls below 40%, Gyanama calls between 10 am and 6 pm and logs the reason.',
    tone: 'peri',
    screen: '/app/absentee-logged.png',
    alt: 'Absentee Call Logs screen in the Gyanama app',
    a: CallLogCard,
    b: LoggedCard,
  },
  {
    key: 'fees',
    icon: ICONS.rupee,
    title: 'Fee follow-up',
    line: 'Invoices, receipts and a reminder call after the due date.',
    detail: 'Fee structures, invoices, discounts and numbered PDF receipts. Staff record cash, cheque or UPI payments, and any family with an overdue fee gets a reminder call the day after the due date.',
    tone: 'apricot',
    screen: '/app/fee-payment.png',
    alt: 'Fee Payment screen in the Gyanama app',
    a: FeeReminderCard,
    b: ReceiptCard,
  },
  {
    key: 'score',
    icon: ICONS.score,
    title: 'Student Progress Score',
    line: 'A nightly score for every student, with the reasons.',
    detail: 'Attendance 35%, academics 30%, homework 20% and behaviour 15%. Computed every night for each student and class, with the reasons behind it.',
    tone: 'sky',
    screen: '/app/health-score.png',
    alt: 'Score screen in the Gyanama app',
    a: ReasonsCard,
    b: PillarsCard,
    note: 'Shown as Health Score in the app.',
  },
  {
    key: 'quiz',
    icon: ICONS.book,
    title: 'Test paper from your textbook',
    line: 'A question paper and answer key, checked by the teacher.',
    detail: 'Upload a textbook PDF or pick from the NCERT library, then choose up to 5 chapters. MCQ, true or false, fill in the blank, short and long answers, in English or Hindi. The teacher reviews and edits every question before it is used.',
    tone: 'marigold',
    screen: '/app/ai-test.png',
    alt: 'AI Test screen in the Gyanama app',
    a: QuizSourceCard,
    b: QuizOutputCard,
  },
  {
    key: 'timetable',
    icon: ICONS.grid,
    title: 'Timetable',
    line: 'A draft with no clashes, reviewed before you save.',
    detail: 'Enter periods, subjects and teachers. Gyanama drafts a timetable where no teacher is in two classes at once, and you review it before saving.',
    tone: 'rose',
    screen: '/app/timetable-management.png',
    alt: 'Timetable Management screen in the Gyanama app',
    a: TeacherCheckCard,
    b: TimetableCard,
  },
  {
    key: 'register',
    icon: ICONS.register,
    title: 'Attendance and leave',
    line: 'The register in a few taps. No calls for approved leave.',
    detail: 'Teachers mark attendance on the phone. Families request leave in the app, and approved leave, weekends and holidays are skipped when attendance is checked.',
    tone: 'lilac',
    screen: '/app/mark-attendance.png',
    alt: 'Mark Attendance screen in the Gyanama app',
    a: MarkedCard,
    b: LeaveCard,
  },
  {
    key: 'doubts',
    icon: ICONS.chat,
    title: 'PTMs and doubts',
    line: 'PTM requests and student doubts in one app.',
    detail: 'Families request a PTM time and the teacher accepts it. Students ask doubts by subject and teachers reply, in the same app they use for homework and the timetable.',
    tone: 'sea',
    screen: '/app/doubts.png',
    alt: 'Student doubts screen in the Gyanama app',
    a: DoubtCard,
    b: PtmCard,
  },
];

const INTERVAL = 6500;

function Panel({ f }: { f: Feature }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const ya = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const yb = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const A = f.a;
  const B = f.b;
  return (
    <div ref={ref}>
      <Crafted tone={f.tone} className="h-[470px] rounded-[2rem] md:h-[600px] md:rounded-[2.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={f.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-8 -translate-x-1/2 md:left-[57%] md:top-14">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Device src={f.screen} alt={f.alt} width={272} className="hidden md:block" />
                <Device src={f.screen} alt={f.alt} width={220} className="md:hidden" />
              </motion.div>
            </div>
            <motion.div style={{ y: ya }} className="absolute left-5 top-28 hidden md:block xl:left-7">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <A />
              </motion.div>
            </motion.div>
            <div className="absolute inset-x-0 bottom-5 flex justify-center md:inset-x-auto md:bottom-12 md:right-6 xl:right-8">
              <motion.div style={{ y: yb }}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <B />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Crafted>
      <div className="mt-4 flex flex-col gap-1 px-1 font-inter md:flex-row md:items-start md:justify-between md:gap-6">
        <p className="max-w-xl text-[14.5px] leading-relaxed text-ink/60">{f.detail}</p>
        {f.note && <p className="shrink-0 text-xs text-muted md:pt-1">{f.note}</p>}
      </div>
    </div>
  );
}

export function FeatureExplorer({ exclude = [] }: { exclude?: string[] }) {
  const FEATURES = ALL_FEATURES.filter((x) => !exclude.includes(x.key));
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [wide, setWide] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-25% 0px -25% 0px' });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const running = auto && inView && wide;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((x) => (x + 1) % FEATURES.length), INTERVAL);
    return () => clearTimeout(t);
  }, [running, i, FEATURES.length]);

  const pick = (idx: number) => {
    setI(idx);
    setAuto(false);
  };

  const f = FEATURES[i];

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
      <ul className="space-y-1" role="tablist" aria-orientation="vertical">
        {FEATURES.map((x, idx) => {
          const on = idx === i;
          return (
            <li key={x.key}>
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pick(idx)}
                className={`group relative w-full overflow-hidden rounded-2xl px-4 py-3.5 text-left font-inter transition-colors duration-300 md:px-5 ${
                  on ? 'bg-white shadow-[0_18px_40px_-28px_rgba(39,24,126,0.5)] ring-1 ring-ink/[0.06]' : 'hover:bg-white/60'
                }`}
              >
                <div className="flex gap-4">
                  <span
                    className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-all duration-300 ${on ? '' : 'grayscale opacity-60'}`}
                    style={{ backgroundColor: TONES[x.tone].chip, color: TONES[x.tone].ink }}
                  >
                    <Icon d={x.icon} size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className={`text-[16px] leading-snug transition-colors md:text-[17px] ${on ? 'font-semibold text-ink' : 'font-medium text-ink/70 group-hover:text-ink'}`}>{x.title}</div>
                    <div className={`mt-0.5 text-[14px] leading-relaxed transition-colors md:text-[14.5px] ${on ? 'text-ink/65' : 'text-ink/55'}`}>{x.line}</div>
                  </div>
                </div>
                {on && running && (
                  <motion.span
                    key={`bar-${i}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                    className="absolute inset-x-5 bottom-0 h-[2px] origin-left rounded-full bg-indigo/70"
                  />
                )}
              </button>
              {on && (
                <div className="mt-3 pb-4 lg:hidden">
                  <Panel f={x} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="hidden lg:block">
        <Panel f={f} />
      </div>
    </div>
  );
}
