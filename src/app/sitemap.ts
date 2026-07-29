import type { MetadataRoute } from "next";

import { landingPagePathnames } from "@/data/landingPages";
import { services } from "@/lib/site";
import { listRenderableBlogs } from "@/lib/uplift";

// www, not apex. The apex 308-redirects here, so apex sitemap entries would
// submit a redirect for every URL on the site.
const baseUrl = "https://www.inkblend.ca";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await listRenderableBlogs();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/before-after",
    "/process",
    "/faq",
    "/blog",
    "/contact",
    "/get-quote",
    // Hub page. The four tool pages themselves come through
    // landingPagePathnames() below, along with the city and sector pages.
    "/tools",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    // City and industry landing pages. These are statically generated from a
    // local data file, so unlike the CMS-backed blog entries below they cannot
    // silently drop out of the sitemap when a remote call fails.
    ...landingPagePathnames().map((pathname) => ({
      url: `${baseUrl}${pathname}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ];
}
