import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/cta-band";
import { LandingTemplate } from "@/components/landing/landing-template";
import { RenderTool } from "@/components/tools/render-tool";
import { getTool, relatedSummaries, tools } from "@/data/landingPages";
import { linkSections } from "@/data/landingPages/linking";
import { landingPageJsonLd } from "@/data/landingPages/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const record = getTool(slug);

  if (!record) return {};

  return {
    title: record.title,
    description: record.metaDescription,
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

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const record = getTool(slug);

  if (!record) notFound();

  const linkedSections = linkSections(record.sections, record.pathname);
  const related = relatedSummaries(record);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingPageJsonLd(record)) }}
      />
      <LandingTemplate
        record={record}
        related={related}
        linkedSections={linkedSections}
        tool={<RenderTool toolId={record.toolId} sourcePage={record.formSourceId} />}
      />
      <CtaBand />
    </>
  );
}
