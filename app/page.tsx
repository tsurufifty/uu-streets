import { PlatformHero } from "@/components/sections/PlatformHero";
import { Marquee } from "@/components/ui/Marquee";
import { TourismPreview } from "@/components/sections/TourismPreview";
import { GastroPreview } from "@/components/sections/GastroPreview";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { MusicPreview } from "@/components/sections/MusicPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { CTA } from "@/components/sections/CTA";
import { getArtists, getGalleryPhotos } from "@/lib/content";

export default async function HomePage() {
  // Серверные данные для главной: артисты (музыкальный блок) и фото галереи.
  // Оба геттера тянут из Strapi с фоллбэком на /data/*.ts.
  const [artists, galleryPhotos] = await Promise.all([
    getArtists(),
    getGalleryPhotos(),
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
      <TourismPreview />
      <GastroPreview />
      <EventsPreview />
      <MusicPreview artists={artists} />
      <GalleryPreview photos={galleryPhotos} />
      <CTA />
    </>
  );
}
