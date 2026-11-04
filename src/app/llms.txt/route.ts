import { landingPages } from "@/data/landingPages";
import { services, siteConfig } from "@/lib/site";

const BASE = "https://www.inkblend.ca";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "Ink Blend is a UV wall printing and surface branding studio serving Ontario and custom commercial and residential projects across Canada.",
    "",
    "## Contact",
    `- Phone: ${siteConfig.phone} or ${siteConfig.phone2}`,
    `- Email: ${siteConfig.email}`,
    `- Hours: ${siteConfig.hours}`,
    `- Quote: ${BASE}/get-quote`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${BASE}/services/${s.slug}): ${s.short}`),
    "",
    "## Locations",
    ...landingPages
      .filter((p) => p.family === "city")
      .map((p) => `- [${p.title}](${BASE}${p.pathname}): ${p.metaDescription}`),
    "",
    "## Industries",
    ...landingPages
      .filter((p) => p.family === "industry")
      .map((p) => `- [${p.title}](${BASE}${p.pathname}): ${p.metaDescription}`),
    "",
    "## Free tools",
    ...landingPages
      .filter((p) => p.family === "tool")
      .map((p) => `- [${p.title}](${BASE}${p.pathname}): ${p.metaDescription}`),
    "",
    "## More",
    `- [FAQ](${BASE}/faq)`,
    `- [Process](${BASE}/process)`,
    `- [Blog](${BASE}/blog)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
