import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/cta-band";
import { LandingTemplate } from "@/components/landing/landing-template";
import { RenderTool } from "@/components/tools/render-tool";
import { cities, getCity, relatedSummaries } from "@/data/landingPages";
import { linkSections } from "@/data/landingPages/linking";
import { landingPageJsonLd } from "@/data/landingPages/schema";

type Props = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return cities.map((record) => ({ city: record.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const record = getCity(city);

  if (!record) return {};

  return {
    title: record.title,
    description: record.metaDescription,
    // Canonical resolves against metadataBase in layout.tsx, which points at
    // the www host. The apex 308-redirects to www, so canonicalising to the
    // apex would point every page at a redirect.
    alternates: { canonical: record.pathname },
    openGraph: {
      title: record.title,
      description: record.metaDescription,
      url: record.pathname,
      type: "website",
      images: [record.hero.src],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const record = getCity(city);

  if (!record) notFound();

  // Resolved here, server-side, in one pure pass — never during render.
  // See src/data/landingPages/linking.ts for why that matters.
  const linkedSections = linkSections(record.sections, record.pathname);
  const related = relatedSummaries(record);

  return (
    <>
      <script
        type="application/ld+json"
        // Server-rendered into the HTML so non-JS crawlers see it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingPageJsonLd(record)) }}
      />
      <LandingTemplate
        record={record}
        related={related}
        linkedSections={linkedSections}
        // Substrate is the theme of every city page, so the readiness check is
        // the tool that belongs here. Compact variant — the long-form
        // explanation lives on /tools/wall-readiness.
        tool={<RenderTool toolId="wall-readiness" sourcePage={record.formSourceId} compact />}
      />
      <CtaBand />
    </>
  );
}
