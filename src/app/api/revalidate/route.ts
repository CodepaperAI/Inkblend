import { timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand refresh for the Uplift blog cache.
 *
 * Blog data is cached for 6 hours to keep Uplift API usage low. Point an
 * Uplift "post published/updated" webhook (or a manual curl) here so new posts
 * appear immediately instead of waiting for the window:
 *
 *   curl -X POST https://www.inkblend.ca/api/revalidate \
 *     -H "Authorization: Bearer $REVALIDATE_SECRET" \
 *     -H "content-type: application/json" -d '{"slug":"optional-post-slug"}'
 *
 * Without a slug only the post LIST is refreshed (1 API call); a new post's
 * detail is fetched the first time it is needed. Send the slug of an edited or
 * unpublished post to refresh that one detail too. The cache is marked stale
 * (stale-while-revalidate) rather than purged: the next visitor still gets a
 * fast page and the refresh runs in the background.
 * Disabled (503) unless REVALIDATE_SECRET is set.
 */
function authorized(request: Request, secret: string): boolean {
  const header = request.headers.get("authorization") ?? "";
  const given = Buffer.from(header.startsWith("Bearer ") ? header.slice(7) : header);
  const wanted = Buffer.from(secret);
  return given.length === wanted.length && timingSafeEqual(given, wanted);
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Revalidation is not configured." }, { status: 503 });
  }
  if (!authorized(request, secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = (await request.json()) as { slug?: unknown };
    if (typeof body.slug === "string" && /^[a-z0-9-]{1,200}$/i.test(body.slug)) slug = body.slug;
  } catch {
    // No/invalid body is fine: refresh the whole blog.
  }

  revalidateTag("uplift-blogs", "max");
  if (slug) revalidateTag(`uplift-blog-${slug}`, "max");

  return NextResponse.json({ ok: true, revalidated: slug ? ["uplift-blogs", `uplift-blog-${slug}`] : ["uplift-blogs"] });
}
