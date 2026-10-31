'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Phase = 'idle' | 'alert' | 'calling' | 'talk' | 'logged';

const SEQUENCE: { phase: Phase; ms: number }[] = [
  { phase: 'idle', ms: 1600 },
  { phase: 'alert', ms: 1600 },
  { phase: 'calling', ms: 1800 },
  { phase: 'talk', ms: 7600 },
  { phase: 'logged', ms: 2800 },
];

type StoryState = { phase: Phase; step: number; cycle: number };

const StoryContext = createContext<StoryState>({ phase: 'idle', step: 0, cycle: 0 });

export function StoryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoryState>({ phase: 'idle', step: 0, cycle: 0 });

  useEffect(() => {
    const t = setTimeout(() => {
      setState((s) => {
        const next = (s.step + 1) % SEQUENCE.length;
        return { phase: SEQUENCE[next].phase, step: next, cycle: next === 0 ? s.cycle + 1 : s.cycle };
      });
    }, SEQUENCE[state.step].ms);
    return () => clearTimeout(t);
  }, [state.step, state.cycle]);

  return <StoryContext.Provider value={state}>{children}</StoryContext.Provider>;
}

export function useStory() {
  return useContext(StoryContext);
}

export function useTalkLines(phase: Phase, cycle: number, total: number, full = false) {
  const [tick, setTick] = useState({ cycle: -1, n: 1 });
  useEffect(() => {
    if (full || phase !== 'talk') return;
    const timers = Array.from({ length: total - 1 }, (_, i) => setTimeout(() => setTick({ cycle, n: i + 2 }), (i + 1) * 1100));
    return () => timers.forEach(clearTimeout);
  }, [phase, cycle, total, full]);
  if (full || phase === 'logged') return total;
  if (phase !== 'talk') return 0;
  return tick.cycle === cycle ? tick.n : 1;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}
