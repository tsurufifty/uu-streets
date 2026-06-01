"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryPhoto } from "@/data/gallery";

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ photos, index, onClose, onNext, onPrev }: LightboxProps) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, onNext, onPrev]);

  const photo = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* TOP BAR */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between font-medium text-xs uppercase tracking-[0.25em] text-ink-50/80"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center border border-ink-50/30 hover:border-rust-500 hover:bg-rust-500/20"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>

          {/* PREV */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-ink-50/30 bg-ink-950/40 backdrop-blur-sm text-ink-50 hover:border-rust-500 hover:bg-rust-500/20"
            aria-label="Предыдущее"
          >
            ←
          </button>
          {/* NEXT */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-ink-50/30 bg-ink-950/40 backdrop-blur-sm text-ink-50 hover:border-rust-500 hover:bg-rust-500/20"
            aria-label="Следующее"
          >
            →
          </button>

          {/* IMAGE */}
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photo.src}
              alt={photo.alt ?? "Photo"}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>

          {/* CAPTION */}
          {(photo.title || photo.caption) && (
            <div
              className="absolute bottom-6 left-1/2 max-w-3xl -translate-x-1/2 px-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {photo.title && (
                <div className="font-display text-sm uppercase tracking-wider text-ink-50">
                  {photo.title}
                </div>
              )}
              {photo.caption && (
                <div className="mt-1 text-xs text-ink-100/70">{photo.caption}</div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
