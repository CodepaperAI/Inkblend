import type { MetadataRoute } from "next";

// Named explicitly, even though `*` already allows them, so the intent is
// visible and survives anyone later tightening the default rule.
const searchCrawlers = ["Googlebot", "Bingbot"];

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

const rules = { allow: "/", disallow: ["/api/"] };

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...rules },
      { userAgent: [...searchCrawlers, ...aiCrawlers], ...rules },
    ],
    // www, not apex: the apex 308-redirects here.
    sitemap: "https://www.inkblend.ca/sitemap.xml",
  };
}
