"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";

const STORIES = [
  {
    n: "01",
    eyebrow: "контекст",
    title: "Перекрёсток культур",
    body: "Бурятия — место, где древние шаманские обряды соседствуют с буддийскими дацанами, а суровая природа Байкала вдохновляет на создание мифов. Веками главными визуальными символами здесь были эпические герои вроде Гэсэра, сакральные орнаменты и буддийская иконография.",
  },
  {
    n: "02",
    eyebrow: "поворот",
    title: "От бересты к бетону",
    body: "В последние годы на улицах Улан-Удэ появился новый голос. Художники объединения «БАТО» и другие райтеры не копируют старину, а вплетают её в граффити: вместо бересты — городские стены, а вместо кисти — баллончик с краской.",
  },
  {
    n: "03",
    eyebrow: "результат",
    title: "Бурятский фольклор 2.0",
    body: "Так рождается особый язык — честный, дерзкий и понятный молодёжи. Шаманские знаки превращаются в теги, буддийские узоры распыляются из баллончика. Это не туристический колорит, а живая городская культура, которой можно идти по следу.",
  },
];

export function TourismStories() {
  return (
    <section id="stories" className="relative py-24 md:py-32 grunge-bg">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* HEADER */}
        <Reveal>
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <span className="h-px w-10 bg-rust-500" />
            <span>истории / прежде чем идти</span>
          </div>
          <h2 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-ink-50 md:text-6xl">
            <span className="block">Откуда взялся</span>
            <span className="block">
              <span className="bg-rust-500 px-2 text-ink-50">бурятский</span>{" "}
              андеграунд
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-ink-100/70">
            Прежде чем выйти на маршрут — три коротких истории о том,
            как старая Бурятия научилась говорить языком уличного искусства.
          </p>
        </Reveal>

        {/* STORIES — alternating editorial blocks */}
        <div className="mt-16 space-y-16 md:space-y-24">
          {STORIES.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={s.n}
                className={`grid items-start gap-10 lg:grid-cols-12 lg:gap-16 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                {/* LEFT: number + paper card */}
                <div className="lg:col-span-5">
                  <Reveal direction={reverse ? "right" : "left"}>
                    <div className="font-display text-[10rem] leading-none text-rust-500/90 md:text-[14rem]">
                      {s.n}
                    </div>
                  </Reveal>

                  <Reveal delay={0.15} direction={reverse ? "right" : "left"}>
                    <Card variant="paper" rotate={reverse ? 1.5 : -1.5} className="mt-4 max-w-sm p-5" withTape>
                      <p className="font-medium text-[10px] uppercase tracking-[0.25em] text-rust-600">
                        {s.eyebrow}
                      </p>
                      <p className="mt-3 font-display text-xl uppercase leading-tight text-ink-950">
                        {s.title}
                      </p>
                    </Card>
                  </Reveal>
                </div>

                {/* RIGHT: text */}
                <div className="lg:col-span-7">
                  <Reveal delay={0.1}>
                    <div className="border-l-2 border-rust-500 pl-6">
                      <h3 className="font-display text-3xl uppercase leading-tight text-ink-50 md:text-4xl">
                        {s.title}
                      </h3>
                    </div>
                  </Reveal>

                  <Reveal delay={0.25}>
                    <p className="mt-6 text-lg leading-relaxed text-ink-100/85 md:text-xl">
                      {s.body}
                    </p>
                  </Reveal>

                  {/* Decorative tags row only on first story */}
                  {i === 0 && (
                    <Reveal delay={0.4}>
                      <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {[
                          { kw: "Шаманские знаки", n: "/01" },
                          { kw: "Буддийские узоры", n: "/02" },
                          { kw: "Локальные мемы", n: "/03" },
                        ].map((tag) => (
                          <motion.div
                            key={tag.n}
                            whileHover={{ y: -4, rotate: -1 }}
                            className="border border-smoke-700 bg-smoke-800/50 p-4 backdrop-blur-sm"
                          >
                            <div className="font-medium text-[10px] uppercase tracking-[0.25em] text-rust-400">
                              {tag.n}
                            </div>
                            <div className="mt-2 font-display text-base uppercase tracking-wide">
                              {tag.kw}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </Reveal>
                  )}

                  {/* BATO highlight on second */}
                  {i === 1 && (
                    <Reveal delay={0.4}>
                      <p className="mt-6 text-base leading-relaxed text-ink-100/70 md:text-lg">
                        Объединение{" "}
                        <span className="bg-rust-500 px-2 font-display uppercase tracking-wide text-ink-50">
                          БАТО
                        </span>{" "}
                        — герои локального стрит-арта, угрюмый мальчик в красной
                        футболке появляется на стенах в самых неожиданных местах.
                        Найди его на маршруте.
                      </p>
                    </Reveal>
                  )}

                  {/* CTA on last */}
                  {i === STORIES.length - 1 && (
                    <Reveal delay={0.4}>
                      <p className="mt-6 text-base leading-relaxed text-ink-100/80 md:text-lg">
                        Теперь, когда контекст у тебя есть —{" "}
                        <em className="not-italic font-display uppercase text-acid-500">
                          можно выходить на маршрут
                        </em>{" "}
                        ↓
                      </p>
                    </Reveal>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
