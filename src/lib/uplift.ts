import { cache } from "react";

// Overridable so the caching behaviour can be tested against a local mock.
const API_BASE = process.env.UPLIFT_API_BASE || "https://api.upliftai.co/api/public/v1";

/**
 * How long a fetched list/detail is reused before the next visitor triggers a
 * background refresh (stale-while-revalidate). This is the main Uplift cost
 * control: the blog has ~100 posts and listRenderableBlogs() checks every
 * one, so each refresh window costs ~101 API calls. At 300s that was ~29,000
 * calls a day; at 6 hours it is ~400.
 *
 * Content still goes live promptly: POST /api/revalidate (see
 * src/app/api/revalidate/route.ts) marks the tags stale the moment Uplift
 * publishes, so the long window costs nothing in freshness. Only 200 responses
 * are written to Next's fetch cache, so a failed call is retried, not cached.
 *
 * Keep in step with `export const revalidate` in sitemap.ts, blog/page.tsx and
 * blog/[slug]/page.tsx: those must be literals, so they cannot import this.
 */
const REVALIDATE_SECONDS = 21600;

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

export async function listBlogs(): Promise<UpliftBlogSummary[]> {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE}/blogs?limit=100&status=PUBLISH`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["uplift-blogs"] },
    });
    if (!res.ok) {
      console.error("UpliftAI list failed:", res.status, await res.text());
      return [];
    }
    const json = (await res.json()) as ListResponse;
    if (!json.success) return [];
    return [...json.data.blogs].sort((a, b) =>
      `${b.publishDate}T${b.publishTime || "00:00"}`.localeCompare(
        `${a.publishDate}T${a.publishTime || "00:00"}`,
      ),
    );
  } catch (err) {
    console.error("UpliftAI list error:", err);
    return [];
  }
}

// React cache(): sitemap, home, blog index and generateStaticParams all call this
// in one render pass; the verification below runs once, not once per caller.
export const listRenderableBlogs = cache(async (): Promise<UpliftBlogSummary[]> => {
  const posts = await listBlogs();
  if (posts.length === 0) return [];

  const checkedPosts = await Promise.all(
    posts.map(async (post) => {
      const detail = await getBlog(post.slug);
      return detail ? post : null;
    }),
  );

  return checkedPosts.filter((post): post is UpliftBlogSummary => post !== null);
});

export async function getBlog(slug: string): Promise<UpliftBlogDetail | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`, {
      headers: { Authorization: `Bearer ${token}` },
      // Per-post tag only (not "uplift-blogs"): a webhook for the list must not
      // mark all ~100 detail entries stale and re-fetch every one of them.
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
