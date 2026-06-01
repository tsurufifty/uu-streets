import Image from "next/image";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  // Дублируем для бесшовной прокрутки
  const doubled = [...items, ...items];

  return (
    <div className={cn("marquee py-4 border-y border-smoke-700 bg-ink-950 noise-overlay", className)}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-8 font-display text-2xl md:text-3xl uppercase tracking-wider whitespace-nowrap"
          >
            {item}
            <Image
              src="/images/orn.svg"
              alt=""
              width={24}
              height={24}
              className="inline-block h-6 w-6 shrink-0"
            />
          </span>
        ))}
      </div>
    </div>
  );
}