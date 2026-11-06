import { cache } from "react";

// Overridable so the caching behaviour can be tested against a local mock.
const API_BASE = process.env.UPLIFT_API_BASE || "https://api.upliftai.co/api/public/v1";

/**
 * Uplift API cost control. No keys, webhooks or extra infrastructure involved.
 *
 *  1. ONE list call is the source for everything. The list already carries each
 *     post's full body and meta, so the sitemap, home, blog index and every post
 *     page are built from it. Previously every post's detail endpoint was also
 *     called to "verify" it (~101 calls per refresh, every 5 minutes, ~29,000 a
 *     day). Now it is 1 call per refresh window.
 *  2. The window is 15 minutes (stale-while-revalidate: visitors always get the
 *     cached page; the refresh runs in the background). That is ~96 calls a day.
 *     New posts appear within about 15 minutes (at the next visit after the window).
 *  3. The per-post detail endpoint is only a fallback: for a post whose list
 *     entry has no body, or when the list call itself failed. Unknown slugs
 *     (crawlers probing /blog/anything) return 404 without touching the API.
 *
 * Only 200 responses are written to Next's fetch cache, so a failed call is
 * retried on the next request rather than cached.
 *
 * Keep in step with `export const revalidate` in sitemap.ts, blog/page.tsx and
 * blog/[slug]/page.tsx: those must be literals, so they cannot import this.
 */
const REVALIDATE_SECONDS = 900;
const LIST_PAGE_SIZE = 100;

export type UpliftBlogSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "PUBLISH" | "DRAFT";
  publishDate: string;
  publishTime: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
  seoScore: number;
  createdAt: string;
  updatedAt: string;
  authorName: string | null;
  authorUrl: string | null;
  freshness?: {
    lastUpdatedAt: string;
    ageDays: number;
    needsRefresh: boolean;
    freshnessThresholdDays: number;
  };
  meta?: UpliftBlogMeta;
  customFields?: {
    readingTime?: string;
    rating?: number;
    [key: string]: unknown;
  };
};

export type UpliftBlogMeta = {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
};

export type UpliftBlogDetail = UpliftBlogSummary & {
  analytics?: {
    contentQualityScore?: number;
    rankingPotential?: string;
    conversionPotential?: string;
    externalLinksCount?: number;
  } | null;
};

type ListResponse = {
  success: boolean;
  data: {
    blogs: UpliftBlogSummary[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  };
};

type DetailResponse = {
  success: boolean;
  data: { blog: UpliftBlogDetail };
};

function getToken(): string | null {
  return process.env.UPLIFT_API_TOKEN || null;
}

type LoadedList = { ok: boolean; posts: UpliftBlogSummary[] };

const hasBody = (post: UpliftBlogSummary) =>
  typeof post.content === "string" && post.content.trim().length > 0;

async function fetchListPage(token: string, page: number): Promise<ListResponse["data"] | null> {
  const res = await fetch(
    `${API_BASE}/blogs?limit=${LIST_PAGE_SIZE}&page=${page}&status=PUBLISH`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["uplift-blogs"] },
    },
  );
  if (!res.ok) {
    console.error("UpliftAI list failed:", res.status, await res.text());
    return null;
  }
  const json = (await res.json()) as ListResponse;
  return json.success ? json.data : null;
}

// React cache(): sitemap, home, blog index, generateStaticParams and every post
// page share one result per render pass, on top of Next's cross-request cache.
const loadList = cache(async (): Promise<LoadedList> => {
  const token = getToken();
  if (!token) return { ok: false, posts: [] };

  try {
    const first = await fetchListPage(token, 1);
    if (!first) return { ok: false, posts: [] };

    const posts = [...first.blogs];
    // Normally one page (100 posts). Only fetch more if the blog outgrows it.
    for (let page = 2; page <= (first.pagination?.totalPages ?? 1); page++) {
      const next = await fetchListPage(token, page);
      if (!next) return { ok: false, posts: [] };
      posts.push(...next.blogs);
    }

    posts.sort((a, b) =>
      `${b.publishDate}T${b.publishTime || "00:00"}`.localeCompare(
        `${a.publishDate}T${a.publishTime || "00:00"}`,
      ),
    );
    return { ok: true, posts };
  } catch (err) {
    console.error("UpliftAI list error:", err);
    return { ok: false, posts: [] };
  }
});

export async function listBlogs(): Promise<UpliftBlogSummary[]> {
  return (await loadList()).posts;
}

/**
 * Posts safe to link to. A post counts when the list entry has a body; only an
 * entry without one costs a detail call (cached like everything else).
 */
export const listRenderableBlogs = cache(async (): Promise<UpliftBlogSummary[]> => {
  const { posts } = await loadList();
  const checked = await Promise.all(
    posts.map(async (post) => {
      if (hasBody(post)) return post;
      return (await fetchDetail(post.slug)) ? post : null;
    }),
  );
  return checked.filter((post): post is UpliftBlogSummary => post !== null);
});

export async function getBlog(slug: string): Promise<UpliftBlogDetail | null> {
  const { ok, posts } = await loadList();
  const hit = posts.find((post) => post.slug === slug);
  if (hit && hasBody(hit)) return hit;
  // List loaded fine and the slug isn't in it: a real 404, no API call.
  if (ok && !hit) return null;
  // Entry without a body, or the list call failed: ask the detail endpoint.
  return fetchDetail(slug);
}

async function fetchDetail(slug: string): Promise<UpliftBlogDetail | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS, tags: [`uplift-blog-${slug}`] },
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      console.error("UpliftAI detail failed:", res.status, await res.text());
      return null;
    }
    const json = (await res.json()) as DetailResponse;
    return json.success ? json.data.blog : null;
  } catch (err) {
    console.error("UpliftAI detail error:", err);
    return null;
  }
}

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export function formatPublishDate(post: Pick<UpliftBlogSummary, "publishDate">): string {
  if (!post.publishDate) return "";
  const d = new Date(`${post.publishDate}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return post.publishDate;
  return dateFormatter.format(d);
}

const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "a",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "pre",
  "hr",
  "figure",
  "figcaption",
  "img",
]);

export function sanitizeBlogHtml(input: string): string {
  if (!input) return "";

  let safe = input.replace(/<(script|style|iframe|object|embed|noscript)[\s\S]*?<\/\1>/gi, "");
  safe = safe.replace(/<(script|style|iframe|object|embed|noscript)[^>]*\/?>(?!<)/gi, "");
  safe = safe.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  safe = safe.replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1=""');

  safe = safe.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tag: string) => {
    return ALLOWED_TAGS.has(tag.toLowerCase()) ? match : "";
  });

  return safe;
}
