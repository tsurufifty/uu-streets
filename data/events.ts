/**
 * Статический fallback для коллекции Event.
 *
 * Используется, если NEXT_PUBLIC_STRAPI_URL не задан или Strapi недоступен.
 * Когда Strapi подключён — getEvents() в lib/content.ts вернёт данные из CMS.
 */

export type EventAccent = "rust" | "acid" | "paper" | "dark";

export type Event = {
  id?: number;
  slug: string;
  date: string;          // "05" или "10–11"
  month: string;         // "JUL"
  year: string;
  day: string;           // "SUN" / "FRI–SAT"
  title: string;         // с \n как перенос
  subtitle: string;
  venue: string;
  time: string;
  tags: string[];
  lineup?: string[];     // для музыки
  description: string[]; // 1-3 абзаца
  accent: EventAccent;
  rotate: number;
  link?: { href: string; label: string };
  source: string;
  poster?: string;       // URL обложки (опционально)
  sortOrder?: number;
};

export const events: Event[] = [
  {
    slug: "noch-yokhora-2026",
    date: "05",
    month: "JUL",
    year: "2026",
    day: "SUN",
    title: "НОЧЬ\nЁХОРА",
    subtitle: "Фестиваль бурятского танца-обряда",
    venue: "Этнографический музей народов Забайкалья",
    time: "18:00",
    tags: ["ёхор", "бурятское", "гранд-ёхор", "open-air"],
    description: [
      "Главный летний фестиваль бурятской культуры, который проводится с 2008 года и собирает тысячи людей в одном круге.",
      "Программа: интерактивные площадки, фудкорты, мастер-классы по ёхорам, концерт театра «Байкал» с приглашёнными хэдлайнерами, конкурс фольклорных коллективов с призовым фондом 500 000 ₽.",
      "Кульминация — гранд-ёхор: тысячи людей, одно кольцо, один ритм.",
    ],
    accent: "rust",
    rotate: -2,
    link: {
      href: "https://quicktickets.ru/ulan-ude-teatr-baikal/s568",
      label: "Купить билет",
    },
    source: "minkultrb.ru",
    sortOrder: 1,
  },
  {
    slug: "golos-kochevnikov-2026",
    date: "10–11",
    month: "JUL",
    year: "2026",
    day: "FRI–SAT",
    title: "ГОЛОС\nКОЧЕВНИКОВ",
    subtitle: "Два дня музыки и свободы · open-air",
    venue: "Туркомплекс «Асагад. Степной кочевник», Ацагат",
    time: "60 км от Улан-Удэ",
    tags: ["open-air", "world-music", "rock", "лагерь"],
    lineup: [
      "AY YOLA",
      "Дайте танк(!)",
      "Дима Билан",
      "Мот",
      "RASPUTNIKI",
      "АлияНур",
      "Hanggai",
      "Нукер",
      "HuuG",
      "ANILEDA",
      "Hounds of Bayanay",
      "MAKARA",
    ],
    description: [
      "Главный музыкальный open-air Бурятии: степь, сцена, палаточный лагерь и два дня лайвов от world-music до рока.",
      "Билеты: 4 000 ₽ (10.07) / 4 500 ₽ (11.07) / 7 500 ₽ — единый на два дня. На территорию можно приехать со своей палаткой — проживание входит в стоимость.",
    ],
    accent: "acid",
    rotate: 1.5,
    link: {
      href: "https://voiceofnomads.ru/bilety-na-festival/",
      label: "Купить билет",
    },
    source: "voiceofnomads.ru",
    sortOrder: 2,
  },
];
