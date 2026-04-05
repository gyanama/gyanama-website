import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  hover = false, 
  glow = false,
  ...motionProps 
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-3xl',
        hover ? 'glass-card-hover' : 'glass-card',
        glow && 'pulse-glow',
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
