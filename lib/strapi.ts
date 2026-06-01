/**
 * Strapi-клиент для uu-streets.
 *
 * - fetchStrapi<T>(path, params)  — низкоуровневый запрос к /api/<path>
 * - getStrapiImageUrl(media)       — превращает media-объект Strapi в полный URL,
 *                                    с фоллбэком на /images/placeholder.jpg
 * - isStrapiConfigured()           — есть ли NEXT_PUBLIC_STRAPI_URL в env
 *
 * Адаптер на /data/*.ts (lib/content.ts) использует это под капотом и сам
 * подкладывает статический фоллбэк, если Strapi недоступен или не сконфигурирован.
 */

export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/+$/, '') || '';

const TOKEN = process.env.STRAPI_API_TOKEN;

export function isStrapiConfigured(): boolean {
  return Boolean(STRAPI_URL);
}

/**
 * Низкоуровневый запрос к Strapi REST API.
 * По умолчанию делает populate=* и ISR-кэш на 60 секунд.
 *
 * Бросает ошибку, если Strapi вернул не-OK или если STRAPI_URL не задан.
 *
 * @example
 *   const items = await fetchStrapi<Artist[]>('/artists', { 'sort[0]': 'number:asc' })
 */
export async function fetchStrapi<T = any>(
  path: string,
  params: Record<string, string> = {},
  init?: RequestInit
): Promise<T> {
  if (!STRAPI_URL) {
    throw new Error(
      'fetchStrapi: NEXT_PUBLIC_STRAPI_URL не задана. Установи её в .env.local или используй lib/content.ts (он сам падает на статический фоллбэк).'
    );
  }

  const url = new URL(`/api${path.startsWith('/') ? path : `/${path}`}`, STRAPI_URL);
  const merged = { populate: '*', ...params };
  url.search = new URLSearchParams(merged).toString();

  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    next: { revalidate: 60, ...(init?.next || {}) },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(
      `Strapi ${res.status} ${res.statusText} :: ${path} :: ${body.slice(0, 200)}`
    );
  }

  const json = await res.json();
  return json.data as T;
}

/**
 * Преобразует media-объект Strapi в публичный URL.
 *
 * Поддерживает оба формата:
 *  - Strapi v5: { url: '/uploads/...', formats?: {...} }
 *  - Strapi v4: { data: { attributes: { url: '...' } } }
 *
 * Если URL относительный — приклеивает STRAPI_URL.
 * Если медиа нет — возвращает либо fallbackPath, либо /images/placeholder.jpg.
 */
export function getStrapiImageUrl(
  imageData: any,
  fallbackPath?: string
): string {
  if (!imageData) return fallbackPath || '/images/placeholder.jpg';

  // v4-стиль { data: { attributes: {...} } }
  const data = imageData?.data?.attributes || imageData?.attributes || imageData;
  const url: string | undefined = data?.url;

  if (!url) return fallbackPath || '/images/placeholder.jpg';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Достаёт массив URL из media[].
 */
export function getStrapiImageUrls(
  imagesData: any,
  fallbackPaths?: string[]
): string[] {
  if (!imagesData) return fallbackPaths || [];

  // v5: уже массив; v4: { data: [...] }
  const list = Array.isArray(imagesData)
    ? imagesData
    : Array.isArray(imagesData?.data)
      ? imagesData.data
      : [];

  if (list.length === 0) return fallbackPaths || [];

  return list
    .map((item: any) => getStrapiImageUrl(item, undefined))
    .filter((u: string) => u && u !== '/images/placeholder.jpg');
}

/**
 * Strapi v5 возвращает запись как { id, documentId, ...attributes };
 * Strapi v4 — как { id, attributes: {...} }. Этот хелпер разворачивает оба варианта
 * в плоский объект.
 */
export function flattenStrapi<T = any>(entry: any): T {
  if (!entry) return entry;
  if (entry.attributes && typeof entry.attributes === 'object') {
    return { id: entry.id, ...entry.attributes } as T;
  }
  return entry as T;
}

export function flattenStrapiList<T = any>(list: any[]): T[] {
  return (list || []).map((e) => flattenStrapi<T>(e));
}
