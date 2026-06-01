"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { artists as staticArtists, type Artist } from "@/data/artists";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

interface MusicPreviewProps {
  artists?: Artist[];
}

export function MusicPreview({ artists }: MusicPreviewProps = {}) {
  // Если родитель не передал данные — используем статический фоллбэк.
  const source = artists ?? staticArtists;
  // Берём первых 4 артистов для preview-блока
  const preview = source.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 md:py-32 noise-overlay">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* HEADER */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
                <span className="h-px w-10 bg-rust-500" />
                <span>04 / музыка</span>
              </div>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.85] text-ink-50 md:text-6xl">
                <span className="block">Сцена</span>
                <span className="block graffiti-text">УЛАН-УДЭ</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-sm text-base text-ink-100/70 md:text-lg">
              Андеграунд Бурятии. Кликни по карточке —{" "}
              <span className="bg-rust-500 px-2 font-display uppercase text-ink-50">статья и плеер</span>.
            </p>
          </Reveal>
        </div>

        {/* ARTIST CARDS */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link href={`/music/${a.slug}`} className="group block h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="relative h-full overflow-hidden border border-smoke-700 bg-smoke-800/40 transition-colors group-hover:border-rust-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={a.cover}
                      alt={a.alias}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover grayscale-[0.4] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

                    <div className="absolute left-4 top-4 font-display text-4xl text-acid-500 leading-none drop-shadow-[2px_2px_0_#0a0908]">
                      {a.number}
                    </div>
                    <div className="absolute right-4 top-4 rotate-6 border border-ink-50/50 bg-ink-950/60 px-2 py-1 font-medium text-[9px] uppercase tracking-[0.2em] text-ink-50 backdrop-blur-sm">
                      {a.genre.split(" / ")[0]}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-ink-50/60">
                        @ {a.hood}
                      </div>
                      <div className="mt-1 font-display text-xl uppercase leading-tight text-ink-50">
                        {a.alias}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-smoke-700 px-4 py-3">
                    <span className="font-medium text-[10px] uppercase tracking-[0.25em] text-ink-100/60">
                      статья + плеер
                    </span>
                    <span className="font-display text-rust-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.3}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-smoke-700 bg-smoke-800/40 p-8 md:flex-row md:items-center md:p-12">
            <div>
              <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-400">
                полная сцена
              </div>
              <h3 className="mt-2 font-display text-3xl uppercase leading-tight text-ink-50 md:text-4xl">
                Все артисты, статьи и плееры
              </h3>
            </div>
            <Link href="/music">
              <Button variant="primary" size="lg">
                Открыть музыку →
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
