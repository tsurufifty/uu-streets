import { redirect } from "next/navigation";

// /route → /tourism (раздел переехал в новую структуру платформы)
export default function RouteRedirect() {
  redirect("/tourism");
}
