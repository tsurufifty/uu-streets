"use client";

import { motion } from "framer-motion";
import { extraPoints, museums } from "@/data/route";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";

export function Extras() {
  return (
    <section id="extras" className="relative py-24 md:py-32 grunge-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <span className="h-px w-10 bg-rust-500" />
            <span>03 / бонусы</span>
          </div>
          <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] text-ink-50 md:text-6xl">
            Дополнительные <br />
            точки и квест
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* EXTRA POINTS */}
          <div className="space-y-4 lg:col-span-1">
            <Reveal>
              <h3 className="font-display text-2xl uppercase tracking-wider text-ink-100/80">
                Городские ориентиры
              </h3>
            </Reveal>
            {extraPoints.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="group flex items-start gap-4 border-l-2 border-smoke-600 pl-4 transition-colors hover:border-rust-500"
                >
                  <span className="font-display text-3xl text-rust-400 leading-none">
                    +{i + 1}
                  </span>
                  <div>
                    <div className="font-display text-lg uppercase tracking-wide">
                      {p.name}
                    </div>
                    <div className="font-medium text-xs text-ink-100/50">{p.note}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* MUSEUMS */}
          <div className="lg:col-span-1">
            <Reveal>
              <h3 className="font-display text-2xl uppercase tracking-wider text-ink-100/80">
                Музеи города
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <Card variant="paper" rotate={1.5} className="mt-6 p-6" withTape>
                <p className="font-medium text-[10px] uppercase tracking-[0.25em] text-rust-600">
                  Рекомендуем посетить
                </p>
                <ul className="mt-4 space-y-3">
                  {museums.map((m, i) => (
                    <li key={m} className="flex items-start gap-3">
                      <span className="font-display text-rust-500 leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base uppercase tracking-wide">
                        {m}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>

          {/* BATO QUEST */}
          <div className="lg:col-span-1">
            <Reveal delay={0.2}>
              <motion.div
                whileHover={{ rotate: -1 }}
                className="relative overflow-hidden bg-rust-500 p-8 text-ink-50 shadow-[8px_8px_0_#0a0908]"
              >
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] opacity-70">
                  бонусный квест
                </div>
                <h3 className="mt-3 font-display text-4xl uppercase leading-none">
                  В поисках <br />
                  <span className="text-acid-500">БАТО</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed opacity-90">
                  Квест по граффити с угрюмым мальчиком в красной футболке.
                  Найди все стены с тегом #БАТО — герой локального стрит-арта
                  прячется во дворах и на крышах.
                </p>
                <div className="mt-8 flex items-center gap-2 font-display text-xl uppercase">
                  <span className="text-acid-500">#</span> БАТО!
                </div>

                {/* decorative */}
                <div className="pointer-events-none absolute -right-8 -bottom-8 font-display text-[12rem] leading-none opacity-10">
                  !
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
