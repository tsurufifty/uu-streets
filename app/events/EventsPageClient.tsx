"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import type { Event, EventAccent } from "@/data/events";

interface EventsPageClientProps {
  events: Event[];
}

const accents: Record<
  EventAccent,
  { bg: string; text: string; muted: string }
> = {
  rust: { bg: "bg-rust-500", text: "text-ink-50", muted: "text-ink-50/70" },
  acid: { bg: "bg-acid-500", text: "text-ink-950", muted: "text-ink-950/70" },
  paper: { bg: "paper-card", text: "text-ink-950", muted: "text-ink-950/70" },
  dark: {
    bg: "bg-smoke-800 border border-smoke-600",
    text: "text-ink-50",
    muted: "text-ink-50/70",
  },
};

export default function EventsPageClient({ events }: EventsPageClientProps) {
  return (
    <div className="grunge-bg pt-24">
      {/* HEADER */}
      <section className="relative pb-12 pt-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <Link href="/" className="hover:text-rust-500">← Главная</Link>
            <span className="opacity-30">/</span>
            <span>афиша</span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] text-ink-50 md:text-7xl">
            <span className="block">Афиша</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-ink-100/70">
            Главные события Бурятии — концерты, фестивали, выставки.
          </p>
        </div>
      </section>

      {/* EMPTY STATE */}
      {events.length === 0 ? (
        <section className="relative pb-24">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center md:px-10">
            <div className="font-display text-3xl uppercase text-ink-50/60">
              Пока нет анонсированных событий
            </div>
            <p className="mt-4 text-sm text-ink-100/60">
              Зайди позже — или предложи своё событие через контакты.
            </p>
            <Link href="/about" className="mt-6 inline-block">
              <Button variant="primary" size="md">
                Добавить событие →
              </Button>
            </Link>
          </div>
        </section>
      ) : (
        /* POSTERS */
        <section className="relative pb-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid gap-14 md:grid-cols-2 md:gap-10">
              {events.map((e, i) => {
                const a = accents[e.accent];
                return (
                  <Reveal key={e.slug ?? i} delay={i * 0.12}>
                    <motion.article
                      whileHover={{ rotate: 0, y: -6 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                      }}
                      style={{ transform: `rotate(${e.rotate}deg)` }}
                      className={`relative ${a.bg} ${a.text} p-8 shadow-[10px_10px_0_#0a0908] md:p-10`}
                    >
                      {/* meta row */}
                      <header className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-6xl leading-none tracking-tight md:text-8xl">
                            {e.date}
                          </span>
                          <div>
                            <div className="font-display text-2xl uppercase tracking-widest">
                              {e.month}
                            </div>
                            <div
                              className={`font-medium text-[10px] uppercase tracking-[0.25em] ${a.muted}`}
                            >
                              {e.year} · {e.day}
                            </div>
                          </div>
                        </div>
                        <div className="rotate-6 border-2 border-current px-2 py-1 font-display text-[10px] uppercase tracking-widest">
                          UU·26
                        </div>
                      </header>

                      <div className="my-6 h-px w-16 bg-current opacity-30" />

                      <h2 className="font-display text-4xl uppercase leading-[0.95] md:text-5xl whitespace-pre-line">
                        {e.title}
                      </h2>
                      {e.subtitle && (
                        <p className={`mt-3 text-base ${a.muted}`}>
                          {e.subtitle}
                        </p>
                      )}

                      {/* venue + time */}
                      {(e.venue || e.time) && (
                        <div
                          className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-medium text-xs uppercase tracking-[0.25em] ${a.muted}`}
                        >
                          {e.venue && <span>@ {e.venue}</span>}
                          {e.time && <span>· {e.time}</span>}
                        </div>
                      )}

                      {/* DESCRIPTION */}
                      {e.description.length > 0 && (
                        <div
                          className={`mt-6 space-y-3 text-sm leading-relaxed ${a.muted}`}
                        >
                          {e.description.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>
                      )}

                      {/* LINE-UP (only for music) */}
                      {e.lineup && e.lineup.length > 0 && (
                        <div className="mt-6">
                          <div
                            className={`font-medium text-[10px] uppercase tracking-[0.3em] ${a.muted}`}
                          >
                            line-up · {e.year}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {e.lineup.map((name) => (
                              <span
                                key={name}
                                className="border border-current/70 px-2 py-1 font-display text-[11px] uppercase tracking-wider"
                              >
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* TAGS */}
                      {e.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {e.tags.map((t) => (
                            <span
                              key={t}
                              className="border border-current px-2 py-1 font-medium text-[10px] uppercase tracking-[0.2em]"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      {e.link && (
                        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-current/30 pt-6">
                          <a
                            href={e.link.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button
                              variant={e.accent === "acid" ? "primary" : "tag"}
                              size="md"
                            >
                              {e.link.label} →
                            </Button>
                          </a>
                          {e.source && (
                            <span
                              className={`font-medium text-[10px] uppercase tracking-[0.3em] ${a.muted}`}
                            >
                              источник · {e.source}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.article>
                  </Reveal>
                );
              })}
            </div>

            {/* SUBMIT EVENT */}
            <Reveal delay={0.3}>
              <Card
                variant="paper"
                rotate={-1}
                className="mx-auto mt-20 max-w-3xl p-8"
                withTape
              >
                <div className="grid gap-6 md:grid-cols-3 md:items-center">
                  <div className="md:col-span-2">
                    <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-600">
                      своё событие?
                    </div>
                    <h3 className="mt-2 font-display text-2xl uppercase leading-tight text-ink-950 md:text-3xl">
                      Расскажи нам про концерт, выставку или джем
                    </h3>
                  </div>
                  <Link href="/about" className="md:justify-self-end">
                    <Button variant="primary" size="md">
                      Добавить событие →
                    </Button>
                  </Link>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}
