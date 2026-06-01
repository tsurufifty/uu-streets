import { getGastroPoints } from "@/lib/content";
import GastroPageClient from "./GastroPageClient";

export default async function GastroPage() {
  const gastroPoints = await getGastroPoints();
  return <GastroPageClient gastroPoints={gastroPoints} />;
}
