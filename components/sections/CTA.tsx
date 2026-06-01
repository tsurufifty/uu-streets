"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const QUICK_LINKS = [
  { href: "/tourism", label: "Туризм", note: "09 точек" },
  { href: "/gastro", label: "Гастротур", note: "карта + рецензии" },
  { href: "/events", label: "Афиша", note: "ближайшие даты" },
  { href: "/music", label: "Музыка", note: "live · подборка" },
];

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-32 noise-overlay">
      {/* Big background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="font-display text-[20vw] uppercase leading-none tracking-tighter text-smoke-800/60 select-none whitespace-nowrap">
          UU · STREETS
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <span className="h-px w-10 bg-rust-500" />
            <span>готов?</span>
            <span className="h-px w-10 bg-rust-500" />
          </div>
          <h2 className="mt-8 font-display text-6xl uppercase leading-[0.85] text-ink-50 md:text-huge">
            Город ждёт!
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-ink-100/70">
            Выбери направление и иди читать город. UU STREETS — это
            не туристический портал, это способ слышать улицы.
          </p>

          {/* Quick portals grid */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            {QUICK_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="group">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="border border-smoke-700 bg-smoke-800/40 p-4 text-left backdrop-blur-sm transition-colors group-hover:border-rust-500"
                >
                  <div className="font-display text-lg uppercase tracking-wide text-ink-50 transition-colors group-hover:text-rust-400">
                    {l.label}
                  </div>
                  <div className="mt-1 font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/50">
                    {l.note}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/tourism">
              <Button size="lg" variant="primary">
                Открыть маршруты →
              </Button>
            </Link>
            <Link href="/#about">
              <Button size="lg" variant="ghost">
                Что такое БАТО?
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
