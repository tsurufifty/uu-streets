import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGastroPoints, getGastroPointBySlug } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  const points = await getGastroPoints();
  return points.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const spot = await getGastroPointBySlug(params.slug);
  if (!spot) return { title: "Гастротур · UU STREETS" };
  return {
    title: `${spot.name} · Гастротур · UU STREETS`,
    description: spot.short,
  };
}

export default async function GastroReviewPage({ params }: { params: { slug: string } }) {
  const spot = await getGastroPointBySlug(params.slug);
  if (!spot) return notFound();

  // соседи для навигации внизу
  const gastroPoints = await getGastroPoints();
  const idx = gastroPoints.findIndex((p) => p.slug === spot.slug);
  const prev = idx > 0 ? gastroPoints[idx - 1] : undefined;
  const next = idx >= 0 && idx < gastroPoints.length - 1 ? gastroPoints[idx + 1] : undefined;

  return (
    <article className="grunge-bg pt-24">
      {/* breadcrumb */}
      <section className="relative pt-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-acid-400">
            <Link href="/" className="hover:text-acid-400">Главная</Link>
            <span className="opacity-30">/</span>
            <Link href="/gastro" className="hover:text-acid-400">Гастротур</Link>
            <span className="opacity-30">/</span>
            <span className="text-ink-100/60">{spot.slug}</span>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="relative pb-12 pt-8">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative h-[420px] overflow-hidden border border-smoke-700 shadow-[10px_10px_0_#0a0908] md:h-[520px]">
                <Image
                  src={spot.cover}
                  alt={spot.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 bg-acid-500 px-3 py-1 font-display text-xs uppercase tracking-widest text-ink-950 shadow-[4px_4px_0_#0a0908]">
                  {spot.number} · {spot.category}
                </div>
                <div className="absolute right-4 top-4 border border-acid-500/50 bg-ink-950/80 px-3 py-1 font-display text-base uppercase tracking-widest text-acid-400 backdrop-blur-sm">
                  {spot.review.rating}/10
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="font-medium text-xs uppercase tracking-[0.3em] text-acid-400">
                рецензия / {spot.number}
              </div>
              <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] text-ink-50 md:text-6xl">
                {spot.name}
              </h1>
              <p className="mt-4 text-xl text-ink-100/80">{spot.short}</p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-smoke-700 pt-6 md:grid-cols-4">
                <Meta label="адрес" value={spot.address} />
                <Meta label="часы" value={spot.hours} />
                <Meta label="чек" value={spot.avgCheck} />
                <Meta label="категория" value={spot.category} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {spot.tags.map((t) => (
                  <span key={t} className="border border-smoke-600 px-3 py-1 font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/70">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="relative py-16 bg-ink-950 noise-overlay">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <p className="text-xl leading-relaxed text-ink-100/85 md:text-2xl">
            {spot.review.lead}
          </p>

          <div className="my-10 h-px w-full bg-gradient-to-r from-acid-500 via-smoke-700 to-transparent" />

          <div className="space-y-6 text-base leading-relaxed text-ink-100/80 md:text-lg">
            {spot.review.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* MUST TRY */}
          <div className="mt-14">
            <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-acid-400">
              must try
            </div>
            <ul className="mt-4 space-y-3">
              {spot.review.must_try.map((m, i) => (
                <li key={m} className="flex items-baseline gap-4 border-b border-smoke-700 pb-3">
                  <span className="font-display text-3xl text-acid-500 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl uppercase tracking-wide text-ink-50">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VERDICT */}
          <Card variant="paper" rotate={-1.5} className="mt-14 p-8" withTape>
            <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-600">
              вердикт · {spot.review.rating}/10
            </div>
            <p className="mt-3 font-display text-2xl uppercase leading-tight text-ink-950 md:text-3xl">
              «{spot.review.verdict}»
            </p>
          </Card>

          {/* OPEN IN MAPS */}
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href={`https://yandex.ru/maps/?text=${encodeURIComponent(spot.address + " Улан-Удэ")}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" size="lg">
                Открыть в Яндекс.Картах →
              </Button>
            </a>
            <Link href="/gastro">
              <Button variant="ghost" size="lg">
                ← Все места
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-4 border-t border-smoke-700 pt-8 md:grid-cols-2">
            {prev ? (
              <Link href={`/gastro/${prev.slug}`} className="group block">
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-ink-100/50">← предыдущее</div>
                <div className="mt-2 font-display text-2xl uppercase text-ink-50 transition-colors group-hover:text-acid-400">
                  {prev.number} · {prev.name}
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/gastro/${next.slug}`} className="group block text-right">
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-ink-100/50">следующее →</div>
                <div className="mt-2 font-display text-2xl uppercase text-ink-50 transition-colors group-hover:text-acid-400">
                  {next.number} · {next.name}
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-medium text-[10px] uppercase tracking-[0.25em] text-acid-400">{label}</div>
      <div className="mt-1 font-display text-sm uppercase text-ink-50">{value}</div>
    </div>
  );
}
