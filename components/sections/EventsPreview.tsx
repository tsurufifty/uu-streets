"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";

type Event = {
  date: string;
  month: string;
  title: string;
  venue: string;
  tag: string;
  rotate: number;
  accent: "rust" | "acid" | "paper";
};

const EVENTS: Event[] = [
  {
    date: "05",
    month: "JUL",
    title: "НОЧЬ\nЁХОРА",
    venue: "Этнографический музей",
    tag: "ёхор · гранд-круг · open-air",
    rotate: -2,
    accent: "rust",
  },
  {
    date: "10–11",
    month: "JUL",
    title: "ГОЛОС\nКОЧЕВНИКОВ",
    venue: "Ацагат · 60 км от УУ",
    tag: "world-music · rock · 2 дня",
    rotate: 1.5,
    accent: "acid",
  },
];

const accents: Record<Event["accent"], { bg: string; text: string; chip: string; shadow: string }> = {
  rust: {
    bg: "bg-rust-500",
    text: "text-ink-50",
    chip: "bg-ink-950 text-acid-400 border border-acid-500/50",
    shadow: "shadow-[8px_8px_0_#0a0908]",
  },
  acid: {
    bg: "bg-acid-500",
    text: "text-ink-950",
    chip: "bg-ink-950 text-acid-400 border border-acid-500/50",
    shadow: "shadow-[8px_8px_0_#0a0908]",
  },
  paper: {
    bg: "paper-card",
    text: "text-ink-950",
    chip: "bg-ink-950 text-rust-400 border border-rust-500/40",
    shadow: "shadow-[8px_8px_0_#0a0908]",
  },
};

export function EventsPreview() {
  return (
    <section id="events" className="relative overflow-hidden bg-ink-950 py-24 md:py-32 noise-overlay">
      {/* HUGE bg text */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none">
        <div className="text-center font-display text-[18vw] uppercase leading-none tracking-tighter text-smoke-800/40 whitespace-nowrap">
          АФИША · АФИША
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* HEADER */}
        <Reveal>
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <span className="h-px w-10 bg-rust-500" />
            <span>03 / афиша</span>
          </div>
          <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-ink-50 md:text-6xl">
            <span className="block">Концерты,</span>
            <span className="block">street events,</span>
            <span className="block text-rust-400">festivals.</span>
          </h2>
        </Reveal>

        {/* POSTER WALL */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-8">
          {EVENTS.map((e, i) => {
            const a = accents[e.accent];
            return (
              <Reveal key={i} delay={i * 0.12}>
                <motion.div
                  whileHover={{ rotate: 0, y: -8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  style={{ transform: `rotate(${e.rotate}deg)` }}
                  className={`relative ${a.bg} ${a.text} ${a.shadow} p-6 md:p-8`}
                >
                  {/* date */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-7xl leading-none tracking-tight md:text-8xl">
                      {e.date}
                    </span>
                    <span className="font-display text-xl uppercase tracking-widest">
                      {e.month}
                    </span>
                  </div>

                  {/* divider */}
                  <div className="my-6 h-px w-16 bg-current opacity-30" />

                  {/* title */}
                  <h3 className="font-display text-3xl uppercase leading-[0.95] md:text-4xl whitespace-pre-line">
                    {e.title}
                  </h3>

                  {/* venue */}
                  <div className="mt-6 font-medium text-xs uppercase tracking-[0.25em] opacity-80">
                    @ {e.venue}
                  </div>

                  {/* tag chip */}
                  <div className={`mt-6 inline-block ${a.chip} px-3 py-1 font-medium text-[10px] uppercase tracking-[0.2em]`}>
                    {e.tag}
                  </div>

                  {/* corner stamp */}
                  <div className="pointer-events-none absolute -right-2 -top-2 rotate-12 border-2 border-current px-2 py-1 font-display text-[10px] uppercase tracking-widest opacity-90">
                    UU · 2026
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-center justify-center gap-4 border-y border-smoke-700 py-10 md:flex-row md:justify-between md:py-8">
            <Card variant="paper" rotate={-1} className="px-5 py-3" withTape>
              <span className="font-display text-sm uppercase tracking-wider">
                новые даты — каждую пятницу
              </span>
            </Card>
            <Link href="/events">
              <Button variant="primary" size="lg">
                Смотреть афишу →
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
