"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

const TAGS = [
  "граффити маршруты",
  "urban exploration",
  "street art tours",
  "дворы / гаражи / фасады",
];

const POINTS = [
  { n: "01", title: "Поэт под слоем краски", note: "Ленина 63" },
  { n: "02", title: "Двор патриотов", note: "Модогоева" },
  { n: "03", title: "Мозаика рабочих", note: "Революция 1905 года 68" },
];

export function TourismPreview() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 md:py-32 noise-overlay">
      {/* Декоративные diagonal slabs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-32 h-[400px] w-[400px] rotate-12 bg-rust-700/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: label + headline */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
                <span className="h-px w-10 bg-rust-500" />
                <span>01 / туризм</span>
              </div>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-ink-50 md:text-6xl">
                <span className="block">Прогулка</span>
                <span className="block text-rust-400">по стенам</span>
                <span className="block">города</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-100/70 md:text-lg">
                Девять точек, в которых традиции Бурятии встречаются с
                языком современного граффити. Карта, описания, квест.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <span
                    key={t}
                    className="border border-smoke-600 px-3 py-1 font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/70"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10">
                <Link href="/tourism">
                  <Button variant="primary" size="lg">
                    Открыть маршруты <span aria-hidden>→</span>
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: editorial collage */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="relative h-[440px] overflow-hidden border border-smoke-700 shadow-[10px_10px_0_#0a0908] md:h-[520px]">
                <Image
                  src="/gallery/tourism-hero.jpg"
                  alt="UU streets graffiti"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover grayscale-[0.3]"
                />
                {/* dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-950/30 to-transparent" />

                {/* overlay badge */}
                <div className="absolute left-6 top-6 bg-acid-500 px-3 py-1 font-display text-xs uppercase tracking-widest text-ink-950 shadow-[4px_4px_0_#0a0908]">
                  09 точек / квест
                </div>

                {/* sticky points */}
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-smoke-700 bg-ink-950/85 backdrop-blur-sm">
                  {POINTS.map((p, i) => (
                    <motion.div
                      key={p.n}
                      whileHover={{ y: -2 }}
                      className={`p-4 ${i !== POINTS.length - 1 ? "border-r border-smoke-700" : ""}`}
                    >
                      <div className="font-display text-2xl text-rust-400">{p.n}</div>
                      <div className="mt-1 font-display text-sm uppercase tracking-wider text-ink-50">
                        {p.title}
                      </div>
                      <div className="font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/50">
                        {p.note}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
