export interface Artist {
  id: number;
  slug: string;
  number: string;            // "01"
  alias: string;             // сценический псевдоним
  realName?: string;         // настоящее имя
  hood: string;              // район Улан-Удэ
  genre: string;             // основной жанр
  yearStarted: number;
  cover: string;             // /gallery/X.jpg — фото-обложка артиста
  tags: string[];

  // Полная статья
  article: {
    lead: string;            // вводный абзац
    body: string[];          // абзацы статьи
    quote: string;           // цитата артиста
    discography: { title: string; year: number; format: string }[];
  };

  // Yandex Music embed.
  // Полный URL iframe-плеера, например:
  //   https://music.yandex.ru/iframe/#track/12345/67890
  //   https://music.yandex.ru/iframe/#album/12345
  //   https://music.yandex.ru/iframe/#playlist/<owner>/<kind>
  // Если не задан — секция плеера показывает заглушку.
  yandexEmbed?: string;
}

export const artists: Artist[] = [
  {
    id: 1,
    slug: "HASKI",
    number: "",
    alias: "ХАСКИ",
    realName: "Дмитрий Кузнецов",
    hood: "Восточный",
    genre: "Рэп",
    yearStarted: 2011,
    cover: "/gallery/хаски.jpg",
    tags: ["РЭП"],
    article: {
      lead: "Хаски – редкий пример артиста, чья репутация строится не на скандалах или алгоритмическом продвижении, а на текстовой и смысловой целостности.",
      body: [
        "Дмитрий Кузнецов, выступающий под псевдонимом Хаски, давно перестал быть просто исполнителем в нише русскоязычного хип-хопа. За последние годы он трансформировался в культурный феномен: поэта, социального наблюдателя и одного из немногих артистов, чья музыка не пытается понравиться, а пытается достучаться. Его творчество балансирует на стыке андеграундного рэпа, экспериментального звука и современной поэзии, формируя эстетику, которую критики иногда называют «документальным хип-хопом».",
      ],
      quote: "Моя Родина — моя любовь, вид из окна: Моногородок в платье серого сукна.",
      discography: [
        { title: "Chanson EP*", year: 2011, format: "EP" },
        { title: "Евангелие от собаки", year: 2012, format: "альбом" },
        { title: "сбчь жзнь", year: 2013, format: "альбом" },
        { title: "Любимые песни (воображаемых) людей", year: 2017, format: "альбом" },
        { title: "Триптих о Человечине", year: 2018, format: "альбом" },
        { title: "У", year: 2019, format: "альбом" },
        { title: "это все ху", year: 2020, format: "альбом" },
        { title: "Хошхоног", year: 2020, format: "альбом" },
        { title: "Партизан ", year: 2025, format: "альбом" },
      ],
    },
    // ⚠ Замени на реальный embed Яндекс.Музыки артиста / альбома
    yandexEmbed: "https://music.yandex.ru/iframe/#artist/3095130",
  },
];
