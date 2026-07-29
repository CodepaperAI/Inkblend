import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // www, not apex — the apex 308-redirects here.
    sitemap: "https://www.inkblend.ca/sitemap.xml",
  };
}
