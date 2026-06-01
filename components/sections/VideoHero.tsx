"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  // Автозапуск (важно: muted=true для autoplay в браузерах)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {
      // Браузер заблокировал автоплей — это ок, кнопка mute это исправит
    });

    // Страховка: если по какой-то причине loop не сработал — перезапускаем
    const handleEnded = () => {
      v.currentTime = 0;
      v.play().catch(() => {});
    };
    // Если вкладка возвращается в фокус — убедимся что играет
    const handleVisibility = () => {
      if (!document.hidden && v.paused && playing) {
        v.play().catch(() => {});
      }
    };
    v.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      v.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    // Если только что размьютили — попробуем точно проиграть
    if (!v.muted) v.play().catch(() => {});
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-ink-950 noise-overlay">
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/videos/promouu03.mp4"}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/video-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Затемнение для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto flex w-full max-w-7xl items-center gap-3 px-6 pt-32 font-medium text-xs uppercase tracking-[0.3em] text-ink-50/70 md:px-10"
        >
          <span className="h-px w-10 bg-rust-500" />
          <span>ПРОМО 2026 / стрит-арт маршрут</span>
        </motion.div>

         {/* Vertical labels */}
      <div className="pointer-events-none absolute left-4 top-1/3 hidden md:block">
        <span className="text-vertical font-medium text-[10px] uppercase tracking-[0.4em] text-ink-50/30">
          ulan-ude · 51.8333° N · 107.5833° E
        </span>
      </div>
      <div className="pointer-events-none absolute right-6 top-1/3 hidden md:block">
        <span className="text-vertical font-medium text-[10px] uppercase tracking-[0.4em] text-rust-400/60">
          v.01 / UU STREETS 
        </span>
      </div>

        {/* Center title — sits in lower third */}
        <div className="flex flex-1 items-end pb-10 md:pb-14">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-display text-5xl uppercase leading-[0.9] text-ink-50 md:text-7xl"
            >
              <span className="block">Стрит-арт</span>
              <span className="block">маршрут</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-100/85 md:text-xl"
            >
              Девять точек на карте Улан-Удэ — стрит-арт маршрут, который
              превращает прогулку в культурный квест по бурятскому андеграунду.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link href="#stories">
                <Button size="lg" variant="primary">
                  Читать истории <span aria-hidden>↓</span>
                </Button>
              </Link>
              <Link href="#route">
                <Button size="lg" variant="outline">
                  сразу к маршруту
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom: video controls + scroll hint */}
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between px-6 pb-10 md:px-10">
          {/* Video controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={togglePlay}
              aria-label={playing ? "Пауза" : "Воспроизвести"}
              className="group flex h-11 w-11 items-center justify-center border border-ink-50/30 bg-ink-950/40 backdrop-blur-sm transition hover:border-rust-500 hover:bg-rust-500/20"
            >
              {playing ? (
                // pause icon
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <rect x="2" y="1" width="3" height="12" />
                  <rect x="9" y="1" width="3" height="12" />
                </svg>
              ) : (
                // play icon
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M2 1 L12 7 L2 13 Z" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMute}
              aria-label={muted ? "Включить звук" : "Выключить звук"}
              className="group flex h-11 items-center gap-2 border border-ink-50/30 bg-ink-950/40 px-4 backdrop-blur-sm transition hover:border-rust-500 hover:bg-rust-500/20"
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 6v4h2.5l3.5 3V3L5.5 6H3zm9.5 2L14 9.5l-1 1L11.5 9 10 10.5l-1-1L10.5 8 9 6.5l1-1L11.5 7 13 5.5l1 1L12.5 8z" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 6v4h2.5l3.5 3V3L5.5 6H3zm8 2c0-1.1-.6-2-1.5-2.4v4.8c.9-.4 1.5-1.3 1.5-2.4zm-1.5-5v1.7c1.7.5 3 2.3 3 4.3s-1.3 3.8-3 4.3v1.7c2.6-.6 4.5-2.9 4.5-6s-1.9-5.4-4.5-6z" />
                </svg>
              )}
              <span className="font-medium text-[10px] uppercase tracking-[0.25em]">
                {muted ? "Звук" : "Mute"}
              </span>
            </button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="hidden flex-col items-end gap-2 md:flex"
          >
            <span className="font-medium text-[10px] uppercase tracking-[0.3em] text-ink-50/60">
              ПРОКРУТИ
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-px bg-gradient-to-b from-rust-500 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
