# UU-STREETS

Платформа уличной культуры Улан-Удэ: маршрут по граффити и муралам, фотогалерея, события, музыка, гастрономия. Next.js 14 (App Router) + Strapi 5 как headless-CMS.

> Стрит-арт по улицам старого города

---

## Тех.стек

- **Next.js 14** (App Router, React Server Components)
- **TypeScript**, **Tailwind CSS**
- **Framer Motion** — анимации и переходы
- **Yandex Maps** (`@pbe/react-yandex-maps`) — карта маршрута
- **Strapi 5** — headless CMS для контента, лежит в приватной репе.

Фронт работает в двух режимах:

- **Со Strapi** — если в `.env.local` задан `NEXT_PUBLIC_STRAPI_URL`, контент тянется с CMS.
- **Без Strapi (fallback)** — если переменная не задана или CMS недоступна, используются статические данные из `/data/*.ts`. Работает полностью локально.

---

## Быстрый старт

```bash
git clone https://github.com/tsurufifty/uu-streets.git
cd uu-streets
npm install
cp .env.local.example .env.local
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

### Со Strapi-бэкендом

Увы, пока не дано, бэк в привате.

---

## Структура проекта

```
uu-streets/
├─ app/                          # Next.js App Router
│  ├─ layout.tsx
│  ├─ page.tsx                   # Главная: Hero → Marquee → About → превью разделов
│  ├─ globals.css                # Gotham Pro, грандж-стили
│  ├─ tourism/                   # Маршрут по стрит-арту + Yandex карта
│  ├─ gallery/                   # Фотогалерея с фильтром и lightbox
│  ├─ music/                     # Артисты Улан-Удэ
│  ├─ gastro/                    # Гастро-точки с картой
│  ├─ events/                    # Афиша
│  ├─ contacts/                  # Контакты
│  ├─ about/                     # О проекте
│  └─ api/                       # API-роуты Next.js (revalidate webhook и т.п.)
├─ components/
│  ├─ Navbar.tsx                 # навигация с логотипом БГСХА и Сойомбой
│  ├─ Footer.tsx
│  ├─ RouteMap.tsx               # Yandex Maps для маршрута
│  ├─ GastroMap.tsx              # Yandex Maps для гастро
│  ├─ Lightbox.tsx               # для галереи
│  ├─ Reveal.tsx                 # scroll-reveal анимация
│  ├─ ui/                        # Button, Card и т.п.
│  └─ sections/                  # VideoHero, About, TourismPreview, GastroPreview, MusicPreview, ...
├─ data/                         # статический fallback-контент
│  ├─ route.ts
│  ├─ gallery.ts
│  ├─ artists.ts
│  └─ ...
├─ lib/
│  ├─ strapi.ts                  # клиент к Strapi REST API
│  ├─ content.ts                 # обёртки с fallback на /data/*
│  └─ utils.ts
└─ public/
   ├─ fonts/                     # Gotham Pro (10 начертаний)
   ├─ images/                    # logo.png, soyomba.png
   ├─ videos/                    # promouu03.mp4 — главный видеобаннер
   └─ gallery/                   # фото для галереи
```

---

## Переменные окружения

Все переменные — в `.env.local`. Шаблон — `.env.local.example`.

| Переменная                        | Обязательная | Описание                                                                                                                                              |
| --------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_STRAPI_URL`          | нет          | URL Strapi-бэка (без слеша на конце). Без неё работает на статике.                                                                                    |
| `STRAPI_API_TOKEN`                | нет          | Read-only токен из Strapi Admin → Settings → API Tokens. Нужен только если Public-роли не выданы права.                                               |
| `REVALIDATE_SECRET`               | нет          | Секрет для `/api/revalidate` webhook. Генерация: `openssl rand -hex 32`.                                                                              |
| `NEXT_PUBLIC_YANDEX_MAPS_API_KEY` | нет          | Ключ Яндекс.Карт. Без него карта работает в dev-режиме с водяным знаком. Получить — на [developer.tech.yandex.ru](https://developer.tech.yandex.ru/). |

---

## Контент

### Маршрут стрит-арта (`/tourism`)

Если Strapi подключён — точки тянутся из коллекции **Route Point**. Иначе — из `data/route.ts`.

Каждая точка содержит: номер, название, координаты `[lat, lng]`, локацию, стиль, автора, теги, описание, массив фото.

### Галерея (`/gallery`)

То же самое: коллекция **Gallery Photo** в Strapi или массив в `data/gallery.ts`. Фото кладёте в `public/gallery/`, путь в коллекции — от корня `public` (например, `/gallery/photo01.jpg`).

### Видео и постер

- `public/videos/promouu03.mp4` — главный видеобаннер на `/tourism`.
- `public/images/video-poster.jpg` — постер (опционально).

---

## Скрипты

```bash
npm run dev      # dev-сервер на :3000
npm run build    # продакшн-билд
npm run start    # запуск продакшн-сборки
```

---

## Деплой

### Vercel

1. Импортируйте репозиторий на [vercel.com/new](https://vercel.com/new).
2. Vercel сам определит Next.js, ничего настраивать не надо.
3. В **Environment Variables** добавьте переменные из `.env.local` (как минимум `NEXT_PUBLIC_STRAPI_URL`, если Strapi уже задеплоен).
4. Deploy.


