'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Reveal } from '@/components/site/Reveal';
import { CARD, Crafted, Device, ICONS, Icon, SectionHead, type ToneKey } from '@/components/site/ui';
import { LoggedCard, PillarsCard, QuizSourceCard } from '@/components/site/cards';
import { WRAP } from '@/components/site/ui';

function ProjectionCard() {
  const factors = [
    { k: 'Academics', v: '+5%', tone: 'text-good' },
    { k: 'Attendance', v: '-8%', tone: 'text-risk' },
    { k: 'Homework', v: '-2%', tone: 'text-risk' },
  ];
  return (
    <div className={`${CARD} w-[15.5rem]`}>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-semibold text-ink">Projected final</span>
        <span className="text-[10px] text-muted">Class 9-A</span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-fraunces text-[1.9rem] font-medium leading-none text-indigo">88%</span>
        <span className="rounded-full bg-peri-wash px-2 py-0.5 text-[10px] font-semibold text-indigo">Grade A</span>
      </div>
      <div className="mt-3 space-y-1.5 border-t border-ink/[0.06] pt-2.5">
        {factors.map((f) => (
          <div key={f.k} className="flex items-center justify-between text-[11.5px]">
            <span className="text-ink/70">{f.k}</span>
            <span className={`font-semibold ${f.tone}`}>{f.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Usp = {
  key: string;
  icon: string;
  title: string;
  line: string;
  body: string;
  points: string[];
  screen: string;
  alt: string;
  tone: ToneKey;
  Card: ComponentType;
  note?: string;
};

const USPS: Usp[] = [
  {
    key: 'calls',
    icon: ICONS.call,
    title: 'AI calls to parents',
    line: 'The school follows up, without a teacher picking up the phone.',
    body: 'Below 60% attendance this month, the family gets an app message and up to 3 reminders, then a call. Below 40%, the call goes out straight away. Overdue fees get a reminder call the day after the due date.',
    points: ['10 am to 6 pm only', 'Hindi, Hinglish or English', 'Every call logged for the class teacher'],
    screen: '/app/absentee-logged.png',
    alt: 'Absentee Call Logs screen in the Gyanama app',
    tone: 'peri',
    Card: LoggedCard,
  },
  {
    key: 'score',
    icon: ICONS.score,
    title: 'Student Progress Score',
    line: 'Every student scored every night, with the reasons.',
    body: 'Each student, class and the whole school gets a score each night from attendance, marks, homework and behaviour. Teachers see who is slipping and why, not just a number.',
    points: ['Attendance 35%, marks 30%', 'Homework 20%, behaviour 15%', 'Good, Watch and At risk bands'],
    screen: '/app/health-score.png',
    alt: 'Score screen in the Gyanama app',
    tone: 'sky',
    Card: PillarsCard,
    note: 'Shown as Health Score in the app.',
  },
  {
    key: 'prediction',
    icon: ICONS.sliders,
    title: 'Result prediction',
    line: 'See the likely final result while there is still time to help.',
    body: "Gyanama projects each student's final percentage and grade from marks, attendance and homework, and shows what is pushing it up or down. Teachers get a list of students at risk before the exam, not after it.",
    points: ['Projected % and grade', 'What is moving it, and by how much', 'A next step for the student'],
    screen: '/app/brain.png',
    alt: 'Projected score screen in the Gyanama app',
    tone: 'lilac',
    Card: ProjectionCard,
  },
  {
    key: 'quiz',
    icon: ICONS.book,
    title: 'Test papers from your textbook',
    line: 'A question paper and answer key, checked by the teacher.',
    body: 'Pick your own textbook PDF or one from the NCERT library, then up to 5 chapters. Gyanama writes the questions in English or Hindi, with an answer key, and the teacher edits every question before it is used.',
    points: ['MCQ, true or false, fill in the blank', 'Short and long answers', 'Easy to hard'],
    screen: '/app/ai-test.png',
    alt: 'Teacher reviewing AI test questions in the Gyanama app',
    tone: 'marigold',
    Card: QuizSourceCard,
  },
];

const INTERVAL = 7000;

function Stage({ u, phone = 250 }: { u: Usp; phone?: number }) {
  return (
    <Crafted tone={u.tone} className="flex items-center justify-center rounded-[1.75rem] px-4 pb-0 pt-8 md:rounded-[2.25rem] md:pt-12">
      <div className="relative">
        <Device src={u.screen} alt={u.alt} width={phone} className="translate-y-6" />
        <div className="absolute -left-10 bottom-16 max-sm:hidden md:-left-28">
          <u.Card />
        </div>
      </div>
    </Crafted>
  );
}

function Points({ u }: { u: Usp }) {
  return (
    <>
      <p className="font-inter text-[15px] leading-relaxed text-ink/70 md:text-base">{u.body}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {u.points.map((p) => (
          <li key={p} className="rounded-full bg-white px-3 py-1.5 font-inter text-[12.5px] font-medium text-ink/75 ring-1 ring-ink/[0.07]">{p}</li>
        ))}
      </ul>
      {u.note && <p className="mt-3 font-inter text-xs text-muted">{u.note}</p>}
    </>
  );
}

export function UspShowcase() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (held) return;
    const t = setInterval(() => setI((x) => (x + 1) % USPS.length), INTERVAL);
    return () => clearInterval(t);
  }, [held]);
  const u = USPS[i];
  return (
    <section id="usp" className="bg-white pb-10 pt-14 md:pb-16 md:pt-24">
      <div className={WRAP}>
        <Reveal>
          <SectionHead kicker="The follow-up" title="What Gyanama does on its own." />
        </Reveal>

        <div className="mt-10 grid gap-10 max-lg:hidden lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div role="tablist" className="space-y-2">
            {USPS.map((x, idx) => {
              const on = idx === i;
              return (
                <button
                  key={x.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setI(idx);
                    setHeld(true);
                  }}
                  className={`group block w-full rounded-[1.5rem] p-5 text-left transition ${on ? 'bg-[#F6F6FB] ring-1 ring-ink/[0.06]' : 'hover:bg-[#F9F9FC]'}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${on ? 'bg-indigo text-white' : 'bg-peri-wash text-indigo/70'}`}>
                      <Icon d={x.icon} size={19} />
                    </span>
                    <div>
                      <div className={`font-fraunces text-[1.35rem] font-medium leading-tight tracking-[-0.01em] ${on ? 'text-ink' : 'text-ink/75 group-hover:text-ink'}`}>{x.title}</div>
                      <div className={`mt-0.5 font-inter text-[14px] ${on ? 'text-ink/65' : 'text-ink/60'}`}>{x.line}</div>
                    </div>
                  </div>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-[3.4rem] pt-4">
                          <Points u={x} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={u.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="overflow-hidden rounded-[2.25rem]">
              <Stage u={u} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 lg:hidden">
          <div role="tablist" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
            {USPS.map((x, idx) => (
              <button
                key={x.key}
                type="button"
                role="tab"
                aria-selected={idx === i}
                onClick={() => {
                  setI(idx);
                  setHeld(true);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 font-inter text-[13px] font-semibold transition ${idx === i ? 'bg-indigo text-white' : 'bg-[#F1F2F8] text-ink/75'}`}
              >
                <Icon d={x.icon} size={14} />
                {x.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={u.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <h3 className="mt-5 font-fraunces text-[1.35rem] font-medium leading-tight text-ink">{u.line}</h3>
              <div className="mt-3">
                <Points u={u} />
              </div>
              <div className="mt-5 overflow-hidden rounded-[1.75rem]">
                <Stage u={u} phone={210} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
