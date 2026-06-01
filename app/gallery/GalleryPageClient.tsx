"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type GalleryPhoto } from "@/data/gallery";
import { Lightbox } from "@/components/Lightbox";
import { cn } from "@/lib/utils";

interface GalleryPageClientProps {
  galleryPhotos: GalleryPhoto[];
  galleryCategories: { id: string; label: string }[];
}

export default function GalleryPageClient({
  galleryPhotos,
  galleryCategories,
}: GalleryPageClientProps) {
  const [activeCat, setActiveCat] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo<GalleryPhoto[]>(() => {
    if (activeCat === "all") return galleryPhotos;
    return galleryPhotos.filter((p) => p.category === activeCat);
  }, [activeCat, galleryPhotos]);

  const openAt = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const next = () => {
    if (lightboxIndex == null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };
  const prev = () => {
    if (lightboxIndex == null) return;
    setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1);
  };

  return (
    <div className="grunge-bg pt-24">
      {/* HEADER */}
      <section className="relative pb-12 pt-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <Link href="/" className="hover:text-rust-500">← Главная</Link>
            <span className="opacity-30">/</span>
            <span>галерея</span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] text-ink-50 md:text-7xl">
            <span className="block">Фото</span>
            <span className="block">галерея</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-ink-100/70">
            Стены, гаражи, дворы — то, что сложно передать описанием.
            Кликни на любое фото, чтобы открыть на весь экран. Стрелки для
            навигации, Esc для выхода.
          </p>

          {/* FILTER */}
          <div className="mt-10 flex flex-wrap gap-2">
            {galleryCategories.map((c) => {
              const isActive = activeCat === c.id;
              const count =
                c.id === "all"
                  ? galleryPhotos.length
                  : galleryPhotos.filter((p) => p.category === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={cn(
                    "border px-4 py-2 font-display text-xs uppercase tracking-wider transition-all",
                    isActive
                      ? "border-acid-500 bg-acid-500 text-ink-950"
                      : "border-smoke-700 text-ink-100/70 hover:border-rust-500 hover:text-ink-50",
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

      {/* GRID */}
      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [column-fill:_balance]">
              {filtered.map((photo, i) => (
                <motion.button
                  key={photo.src + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
                  onClick={() => openAt(i)}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden border border-smoke-700 bg-smoke-800 transition hover:border-rust-500"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt ?? photo.title ?? "Photo"}
                    width={photo.width ?? 800}
                    height={photo.height ?? 1000}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
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
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox
        photos={filtered}
        index={lightboxIndex}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border-2 border-dashed border-smoke-700 p-12 text-center">
      <div className="font-display text-3xl uppercase text-ink-50/60">
        Пока нет фотографий
      </div>
      <p className="mx-auto mt-4 max-w-md text-sm text-ink-100/50">
        Добавь файлы в папку <code className="bg-smoke-800 px-2 py-0.5 text-rust-400">/public/gallery/</code>{" "}
        и допиши их в <code className="bg-smoke-800 px-2 py-0.5 text-rust-400">/data/gallery.ts</code>.
      </p>
    </div>
  );
}
