"use client";

/**
 * RoutePreview — РЕКОНСТРУКЦИЯ.
 *
 * Оригинальный файл был утерян в процессе миграции на Strapi из-за бага
 * Edit-инструмента. Эта версия восстановлена с теми же сигнатурами; UI
 * максимально приближен к стилю MusicPreview. На момент миграции компонент
 * НЕ импортируется ни одной страницей (проверено grep'ом), но оставляем —
 * вдруг подключишь обратно.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { routePoints as staticRoutePoints, type RoutePoint } from "@/data/route";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

interface RoutePreviewProps {
  routePoints?: RoutePoint[];
}

export function RoutePreview({ routePoints }: RoutePreviewProps = {}) {
  const source = routePoints ?? staticRoutePoints;
  const preview = source.slice(0, 4);

  return (
    <section className="relative py-24 md:py-32 bg-ink-950 noise-overlay">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* HEADER */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
                <span className="h-px w-10 bg-rust-500" />
                <span>02 / маршрут</span>
              </div>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.85] text-ink-50 md:text-6xl">
                <span className="block">Стрит-арт</span>
                <span className="block graffiti-text">по улицам</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-sm text-base text-ink-100/70 md:text-lg">
              Граффити, муралы и мозаики старого Улан-Удэ.{" "}
              <span className="bg-acid-500 px-2 font-display uppercase text-ink-950">9 точек</span>{" "}
              на карте.
            </p>
          </Reveal>
        </div>

        {/* CARDS */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <Card className="h-full p-5">
                  <div className="font-display text-4xl text-acid-500 leading-none">{p.number}</div>
                  <div className="mt-4 font-display text-xl uppercase tracking-wide text-ink-50">
                    {p.title}
                  </div>
                  <div className="mt-2 text-sm text-ink-100/70 line-clamp-3">
                    {p.subtitle}
                  </div>
                  <div className="mt-4 font-medium text-[10px] uppercase tracking-[0.25em] text-rust-400">
                    {p.location}
                  </div>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-smoke-700 bg-smoke-800/40 p-8 md:flex-row md:items-center md:p-12">
            <div>
              <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-400">
                полный маршрут
              </div>
              <h3 className="mt-2 font-display text-3xl uppercase leading-tight text-ink-50 md:text-4xl">
                Карта, точки и бонусный квест
              </h3>
            </div>
            <Link href="/tourism">
              <Button variant="primary" size="lg">
                Открыть маршрут →
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
