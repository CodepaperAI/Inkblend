import type { MetadataRoute } from "next";

import { services } from "@/lib/site";
import { listBlogs } from "@/lib/uplift";

const baseUrl = "https://inkblend.ca";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await listBlogs();

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
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ];
}
