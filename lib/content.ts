/**
 * Универсальный data-слой для uu-streets.
 *
 * Принцип:
 *  - Если NEXT_PUBLIC_STRAPI_URL задан — фетчим из Strapi.
 *  - Если запрос падает или env не задан — возвращаем статический фоллбэк
 *    из /data/*.ts.
 *
 * Все геттеры возвращают данные в той же форме, что и старые статические
 * массивы — страницы и компоненты UI не должны заметить разницы.
 *
 * Используй это в server-компонентах (page.tsx). На клиенте — получай данные
 * через props сверху.
 */

import {
  fetchStrapi,
  flattenStrapi,
  flattenStrapiList,
  getStrapiImageUrl,
  getStrapiImageUrls,
  isStrapiConfigured,
} from './strapi';

import { artists as staticArtists, type Artist } from '@/data/artists';
import {
  gastroPoints as staticGastroPoints,
  type GastroPoint,
} from '@/data/gastro';
import {
  galleryPhotos as staticGalleryPhotos,
  galleryCategories as staticGalleryCategories,
  type GalleryPhoto,
} from '@/data/gallery';
import {
  routePoints as staticRoutePoints,
  type RoutePoint,
} from '@/data/route';
import {
  events as staticEvents,
  type Event,
  type EventAccent,
} from '@/data/events';

export type { Artist, GastroPoint, GalleryPhoto, RoutePoint, Event, EventAccent };

/* -------------------------------------------------------------------------- */
/*                                  ARTISTS                                    */
/* -------------------------------------------------------------------------- */

function mapArtist(raw: any): Artist {
  const a = flattenStrapi<any>(raw);
  return {
    id: a.id ?? 0,
    slug: a.slug,
    number: a.number ?? '',
    alias: a.alias,
    realName: a.realName,
    hood: a.hood ?? '',
    genre: a.genre ?? '',
    yearStarted: a.yearStarted ?? 0,
    cover: getStrapiImageUrl(a.cover, a.coverPath),
    tags: a.tags ?? [],
    article: {
      lead: a.articleLead ?? '',
      body: a.articleBody ?? [],
      quote: a.articleQuote ?? '',
      discography: a.discography ?? [],
    },
    yandexEmbed: a.yandexEmbed,
  };
}

export async function getArtists(): Promise<Artist[]> {
  if (!isStrapiConfigured()) return staticArtists;
  try {
    const data = await fetchStrapi<any[]>('/artists', {
      'sort[0]': 'number:asc',
    });
    const list = flattenStrapiList<any>(data).map(mapArtist);
    return list.length > 0 ? list : staticArtists;
  } catch (err) {
    console.warn('[content] getArtists fallback to static:', err);
    return staticArtists;
  }
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  if (!isStrapiConfigured())
    return staticArtists.find((a) => a.slug === slug) ?? null;
  try {
    const data = await fetchStrapi<any[]>('/artists', {
      'filters[slug][$eq]': slug,
    });
    const list = flattenStrapiList<any>(data).map(mapArtist);
    return list[0] ?? staticArtists.find((a) => a.slug === slug) ?? null;
  } catch (err) {
    console.warn('[content] getArtistBySlug fallback:', err);
    return staticArtists.find((a) => a.slug === slug) ?? null;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  GASTRO                                     */
/* -------------------------------------------------------------------------- */

function mapGastro(raw: any): GastroPoint {
  const g = flattenStrapi<any>(raw);
  return {
    id: g.id ?? 0,
    slug: g.slug,
    number: g.number ?? '',
    name: g.name,
    category: g.category,
    short: g.short ?? '',
    address: g.address ?? '',
    coords: [Number(g.lat) || 0, Number(g.lng) || 0],
    hours: g.hours ?? '',
    avgCheck: g.avgCheck ?? '',
    cover: getStrapiImageUrl(g.cover, g.coverPath),
    tags: g.tags ?? [],
    site: g.site,
    review: {
      lead: g.reviewLead ?? '',
      body: g.reviewBody ?? [],
      must_try: g.mustTry ?? [],
      rating: g.rating ?? 0,
      verdict: g.verdict ?? '',
    },
  };
}

export async function getGastroPoints(): Promise<GastroPoint[]> {
  if (!isStrapiConfigured()) return staticGastroPoints;
  try {
    const data = await fetchStrapi<any[]>('/gastro-points', {
      'sort[0]': 'number:asc',
    });
    const list = flattenStrapiList<any>(data).map(mapGastro);
    return list.length > 0 ? list : staticGastroPoints;
  } catch (err) {
    console.warn('[content] getGastroPoints fallback to static:', err);
    return staticGastroPoints;
  }
}

export async function getGastroPointBySlug(
  slug: string
): Promise<GastroPoint | null> {
  if (!isStrapiConfigured())
    return staticGastroPoints.find((p) => p.slug === slug) ?? null;
  try {
    const data = await fetchStrapi<any[]>('/gastro-points', {
      'filters[slug][$eq]': slug,
    });
    const list = flattenStrapiList<any>(data).map(mapGastro);
    return list[0] ?? staticGastroPoints.find((p) => p.slug === slug) ?? null;
  } catch (err) {
    console.warn('[content] getGastroPointBySlug fallback:', err);
    return staticGastroPoints.find((p) => p.slug === slug) ?? null;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  GALLERY                                    */
/* -------------------------------------------------------------------------- */

function mapPhoto(raw: any): GalleryPhoto {
  const p = flattenStrapi<any>(raw);
  return {
    src: getStrapiImageUrl(p.photo, p.photoPath),
    alt: p.alt,
    title: p.title,
    caption: p.caption,
    category: p.category,
    width: p.width,
    height: p.height,
  };
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  if (!isStrapiConfigured()) return staticGalleryPhotos;
  try {
    const data = await fetchStrapi<any[]>('/gallery-photos', {
      'sort[0]': 'sortOrder:asc',
    });
    const list = flattenStrapiList<any>(data).map(mapPhoto);
    return list.length > 0 ? list : staticGalleryPhotos;
  } catch (err) {
    console.warn('[content] getGalleryPhotos fallback to static:', err);
    return staticGalleryPhotos;
  }
}

// Категории пока статические — это конфиг UI, а не контент.
export const galleryCategories = staticGalleryCategories;

/* -------------------------------------------------------------------------- */
/*                                  ROUTE                                      */
/* -------------------------------------------------------------------------- */

function mapRoute(raw: any): RoutePoint {
  const r = flattenStrapi<any>(raw);
  const photos = getStrapiImageUrls(r.photos, r.photoPaths);
  return {
    id: r.id ?? 0,
    slug: r.slug,
    number: r.number ?? '',
    title: r.title,
    subtitle: r.subtitle ?? '',
    description: r.description ?? '',
    location: r.location ?? '',
    coords: [Number(r.lat) || 0, Number(r.lng) || 0],
    artist: r.artist,
    style: r.style,
    tags: r.tags ?? [],
    photos: photos.length > 0 ? photos : undefined,
  };
}

export async function getRoutePoints(): Promise<RoutePoint[]> {
  if (!isStrapiConfigured()) return staticRoutePoints;
  try {
    const data = await fetchStrapi<any[]>('/route-points', {
      'sort[0]': 'number:asc',
    });
    const list = flattenStrapiList<any>(data).map(mapRoute);
    return list.length > 0 ? list : staticRoutePoints;
  } catch (err) {
    console.warn('[content] getRoutePoints fallback to static:', err);
    return staticRoutePoints;
  }
}

export async function getRoutePointBySlug(
  slug: string
): Promise<RoutePoint | null> {
  if (!isStrapiConfigured())
    return staticRoutePoints.find((p) => p.slug === slug) ?? null;
  try {
    const data = await fetchStrapi<any[]>('/route-points', {
      'filters[slug][$eq]': slug,
    });
    const list = flattenStrapiList<any>(data).map(mapRoute);
    return list[0] ?? staticRoutePoints.find((p) => p.slug === slug) ?? null;
  } catch (err) {
    console.warn('[content] getRoutePointBySlug fallback:', err);
    return staticRoutePoints.find((p) => p.slug === slug) ?? null;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  EVENTS                                     */
/* -------------------------------------------------------------------------- */

const ALLOWED_ACCENTS: EventAccent[] = ['rust', 'acid', 'paper', 'dark'];

function mapEvent(raw: any): Event {
  const e = flattenStrapi<any>(raw);
  const accent: EventAccent = ALLOWED_ACCENTS.includes(e.accent)
    ? e.accent
    : 'rust';
  return {
    id: e.id ?? 0,
    slug: e.slug,
    date: e.date ?? '',
    month: e.month ?? '',
    year: e.year ?? '',
    day: e.day ?? '',
    title: e.title ?? '',
    subtitle: e.subtitle ?? '',
    venue: e.venue ?? '',
    time: e.time ?? '',
    tags: Array.isArray(e.tags) ? e.tags : [],
    lineup: Array.isArray(e.lineup) ? e.lineup : undefined,
    description: Array.isArray(e.description) ? e.description : [],
    accent,
    rotate: Number(e.rotate) || 0,
    link:
      e.linkHref && e.linkLabel
        ? { href: e.linkHref, label: e.linkLabel }
        : undefined,
    source: e.source ?? '',
    poster:
      e.poster || e.posterPath
        ? getStrapiImageUrl(e.poster, e.posterPath)
        : undefined,
    sortOrder: e.sortOrder ?? 0,
  };
}

export async function getEvents(): Promise<Event[]> {
  if (!isStrapiConfigured()) return staticEvents;
  try {
    const data = await fetchStrapi<any[]>('/events', {
      'sort[0]': 'sortOrder:asc',
    });
    const list = flattenStrapiList<any>(data).map(mapEvent);
    return list.length > 0 ? list : staticEvents;
  } catch (err) {
    console.warn('[content] getEvents fallback to static:', err);
    return staticEvents;
  }
}
