'use client';

import { useRef, type CSSProperties, type HTMLAttributes } from 'react';
import { useInView } from './useInView';

type Props = HTMLAttributes<HTMLDivElement> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 18, className = '', style, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { margin: '0px 0px -80px 0px', once: true });
  return (
    <div
      ref={ref}
      data-shown={shown || undefined}
      className={`reveal ${className}`}
      style={{ '--reveal-y': `${y}px`, '--reveal-delay': `${delay}s`, ...style } as CSSProperties}
      {...rest}
    />
  );
}
