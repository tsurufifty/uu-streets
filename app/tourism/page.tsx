import { getRoutePoints } from "@/lib/content";
import TourismPageClient from "./TourismPageClient";

export default async function TourismPage() {
  const routePoints = await getRoutePoints();
  return <TourismPageClient routePoints={routePoints} />;
}
