"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Artist } from "@/data/artists";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

interface MusicPageClientProps {
  artists: Artist[];
}

export default function MusicPageClient({ artists }: MusicPageClientProps) {
  return (
    <div className="bg-ink-950 pt-24">
      {/* HEADER */}
      <section className="relative pb-12 pt-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <Link href="/" className="hover:text-rust-500">← Главная</Link>
            <span className="opacity-30">/</span>
            <span>музыка</span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.85] text-ink-50 md:text-mega">
            <span className="block">Сцена</span>
            <span className="block graffiti-text">УЛАН-УДЭ</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-100/80">
            Андеграунд-исполнители Бурятии. Артисты, выросшие на улицах Улан-Удэ.
          </p>
        </div>
      </section>

      {/* ARTIST CARDS — фото-сетка */}
      <section className="relative py-16 grunge-bg">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
              <span className="h-px w-10 bg-rust-500" />
              <span>{String(artists.length).padStart(2, "0")} артистов</span>
            </div>
            <h2 className="mt-6 font-display text-4xl uppercase leading-tight text-ink-50 md:text-5xl">
              Кого слушать
            </h2>
            <p className="mt-3 max-w-xl text-base text-ink-100/70">
              Кликни на карточку — откроется статья и плеер с треками.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <Link href={`/music/${a.slug}`} className="group block">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    className="relative h-full overflow-hidden border border-smoke-700 bg-smoke-800/40 transition-colors group-hover:border-rust-500"
                  >
                    {/* PHOTO */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={a.cover}
                        alt={a.alias}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover grayscale-[0.4] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      />
                      {/* gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                      {/* number top-left */}
                      <div className="absolute left-4 top-4 font-display text-5xl text-acid-500 leading-none drop-shadow-[2px_2px_0_#0a0908]">
                        {a.number}
                      </div>
                      {/* genre top-right */}
                      <div className="absolute right-4 top-4 rotate-6 border border-ink-50/50 bg-ink-950/60 px-2 py-1 font-medium text-[9px] uppercase tracking-[0.2em] text-ink-50 backdrop-blur-sm">
                        {a.genre.split(" / ")[0]}
                      </div>

                      {/* BOTTOM: alias + meta */}
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-ink-50/60">
                          @ {a.hood}
                        </div>
                        <div className="mt-1 font-display text-3xl uppercase leading-tight text-ink-50">
                          {a.alias}
                        </div>
                      </div>
                    </div>

                    {/* footer strip */}
                    <div className="flex items-center justify-between border-t border-smoke-700 px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {a.tags.slice(0, 2).map((t) => (
                          <span key={t} className="font-medium text-[9px] uppercase tracking-[0.2em] text-ink-100/60">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <span className="font-display text-rust-400 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>


        </div>
      </section>
    </div>
  );
}
