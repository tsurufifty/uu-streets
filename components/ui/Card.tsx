"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "paper" | "dark" | "polaroid" | "torn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  rotate?: number;
  withTape?: boolean;
}

const variants: Record<Variant, string> = {
  paper: "paper-card noise-overlay",
  dark: "bg-smoke-800 text-ink-50 noise-overlay border border-smoke-600",
  polaroid: "paper-card noise-overlay p-3 pb-12",
  torn: "paper-card noise-overlay torn-edges",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "paper", rotate = 0, withTape = false, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          variants[variant],
          className,
        )}
        style={{
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
          ...style,
        }}
        {...props}
      >
        {withTape && (
          <span className="tape pointer-events-none absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3" />
        )}
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
