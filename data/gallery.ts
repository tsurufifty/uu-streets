export interface GalleryPhoto {
  src: string;          // путь от /public, например /gallery/photo01.jpg
  alt?: string;
  title?: string;       // короткое название
  caption?: string;     // описание
  category?: string;    // тег для фильтра: например "graffiti", "mural", "mosaic"
  width?: number;       // опц. — для оптимизации aspect-ratio
  height?: number;
}

/**
 * Здесь твои фотографии.
 *
 * Чтобы добавить новые — просто:
 *  1. Положи файлы в /public/gallery/
 *  2. Добавь объект в массив ниже
 *
 * Категории используются для фильтра. Можно использовать любые:
 *   "graffiti", "mural", "mosaic", "throw-up", "city", "street" и т.д.
 */
export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/gallery/1.jpg",
    title: "Гусь",
    caption: "Гаражи",
    category: "graffiti",
    width: 1600,        // опционально — размеры оригинала
    height: 1067,
  },
  {
    src: "/gallery/13.jpg",
    title: "Мозайка",
    category: "mosaic",
  },
 {
    src: "/gallery/12.jpg",
    title: "Throw-up в переходе",
    category: "throw-up",
  },
   {
    src: "/gallery/4.jpg",
    title: "Этнический мурал",
    category: "mural",
  },
     {
    src: "/gallery/16.jpg",
    title: "БАТО",
    category: "streets",
  },
];

export const galleryCategories = [
  { id: "all", label: "Все" },
  { id: "graffiti", label: "Граффити" },
  { id: "mural", label: "Муралы" },
  { id: "mosaic", label: "Мозаики" },
  { id: "throw-up", label: "Throw up" },
  { id: "street", label: "Улицы" },
];
