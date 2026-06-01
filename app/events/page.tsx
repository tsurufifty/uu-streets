"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

type Event = {
  date: string;          // "05" или "10–11"
  month: string;         // "JUL"
  year: string;
  day: string;           // "SUN" / "FRI-SAT"
  title: string;         // верстается с \n как перенос
  subtitle: string;
  venue: string;
  time: string;
  tags: string[];
  lineup?: string[];     // строка из приглашённых артистов (для музыки)
  description: string[]; // 1-3 абзаца краткой инфы
  rotate: number;
  accent: "rust" | "acid" | "paper" | "dark";
  link?: { href: string; label: string };
  source: string;        // официальный сайт, откуда взяли инфу
};

const EVENTS: Event[] = [
  {
    date: "05",
    month: "JUL",
    year: "2026",
    day: "SUN",
    title: "НОЧЬ\nЁХОРА",
    subtitle: "Фестиваль бурятского танца-обряда",
    venue: "Этнографический музей народов Забайкалья",
    time: "18:00",
    tags: ["ёхор", "бурятское", "гранд-ёхор", "open-air"],
    description: [
      "Главный летний фестиваль бурятской культуры, который проводится с 2008 года и собирает тысячи людей в одном круге.",
      "Программа: интерактивные площадки, фудкорты, мастер-классы по ёхорам, концерт театра «Байкал» с приглашёнными хэдлайнерами, конкурс фольклорных коллективов с призовым фондом 500 000 ₽.",
      "Кульминация — гранд-ёхор: тысячи людей, одно кольцо, один ритм.",
    ],
    rotate: -2,
    accent: "rust",
    link: {
      href: "https://quicktickets.ru/ulan-ude-teatr-baikal/s568",
      label: "Купить билет",
    },
    source: "minkultrb.ru",
  },
  {
    date: "10–11",
    month: "JUL",
    year: "2026",
    day: "FRI–SAT",
    title: "ГОЛОС\nКОЧЕВНИКОВ",
    subtitle: "Два дня музыки и свободы · open-air",
    venue: "Туркомплекс «Асагад. Степной кочевник», Ацагат",
    time: "60 км от Улан-Удэ",
    tags: ["open-air", "world-music", "rock", "лагерь"],
    lineup: [
      "AY YOLA",
      "Дайте танк(!)",
      "Дима Билан",
      "Мот",
      "RASPUTNIKI",
      "АлияНур",
      "Hanggai",
      "Нукер",
      "HuuG",
      "ANILEDA",
      "Hounds of Bayanay",
      "MAKARA",
    ],
    description: [
      "Главный музыкальный open-air Бурятии: степь, сцена, палаточный лагерь и два дня лайвов от world-music до рока.",
      "Билеты: 4 000 ₽ (10.07) / 4 500 ₽ (11.07) / 7 500 ₽ — единый на два дня. На территорию можно приехать со своей палаткой — проживание входит в стоимость.",
    ],
    rotate: 1.5,
    accent: "acid",
    link: {
      href: "https://voiceofnomads.ru/bilety-na-festival/",
      label: "Купить билет",
    },
    source: "voiceofnomads.ru",
  },
];

const accents: Record<Event["accent"], { bg: string; text: string; muted: string }> = {
  rust:   { bg: "bg-rust-500",  text: "text-ink-50",  muted: "text-ink-50/70" },
  acid:   { bg: "bg-acid-500",  text: "text-ink-950", muted: "text-ink-950/70" },
  paper:  { bg: "paper-card",   text: "text-ink-950", muted: "text-ink-950/70" },
  dark:   { bg: "bg-smoke-800 border border-smoke-600", text: "text-ink-50", muted: "text-ink-50/70" },
};

export default function EventsPage() {
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
            Два главных летних события Бурятии: один вечер священного танца —
            и два дня музыки в степи.
          </p>
        </div>
      </section>

      {/* POSTERS — крупные постеры под наклоном */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-14 md:grid-cols-2 md:gap-10">
            {EVENTS.map((e, i) => {
              const a = accents[e.accent];
              return (
                <Reveal key={i} delay={i * 0.12}>
                  <motion.article
                    whileHover={{ rotate: 0, y: -6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
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
                          <div className={`font-medium text-[10px] uppercase tracking-[0.25em] ${a.muted}`}>
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
                    <p className={`mt-3 text-base ${a.muted}`}>{e.subtitle}</p>

                    {/* venue + time */}
                    <div className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-medium text-xs uppercase tracking-[0.25em] ${a.muted}`}>
                      <span>@ {e.venue}</span>
                      <span>· {e.time}</span>
                    </div>

                    {/* DESCRIPTION */}
                    <div className={`mt-6 space-y-3 text-sm leading-relaxed ${a.muted}`}>
                      {e.description.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* LINE-UP (only for music) */}
                    {e.lineup && (
                      <div className="mt-6">
                        <div className={`font-medium text-[10px] uppercase tracking-[0.3em] ${a.muted}`}>
                          line-up · 2026
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
                    <div className="mt-6 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span key={t} className="border border-current px-2 py-1 font-medium text-[10px] uppercase tracking-[0.2em]">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    {e.link && (
                      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-current/30 pt-6">
                        <a href={e.link.href} target="_blank" rel="noreferrer">
                          <Button variant={e.accent === "acid" ? "primary" : "tag"} size="md">
                            {e.link.label} →
                          </Button>
                        </a>
                        <span className={`font-medium text-[10px] uppercase tracking-[0.3em] ${a.muted}`}>
                          источник · {e.source}
                        </span>
                      </div>
                    )}
                  </motion.article>
                </Reveal>
              );
            })}
          </div>

          {/* SUBMIT EVENT */}
          <Reveal delay={0.3}>
            <Card variant="paper" rotate={-1} className="mx-auto mt-20 max-w-3xl p-8" withTape>
              <div className="grid gap-6 md:grid-cols-3 md:items-center">
                <div className="md:col-span-2">
                  <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-600">
                    своё событие?
                  </div>
                  <h3 className="mt-2 font-display text-2xl uppercase leading-tight text-ink-950 md:text-3xl">
                    Расскажи нам про концерт, выставку или джем
                  </h3>
                </div>
                <Link href="/contacts" className="md:justify-self-end">
                  <Button variant="primary" size="md">
                    Добавить событие →
                  </Button>
                </Link>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
