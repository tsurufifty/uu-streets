"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 grunge-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT COLUMN — section label */}
          <div className="lg:col-span-4 lg:pr-6">
            <Reveal>
              <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
                <span className="h-px w-10 bg-rust-500" />
                <span>01 / контекст</span>
              </div>
              <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] text-ink-50 md:text-4xl">
                Перекрёсток культур
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <Card variant="paper" rotate={-1.5} className="mt-10 p-6 max-w-sm">
                <p className="font-medium text-xs uppercase tracking-[0.2em] text-rust-600">
                  МАНИФЕСТ
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  Бурятия — уникальный перекрёсток культур, где древние шаманские
                  обряды соседствуют с буддийскими дацанами, а суровая природа Байкала
                  вдохновляет на создание мифов и легенд.
                </p>
              </Card>
            </Reveal>
          </div>

          {/* RIGHT COLUMN — content */}
          <div className="lg:col-span-8 space-y-8">
            <Reveal delay={0.1}>
              <div className="border-l-2 border-rust-500 pl-6">
                <p className="text-xl leading-relaxed text-ink-100/85 md:text-2xl">
                  Веками главными визуальными символами здесь были эпические герои
                  вроде Гэсэра, сакральные орнаменты и сложная буддийская иконография.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="text-base leading-relaxed text-ink-100/70 md:text-lg">
                Однако в последние годы на улицах Улан-Удэ появился новый голос —{" "}
                <span className="bg-rust-500 px-2 font-display uppercase tracking-wide text-ink-50">
                  Бурятский андеграунд (БАТО)
                </span>
                , который переосмысливает традицию на языке современного стрит-арта.
                Художники объединения «БАТО» и другие райтеры не копируют старину, а
                вплетают её в граффити: вместо бересты и холста — городские стены,
                а вместо кисти — баллончик с краской.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { kw: "Шаманские знаки", n: "/01" },
                  { kw: "Буддийские узоры", n: "/02" },
                  { kw: "Локальные мемы", n: "/03" },
                ].map((tag, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, rotate: -1 }}
                    className="border border-smoke-700 bg-smoke-800/50 p-4 backdrop-blur-sm"
                  >
                    <div className="font-medium text-[10px] uppercase tracking-[0.25em] text-rust-400">
                      {tag.n}
                    </div>
                    <div className="mt-2 font-display text-xl uppercase tracking-wide">
                      {tag.kw}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <p className="text-base leading-relaxed text-ink-100/70 md:text-lg">
                Так рождается особый <em className="not-italic font-display uppercase text-acid-500">
                «бурятский фольклор 2.0»
                </em> — честный, дерзкий и понятный молодёжи.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
