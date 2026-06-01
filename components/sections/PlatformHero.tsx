"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const TILES = [
  { href: "/tourism", n: "01", label: "Туризм",    note: "09 точек / маршрут",      accent: "rust"  as const },
  { href: "/gastro",  n: "02", label: "Гастротур", note: "карта + рецензии",        accent: "acid"  as const },
  { href: "/events",  n: "03", label: "Афиша",     note: "ближайшие даты",          accent: "paper" as const },
  { href: "/music",   n: "04", label: "Музыка",    note: "артисты + плеер",         accent: "dark"  as const },
];

const tileStyles = {
  rust:  "bg-rust-500 text-ink-50",
  acid:  "bg-acid-500 text-ink-950",
  paper: "paper-card text-ink-950",
  dark:  "bg-ink-950 text-ink-50 border border-smoke-600",
} as const;

export function PlatformHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink-950">
      {/* BACKGROUND PHOTO */}
      <div className="absolute inset-0">
        <Image
          src="/gallery/12.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover grayscale-[0.5]"
        />
        {/* dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/60" />
      </div>

      {/* Vertical labels */}
      <div className="pointer-events-none absolute left-4 top-1/3 hidden md:block">
        <span className="text-vertical font-medium text-[10px] uppercase tracking-[0.4em] text-ink-50/30">
          ulan-ude · 51.8333° N · 107.5833° E
        </span>
      </div>
      <div className="pointer-events-none absolute right-6 top-1/3 hidden md:block">
        <span className="text-vertical font-medium text-[10px] uppercase tracking-[0.4em] text-rust-400/60">
          v.2026 · issue 01
        </span>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-32 md:px-10">
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 border-b border-smoke-700/80 pb-4 font-medium text-xs uppercase tracking-[0.3em] text-ink-50/70"
        >
          <span className="bg-rust-500 px-2 py-1 font-display text-ink-50">UU STREETS</span>
          <span className="opacity-50">/</span>
          <span>КУЛЬТУРНЫЙ ПОРТАЛ</span>
        </motion.div>

        {/* HUGE TITLE */}
        <div className="mt-12 md:mt-16 flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-mega uppercase leading-[0.85] text-balance"
          >
            <span className="block">Город</span>
            <span className="block graffiti-text">говорит</span>
            <span className="block text-ink-50/70">с улицы</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-100/85 md:text-xl"
          >
            UU STREETS — underground digital-портал об уличной культуре
            Улан-Удэ. Граффити, локальная еда, концерты и музыка артистов,
            выросших на бурятских улицах.{" "}
            <span className="bg-rust-500 px-2 font-display uppercase text-ink-50">
              Один город, четыре языка.
            </span>
          </motion.p>
        </div>

        {/* 4 ENTRY TILES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mb-12 mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {TILES.map((t, i) => (
            <Link key={t.href} href={t.href} className="group">
              <motion.div
                whileHover={{ y: -4, rotate: i % 2 ? -1 : 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className={`relative h-full ${tileStyles[t.accent]} p-5 shadow-[6px_6px_0_#0a0908] backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-3xl leading-none opacity-90">
                    {t.n}
                  </span>
                  <span className="font-display text-xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <div className="mt-6 font-display text-xl uppercase tracking-wide md:text-2xl">
                  {t.label}
                </div>
                <div className="mt-1 font-medium text-[10px] uppercase tracking-[0.25em] opacity-70">
                  {t.note}
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Bottom strip: scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex items-center justify-between border-t border-smoke-700/80 pb-8 pt-4 font-medium text-[10px] uppercase tracking-[0.3em] text-ink-50/50"
        >
          <span>скролл — манифест</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-gradient-to-b from-rust-500 to-transparent"
          />
          <span>4 раздела · одна экосистема</span>
        </motion.div>
      </div>
    </section>
  );
}
