"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { type GalleryPhoto } from "@/data/gallery";

interface GalleryPreviewProps {
  photos: GalleryPhoto[];
  /** Сколько фото показать в превью на главной. Остальные — на /gallery. */
  limit?: number;
}

export function GalleryPreview({ photos, limit = 8 }: GalleryPreviewProps) {
  const preview = photos.slice(0, limit);

  return (
    <section className="relative overflow-hidden py-24 md:py-32 grunge-bg">
      {/* haze */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-rust-500/15 blur-[120px]" />
        <div className="absolute bottom-0 -right-32 h-[400px] w-[400px] rounded-full bg-acid-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* HEADER */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
                <span className="h-px w-10 bg-rust-500" />
                <span>05 / галерея</span>
              </div>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-ink-50 md:text-6xl">
                <span className="block">Стены</span>
                <span className="block">
                  <span className="bg-rust-500 px-2 text-ink-50">города</span>{" "}
                  в кадре
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-sm text-base text-ink-100/70 md:text-lg">
              Граффити, муралы, дворы и гаражи — то, что сложно передать
              описанием. Лучшее со стен Улан-Удэ.
            </p>
          </Reveal>
        </div>

        {/* GRID */}
        {preview.length === 0 ? (
          <div className="mt-16 border-2 border-dashed border-smoke-700 p-12 text-center">
            <div className="font-display text-2xl uppercase text-ink-50/60">
              Пока нет фотографий
            </div>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-100/50">
              Добавь снимки в Strapi (коллекция Gallery Photo) — они появятся
              здесь автоматически.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {preview.map((photo, i) => (
              <Reveal key={photo.src + i} delay={(i % 4) * 0.08}>
                <Link
                  href="/gallery"
                  className="group relative block aspect-square overflow-hidden border border-smoke-700 bg-smoke-800 transition hover:border-rust-500"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt ?? photo.title ?? "Фото галереи"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* hover overlay */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="p-4 text-left">
                      {photo.title && (
                        <div className="font-display text-sm uppercase tracking-wider text-ink-50">
                          {photo.title}
                        </div>
                      )}
                      {photo.caption && (
                        <div className="mt-1 text-[11px] text-ink-100/70">
                          {photo.caption}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {/* CTA */}
        {photos.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 border border-rust-500/30 bg-ink-950/70 p-8 backdrop-blur-sm md:flex-row md:items-center md:p-12">
              <div>
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-400">
                  фотогалерея · {String(photos.length).padStart(2, "0")} кадров
                </div>
                <h3 className="mt-3 font-display text-3xl uppercase leading-tight text-ink-50 md:text-4xl">
                  Вся уличная сцена города
                </h3>
              </div>
              <motion.div whileHover={{ x: 4 }}>
                <Link href="/gallery">
                  <Button variant="tag" size="lg">
                    Вся галерея →
                  </Button>
                </Link>
              </motion.div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default GalleryPreview;
