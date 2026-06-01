"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GastroPoint } from "@/data/gastro";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const GastroMap = dynamic(() => import("@/components/GastroMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] w-full items-center justify-center bg-smoke-800 font-medium text-xs uppercase tracking-[0.3em] text-ink-100/50">
      загрузка карты...
    </div>
  ),
});

const CATEGORIES = [
  { id: "all", label: "всё" },
  { id: "ресторан", label: "рестораны" },
  { id: "бар", label: "бары" },
  { id: "рестоклуб", label: "рестоклубы" },
  { id: "локальная кухня", label: "локальное" },
];

interface GastroPageClientProps {
  gastroPoints: GastroPoint[];
}

export default function GastroPageClient({ gastroPoints }: GastroPageClientProps) {
  const [activeId, setActiveId] = useState<number>(gastroPoints[0]?.id ?? 0);
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return gastroPoints;
    return gastroPoints.filter((p) => p.category === filter);
  }, [filter, gastroPoints]);

  const active = useMemo(
    () => gastroPoints.find((p) => p.id === activeId) ?? gastroPoints[0],
    [activeId, gastroPoints],
  );

  const handleSelect = (id: number) => {
    setActiveId(id);
    const el = document.getElementById("spot-detail");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!filtered.find((p) => p.id === activeId) && filtered.length > 0) {
      setActiveId(filtered[0].id);
    }
  }, [filter, filtered, activeId]);

  if (!active) {
    return (
      <div className="grunge-bg pt-24">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center">
          <div className="font-display text-3xl uppercase text-ink-50/60">
            Пока нет точек гастротура
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grunge-bg pt-24">
      {/* HEADER */}
      <section className="relative overflow-hidden pb-12 pt-12 md:pb-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-acid-500/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-acid-400">
            <Link href="/" className="hover:text-acid-400">← Главная</Link>
            <span className="opacity-30">/</span>
            <span>гастротур</span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-ink-50 md:text-7xl">
            <span className="block">Гастро</span>
            <span className="block">
              <span className="bg-acid-500 px-3 text-ink-950">тур</span>{" "}
              по городу
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-ink-100/70">
            Карта мест, где едят те, кто рисует стены и слушает улицы.
            Кликни по точке на карте — откроется рецензия.
          </p>

          {/* FILTER */}
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const isActive = filter === c.id;
              const count =
                c.id === "all"
                  ? gastroPoints.length
                  : gastroPoints.filter((p) => p.category === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "border px-4 py-2 font-display text-xs uppercase tracking-wider transition-all",
                    isActive
                      ? "border-acid-500 bg-acid-500 text-ink-950"
                      : "border-smoke-700 text-ink-100/70 hover:border-acid-500 hover:text-ink-50",
                  )}
                >
                  {c.label}
                  <span className={cn("ml-2 text-[10px] opacity-60", isActive && "opacity-100")}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAP + LIST */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* MAP */}
            <div className="lg:col-span-7">
              <div className="relative h-[480px] overflow-hidden border border-smoke-700 shadow-[8px_8px_0_#0a0908]">
                <GastroMap points={gastroPoints} activeId={activeId} onSelect={handleSelect} />
              </div>
              <div className="mt-3 flex items-center justify-between font-medium text-[10px] uppercase tracking-[0.25em] text-ink-100/50">
                <span>Yandex Maps · точки гастротура</span>
                <span>клик по маркеру → рецензия</span>
              </div>
            </div>

            {/* LIST */}
            <div className="lg:col-span-5">
              <div className="font-medium text-xs uppercase tracking-[0.25em] text-acid-400">
                {filtered.length} мест{filtered.length === 1 ? "о" : ""} / выбери
              </div>
              <ul className="mt-4 space-y-2 max-h-[480px] overflow-y-auto pr-2">
                {filtered.map((p) => {
                  const isActive = p.id === activeId;
                  return (
                    <li key={p.id}>
                      <button
                        onClick={() => handleSelect(p.id)}
                        className={cn(
                          "group relative w-full text-left transition-all",
                          "flex items-start gap-4 border-l-2 pl-4 py-3 pr-3",
                          isActive
                            ? "border-acid-500 bg-smoke-800/60"
                            : "border-smoke-700 hover:border-rust-500 hover:bg-smoke-800/30",
                        )}
                      >
                        <span
                          className={cn(
                            "font-display text-2xl leading-none transition-colors",
                            isActive ? "text-acid-500" : "text-ink-100/50",
                          )}
                        >
                          {p.number}
                        </span>
                        <div className="flex-1">
                          <div className="font-display text-base uppercase tracking-wide">
                            {p.name}
                          </div>
                          <div className="mt-0.5 font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/50">
                            {p.category} · {p.avgCheck}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVE SPOT PREVIEW + LINK TO REVIEW */}
      <section id="spot-detail" className="relative py-16 bg-ink-950 noise-overlay">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 lg:grid-cols-12"
            >
              {/* LEFT: cover photo */}
              <div className="lg:col-span-5">
                <div className="relative h-[360px] overflow-hidden border border-smoke-700 shadow-[8px_8px_0_#0a0908] md:h-[420px]">
                  <Image
                    src={active.cover}
                    alt={active.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 bg-acid-500 px-3 py-1 font-display text-xs uppercase tracking-widest text-ink-950 shadow-[4px_4px_0_#0a0908]">
                    {active.number} · {active.category}
                  </div>
                  {/* rating */}
                  <div className="absolute right-4 top-4 border border-acid-500/50 bg-ink-950/80 px-3 py-1 font-display text-sm uppercase tracking-widest text-acid-400 backdrop-blur-sm">
                    {active.review.rating}/10
                  </div>
                </div>

                <Card variant="paper" rotate={-1.5} className="mt-6 p-5" withTape>
                  <div className="font-medium text-[10px] uppercase tracking-[0.25em] text-rust-600">
                    адрес
                  </div>
                  <div className="mt-1 font-display text-base uppercase">
                    {active.address}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-ink-950/10 pt-3">
                    <div>
                      <div className="font-medium text-[9px] uppercase tracking-[0.25em] text-rust-600">часы</div>
                      <div className="font-display text-sm uppercase">{active.hours}</div>
                    </div>
                    <div>
                      <div className="font-medium text-[9px] uppercase tracking-[0.25em] text-rust-600">чек</div>
                      <div className="font-display text-sm uppercase">{active.avgCheck}</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* RIGHT: lead + verdict + CTA to full review */}
              <div className="lg:col-span-7">
                <div className="font-medium text-xs uppercase tracking-[0.3em] text-acid-400">
                  заведение {active.number} / рецензия
                </div>
                <h2 className="mt-4 font-display text-4xl uppercase leading-[0.9] text-ink-50 md:text-5xl">
                  {active.name}
                </h2>
                <p className="mt-4 text-lg text-ink-100/80">{active.short}</p>

                <div className="my-8 h-px w-full bg-gradient-to-r from-acid-500 via-smoke-700 to-transparent" />

                <p className="text-base leading-relaxed text-ink-100/80 md:text-lg">
                  {active.review.lead}
                </p>

                {/* must try */}
                <div className="mt-8">
                  <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-acid-400">
                    обязательно попробовать
                  </div>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {active.review.must_try.map((m) => (
                      <li key={m} className="flex items-center gap-3 border border-smoke-700 bg-smoke-800/40 px-3 py-2">
                        <span className="font-display text-acid-500">✦</span>
                        <span className="font-display text-sm uppercase tracking-wider text-ink-50">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-smoke-700 pt-8">
                  <Link href={`/gastro/${active.slug}`}>
                    <Button variant="primary" size="lg">
                      Читать рецензию →
                    </Button>
                  </Link>
                  <a
                    href={`https://yandex.ru/maps/?text=${encodeURIComponent(active.address + " Улан-Удэ")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="ghost" size="lg">
                      Открыть в Картах
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
