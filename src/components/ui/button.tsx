import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:shadow-xl rounded-xl",
        primary:
          "bg-foreground text-background rounded-full hover:scale-105 hover:shadow-xl hover:shadow-foreground/20",
        secondary:
          "bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg hover:bg-white hover:shadow-xl hover:-translate-y-0.5 rounded-xl",
        ghost:
          "text-foreground/80 hover:text-foreground hover:bg-muted rounded-xl",
        link: 
          "text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-xl",
        hero:
          "bg-foreground text-background rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-foreground/25 text-base",
        heroSecondary:
          "bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg rounded-full hover:bg-white hover:shadow-xl hover:-translate-y-0.5 text-base",
        nav:
          "text-foreground/70 hover:text-foreground hover:bg-transparent",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-10 text-base",
        xl: "h-16 px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
