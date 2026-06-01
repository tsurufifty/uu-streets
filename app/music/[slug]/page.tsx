import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArtists, getArtistBySlug } from "@/lib/content";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  const artists = await getArtists();
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const artist = await getArtistBySlug(params.slug);
  if (!artist) return { title: "Артист · UU STREETS" };
  return {
    title: `${artist.alias} · Музыка · UU STREETS`,
    description: artist.article.lead,
  };
}

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await getArtistBySlug(params.slug);
  if (!artist) return notFound();

  const artists = await getArtists();
  const idx = artists.findIndex((a) => a.slug === artist.slug);
  const prev = idx > 0 ? artists[idx - 1] : undefined;
  const next = idx >= 0 && idx < artists.length - 1 ? artists[idx + 1] : undefined;

  return (
    <article className="bg-ink-950 pt-24">
      {/* breadcrumb */}
      <section className="relative pt-12">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <Link href="/" className="hover:text-rust-500">Главная</Link>
            <span className="opacity-30">/</span>
            <Link href="/music" className="hover:text-rust-500">Музыка</Link>
            <span className="opacity-30">/</span>
            <span className="text-ink-100/60">{artist.slug}</span>
          </div>
        </div>
      </section>

      {/* HERO — фото + заголовок */}
      <section className="relative pb-12 pt-8">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border border-smoke-700 shadow-[10px_10px_0_#0a0908]">
                <Image
                  src={artist.cover}
                  alt={artist.alias}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 font-display text-6xl text-acid-500 leading-none drop-shadow-[3px_3px_0_#0a0908]">
                  {artist.number}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
                артист / {artist.number}
              </div>
              <h1 className="mt-4 font-display text-5xl uppercase leading-[0.85] text-ink-50 md:text-7xl">
                {artist.alias}
              </h1>
              {artist.realName && (
                <div className="mt-3 font-display text-lg uppercase tracking-wider text-ink-100/60">
                  {artist.realName}
                </div>
              )}

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-smoke-700 pt-6 md:grid-cols-4">
                <Meta label="район" value={artist.hood} />
                <Meta label="жанр" value={artist.genre} />
                <Meta label="на сцене с" value={String(artist.yearStarted)} />
                <Meta label="релизов" value={String(artist.article.discography.length)} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {artist.tags.map((t) => (
                  <span key={t} className="border border-smoke-600 px-3 py-1 font-medium text-[10px] uppercase tracking-[0.2em] text-ink-100/70">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT (lead) */}
      <section className="relative py-16 grunge-bg">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <p className="text-xl leading-relaxed text-ink-100/85 md:text-2xl">
            {artist.article.lead}
          </p>

          <div className="my-10 h-px w-full bg-gradient-to-r from-rust-500 via-smoke-700 to-transparent" />

          <div className="space-y-6 text-base leading-relaxed text-ink-100/80 md:text-lg">
            {artist.article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* QUOTE */}
          <Card variant="paper" rotate={-1.5} className="mt-14 p-8" withTape>
            <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-rust-600">
              {artist.alias} говорит
            </div>
            <p className="mt-3 font-display text-2xl uppercase leading-tight text-ink-950 md:text-3xl">
              «{artist.article.quote}»
            </p>
          </Card>
        </div>
      </section>

      {/* DISCOGRAPHY */}
      <section className="relative py-16 bg-ink-950 noise-overlay">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <span className="h-px w-10 bg-rust-500" />
            <span>дискография</span>
          </div>
          <h2 className="mt-4 font-display text-3xl uppercase leading-tight text-ink-50 md:text-5xl">
            Что выпустил
          </h2>

          <ul className="mt-10 border-t border-smoke-700">
            {artist.article.discography.map((r) => (
              <li key={r.title} className="grid grid-cols-12 items-baseline gap-4 border-b border-smoke-700 py-5">
                <div className="col-span-2 font-display text-2xl text-rust-400">{r.year}</div>
                <div className="col-span-7 font-display text-lg uppercase tracking-wide text-ink-50 md:text-2xl">
                  {r.title}
                </div>
                <div className="col-span-3 text-right font-medium text-[10px] uppercase tracking-[0.25em] text-ink-100/50">
                  {r.format}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* YANDEX MUSIC PLAYER */}
      <section className="relative py-16 grunge-bg">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="flex items-center gap-3 font-medium text-xs uppercase tracking-[0.3em] text-rust-400">
            <span className="h-px w-10 bg-rust-500" />
            <span>слушать</span>
          </div>
          <h2 className="mt-4 font-display text-3xl uppercase leading-tight text-ink-50 md:text-5xl">
            Плеер · Яндекс Музыка
          </h2>

          <div className="mt-10 border border-smoke-700 bg-smoke-800/40 p-2 shadow-[8px_8px_0_#0a0908]">
            {artist.yandexEmbed ? (
              <iframe
                key={artist.slug}
                src={artist.yandexEmbed}
                width="100%"
                height="450"
                frameBorder="0"
                allow="autoplay *; encrypted-media *;"
                title={`${artist.alias} — Яндекс Музыка`}
                className="block w-full"
              />
            ) : (
              <EmptyPlayer />
            )}
          </div>

          <p className="mt-4 font-medium text-[10px] uppercase tracking-[0.25em] text-ink-100/50">
            плеер встроен из Яндекс.Музыки · полный каталог — по ссылке внутри
          </p>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="relative pb-24 pt-12 bg-ink-950">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-4 border-t border-smoke-700 pt-8 md:grid-cols-2">
            {prev ? (
              <Link href={`/music/${prev.slug}`} className="group block">
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-ink-100/50">← предыдущий</div>
                <div className="mt-2 font-display text-2xl uppercase text-ink-50 transition-colors group-hover:text-rust-400">
                  {prev.number} · {prev.alias}
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/music/${next.slug}`} className="group block text-right">
                <div className="font-medium text-[10px] uppercase tracking-[0.3em] text-ink-100/50">следующий →</div>
                <div className="mt-2 font-display text-2xl uppercase text-ink-50 transition-colors group-hover:text-rust-400">
                  {next.number} · {next.alias}
                </div>
              </Link>
            ) : <div />}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/music">
              <Button variant="ghost" size="md">← Все артисты</Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-medium text-[10px] uppercase tracking-[0.25em] text-rust-400">{label}</div>
      <div className="mt-1 font-display text-sm uppercase text-ink-50">{value}</div>
    </div>
  );
}

function EmptyPlayer() {
  return (
    <div className="flex h-[450px] flex-col items-center justify-center bg-ink-950 text-center">
      <div className="font-display text-4xl uppercase text-ink-100/40">плеер скоро</div>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-100/50">
        Чтобы подключить — добавь URL Яндекс.Музыки в поле{" "}
        <code className="bg-smoke-800 px-2 py-0.5 text-rust-400">yandexEmbed</code>{" "}
        в <code className="bg-smoke-800 px-2 py-0.5 text-rust-400">/data/artists.ts</code>.
      </p>
    </div>
  );
}
