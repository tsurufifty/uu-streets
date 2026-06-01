"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

const SPOTS = [
  { n: "01", name: "Орда",        cat: "бурятское",    note: "буузы, бухлёр, караоке" },
  { n: "02", name: "Кенигсберг",  cat: "ресторан",     note: "стейки, мидии, рейтинг 4.7" },
  { n: "03", name: "Мэргэн",      cat: "пивоварня",    note: "шведский стол, до 180 мест" },
  { n: "04", name: "Чаплин",      cat: "рестоклуб",    note: "гриль, танцпол, до 04:00" },
];

export function GastroPreview() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 grunge-bg">
      {/* neon haze */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-acid-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-rust-500/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* HEADER */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-acid-400">
                <span className="h-px w-10 bg-acid-500" />
                <span>02 / гастротур</span>
              </div>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-ink-50 md:text-6xl">
                <span className="block">Уличная</span>
                <span className="block">
                  <span className="bg-acid-500 px-2 text-ink-950">кухня</span>{" "}
                  города
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-sm text-base text-ink-100/70 md:text-lg">
              Локальная еда, underground-кафе, ночные точки.
              Где едят те, кто рисует стены.
            </p>
          </Reveal>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SPOTS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, rotate: i % 2 ? -1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full border border-smoke-700 bg-ink-950/70 p-6 backdrop-blur-sm transition-colors hover:border-acid-500"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-4xl text-acid-400 leading-none">
                    {s.n}
                  </span>
                  <span className="-rotate-6 border border-acid-500/40 px-2 py-1 font-medium text-[9px] uppercase tracking-[0.2em] text-acid-400">
                    {s.cat}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-xl uppercase leading-tight text-ink-50">
                  {s.name}
                </h3>

                <div className="mt-3 font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/60">
                  {s.note}
                </div>

                {/* hover bottom line */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-acid-500 transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA STRIP */}
        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-acid-500/30 bg-ink-950/70 p-8 backdrop-blur-sm md:flex-row md:items-center md:p-12">
            <div>
              <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-acid-400">
                гастро-карта · скоро
              </div>
              <h3 className="mt-3 font-display text-3xl uppercase leading-tight text-ink-50 md:text-4xl">
                Карта еды как маршрут
              </h3>
            </div>
            <Link href="/gastro">
              <Button variant="tag" size="lg">
                Открыть гастротур →
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
