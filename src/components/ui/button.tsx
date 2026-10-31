import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'rounded-full bg-indigo text-white hover:bg-indigo-deep',
        hero: 'rounded-full bg-indigo text-white hover:bg-indigo-deep',
        primary: 'rounded-full bg-indigo text-white hover:bg-indigo-deep',
        secondary: 'rounded-full bg-white text-indigo ring-1 ring-indigo/15 hover:ring-indigo/35',
        heroSecondary: 'rounded-full bg-white text-indigo ring-1 ring-indigo/15 hover:ring-indigo/35',
        outline: 'rounded-xl border border-input bg-white hover:bg-paper',
        ghost: 'rounded-xl text-ink/80 hover:bg-paper hover:text-ink',
        destructive: 'rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-indigo underline-offset-4 hover:underline',
        nav: 'text-ink/70 hover:text-ink',
      },
      size: {
        default: 'h-11 px-6 text-sm',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
