import { PlatformHero } from "@/components/sections/PlatformHero";
import { Marquee } from "@/components/ui/Marquee";
import { TourismPreview } from "@/components/sections/TourismPreview";
import { GastroPreview } from "@/components/sections/GastroPreview";
import { EventsPreview } from "@/components/sections/EventsPreview";
import { MusicPreview } from "@/components/sections/MusicPreview";
import { UnderHero } from "@/components/sections/UnderHero";
import { CTA } from "@/components/sections/CTA";
import { getArtists } from "@/lib/content";

export default async function HomePage() {
  // Музыкальный preview-блок хочет данные с сервера; остальные секции пока
  // ходят в /data/*.ts напрямую (или сами по себе статичны).
  const artists = await getArtists();

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
      <UnderHero />
      <CTA />
    </>
  );
}
