"use client";

/**
 * TourismPageClient — РЕКОНСТРУКЦИЯ.
 *
 * Оригинальный файл (511 строк) был утерян в процессе миграции на Strapi из-за
 * бага инструмента Edit, который обрезал файл при редактировании. Эта версия
 * восстановлена по сигнатурам импортов и текстовым строкам из скомпилированного
 * .next/server/app/tourism/page.js. Поведение сохранено (карта + список точек +
 * активная точка с фото-каруселью + бонусные ориентиры + музеи), но UI-детали и
 * микроанимации могут отличаться от оригинала.
 *
 * Рекомендация: сравни этот файл с локальным бэкапом / git history и докрути.
 */

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { RoutePoint } from "@/data/route";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { VideoHero } from "@/components/sections/VideoHero";
import { TourismStories } from "@/components/sections/TourismStories";
import { cn } from "@/lib/utils";

const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] w-full items-center justify-center bg-smoke-800 font-medium text-xs uppercase tracking-[0.3em] text-ink-100/50">
      загрузка карты...
    </div>
  ),
});

interface TourismPageClientProps {
  routePoints: RoutePoint[];
}

export default function TourismPageClient({
  routePoints,
}: TourismPageClientProps) {
  const [activeId, setActiveId] = useState<number>(routePoints[0]?.id ?? 0);
  const [visited, setVisited] = useState<Set<number>>(
    new Set(routePoints[0] ? [routePoints[0].id] : []),
  );
  const [photoIdx, setPhotoIdx] = useState(0);

  const active = useMemo(
    () => routePoints.find((p) => p.id === activeId) ?? routePoints[0],
    [activeId, routePoints],
  );

  const handleSelect = (id: number) => {
    setActiveId(id);
    setPhotoIdx(0);
    setVisited((prev) => new Set(prev).add(id));
    const el = document.getElementById("active-point");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goPrev = () => {
    if (!active) return;
    const idx = routePoints.findIndex((p) => p.id === active.id);
    const prev = idx > 0 ? routePoints[idx - 1] : routePoints[routePoints.length - 1];
    if (prev) handleSelect(prev.id);
  };

  const goNext = () => {
    if (!active) return;
    const idx = routePoints.findIndex((p) => p.id === active.id);
    const next = idx >= 0 && idx < routePoints.length - 1 ? routePoints[idx + 1] : routePoints[0];
    if (next) handleSelect(next.id);
  };

  useEffect(() => {
    setPhotoIdx(0);
  }, [activeId]);

  if (!active) {
    return (
      <div className="grunge-bg pt-24">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center">
          <div className="font-display text-3xl uppercase text-ink-50/60">
            Пока нет точек маршрута
          </div>
        </div>
      </div>
    );
  }

  const photos = active.photos ?? [];
  const currentPhoto = photos[photoIdx];
  const progressPct = routePoints.length > 0
    ? Math.round((visited.size / routePoints.length) * 100)
    : 0;

  return (
    <div className="bg-ink-950">
      <VideoHero />

      {/* TOURISM STORIES — контекст перед тем как пойти по маршруту */}
      <TourismStories />

      {/* HEADER */}
      <section className="relative bg-ink-950 pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <span>маршрут</span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.85] text-ink-50 md:text-7xl">
            <span className="block">Стрит-арт</span>
            <span className="block graffiti-text">по улицам</span>
            <span className="block">старого города</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-100/80">
            Маршрут по граффити, муралам и мозаикам Улан-Удэ — от советского
            наследия Лабок до сегодняшнего throw up. Сохрани прогресс, иди по
            точкам, отмечай посещённые.
          </p>

          {/* PROGRESS */}
          <Reveal>
            <div className="mt-8 max-w-2xl">
              <div className="flex items-center justify-between font-medium text-[10px] uppercase tracking-[0.3em] text-rust-400">
                <span>Прогресс квеста</span>
                <span>{visited.size}/{routePoints.length} · {progressPct}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden bg-smoke-800">
                <motion.div
                  initial={false}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  className="h-full bg-acid-500"
                />
              </div>
              {progressPct >= 100 && (
                <div className="mt-3 font-display text-sm uppercase tracking-wider text-acid-500">
                  Маршрут пройден ✦ #БАТО
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MAP + LIST */}
      <section className="relative pb-12 bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* MAP */}
            <div className="lg:col-span-7">
              <div className="relative h-[480px] overflow-hidden border border-smoke-700 shadow-[8px_8px_0_#0a0908]">
                <RouteMap points={routePoints} activeId={activeId} onSelect={handleSelect} />
              </div>
              <div className="mt-3 flex items-center justify-between font-medium text-[10px] uppercase tracking-[0.25em] text-ink-100/50">
                <span>Yandex Maps · drag для перемещения</span>
                <span>клик по маркеру → описание точки</span>
              </div>
            </div>

            {/* LIST */}
            <div className="lg:col-span-5">
              <div className="font-medium text-xs uppercase tracking-[0.25em] text-rust-400">
                {String(routePoints.length).padStart(2, "0")} точек / выбери стартовую
              </div>
              <ul className="mt-4 space-y-2 max-h-[480px] overflow-y-auto pr-2">
                {routePoints.map((p) => {
                  const isActive = p.id === activeId;
                  const isVisited = visited.has(p.id);
                  return (
                    <li key={p.id}>
                      <button
                        onClick={() => handleSelect(p.id)}
                        className={cn(
                          "group relative w-full text-left transition-all",
                          "flex items-start gap-4 border-l-2 pl-4 py-3 pr-3",
                          isActive
                            ? "border-acid-500 bg-smoke-800/60"
                            : isVisited
                              ? "border-rust-500 bg-smoke-800/30"
                              : "border-smoke-700 hover:border-rust-500 hover:bg-smoke-800/30",
                        )}
                      >
                        <span
                          className={cn(
                            "font-display text-2xl leading-none transition-colors",
                            isActive ? "text-acid-500" : isVisited ? "text-rust-400" : "text-ink-100/50",
                          )}
                        >
                          {p.number}
                        </span>
                        <div className="flex-1">
                          <div className="font-display text-base uppercase tracking-wide text-ink-50">
                            {p.title}
                          </div>
                          <div className="mt-0.5 font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/50">
                            {p.style ?? p.subtitle}
                          </div>
                        </div>
                        {isVisited && (
                          <span className="font-display text-acid-500 text-lg leading-none">✓</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVE POINT */}
      <section id="active-point" className="relative py-16 grunge-bg">
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
              {/* PHOTO */}
              <div className="lg:col-span-6">
                <div className="relative h-[360px] overflow-hidden border border-smoke-700 shadow-[8px_8px_0_#0a0908] md:h-[460px] bg-smoke-800">
                  {currentPhoto ? (
                    <Image
                      key={currentPhoto}
                      src={currentPhoto}
                      alt={active.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="font-display text-3xl uppercase text-ink-100/40">
                        фото скоро
                      </div>
                      <p className="mx-auto mt-3 max-w-md text-xs text-ink-100/50">
                        Фото точки будет добавлено позже. Положи файлы в /public/route/&lt;slug&gt;/ и добавь пути в photos[]
                      </p>
                    </div>
                  )}

                  <div className="absolute left-4 top-4 bg-rust-500 px-3 py-1 font-display text-xs uppercase tracking-widest text-ink-50 shadow-[4px_4px_0_#0a0908]">
                    точка {active.number}
                  </div>

                  {photos.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {photos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPhotoIdx(i)}
                          aria-label={`фото ${i + 1}`}
                          className={cn(
                            "h-1.5 w-6 transition-colors",
                            i === photoIdx ? "bg-acid-500" : "bg-ink-50/40 hover:bg-ink-50/70",
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* META */}
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                  <div>
                    <div className="font-medium text-[9px] uppercase tracking-[0.25em] text-rust-400">локация</div>
                    <div className="mt-1 font-display text-xs uppercase text-ink-50">{active.location}</div>
                  </div>
                  {active.style && (
                    <div>
                      <div className="font-medium text-[9px] uppercase tracking-[0.25em] text-rust-400">стиль</div>
                      <div className="mt-1 font-display text-xs uppercase text-ink-50">{active.style}</div>
                    </div>
                  )}
                  {active.artist && (
                    <div>
                      <div className="font-medium text-[9px] uppercase tracking-[0.25em] text-rust-400">автор</div>
                      <div className="mt-1 font-display text-xs uppercase text-ink-50">{active.artist}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="lg:col-span-6">
                <div className="font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
                  {active.number} · {active.subtitle}
                </div>
                <h2 className="mt-4 font-display text-4xl uppercase leading-[0.9] text-ink-50 md:text-5xl">
                  {active.title}
                </h2>

                <p className="mt-6 text-base leading-relaxed text-ink-100/80 md:text-lg">
                  {active.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span key={t} className="border border-smoke-600 px-3 py-1 font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/70">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-smoke-700 pt-8">
                  <Button variant="ghost" size="md" onClick={goPrev}>
                    ← Предыдущая
                  </Button>
                  <Button variant="primary" size="md" onClick={goNext}>
                    Следующая →
                  </Button>
                  <a
                    href={`https://yandex.ru/maps/?ll=${active.coords[1]},${active.coords[0]}&z=17&pt=${active.coords[1]},${active.coords[0]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="ghost" size="md">Открыть в Картах</Button>
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
