"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "tag" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-rust-500 text-ink-50 hover:bg-rust-600 shadow-[6px_6px_0_#0a0908] hover:shadow-[3px_3px_0_#0a0908] hover:translate-x-[3px] hover:translate-y-[3px]",
  ghost:
    "bg-transparent text-ink-50 hover:bg-ink-50/10 border border-ink-50/30 hover:border-ink-50",
  tag: "bg-acid-500 text-ink-950 hover:bg-acid-400 -rotate-2 hover:rotate-0 shadow-[4px_4px_0_#0a0908]",
  outline:
    "bg-transparent text-ink-50 border-2 border-ink-50 hover:bg-ink-50 hover:text-ink-950",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-display uppercase tracking-wider transition-all duration-150 ease-out",
          "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
