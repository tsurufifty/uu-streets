import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate
 *
 * Хук, который дёргает Strapi (или ручной curl) после публикации/обновления контента.
 * Сбрасывает ISR-кэш для указанного пути (?path=/music) или всего лейаута сразу.
 *
 * Аутентификация — header `x-secret` ИЛИ query `?secret=`, должен совпасть с
 * REVALIDATE_SECRET в .env.local.
 *
 * Примеры:
 *   curl -X POST 'https://uu.example.com/api/revalidate?path=/music' \
 *        -H 'x-secret: <твой_секрет>'
 *
 *   В Strapi Cloud → Webhooks → Events: entry.publish, entry.update →
 *   URL: https://твой-сайт.vercel.app/api/revalidate?path=/
 *   Headers: x-secret: <REVALIDATE_SECRET>
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET не задан в env" },
      { status: 500 }
    );
  }

  const provided =
    req.headers.get("x-secret") || req.nextUrl.searchParams.get("secret");

  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get("path");
  const tag = req.nextUrl.searchParams.get("tag");

  try {
    if (tag) {
      revalidateTag(tag);
    } else if (path) {
      revalidatePath(path);
    } else {
      // По умолчанию — ревалидируем всё, включая layout (главную, music, gastro и т.д.)
      revalidatePath("/", "layout");
    }
    return NextResponse.json({
      ok: true,
      revalidated: true,
      path: path ?? "(layout)",
      tag,
      now: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint:
      "Используй POST с заголовком x-secret или ?secret= и параметром ?path=/music (или ?tag=...).",
  });
}
