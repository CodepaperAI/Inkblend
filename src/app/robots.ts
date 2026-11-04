import type { MetadataRoute } from "next";

// AI crawlers are allowed deliberately: Ink Blend wants to be citable in
// ChatGPT, Perplexity, Claude and Google AI answers.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: aiCrawlers, allow: "/", disallow: ["/api/"] },
    ],
    // www, not apex — the apex 308-redirects here.
    sitemap: "https://www.inkblend.ca/sitemap.xml",
    host: "https://www.inkblend.ca",
  };
}
