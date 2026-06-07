import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="grunge-bg pt-24">
      {/* HEADER */}
      <section className="relative pb-12 pt-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <Link href="/" className="hover:text-rust-500">← Главная</Link>
            <span className="opacity-30">/</span>
            <span>о проекте</span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] text-ink-50 md:text-7xl">
            <span className="block">О платформе</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-ink-100/70">
            UU-STREETS — Туристический современный медиа-портал об уличной
            культуре (андерграунд) Улан-Удэ. Мы показываем вам о том, как
            живёт город прямо сейчас.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="space-y-8 text-base leading-relaxed text-ink-100/85 md:text-lg">
            <p>
              Мы рассказываем про четыре языка одного города:{" "}
              <span className="bg-rust-500 px-2 font-display uppercase text-ink-50">
                туризм, гастро, афиша и музыка
              </span>
              . Граффити-маршрут, гастро-карта, события, локальные
              артисты — это разные стороны одной уличной экосистемы.
            </p>

            <p>
              Проект создан студентами{" "}
              <span className="bg-rust-500 px-2 font-display uppercase text-ink-50">
                БГСХА им. В.Р. Филиппова
              </span>{" "}
              в рамках исследования городской культуры Улан-Удэ. UU STREETS
              остаётся открытой платформой — авторами становятся те, кто
              живёт и творит на этих улицах.
            </p>

            <h2 className="font-display text-3xl uppercase text-ink-50 md:text-4xl">
              Контакты
            </h2>
            <p>
              Нашёл стену, артиста, заведение или событие, которое стоит
              добавить? Пиши с пометкой «UUSTREETS»: <a href="mailto:bgsha@bgsha.ru" className="text-rust-400 underline hover:text-rust-500">bgsha@bgsha.ru</a>.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap gap-4">
            <Link href="/tourism">
              <Button variant="primary" size="lg">
                Открыть маршруты →
              </Button>
            </Link>
            <Link href="/music">
              <Button variant="ghost" size="lg">
                Слушать улицы
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="ghost" size="lg">
                галерея
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
