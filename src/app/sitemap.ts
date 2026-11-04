import type { MetadataRoute } from "next";

import { landingPagePathnames } from "@/data/landingPages";
import { services } from "@/lib/site";
import { listRenderableBlogs } from "@/lib/uplift";

// www, not apex. The apex 308-redirects here, so apex sitemap entries would
// submit a redirect for every URL on the site.
const baseUrl = "https://www.inkblend.ca";

// Fixed, not `new Date()`. A lastmod that changes on every regeneration tells
// crawlers every URL changed every five minutes, so they learn to ignore it.
// Bump this when page content or templates meaningfully change.
const SITE_LAST_MODIFIED = new Date("2026-11-04T00:00:00Z");

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await listRenderableBlogs();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/reviews",
    "/process",
    "/faq",
    "/blog",
    "/contact",
    "/get-quote",
    // Hub page. The four tool pages themselves come through
    // landingPagePathnames() below, along with the city and sector pages.
    "/tools",
    "/wall-printing",
    "/industries",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: SITE_LAST_MODIFIED,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: SITE_LAST_MODIFIED,
    })),
    // City and industry landing pages. These are statically generated from a
    // local data file, so unlike the CMS-backed blog entries below they cannot
    // silently drop out of the sitemap when a remote call fails.
    ...landingPagePathnames().map((pathname) => ({
      url: `${baseUrl}${pathname}`,
      lastModified: SITE_LAST_MODIFIED,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : SITE_LAST_MODIFIED,
    })),
  ];
}
