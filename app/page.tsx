import { PlatformHero } from "@/components/sections/PlatformHero";
import { Marquee } from "@/components/ui/Marquee";
import { TourismPreview } from "@/components/sections/TourismPreview";
import { GastroPreview } from "@/components/sections/GastroPreview";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { MusicPreview } from "@/components/sections/MusicPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { CTA } from "@/components/sections/CTA";
import {
  getArtists,
  getGalleryPhotos,
  getRoutePoints,
  getGastroPoints,
  getEvents,
} from "@/lib/content";

export default async function HomePage() {
  // Серверные данные для главной. Все геттеры тянут из Strapi с фоллбэком
  // на /data/*.ts — грузим параллельно.
  const [artists, galleryPhotos, routePoints, gastroPoints, events] =
    await Promise.all([
      getArtists(),
      getGalleryPhotos(),
      getRoutePoints(),
      getGastroPoints(),
      getEvents(),
    ]);

  return (
    <>
      <PlatformHero />
      <Marquee
        items={[
          "Культура",
          "Еда",
          "Музыка",
          "Улицы",
        ]}
      />
      <div id="tourism" />
      <TourismPreview points={routePoints} />
      <GastroPreview points={gastroPoints} />
      <EventsPreview events={events} />
      <MusicPreview artists={artists} />
      <GalleryPreview photos={galleryPhotos} />
      <CTA />
    </>
  );
}
