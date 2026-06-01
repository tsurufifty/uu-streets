import { getGalleryPhotos, galleryCategories } from "@/lib/content";
import GalleryPageClient from "./GalleryPageClient";

export default async function GalleryPage() {
  const galleryPhotos = await getGalleryPhotos();
  return (
    <GalleryPageClient
      galleryPhotos={galleryPhotos}
      galleryCategories={galleryCategories}
    />
  );
}
