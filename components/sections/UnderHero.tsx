"use client";

import { motion } from "framer-motion";

export function UnderHero() {
  return (
    <section className="relative overflow-hidden grunge-bg py-24 md:py-32">
      {/* Background diagonal slabs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rotate-12 bg-rust-700/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] -rotate-12 bg-acid-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* TOP LINE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-ink-50/60"
        >
          <span className="h-px w-10 bg-rust-500" />
          <span>digital culture portal · урбан-медиа</span>
        </motion.div>

        {/* MAIN TITLE */}
        <div className="mt-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-mega uppercase leading-[0.85] text-balance"
          >
            <span className="block">UU</span>
            <span className="block graffiti-text">STREETS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-100/80 md:text-xl"
          >
            Underground digital-портал об уличной культуре Улан-Удэ.
            Граффити-маршруты, гастро-карта, афиша города и underground-музыка —{" "}
            <span className="bg-rust-500 px-2 text-ink-50">экосистема одного города</span>.
          </motion.p>
        </div>

        {/* STATS — платформенные, не только про граффити */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-smoke-700 pt-10 md:grid-cols-4"
        >
          {[
            { v: "04",   l: "языка города" },
            { v: "09",   l: "точек маршрута" },
            { v: "07",   l: "мест на гастро-карте" },
            { v: "БАТО", l: "локальный фольклор 2.0" },
          ].map((s, i) => (
            <div key={i} className="group">
              <div className="font-display text-3xl uppercase tracking-tight text-ink-50 transition-colors group-hover:text-rust-400 md:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 font-medium text-[10px] uppercase tracking-[0.25em] text-ink-50/50">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
