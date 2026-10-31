'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Reveal } from '@/components/site/Reveal';
import { Crafted, ICONS, Icon } from '@/components/site/ui';
import { Kicker, WRAP } from '@/components/site/ui';
import { FilmPlayer } from '@/components/site/home/FilmPlayer';

const NODES = [
  { k: 'Principal', v: 'Dashboard and reports', icon: ICONS.score, side: 'l', y: 11, lx: 16 },
  { k: 'Teacher', v: 'Attendance and homework', icon: ICONS.register, side: 'r', y: 11, lx: 84 },
  { k: 'Student', v: 'Timetable and results', icon: ICONS.book, side: 'l', y: 88, lx: 16 },
  { k: 'Family', v: 'Student login and calls', icon: ICONS.chat, side: 'r', y: 88, lx: 84 },
];

const TILES = [
  ['Students', '1200'],
  ['Teachers', '130'],
  ['Absent', '132'],
  ['Calls', '12 / 45'],
];

function MiniBrowser() {
  return (
    <div className="overflow-hidden rounded-xl bg-white font-inter shadow-[0_30px_60px_-30px_rgba(39,24,126,0.55)] ring-1 ring-ink/10">
      <div className="flex items-center gap-1.5 border-b border-ink/[0.07] bg-paper/80 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
        <span className="mx-auto rounded bg-white px-2 py-0.5 text-[7px] text-muted ring-1 ring-ink/5 sm:text-[8px]">yourschool.gyanama.in</span>
      </div>
      <div className="grid grid-cols-[22%_1fr]">
        <div className="space-y-1 border-r border-ink/[0.07] p-1.5">
          {['Dashboard', 'Attendance', 'Fees', 'Exams', 'Calls'].map((s, i) => (
            <div key={s} className={`rounded px-1 py-0.5 text-[6px] sm:text-[7.5px] ${i === 0 ? 'bg-indigo text-white' : 'text-ink/60'}`}>{s}</div>
          ))}
        </div>
        <div className="bg-[#F1F2F6] p-1.5 sm:p-2">
          <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
            {TILES.map(([k, v]) => (
              <div key={k} className="rounded-md bg-white px-1.5 py-1">
                <div className="text-[6px] text-muted sm:text-[7px]">{k}</div>
                <div className="text-[9px] font-semibold text-ink sm:text-[11px]">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-1 rounded-md bg-white p-1.5 sm:mt-1.5">
            <div className="text-[6.5px] font-semibold text-ink sm:text-[8px]">Calls &amp; Messages</div>
            {['Ishaan Verma · Call done', 'Riya Sharma · Message sent'].map((r) => (
              <div key={r} className="mt-0.5 text-[6px] text-ink/60 sm:text-[7px]">{r}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Ecosystem() {
  return (
    <figure className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-white/80 ring-1 ring-white sm:aspect-[5/4]">
      <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {NODES.map((n, i) => (
          <motion.line
            key={n.k}
            x1={n.lx}
            y1={n.y}
            x2={50}
            y2={46}
            stroke="#768BFE"
            strokeWidth={0.35}
            strokeDasharray="1.2 1.2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 * i }}
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:hidden">
        <div className="flex flex-col items-center gap-2 rounded-[1.4rem] bg-white px-5 py-4 font-inter shadow-[0_24px_48px_-24px_rgba(39,24,126,0.55)] ring-1 ring-ink/[0.06]">
          <Image src="/gyanama-logo-256.webp" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="text-[15px] font-semibold text-indigo">Gyanama</span>
          <span className="text-[12px] text-ink/60">Android · iOS · Web</span>
          <span className="mt-1 flex items-center gap-1.5 rounded-full bg-indigo px-2.5 py-1 text-[11px] font-semibold text-white">
            <Icon d={ICONS.call} size={11} />
            AI call to the family
          </span>
        </div>
      </div>
      <div className="absolute left-1/2 top-[46%] w-[58%] -translate-x-1/2 -translate-y-1/2 max-sm:hidden">
        <MiniBrowser />
        <div className="absolute -bottom-[14%] -left-[6%] flex items-center gap-1.5 rounded-full bg-indigo py-1 pl-1 pr-2.5 font-inter text-white shadow-[0_14px_28px_-14px_rgba(39,24,126,0.9)] sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-3.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 sm:h-6 sm:w-6">
            <Icon d={ICONS.call} size={11} />
          </span>
          <span className="whitespace-nowrap text-[10px] font-semibold sm:text-[12px]">AI call to the family</span>
        </div>
        <div className="absolute -bottom-[18%] -right-[8%] w-[30%] rounded-[1rem] bg-[#0E1022] p-[3px] shadow-[0_24px_40px_-20px_rgba(39,24,126,0.7)] sm:rounded-[1.3rem]">
          <div className="relative overflow-hidden rounded-[0.85rem] sm:rounded-[1.1rem]" style={{ aspectRatio: '393 / 852' }}>
            <Image src="/app/student-dashboard.png" alt="Student home screen in the Gyanama app" fill sizes="120px" className="object-cover object-top" />
          </div>
        </div>
      </div>
      {NODES.map((n, i) => (
        <motion.div
          key={n.k}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + 0.12 * i }}
          className="absolute -translate-y-1/2"
          style={n.side === 'l' ? { left: '3%', top: `${n.y}%` } : { right: '3%', top: `${n.y}%` }}
        >
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-1 pl-1 pr-2.5 font-inter shadow-[0_12px_24px_-16px_rgba(39,24,126,0.6)] ring-1 ring-ink/[0.06] sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-3.5">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-peri-wash text-indigo sm:h-7 sm:w-7">
              <Icon d={n.icon} size={12} />
            </span>
            <span className="leading-tight">
              <span className="block text-[10.5px] font-semibold text-ink sm:text-[12.5px]">{n.k}</span>
              <span className="hidden text-[10.5px] text-ink/55 sm:block">{n.v}</span>
            </span>
          </div>
        </motion.div>
      ))}
      <figcaption className="sr-only">Gyanama on Android, iOS and the web, all on the same school data, for principals, teachers, students and families.</figcaption>
    </figure>
  );
}

export function FilmAndEcosystem() {
  return (
    <section id="film" className="bg-white py-10 md:py-16">
      <div className={WRAP}>
        <Crafted tone="lilac" className="rounded-[2rem] p-5 md:rounded-[2.5rem] md:p-12">
          <Reveal className="max-w-2xl">
            <Kicker>
                            One school, one app
            </Kicker>
            <h2 className="mt-4 font-fraunces text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.8rem]">See Gyanama in 70 seconds.</h2>
            <p className="mt-4 font-inter text-[15px] leading-relaxed text-ink/60 md:text-lg">On Android, iOS and the web, on the same school data. Principals, teachers, students and families each see what they need.</p>
          </Reveal>
          <div className="mt-8 grid items-center gap-5 md:mt-10 lg:grid-cols-2 lg:gap-6">
            <Reveal delay={0.05}>
              <FilmPlayer />
            </Reveal>
            <Reveal delay={0.1}>
              <Ecosystem />
            </Reveal>
          </div>
        </Crafted>
      </div>
    </section>
  );
}
