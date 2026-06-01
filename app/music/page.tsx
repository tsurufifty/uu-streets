import { getArtists } from "@/lib/content";
import MusicPageClient from "./MusicPageClient";

export default async function MusicPage() {
  const artists = await getArtists();
  return <MusicPageClient artists={artists} />;
}
