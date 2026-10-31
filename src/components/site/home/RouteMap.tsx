'use client';

import Image from 'next/image';
import { useRef, useState, type ReactNode } from 'react';
import { useInView } from '@/components/site/useInView';
import { Grain, RouteIcon as Icon, cssVars, mesh, type IconName } from '@/components/site/primitives';

type Kind = 'step' | 'check' | 'act' | 'done' | 'wait';
type Stop = { label: string; kind: Kind; icon: IconName; tag?: string };
type Route = { key: string; tab: string; old: Stop[]; ours: Stop[] };

export const ROUTES: Route[] = [
  {
    key: 'absence',
    tab: 'Absence',
    old: [
      { label: 'Attendance marked', kind: 'step', icon: 'register' },
      { label: 'Saved in the system', kind: 'step', icon: 'server', tag: 'Stored' },
      { label: 'Waits', kind: 'wait', icon: 'clock' },
      { label: 'Someone notices, days later', kind: 'step', icon: 'eye', tag: 'By hand' },
      { label: 'Teacher calls from their own phone', kind: 'step', icon: 'phone', tag: 'By hand' },
    ],
    ours: [
      { label: 'Attendance marked', kind: 'step', icon: 'register' },
      { label: 'Checked every day', kind: 'check', icon: 'eye' },
      { label: 'Below 60% this month?', kind: 'check', icon: 'flag' },
      { label: 'App message and up to 3 reminders', kind: 'act', icon: 'message' },
      { label: 'Still low after reminders, or below 40%?', kind: 'check', icon: 'flag' },
      { label: 'Call to the family, 10 am to 6 pm', kind: 'act', icon: 'phone' },
      { label: 'Reason and follow-up logged', kind: 'done', icon: 'check' },
    ],
  },
  {
    key: 'fees',
    tab: 'Fees',
    old: [
      { label: 'Fee recorded', kind: 'step', icon: 'rupee' },
      { label: 'Due date passes', kind: 'step', icon: 'leave', tag: 'Overdue' },
      { label: 'Office checks the list', kind: 'wait', icon: 'clock' },
      { label: 'Staff call families one by one', kind: 'step', icon: 'phone', tag: 'By hand' },
    ],
    ours: [
      { label: 'Invoice raised', kind: 'step', icon: 'doc' },
      { label: 'Due date passes', kind: 'check', icon: 'flag' },
      { label: 'Reminder call the next day', kind: 'act', icon: 'phone' },
      { label: 'Family pays', kind: 'act', icon: 'rupee' },
      { label: 'Numbered PDF receipt issued', kind: 'done', icon: 'check' },
    ],
  },
  {
    key: 'marks',
    tab: 'Marks',
    old: [
      { label: 'Marks entered', kind: 'step', icon: 'pencil' },
      { label: 'Report card printed', kind: 'wait', icon: 'clock' },
      { label: 'Problem seen at the PTM', kind: 'step', icon: 'people', tag: 'Too late' },
    ],
    ours: [
      { label: 'Marks, homework and attendance entered', kind: 'step', icon: 'pencil' },
      { label: 'Scored every night', kind: 'check', icon: 'score' },
      { label: 'Score drops', kind: 'check', icon: 'flag' },
      { label: 'Reasons shown to the teacher and principal', kind: 'done', icon: 'check' },
    ],
  },
];

const KIND_LABEL: Record<Kind, string> = { step: 'Data in', check: 'Checks', act: 'Acts', done: 'Logged', wait: 'Waits' };

const LIVE_DOT: Record<Kind, string> = {
  step: 'bg-white text-ink/55 ring-1 ring-ink/15',
  check: 'bg-white text-indigo ring-2 ring-peri',
  act: 'bg-indigo text-white ring-4 ring-indigo/10',
  done: 'bg-good text-white ring-4 ring-good/15',
  wait: 'bg-white text-ink/40 ring-1 ring-ink/15',
};

const LIVE_KIND: Record<Kind, string> = { step: 'text-ink/55', check: 'text-indigo/80', act: 'text-indigo', done: 'text-good', wait: 'text-ink/55' };

function Lane({ stops, live, run, title }: { stops: Stop[]; live: boolean; run: boolean; title: ReactNode }) {
  const n = stops.length;
  return (
    <div>
      {title}
      <div className="relative mt-6 grid md:grid-cols-[repeat(var(--n),minmax(0,1fr))]" style={cssVars({ '--n': n, '--inset': `${50 / n}%` })}>
        {live ? (
          <>
            <div className="absolute bg-ink/[0.06] max-md:bottom-5 max-md:left-[17px] max-md:top-5 max-md:w-[2px] md:left-[var(--inset)] md:right-[var(--inset)] md:top-[17px] md:h-[2px]" />
            <div
              style={{ transformOrigin: '0 0', transitionDuration: `${0.42 * n}s` }}
              className={`absolute rounded-full transition-transform ease-[cubic-bezier(0.45,0,0.2,1)] ${run ? 'scale-100' : 'scale-0'} max-md:bottom-5 max-md:left-[17px] max-md:top-5 max-md:w-[2px] max-md:bg-[linear-gradient(180deg,#27187E,#768BFE_75%,#15803D)] md:left-[var(--inset)] md:right-[var(--inset)] md:top-[17px] md:h-[2px] md:bg-[linear-gradient(90deg,#27187E,#768BFE_75%,#15803D)]`}
            />
          </>
        ) : (
          <div className="absolute border-dashed border-ink/20 max-md:bottom-5 max-md:left-[17px] max-md:top-5 max-md:border-l-2 md:left-[var(--inset)] md:right-[var(--inset)] md:top-[17px] md:border-t-2" />
        )}
        {stops.map((s, i) => {
          const dot = live ? LIVE_DOT[s.kind] : s.kind === 'wait' ? 'bg-watch-bg text-watch ring-1 ring-watch/30' : 'bg-[#F7F7FB] text-ink/50 ring-1 ring-ink/20';
          return (
            <div
              key={s.label}
              style={{ transitionDelay: `${live ? i * 0.42 : 0.05 * i}s` }}
              className={`relative flex gap-4 transition-[opacity,translate] duration-400 ${run ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} pb-5 last:pb-0 md:flex-col md:items-center md:gap-3 md:px-1.5 md:pb-0 md:text-center`}
            >
              <span className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full ${dot}`}>
                <Icon name={s.icon} size={16} stroke={1.9} />
              </span>
              <div className="pt-1 md:pt-0">
                <div className={`font-inter text-[11px] font-semibold uppercase tracking-[0.12em] ${live ? LIVE_KIND[s.kind] : s.kind === 'wait' ? 'text-watch' : 'text-ink/50'}`}>
                  {s.tag ?? KIND_LABEL[s.kind]}
                </div>
                <div className={`mt-1 font-inter text-[14px] leading-snug ${live ? 'font-medium text-ink' : 'text-ink/65'}`}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const CANVAS_BG = mesh('#DDE2FF', '#FFE9DC', ['#FAFAFD', '#F4F4FA']);

export function RouteMap({ heading, routes = ROUTES }: { heading?: ReactNode; routes?: Route[] }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-140px' });
  const run = inView;
  const r = routes[i];
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] ring-1 ring-ink/[0.06] md:rounded-[2.5rem]" style={{ backgroundImage: CANVAS_BG }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(39,24,126,0.16) 1px, transparent 0)', backgroundSize: '22px 22px' }}
      />
      <Grain />
      <div className="relative px-5 py-10 md:px-12 md:py-14">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          {heading}
          <div role="tablist" className="inline-flex w-fit shrink-0 rounded-xl bg-white p-1 ring-1 ring-ink/[0.08]">
            {routes.map((x, idx) => (
              <button
                key={x.key}
                type="button"
                role="tab"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={`rounded-lg px-4 py-2 font-inter text-sm font-semibold transition ${idx === i ? 'bg-ink text-white' : 'text-ink/55 hover:text-ink'}`}
              >
                {x.tab}
              </button>
            ))}
          </div>
        </div>
        <div key={r.key} className="rise mt-10 grid gap-8 md:mt-14 md:gap-12">
          <div className="rounded-2xl bg-white/40 p-5 ring-1 ring-ink/[0.05] md:p-7">
            <Lane
              stops={r.old}
              live={false}
              run={run}
              title={<div className="font-inter text-[13px] font-semibold text-ink/65">Your current software</div>}
            />
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-[0_30px_60px_-40px_rgba(39,24,126,0.45)] ring-1 ring-ink/[0.05] md:p-7">
            <Lane
              stops={r.ours}
              live
              run={run}
              title={
                <div className="flex items-center gap-2 font-inter text-[13px] font-semibold text-indigo">
                  <Image src="/gyanama-logo-256.webp" alt="" width={20} height={20} className="h-5 w-5" />
                  Gyanama
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
