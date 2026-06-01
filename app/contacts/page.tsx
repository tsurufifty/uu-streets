"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";

const CHANNELS = [
  {
    n: "01",
    title: "Email",
    value: "bgsha@bgsha.ru",
    href: "mailto:bgsha@bgsha.ru?subject=UUSTREETS",
    note: "пометка «UUSTREETS» в теме",
  },
  {
    n: "02",
    title: "Telegram",
    value: "@uu_streets",
    href: "https://t.me/uu_streets",
    note: "новости, афиша, ответы",
  },
  {
    n: "03",
    title: "Instagram*",
    value: "@uustreets",
    href: "https://instagram.com/uustreets",
    note: "*деятельность Meta признана экстремистской",
  },
];

const REASONS = [
  "Точка, которой нет на маршруте",
  "Гастро-место, о котором стоит знать",
  "Анонс события / афиша",
  "Демо-трек / релиз / стрим",
  "Студенческий проект / коллаб",
  "Пресса / интервью / съёмка",
];

export default function ContactsPage() {
  return (
    <div className="grunge-bg pt-24">
      {/* HEADER */}
      <section className="relative pb-12 pt-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <Link href="/" className="hover:text-rust-500">← Главная</Link>
            <span className="opacity-30">/</span>
            <span>контакты</span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] text-ink-50 md:text-7xl">
            <span className="block">Напиши</span>
            <span className="block text-rust-400">городу</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-ink-100/70">
            Знаешь стену, артиста, заведение или событие? Хочешь
            присоединиться? Мы открыты — пиши в любой канал.
          </p>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.1}>
                <motion.a
                  href={c.href}
                  whileHover={{ y: -4 }}
                  className="group block h-full border border-smoke-700 bg-ink-950/60 p-6 backdrop-blur-sm transition-colors hover:border-rust-500"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-display text-5xl text-rust-400 leading-none">
                      {c.n}
                    </span>
                    <span className="font-display text-rust-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                  <div className="mt-8 font-medium text-[10px] uppercase tracking-[0.3em] text-ink-100/60">
                    {c.title}
                  </div>
                  <div className="mt-1 font-display text-xl uppercase tracking-wide text-ink-50 break-all">
                    {c.value}
                  </div>
                  <div className="mt-3 text-xs text-ink-100/50">{c.note}</div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WRITE */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
                  <span className="h-px w-10 bg-rust-500" />
                  <span>о чём пишут</span>
                </div>
                <h2 className="mt-6 font-display text-4xl uppercase leading-tight text-ink-50">
                  Поводы написать
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <Card variant="paper" rotate={-1.5} className="mt-10 p-6 max-w-sm" withTape>
                  <p className="font-medium text-[10px] uppercase tracking-[0.25em] text-rust-600">
                    манифест
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-950">
                    UU STREETS — открытая платформа. Если в Улан-Удэ
                    происходит что-то живое, мы хотим узнать первыми.
                  </p>
                </Card>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul className="space-y-3">
                {REASONS.map((r, i) => (
                  <Reveal key={r} delay={i * 0.06}>
                    <motion.li
                      whileHover={{ x: 6 }}
                      className="group flex items-center gap-4 border-l-2 border-smoke-600 bg-smoke-800/30 py-4 pl-5 pr-6 backdrop-blur-sm transition-colors hover:border-rust-500"
                    >
                      <span className="font-display text-2xl text-rust-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base uppercase tracking-wide text-ink-50 md:text-lg">
                        {r}
                      </span>
                    </motion.li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER STAMP */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="border-t border-smoke-700 pt-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-400">
                  локация
                </div>
                <div className="mt-2 font-display text-xl uppercase text-ink-50">
                  Улан-Удэ
                </div>
                <div className="mt-1 font-medium text-xs text-ink-100/50">
                  51.8333° N, 107.5833° E
                </div>
              </div>
              <div>
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-400">
                  команда
                </div>
                <div className="mt-2 font-display text-xl uppercase text-ink-50">
                  БГСХА им. В.Р. Филиппова
                </div>
                <div className="mt-1 font-medium text-xs text-ink-100/50">
                  студенческий проект
                </div>
              </div>
              <div>
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-400">
                  год
                </div>
                <div className="mt-2 font-display text-xl uppercase text-ink-50">
                  2026 / v.02
                </div>
                <div className="mt-1 font-medium text-xs text-ink-100/50">
                  digital culture portal
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
