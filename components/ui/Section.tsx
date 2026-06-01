import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("relative py-20 md:py-32", className)}
        {...props}
      >
        <div className={cn(container && "mx-auto max-w-7xl px-6 md:px-10")}>
          {children}
        </div>
      </section>
    );
  },
);

Section.displayName = "Section";
