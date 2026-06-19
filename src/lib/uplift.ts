const API_BASE = "https://api.upliftai.co/api/public/v1";
const REVALIDATE_SECONDS = 300;

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

export async function listRenderableBlogs(): Promise<UpliftBlogSummary[]> {
  const posts = await listBlogs();
  if (posts.length === 0) return [];

  const checkedPosts = await Promise.all(
    posts.map(async (post) => {
      const detail = await getBlog(post.slug);
      return detail ? post : null;
    }),
  );

  return checkedPosts.filter((post): post is UpliftBlogSummary => post !== null);
}

export async function getBlog(slug: string): Promise<UpliftBlogDetail | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["uplift-blogs", `uplift-blog-${slug}`] },
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
